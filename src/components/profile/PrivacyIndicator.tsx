import { Shield } from "lucide-react";

export const PrivacyIndicator = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-4 border-t border-border/50">
      <Shield className="h-3.5 w-3.5" />
      <span>Your profile is private. Other users only see you through matches.</span>
    </div>
  );
};
