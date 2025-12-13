import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface MatchingReadinessBadgeProps {
  subjectsCount: number;
  hasPreferences: boolean;
  hasProfile: boolean;
}

export const MatchingReadinessBadge = ({
  subjectsCount,
  hasPreferences,
  hasProfile,
}: MatchingReadinessBadgeProps) => {
  const isReady = subjectsCount > 0 && hasPreferences && hasProfile;

  if (isReady) {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Ready for Matching
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
      <AlertTriangle className="h-3 w-3 mr-1" />
      {subjectsCount === 0 ? "Add subjects to match" : "Complete your profile"}
    </Badge>
  );
};
