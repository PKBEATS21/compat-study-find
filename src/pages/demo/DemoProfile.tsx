import { Link } from "react-router-dom";
import { DemoNavbar } from "@/components/demo/DemoNavbar";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BookOpen, Calendar, Clock, Building2 } from "lucide-react";
import { demoProfile, demoPreferences, demoSubjects } from "@/data/demo/demoData";
import { toast } from "@/hooks/use-toast";

const learningStyleLabels: Record<string, string> = {
  calm: "Calm & Focused",
  discussion: "Discussion-Oriented",
  intense: "Intense & Ambitious",
  casual: "Casual & Relaxed",
};

const DemoProfile = () => {
  const showDemoToast = () => {
    toast({
      title: "Demo Mode",
      description: "Editing is disabled in demo mode. Sign up for full access!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DemoBanner />
      <DemoNavbar />
      
      <main className="flex-1 container px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Header Card */}
          <Card variant="elevated" className="overflow-hidden">
            <div className="h-20 sm:h-24 gradient-hero" />
            <CardContent className="relative pt-0 px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10 sm:-mt-12">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-card shadow-lg border-4 border-card flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary">
                  {demoProfile.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center sm:text-left pb-2">
                  <h1 className="text-xl sm:text-2xl font-bold">{demoProfile.name}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{demoProfile.university}</span>
                    <span>•</span>
                    <span>{demoProfile.study_program}</span>
                    <span>•</span>
                    <span>Sem {demoProfile.semester}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showDemoToast}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Location & Contact */}
            <Card variant="default">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{demoProfile.city}</span>
                </div>
              </CardContent>
            </Card>

            {/* Learning Preferences */}
            <Card variant="default">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Learning Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{learningStyleLabels[demoPreferences.learning_style]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{demoPreferences.availability.join(", ")}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {demoPreferences.prefers_online && (
                    <Badge variant="secondary" className="text-xs">Online</Badge>
                  )}
                  {demoPreferences.prefers_in_person && (
                    <Badge variant="secondary" className="text-xs">In-Person</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects */}
          <Card variant="default">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {demoSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{subject.subject_name}</div>
                      {subject.exam_date && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          {new Date(subject.exam_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
