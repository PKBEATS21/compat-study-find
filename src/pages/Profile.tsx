import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BookOpen, Calendar, Clock, Loader2, Save, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  university: string;
  city: string;
  study_program: string;
  semester: number | null;
  contact_link: string;
}

interface PreferencesData {
  learning_style: string;
  availability: string[];
  prefers_online: boolean;
  prefers_in_person: boolean;
}

interface SubjectData {
  id: string;
  subject_name: string;
  exam_date: string | null;
  difficulty: number;
}

const learningStyleLabels: Record<string, string> = {
  calm: "Calm & Focused",
  discussion: "Discussion-Oriented",
  intense: "Intense & Ambitious",
  casual: "Casual & Relaxed",
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [preferences, setPreferences] = useState<PreferencesData | null>(null);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      // Fetch only the current user's own data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const { data: prefsData, error: prefsError } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (prefsError) throw prefsError;

      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", user?.id);

      if (subjectsError) throw subjectsError;

      if (profileData) {
        setProfile({
          name: profileData.name || "",
          university: profileData.university || "",
          city: profileData.city || "",
          study_program: profileData.study_program || "",
          semester: profileData.semester,
          contact_link: profileData.contact_link || "",
        });
        setEditedProfile({
          name: profileData.name || "",
          university: profileData.university || "",
          city: profileData.city || "",
          study_program: profileData.study_program || "",
          semester: profileData.semester,
          contact_link: profileData.contact_link || "",
        });
      }

      if (prefsData) {
        setPreferences({
          learning_style: prefsData.learning_style || "calm",
          availability: (prefsData.availability as string[]) || [],
          prefers_online: prefsData.prefers_online ?? true,
          prefers_in_person: prefsData.prefers_in_person ?? false,
        });
      }

      setSubjects(subjectsData || []);
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!editedProfile || !user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        name: editedProfile.name,
        university: editedProfile.university,
        city: editedProfile.city,
        study_program: editedProfile.study_program,
        semester: editedProfile.semester,
        contact_link: editedProfile.contact_link,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
      setProfile(editedProfile);
      setEditMode(false);
    }
    setSaving(false);
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

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 container px-4 py-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-sm text-muted-foreground mb-4">Your profile hasn't been set up yet.</p>
          <Button onClick={() => navigate("/onboarding")}>Complete Onboarding</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Header Card */}
          <Card variant="elevated" className="overflow-hidden">
            <div className="h-20 sm:h-24 gradient-hero" />
            <CardContent className="relative pt-0 px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10 sm:-mt-12">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-card shadow-lg border-4 border-card flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary">
                  {profile.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 text-center sm:text-left pb-2">
                  <h1 className="text-xl sm:text-2xl font-bold">{profile.name || "Anonymous"}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{profile.university || "No university set"}</span>
                    <span>•</span>
                    <span>{profile.study_program || "No program set"}</span>
                    {profile.semester && (
                      <>
                        <span>•</span>
                        <span>Sem {profile.semester}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant={editMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                  className="w-full sm:w-auto"
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Edit Mode */}
          {editMode && editedProfile && (
            <Card variant="elevated">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg">Edit Profile</CardTitle>
                <CardDescription className="text-sm">Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm">Name</Label>
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">University</Label>
                    <Input
                      value={editedProfile.university}
                      onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">City</Label>
                    <Input
                      value={editedProfile.city}
                      onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Study Program</Label>
                    <Input
                      value={editedProfile.study_program}
                      onChange={(e) => setEditedProfile({ ...editedProfile, study_program: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Semester</Label>
                    <Input
                      type="number"
                      value={editedProfile.semester || ""}
                      onChange={(e) => setEditedProfile({ ...editedProfile, semester: parseInt(e.target.value) || null })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Contact Link</Label>
                    <Input
                      value={editedProfile.contact_link}
                      onChange={(e) => setEditedProfile({ ...editedProfile, contact_link: e.target.value })}
                      placeholder="https://..."
                      className="w-full"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={saving} className="w-full sm:w-auto">
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

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
                  <span>{profile.city || "No city set"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Learning Preferences */}
            {preferences && (
              <Card variant="default">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Learning Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{learningStyleLabels[preferences.learning_style]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{preferences.availability.join(", ") || "Not set"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {preferences.prefers_online && (
                      <Badge variant="secondary" className="text-xs">Online</Badge>
                    )}
                    {preferences.prefers_in_person && (
                      <Badge variant="secondary" className="text-xs">In-Person</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Subjects */}
          {subjects.length > 0 && (
            <Card variant="default">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {subjects.map((subject) => (
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;