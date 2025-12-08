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
  score: number;
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
      const { data: myProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      const { data: myPrefs } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      const { data: mySubjects } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", user?.id);

      if (!mySubjects || mySubjects.length === 0) {
        setLoading(false);
        return;
      }

      const { data: otherProfiles } = await supabase
        .from("profiles")
        .select("*")
        .neq("user_id", user?.id);

      const { data: allPreferences } = await supabase
        .from("preferences")
        .select("*");

      const { data: allSubjects } = await supabase
        .from("subjects")
        .select("*");

      if (!otherProfiles) {
        setLoading(false);
        return;
      }

      const matchResults: MatchedUser[] = [];

      for (const profile of otherProfiles) {
        const theirPrefs = allPreferences?.find((p) => p.user_id === profile.user_id);
        const theirSubjects = allSubjects?.filter((s) => s.user_id === profile.user_id) || [];

        if (!theirPrefs || theirSubjects.length === 0) continue;

        const onlineMatch = myPrefs?.prefers_online && theirPrefs.prefers_online;
        const inPersonMatch = myPrefs?.prefers_in_person && theirPrefs.prefers_in_person;
        
        if (myPrefs?.prefers_in_person && theirPrefs.prefers_in_person && !myPrefs?.prefers_online) {
          if (myProfile?.city?.toLowerCase() !== profile.city?.toLowerCase()) {
            continue;
          }
        }

        if (!onlineMatch && !inPersonMatch) continue;

        const mySubjectNames = mySubjects.map((s) => s.subject_name.toLowerCase());
        const sharedSubjects = theirSubjects
          .filter((s) => {
            const subjectLower = s.subject_name.toLowerCase();
            return mySubjectNames.some((name) => 
              name.includes(subjectLower) || subjectLower.includes(name) || 
              name === subjectLower
            );
          })
          .map((s) => s.subject_name);

        if (sharedSubjects.length === 0) continue;

        const myAvailability = (myPrefs?.availability as string[]) || [];
        const theirAvailability = (theirPrefs.availability as string[]) || [];
        const availabilityOverlap = myAvailability.filter((a) => theirAvailability.includes(a));

        if (availabilityOverlap.length === 0) continue;

        let score = 0;
        score += sharedSubjects.length * 30;
        score += availabilityOverlap.length * 10;
        
        if (myPrefs?.learning_style === theirPrefs.learning_style) {
          score += 20;
        }

        if (myProfile?.city?.toLowerCase() === profile.city?.toLowerCase()) {
          score += 15;
        }

        for (const mySub of mySubjects) {
          if (!mySub.exam_date) continue;
          for (const theirSub of theirSubjects) {
            if (!theirSub.exam_date) continue;
            const myDate = new Date(mySub.exam_date);
            const theirDate = new Date(theirSub.exam_date);
            const daysDiff = Math.abs((myDate.getTime() - theirDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff <= 21) {
              score += Math.max(0, 21 - daysDiff);
            }
          }
        }

        matchResults.push({
          id: profile.id,
          user_id: profile.user_id,
          name: profile.name || "Anonymous",
          university: profile.university || "Unknown",
          city: profile.city || "Unknown",
          study_program: profile.study_program || "Unknown",
          semester: profile.semester,
          contact_link: profile.contact_link,
          learning_style: theirPrefs.learning_style || "calm",
          availability: theirAvailability,
          prefers_online: theirPrefs.prefers_online,
          prefers_in_person: theirPrefs.prefers_in_person,
          shared_subjects: sharedSubjects,
          score,
        });
      }

      matchResults.sort((a, b) => b.score - a.score);
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

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                          <Button variant="default" size="sm" asChild className="w-full sm:w-auto">
                            <Link to={`/profile/${match.user_id}`}>
                              <User className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                            <a href={`mailto:${match.user_id}`}>
                              <Mail className="h-4 w-4 mr-2" />
                              Contact
                            </a>
                          </Button>
                          {match.contact_link && (
                            <Button variant="ghost" size="sm" asChild className="w-full sm:w-auto">
                              <a href={match.contact_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                External
                              </a>
                            </Button>
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
