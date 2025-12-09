import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Loader2, BookOpen, MapPin, Clock, User, Mail, ExternalLink, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface MatchedUser {
  id: string;
  user_id: string;
  name: string;
  university: string;
  city: string;
  study_program: string;
  semester: number | null;
  contact_link: string | null;
  learning_style: string;
  availability: string[];
  prefers_online: boolean;
  prefers_in_person: boolean;
  shared_subjects: string[];
  match_score: number;
}

const learningStyleLabels: Record<string, string> = {
  calm: "Calm & Focused",
  discussion: "Discussion-Oriented",
  intense: "Intense & Ambitious",
  casual: "Casual & Relaxed",
};

const Matches = () => {
  const [matches, setMatches] = useState<MatchedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      findMatches();
    }
  }, [user]);

  const findMatches = async () => {
    try {
      // Use the secure RPC function to find matches
      const { data, error } = await supabase
        .rpc('find_study_matches', { requesting_user_id: user?.id });

      if (error) throw error;

      // Transform the data to match our interface
      const matchResults: MatchedUser[] = (data || []).map((match: any) => ({
        id: match.id,
        user_id: match.user_id,
        name: match.name || "Anonymous",
        university: match.university || "Unknown",
        city: match.city || "Unknown",
        study_program: match.study_program || "Unknown",
        semester: match.semester,
        contact_link: match.contact_link,
        learning_style: match.learning_style || "calm",
        availability: match.availability || [],
        prefers_online: match.prefers_online,
        prefers_in_person: match.prefers_in_person,
        shared_subjects: match.shared_subjects || [],
        match_score: match.match_score,
      }));

      setMatches(matchResults);
    } catch (error: any) {
      toast({
        title: "Error finding matches",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Finding your perfect study partners...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
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

          {matches.length === 0 ? (
            <Card variant="bordered" className="text-center py-10 sm:py-12">
              <CardContent>
                <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">No matches found yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto px-4">
                  This could be because you haven't added subjects, or no other students share your 
                  subjects and availability yet. Check back later!
                </p>
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/subjects">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Add More Subjects
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Found {matches.length} potential study partner{matches.length !== 1 ? "s" : ""}
              </p>
              
              <div className="grid gap-4">
                {matches.map((match, index) => (
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

                        {/* Actions - Contact only, no profile viewing */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                          {match.contact_link && (
                            <Button variant="default" size="sm" asChild className="w-full sm:w-auto">
                              <a href={match.contact_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Contact
                              </a>
                            </Button>
                          )}
                          {!match.contact_link && (
                            <p className="text-xs text-muted-foreground italic">No contact link provided</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Matches;