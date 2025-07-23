export default function Input({
  name,
  value,
  onChange,
  placeholder,
  className,
  type = "text",
}: {
  type: "text" | "email" | "password" | "number";
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="!text-medium !font-bold">{name}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
