import { Link } from "react-router-dom";
import { DemoNavbar } from "@/components/demo/DemoNavbar";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, BookOpen, Clock, Building2, Monitor, Users, Pencil, CheckCircle2, Sparkles, Shield } from "lucide-react";
import { demoProfile, demoPreferences, demoSubjects } from "@/data/demo/demoData";
import { toast } from "@/hooks/use-toast";

const learningStyleLabels: Record<string, string> = {
  calm: "Calm & Focused",
  discussion: "Discussion-Oriented",
  intense: "Intense & Ambitious",
  casual: "Casual & Relaxed",
};

const learningStyleDescriptions: Record<string, string> = {
  calm: "calm & focused sessions",
  discussion: "discussion-based learning",
  intense: "intense & ambitious studying",
  casual: "casual & relaxed sessions",
};

const DemoProfile = () => {
  const showDemoToast = () => {
    toast({
      title: "Demo Mode",
      description: "Editing is disabled in demo mode. Sign up for full access!",
      variant: "default",
    });
  };

  // Generate study partner summary
  const getAvailabilityText = () => {
    const times = demoPreferences.availability;
    if (times.includes("Morning") && times.includes("Evening")) return "flexible hours";
    if (times.includes("Morning")) return "morning sessions";
    if (times.includes("Afternoon")) return "afternoon sessions";
    if (times.includes("Evening")) return "evening sessions";
    return "flexible availability";
  };

  const getModeText = () => {
    if (demoPreferences.prefers_online && demoPreferences.prefers_in_person) return "both online and in-person";
    if (demoPreferences.prefers_online) return "online learning";
    if (demoPreferences.prefers_in_person) return "in-person sessions";
    return null;
  };

  const styleText = learningStyleDescriptions[demoPreferences.learning_style] || "flexible learning style";
  const summary = `You prefer ${styleText}, are available for ${getAvailabilityText()}, and prefer ${getModeText()}.`;

  const initials = demoProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DemoBanner />
      <DemoNavbar />
      
      <main className="flex-1 container px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Hero Header Card */}
          <Card variant="elevated" className="overflow-hidden">
            <div className="h-24 sm:h-28 gradient-hero relative">
              <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
            </div>
            <CardContent className="relative pt-0 px-4 sm:px-6 pb-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-14">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg border-4 border-card flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary-foreground">
                  {initials}
                </div>
                <div className="flex-1 text-center sm:text-left pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold">{demoProfile.name}</h1>
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15 w-fit mx-auto sm:mx-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Ready for Matching
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{demoProfile.university}</span>
                    <span className="text-border">•</span>
                    <span>{demoProfile.study_program}</span>
                    <span className="text-border">•</span>
                    <span>Sem {demoProfile.semester}</span>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={showDemoToast}
                  className="w-full sm:w-auto"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardContent className="pt-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Profile Completion</span>
                  </div>
                  <Badge variant="default" className="text-xs font-semibold">
                    100%
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Profile complete!</span>
                  <span className="flex items-center gap-1 text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    Ready for matching
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Partner Summary */}
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
                  {demoPreferences.availability.join(", ")}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
                  <MapPin className="h-3 w-3" />
                  {demoProfile.city}
                </div>
                {demoPreferences.prefers_online && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
                    <Monitor className="h-3 w-3" />
                    Online
                  </div>
                )}
                {demoPreferences.prefers_in_person && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
                    <Users className="h-3 w-3" />
                    In-Person
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Cards Grid */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Location & Mode */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location & Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{demoProfile.city}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {demoPreferences.prefers_online && (
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Monitor className="h-3 w-3" />
                      Online
                    </Badge>
                  )}
                  {demoPreferences.prefers_in_person && (
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      In-Person
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Learning Style */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Learning Style
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm font-medium">
                  {learningStyleLabels[demoPreferences.learning_style]}
                </div>
                <div className="text-xs text-muted-foreground">
                  Available: {demoPreferences.availability.join(", ")}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Preview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Your Subjects
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {demoSubjects.slice(0, 3).map((subject) => (
                  <Badge key={subject.id} variant="secondary" className="text-xs py-1.5 px-3 font-medium">
                    {subject.subject_name}
                  </Badge>
                ))}
                {demoSubjects.length > 3 && (
                  <Badge variant="outline" className="text-xs py-1.5 px-3">
                    +{demoSubjects.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Matching Info */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                How matching works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 mt-0.5 text-primary/70 flex-shrink-0" />
                  <span>Shared subjects & similar exam dates</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mt-0.5 text-primary/70 flex-shrink-0" />
                  <span>Overlapping availability</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary/70 flex-shrink-0" />
                  <span>Same city for in-person meetups</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5 mt-0.5 text-primary/70 flex-shrink-0" />
                  <span>Compatible learning style</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy Indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-4 border-t border-border/50">
            <Shield className="h-3.5 w-3.5" />
            <span>Your profile is private. Other users only see you through matches.</span>
          </div>

          {/* CTA */}
          <Card variant="glass" className="gradient-hero p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-primary-foreground text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-semibold">Ready to create your own profile?</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Sign up for free and start finding study partners today.
                </p>
              </div>
              <Button variant="hero" asChild className="w-full sm:w-auto">
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DemoProfile;
