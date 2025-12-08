import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings, ArrowRight, Loader2, Coffee, MessageSquare, Zap, Smile, Sun, Sunset, Moon, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const learningStyles = [
  { value: "calm", label: "Calm & Focused", icon: Coffee, description: "Quiet, deep-focus study sessions" },
  { value: "discussion", label: "Discussion-Oriented", icon: MessageSquare, description: "Learn through talking and explaining" },
  { value: "intense", label: "Intense & Ambitious", icon: Zap, description: "High-energy, goal-driven sessions" },
  { value: "casual", label: "Casual & Relaxed", icon: Smile, description: "Laid-back, flexible approach" },
];

const timeSlots = [
  { value: "morning", label: "Morning", icon: Sun, time: "6AM - 12PM" },
  { value: "afternoon", label: "Afternoon", icon: Sunset, time: "12PM - 6PM" },
  { value: "evening", label: "Evening", icon: Moon, time: "6PM - 10PM" },
  { value: "weekend", label: "Weekends", icon: Calendar, time: "Sat & Sun" },
];

const Preferences = () => {
  const [learningStyle, setLearningStyle] = useState("calm");
  const [availability, setAvailability] = useState<string[]>([]);
  const [prefersOnline, setPrefersOnline] = useState(true);
  const [prefersInPerson, setPrefersInPerson] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const toggleAvailability = (slot: string) => {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (availability.length === 0) {
      toast({
        title: "Select availability",
        description: "Please select at least one time slot.",
        variant: "destructive",
      });
      return;
    }

    if (!prefersOnline && !prefersInPerson) {
      toast({
        title: "Select study mode",
        description: "Please select at least one study mode.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase
      .from("preferences")
      .update({
        learning_style: learningStyle,
        availability: availability,
        prefers_online: prefersOnline,
        prefers_in_person: prefersInPerson,
      })
      .eq("user_id", user?.id);

    if (error) {
      toast({ title: "Error saving preferences", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Preferences saved!", description: "Now add your subjects to start finding matches." });
      navigate("/subjects");
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen gradient-subtle flex items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <Settings className="h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">Set Your Preferences</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Step 2 of 2: How do you like to study?</p>
        </div>

        <div className="flex gap-2 mb-6 sm:mb-8">
          <div className="h-2 flex-1 rounded-full bg-primary" />
          <div className="h-2 flex-1 rounded-full bg-primary" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Learning Style</CardTitle>
              <CardDescription className="text-sm">How do you prefer to study?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={learningStyle} onValueChange={setLearningStyle} className="grid gap-3">
                {learningStyles.map((style) => (
                  <label
                    key={style.value}
                    className={`flex items-start gap-3 rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all ${
                      learningStyle === style.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={style.value} className="mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 font-medium text-sm sm:text-base">
                        <style.icon className="h-4 w-4 text-primary flex-shrink-0" />
                        {style.label}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{style.description}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Availability</CardTitle>
              <CardDescription className="text-sm">When are you usually free?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.value}
                    className={`flex items-center gap-2 sm:gap-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${
                      availability.includes(slot.value) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox checked={availability.includes(slot.value)} onCheckedChange={() => toggleAvailability(slot.value)} />
                    <slot.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{slot.label}</div>
                      <div className="text-xs text-muted-foreground">{slot.time}</div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Study Mode</CardTitle>
              <CardDescription className="text-sm">How do you prefer to meet?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2">
                <label className={`flex items-center gap-2 sm:gap-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${prefersOnline ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <Checkbox checked={prefersOnline} onCheckedChange={(checked) => setPrefersOnline(checked as boolean)} />
                  <div className="min-w-0">
                    <div className="font-medium text-sm">Online</div>
                    <div className="text-xs text-muted-foreground">Video, chat</div>
                  </div>
                </label>
                <label className={`flex items-center gap-2 sm:gap-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${prefersInPerson ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <Checkbox checked={prefersInPerson} onCheckedChange={(checked) => setPrefersInPerson(checked as boolean)} />
                  <div className="min-w-0">
                    <div className="font-medium text-sm">In-Person</div>
                    <div className="text-xs text-muted-foreground">Library, café</div>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" variant="accent" size="lg" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue to Subjects<ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
