import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BookOpen, Plus, Trash2, Calendar, BarChart3, Loader2, Users, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  subject_name: string;
  exam_date: string | null;
  difficulty: number;
}

const difficultyLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Easy", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  2: { label: "Moderate", color: "bg-lime-500/10 text-lime-600 dark:text-lime-400" },
  3: { label: "Medium", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  4: { label: "Hard", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  5: { label: "Very Hard", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
};

const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [difficulty, setDifficulty] = useState("3");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubjects();
    }
  }, [user]);

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading subjects",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSubjects(data || []);
    }
    setLoading(false);
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subjectName.trim()) {
      toast({
        title: "Subject name required",
        description: "Please enter a subject name.",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    
    const { error } = await supabase.from("subjects").insert({
      user_id: user?.id,
      subject_name: subjectName.trim(),
      exam_date: examDate || null,
      difficulty: parseInt(difficulty),
    });

    if (error) {
      toast({
        title: "Error adding subject",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Subject added!",
        description: `${subjectName} has been added to your list.`,
      });
      setSubjectName("");
      setExamDate("");
      setDifficulty("3");
      fetchSubjects();
    }
    setAdding(false);
  };

  const handleDeleteSubject = async (id: string, name: string) => {
    const { error } = await supabase.from("subjects").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting subject",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Subject removed",
        description: `${name} has been removed from your list.`,
      });
      fetchSubjects();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                My Subjects
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Add subjects you're studying to find matching partners
              </p>
            </div>
            {subjects.length > 0 && (
              <Button variant="accent" asChild className="w-full sm:w-auto">
                <Link to="/matches">
                  <Users className="h-4 w-4 mr-2" />
                  Find Matches
                </Link>
              </Button>
            )}
          </div>

          {/* Add Subject Form */}
          <Card variant="elevated" className="mb-6 sm:mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add a Subject
              </CardTitle>
              <CardDescription className="text-sm">
                Enter your subject details to find study partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSubject} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject / Module Name</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Calculus II, Organic Chemistry"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exam">Exam Date (optional)</Label>
                    <Input
                      id="exam"
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Easy</SelectItem>
                      <SelectItem value="2">2 - Moderate</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="4">4 - Hard</SelectItem>
                      <SelectItem value="5">5 - Very Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={adding} className="w-full sm:w-auto">
                  {adding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Subjects List */}
          {subjects.length === 0 ? (
            <Card variant="bordered" className="text-center py-10 sm:py-12">
              <CardContent>
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">No subjects yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first subject above to start finding study partners.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-base font-semibold text-muted-foreground">
                {subjects.length} subject{subjects.length !== 1 ? "s" : ""} added
              </h2>
              <div className="grid gap-3 sm:gap-4">
                {subjects.map((subject) => (
                  <Card key={subject.id} variant="default" className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg truncate">{subject.subject_name}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                            {subject.exam_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span>
                                  {new Date(subject.exam_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4 flex-shrink-0" />
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyLabels[subject.difficulty].color}`}>
                                {difficultyLabels[subject.difficulty].label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteSubject(subject.id, subject.subject_name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA to find matches */}
              <Card variant="glass" className="mt-6 sm:mt-8 gradient-hero p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-primary-foreground text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold">Ready to find study partners?</h3>
                    <p className="text-primary-foreground/80 text-sm">
                      We'll match you with students who share your subjects.
                    </p>
                  </div>
                  <Button variant="hero" asChild className="w-full sm:w-auto">
                    <Link to="/matches">
                      Find Matches
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subjects;
