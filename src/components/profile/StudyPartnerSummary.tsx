import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Clock, MapPin, Monitor, Users } from "lucide-react";

interface StudyPartnerSummaryProps {
  preferences: {
    learning_style: string;
    availability: string[];
    prefers_online: boolean;
    prefers_in_person: boolean;
  } | null;
  city: string;
}

const learningStyleDescriptions: Record<string, string> = {
  calm: "calm & focused sessions",
  discussion: "discussion-based learning",
  intense: "intense & ambitious studying",
  casual: "casual & relaxed sessions",
};

export const StudyPartnerSummary = ({ preferences, city }: StudyPartnerSummaryProps) => {
  if (!preferences) return null;

  const getAvailabilityText = () => {
    if (!preferences.availability || preferences.availability.length === 0) return null;
    const times = preferences.availability;
    if (times.includes("Morning") && times.includes("Evening")) return "flexible hours";
    if (times.includes("Morning")) return "morning sessions";
    if (times.includes("Afternoon")) return "afternoon sessions";
    if (times.includes("Evening")) return "evening sessions";
    return "flexible availability";
  };

  const getModeText = () => {
    if (preferences.prefers_online && preferences.prefers_in_person) return "both online and in-person";
    if (preferences.prefers_online) return "online learning";
    if (preferences.prefers_in_person) return "in-person sessions";
    return null;
  };

  const styleText = learningStyleDescriptions[preferences.learning_style] || "flexible learning style";
  const availabilityText = getAvailabilityText();
  const modeText = getModeText();

  // Build summary sentence
  const parts = [`You prefer ${styleText}`];
  if (availabilityText) parts.push(`are available for ${availabilityText}`);
  if (modeText) parts.push(`and prefer ${modeText}`);
  
  const summary = parts.length > 1 
    ? parts.slice(0, -1).join(", ") + ", " + parts[parts.length - 1] + "."
    : parts[0] + ".";

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          What makes you a good study partner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {summary}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
            <Clock className="h-3 w-3" />
            {preferences.availability?.join(", ") || "Flexible"}
          </div>
          {city && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
              <MapPin className="h-3 w-3" />
              {city}
            </div>
          )}
          {preferences.prefers_online && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
              <Monitor className="h-3 w-3" />
              Online
            </div>
          )}
          {preferences.prefers_in_person && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
              <Users className="h-3 w-3" />
              In-Person
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
