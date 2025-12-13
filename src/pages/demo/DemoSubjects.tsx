import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DemoNavbar } from "@/components/demo/DemoNavbar";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Footer } from "@/components/landing/Footer";
import { BookOpen, Plus, Trash2, Calendar, BarChart3, Users, ArrowRight } from "lucide-react";
import { demoSubjects } from "@/data/demo/demoData";
import { toast } from "@/hooks/use-toast";

const difficultyLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Easy", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  2: { label: "Moderate", color: "bg-lime-500/10 text-lime-600 dark:text-lime-400" },
  3: { label: "Medium", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  4: { label: "Hard", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  5: { label: "Very Hard", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
};

const DemoSubjects = () => {
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
            <Button variant="accent" asChild className="w-full sm:w-auto">
              <Link to="/demo/matches">
                <Users className="h-4 w-4 mr-2" />
                Find Matches
              </Link>
            </Button>
          </div>

          {/* Add Subject Form (Disabled) */}
          <Card variant="elevated" className="mb-6 sm:mb-8 opacity-75">
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
              <form onSubmit={(e) => { e.preventDefault(); showDemoToast(); }} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject / Module Name</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Calculus II, Organic Chemistry"
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exam">Exam Date (optional)</Label>
                    <Input
                      id="exam"
                      type="date"
                      className="w-full"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select defaultValue="3" disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 - Medium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" onClick={showDemoToast} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Subjects List */}
          <div className="space-y-4">
            <h2 className="text-sm sm:text-base font-semibold text-muted-foreground">
              {demoSubjects.length} subjects added
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {demoSubjects.map((subject) => (
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
                        onClick={showDemoToast}
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
                  <Link to="/demo/matches">
                    Find Matches
                    <ArrowRight className="ml-2 h-4 w-4" />
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

export default DemoSubjects;
