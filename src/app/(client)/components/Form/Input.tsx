interface InputProps {
  htmlFor: string;
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export default function Input({
  htmlFor,
  label,
  name,
  defaultValue = "",
  type = "text",
  placeholder = "",
  required = false,
  autoComplete = "off"
}: InputProps) {
  return (
    <div className="mb-[20px]">
      <label htmlFor={htmlFor} className="block text-[14px] font-medium text-dark1 mb-[10px]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        className="w-full px-[22px] py-[15px] border border-gray-300 rounded-md bg-white focus:outline-none focus:border-hightlight"
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}