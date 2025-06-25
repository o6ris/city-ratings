import { icons, LucideIcon } from "lucide-react";

interface IconProps {
  name?: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const Icon = (props: IconProps) => {
  if (!props.name) {
    return null;
  }

  const LucideIcon: LucideIcon | undefined = icons[props.name];

  if (!LucideIcon) {
    console.warn(`Icon "${props.name}" does not exist in lucide-react icons.`);
    return null;
  }

  return <LucideIcon {...props} />;
};

export default Icon;
