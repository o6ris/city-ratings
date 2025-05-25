export default function Textarea({
  name,
  value,
  onChange,
  placeholder,
  className,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="!text-medium !font-bold">{name}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-32 p-4 rounded-lg shadow-md ${className}`}
      />
    </div>
  );
}
