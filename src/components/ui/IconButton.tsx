import { cn } from "@/lib/utils";

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  badge?: number;
  children: React.ReactNode;
  className?: string;
};

export function IconButton({
  label,
  onClick,
  active,
  badge,
  children,
  className,
}: IconButtonProps) {
  const classes = cn(
    "btn-icon relative",
    active && "border-accent bg-accent-muted text-accent",
    className,
  );

  const content = (
    <>
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-background">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </>
  );

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
