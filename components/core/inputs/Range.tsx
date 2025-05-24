import Icon from "@components/core/Icons/Icon";
import { icons } from "lucide-react";

export default function Range({
  min = 1,
  max = 10,
  step = 1,
  value = 5,
  name,
  onChange,
  iconName,
  className,
}: {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  name?: string;
  onChange?: (value: number) => void;
  iconName?: keyof typeof icons;
  className?: string;
}) {
  const displayRangeColor = (value: number) => {
    if (value <= 3) return "range-error [--range-bg:#F99483]";
    if (value <= 6 && value > 3) return "range-warning [--range-bg:#FACE88]";
    if (value >= 7) return "range-success [--range-bg:#CFE7AB]";
  };

  const displayRatingColor = (value: number) => {
    if (value <= 3) return "text-error";
    if (value <= 6 && value > 3) return "text-warning";
    if (value >= 7) return "text-success";
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={iconName} size={20} color="#480201" />
          <label>{name}</label>
        </div>
        <p className={`text-large font-bold ${displayRatingColor(value)}`}>{value}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        name={name}
        onChange={
          onChange ? (e) => onChange(Number(e.target.value)) : undefined
        }
        className={`${displayRangeColor(
          value
        )} ${className} range w-full range-xl [--range-thumb:#480201]`}
      />
    </div>
  );
}
