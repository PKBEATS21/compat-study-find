import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

export default function Support() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({ title: "Nachricht gesendet!", description: "Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen." });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Support & Kontakt</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Haben Sie Fragen? Wir helfen Ihnen gerne weiter.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Kontaktformular</CardTitle>
              <CardDescription className="text-sm">Wir melden uns schnellstmöglich bei Ihnen.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Ihr Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" placeholder="ihre@email.de" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea id="message" placeholder="Wie können wir Ihnen helfen?" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full" />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : <><Send className="mr-2 h-4 w-4" />Nachricht senden</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 sm:mt-8 text-center text-sm text-muted-foreground">
            <p>Sie können uns auch direkt erreichen unter:</p>
            <p className="font-medium text-foreground mt-1">support@studybuddymatch.de</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
