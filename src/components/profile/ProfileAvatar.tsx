interface ProfileAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export const ProfileAvatar = ({ name, size = "md" }: ProfileAvatarProps) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const sizeClasses = {
    sm: "h-12 w-12 text-lg",
    md: "h-20 w-20 sm:h-24 sm:w-24 text-2xl sm:text-3xl",
    lg: "h-28 w-28 text-4xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg border-4 border-card flex items-center justify-center font-bold text-primary-foreground`}
    >
      {initials}
    </div>
  );
};
