import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Clock, MapPin } from "lucide-react";

export const MatchingInfoCard = () => {
  const matchingFactors = [
    { icon: BookOpen, text: "Shared subjects & similar exam dates" },
    { icon: Clock, text: "Overlapping availability" },
    { icon: MapPin, text: "Same city for in-person meetups" },
    { icon: Users, text: "Compatible learning style" },
  ];

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          How matching works
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {matchingFactors.map((factor, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
              <factor.icon className="h-3.5 w-3.5 mt-0.5 text-primary/70 flex-shrink-0" />
              <span>{factor.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
