export default function Range({
  min = 1,
  max = 10,
  step = 1,
  value = 5,
  name,
  onChange,
  className,
}: {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  name?: string;
  onChange?: (value: number) => void;
  className?: string;
}) {
  const displayColor = (value: number) => {
    if (value <= 3) return "range-error [--range-bg:#F99483]";
    if (value <= 6 && value > 3) return "range-warning [--range-bg:#FACE88]";
    if (value >= 7) return "range-success [--range-bg:#CFE7AB]";
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      name={name}
      onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
      className={`${displayColor(value)} ${className}`}
    />
  );
}
