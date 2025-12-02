interface QuizOption {
  id: string;
  text: string;
}

interface QuizCard {
  id: string;
  question: string;
  options: QuizOption[];
  correctOption: string;
}

class QuizManager {
  private quizCards: QuizCard[];

  constructor(initialCards: QuizCard[] = []) {
    this.quizCards = initialCards;
  }

  getCards(): QuizCard[] {
    return this.quizCards;
  }

  setCards(cards: QuizCard[]): void {
    this.quizCards = cards;
  }

  addNewCard(afterId: string): QuizCard[] {
    const newCard: QuizCard = {
      id: Date.now().toString(),
      question: "",
      options: [
        { id: "1", text: "" },
        { id: "2", text: "" },
        { id: "3", text: "" },
        { id: "4", text: "" },
      ],
      correctOption: "1",
    };

    const index = this.quizCards.findIndex((card) => card.id === afterId);
    const newCards = [...this.quizCards];
    newCards.splice(index + 1, 0, newCard);
    this.quizCards = newCards;
    return this.quizCards;
  }

  duplicateCard(cardId: string): QuizCard[] {
    const cardToDuplicate = this.quizCards.find((card) => card.id === cardId);
    if (!cardToDuplicate) return this.quizCards;

    const duplicatedCard: QuizCard = {
      ...cardToDuplicate,
      id: Date.now().toString(),
    };

    const index = this.quizCards.findIndex((card) => card.id === cardId);
    const newCards = [...this.quizCards];
    newCards.splice(index + 1, 0, duplicatedCard);
    this.quizCards = newCards;
    return this.quizCards;
  }

  deleteCard(cardId: string): QuizCard[] {
    if (this.quizCards.length === 1) return this.quizCards;
    this.quizCards = this.quizCards.filter((card) => card.id !== cardId);
    return this.quizCards;
  }

  updateQuestion(cardId: string, question: string): QuizCard[] {
    this.quizCards = this.quizCards.map((card) =>
      card.id === cardId ? { ...card, question } : card
    );
    return this.quizCards;
  }

  updateOption(cardId: string, optionId: string, text: string): QuizCard[] {
    this.quizCards = this.quizCards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            options: card.options.map((opt) =>
              opt.id === optionId ? { ...opt, text } : opt
            ),
          }
        : card
    );
    return this.quizCards;
  }

  updateCorrectOption(cardId: string, optionId: string): QuizCard[] {
    this.quizCards = this.quizCards.map((card) =>
      card.id === cardId ? { ...card, correctOption: optionId } : card
    );
    return this.quizCards;
  }

  /**
   * Transform quiz cards to backend format
   * Structure: { lessonId, question, answers, trueAnswer }
   */
  prepareDataForBackend(lessonId: string): Array<{
    lessonId: number;
    question: string;
    answers: string[];
    trueAnswer: number;
  }> {
    return this.quizCards.map((card) => {
      const correctAnswerIndex = card.options.findIndex(
        (opt) => opt.id === card.correctOption
      );

      return {
        lessonId: parseInt(lessonId),
        question: card.question,
        answers: card.options.map((opt) => opt.text),
        trueAnswer: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
      };
    });
  }
}

export default QuizManager;
export type { QuizCard, QuizOption };

