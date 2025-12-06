import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, BookOpen, Calendar, Clock, Mail, ExternalLink, Loader2, Save, Building2, GraduationCap } from "lucide-react";
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
  const { id } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [preferences, setPreferences] = useState<PreferencesData | null>(null);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
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
      const targetUserId = id || user.id;
      setIsOwnProfile(!id || id === user.id);
      fetchProfileData(targetUserId);
    }
  }, [user, id]);

  const fetchProfileData = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (profileError) throw profileError;

      const { data: prefsData, error: prefsError } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (prefsError) throw prefsError;

      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", userId);

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
          prefers_online: prefsData.prefers_online,
          prefers_in_person: prefsData.prefers_in_person,
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-muted-foreground">This user profile doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header Card */}
          <Card variant="elevated" className="overflow-hidden">
            <div className="h-24 gradient-hero" />
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
                <div className="h-24 w-24 rounded-2xl bg-card shadow-lg border-4 border-card flex items-center justify-center text-3xl font-bold text-primary">
                  {profile.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 pb-2">
                  <h1 className="text-2xl font-bold">{profile.name || "Anonymous"}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground mt-1">
                    <Building2 className="h-4 w-4" />
                    <span>{profile.university || "No university set"}</span>
                    <span>•</span>
                    <span>{profile.study_program || "No program set"}</span>
                    {profile.semester && (
                      <>
                        <span>•</span>
                        <span>Semester {profile.semester}</span>
                      </>
                    )}
                  </div>
                </div>
                {isOwnProfile && (
                  <Button
                    variant={editMode ? "default" : "outline"}
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Mode */}
          {editMode && editedProfile && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>University</Label>
                    <Input
                      value={editedProfile.university}
                      onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={editedProfile.city}
                      onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Study Program</Label>
                    <Input
                      value={editedProfile.study_program}
                      onChange={(e) => setEditedProfile({ ...editedProfile, study_program: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Semester</Label>
                    <Input
                      type="number"
                      value={editedProfile.semester || ""}
                      onChange={(e) => setEditedProfile({ ...editedProfile, semester: parseInt(e.target.value) || null })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Link (Discord, Telegram, etc.)</Label>
                    <Input
                      value={editedProfile.contact_link}
                      onChange={(e) => setEditedProfile({ ...editedProfile, contact_link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={saving}>
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Location & Contact */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg">Contact & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.city || "No city set"}</span>
                </div>
                {!isOwnProfile && (
                  <div className="flex gap-2 pt-2">
                    <Button variant="default" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    {profile.contact_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.contact_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Contact Link
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Preferences */}
            {preferences && (
              <Card variant="default">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{learningStyleLabels[preferences.learning_style]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{preferences.availability.join(", ") || "Not set"}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {preferences.prefers_online && (
                      <Badge variant="secondary">Online</Badge>
                    )}
                    {preferences.prefers_in_person && (
                      <Badge variant="secondary">In-Person</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Subjects */}
          {subjects.length > 0 && (
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
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
                      <div>
                        <div className="font-medium">{subject.subject_name}</div>
                        {subject.exam_date && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
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
    </div>
  );
};

export default Profile;
