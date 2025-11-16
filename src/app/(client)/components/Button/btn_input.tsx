interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonInput({ text, type = "submit" }: ButtonProps) {
  return (
    <div className="mb-6">
      <button
        type={type}
        className="w-full bg-green1 text-dark1 font-medium px-6 py-3 rounded-md hover:bg-white hover:text-green1 border-[2px] border-green1 transition-colors"
      >
        {text}
      </button>
    </div>
  );
}


