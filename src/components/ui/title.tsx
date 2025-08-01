import Icon from "./icon";

interface TitleProps {
  title: string;
  icon: string;
  subtitle?: string;
}

export default function Title({ title, icon, subtitle }: TitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-xl shadow-sm p-3 bg-brand-accent-light">
          <Icon name={icon  as any} size={32} className="text-brand-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-primary">
            {title}
          </span>
          <span className="text-sm text-secondary">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
