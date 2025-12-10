import { Link } from "react-router-dom";
import { DemoNavbar } from "@/components/demo/DemoNavbar";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, MapPin, Clock, User, ExternalLink, Sparkles } from "lucide-react";
import { demoMatches } from "@/data/demo/demoData";
import { toast } from "@/hooks/use-toast";

const learningStyleLabels: Record<string, string> = {
  calm: "Calm & Focused",
  discussion: "Discussion-Oriented",
  intense: "Intense & Ambitious",
  casual: "Casual & Relaxed",
};

const DemoMatches = () => {
  const showDemoToast = () => {
    toast({
      title: "Demo Mode",
      description: "Contact features are disabled in demo mode. Sign up for full access!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DemoBanner />
      <DemoNavbar />
      
      <main className="flex-1 container px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Your Matches
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Students who share your subjects, schedule, and learning style
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {demoMatches.length} potential study partners
            </p>
            
            <div className="grid gap-4">
              {demoMatches.map((match, index) => (
                <Card
                  key={match.id}
                  variant="elevated"
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                      {/* Header with Avatar */}
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg sm:text-xl font-bold">
                            {match.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg sm:text-xl font-semibold truncate">{match.name}</h3>
                            {index < 3 && (
                              <Badge variant="secondary" className="text-xs flex-shrink-0">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Top
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                            <span className="truncate">{match.university}</span>
                            {match.semester && (
                              <>
                                <span>•</span>
                                <span>Sem {match.semester}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Shared Subjects */}
                      <div>
                        <div className="text-xs sm:text-sm font-medium mb-2">Subjects in common:</div>
                        <div className="flex flex-wrap gap-2">
                          {match.shared_subjects.map((subject) => (
                            <Badge key={subject} variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          {match.city}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{learningStyleLabels[match.learning_style]}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{match.availability.slice(0, 2).join(", ")}{match.availability.length > 2 && "..."}</span>
                        </div>
                      </div>

                      {/* Study mode badges */}
                      <div className="flex flex-wrap gap-2">
                        {match.prefers_online && (
                          <Badge variant="outline" className="text-xs">Online</Badge>
                        )}
                        {match.prefers_in_person && (
                          <Badge variant="outline" className="text-xs">In-Person</Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                        <Button variant="default" size="sm" onClick={showDemoToast} className="w-full sm:w-auto">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <Card variant="glass" className="mt-6 sm:mt-8 gradient-hero p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-primary-foreground text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold">Want to contact these students?</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Sign up for free to connect with real study partners.
                  </p>
                </div>
                <Button variant="hero" asChild className="w-full sm:w-auto">
                  <Link to="/register">
                    Sign Up Free
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DemoMatches;
