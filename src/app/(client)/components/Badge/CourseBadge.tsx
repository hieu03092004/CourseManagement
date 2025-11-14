type Props = {
  text: string;
  bgColor?: string;
  textColor?: string;
};

export default function CourseBadge({ text, bgColor = 'purple1', textColor = 'white' }: Props) {
  return (
    <div className={`px-[15px] rounded-[200px] bg-${bgColor}`}>
      <span className={`text-xs uppercase font-medium text-${textColor}`}>
        {text}
      </span>
    </div>
  );
}

