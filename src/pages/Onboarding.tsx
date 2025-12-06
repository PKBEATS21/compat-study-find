import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Building2, MapPin, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [university, setUniversity] = useState("");
  const [city, setCity] = useState("");
  const [studyProgram, setStudyProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!university || !city || !studyProgram) {
      toast({
        title: "Missing fields",
        description: "Please fill in at least university, city, and study program.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase
      .from("profiles")
      .update({
        university,
        city,
        study_program: studyProgram,
        semester: semester ? parseInt(semester) : null,
      })
      .eq("user_id", user?.id);

    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile saved!",
        description: "Now let's set your learning preferences.",
      });
      navigate("/preferences");
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen gradient-subtle flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Tell us about yourself</h1>
          <p className="text-muted-foreground mt-2">Step 1 of 2: Your academic info</p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          <div className="h-2 flex-1 rounded-full bg-primary" />
          <div className="h-2 flex-1 rounded-full bg-muted" />
        </div>

        <Card variant="elevated" className="shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle>Academic Profile</CardTitle>
            <CardDescription>
              This helps us match you with students from similar backgrounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university">University / School</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="university"
                    type="text"
                    placeholder="e.g., MIT, Oxford University"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="e.g., Boston, London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Study Program</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="program"
                    type="text"
                    placeholder="e.g., Computer Science, Medicine"
                    value={studyProgram}
                    onChange={(e) => setStudyProgram(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester / Year (optional)</Label>
                <Input
                  id="semester"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="e.g., 3"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="accent"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Continue to Preferences
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
