import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface ProfileCompletionIndicatorProps {
  profile: {
    name: string;
    university: string;
    city: string;
    study_program: string;
    semester: number | null;
    contact_link: string;
  } | null;
  preferences: {
    learning_style: string;
    availability: string[];
    prefers_online: boolean;
    prefers_in_person: boolean;
  } | null;
  subjectsCount: number;
}

export const ProfileCompletionIndicator = ({
  profile,
  preferences,
  subjectsCount,
}: ProfileCompletionIndicatorProps) => {
  const calculateCompletion = () => {
    let completed = 0;
    let total = 10;

    // Profile fields (6 items)
    if (profile?.name) completed++;
    if (profile?.university) completed++;
    if (profile?.city) completed++;
    if (profile?.study_program) completed++;
    if (profile?.semester) completed++;
    if (profile?.contact_link) completed++;

    // Preferences (2 items)
    if (preferences?.learning_style) completed++;
    if (preferences?.availability && preferences.availability.length > 0) completed++;

    // Mode preference (1 item)
    if (preferences?.prefers_online || preferences?.prefers_in_person) completed++;

    // Subjects (1 item)
    if (subjectsCount > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const completion = calculateCompletion();

  const getCompletionMessage = () => {
    if (completion === 100) return "Profile complete!";
    if (completion >= 80) return "Almost there!";
    if (completion >= 50) return "Making progress";
    return "Let's get started";
  };

  const getMissingItems = () => {
    const missing: string[] = [];
    if (!profile?.name) missing.push("name");
    if (!profile?.contact_link) missing.push("contact link");
    if (subjectsCount === 0) missing.push("subjects");
    if (!preferences?.availability || preferences.availability.length === 0) missing.push("availability");
    return missing;
  };

  const missingItems = getMissingItems();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Profile Completion</span>
        </div>
        <Badge 
          variant={completion === 100 ? "default" : "secondary"} 
          className="text-xs font-semibold"
        >
          {completion}%
        </Badge>
      </div>
      
      <Progress value={completion} className="h-2" />
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{getCompletionMessage()}</span>
        {completion === 100 ? (
          <span className="flex items-center gap-1 text-primary">
            <CheckCircle2 className="h-3 w-3" />
            Ready for matching
          </span>
        ) : missingItems.length > 0 ? (
          <span className="flex items-center gap-1 text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            Add {missingItems[0]}
          </span>
        ) : null}
      </div>
    </div>
  );
};
