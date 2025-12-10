import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cookies() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Cookie-Richtlinien</h1>
          
          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Was sind Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät gespeichert werden, 
                wenn Sie unsere Website besuchen. Sie helfen uns, Ihre Einstellungen zu speichern und 
                die Nutzererfahrung zu verbessern.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Welche Cookies verwenden wir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <h4 className="font-semibold text-foreground">Notwendige Cookies</h4>
              <p>
                Diese Cookies sind für den Betrieb der Website unerlässlich. Sie ermöglichen grundlegende 
                Funktionen wie Seitennavigation und Zugang zu geschützten Bereichen.
              </p>
              
              <h4 className="font-semibold text-foreground">Funktionale Cookies</h4>
              <p>
                Diese Cookies ermöglichen es uns, Ihre Einstellungen zu speichern, wie z.B. Ihre 
                Sprachpräferenz oder Login-Daten.
              </p>
              
              <h4 className="font-semibold text-foreground">Analyse-Cookies</h4>
              <p>
                Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. 
                Die gesammelten Informationen sind anonym.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Wie können Sie Cookies verwalten?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Sie können Ihre Browser-Einstellungen so ändern, dass Cookies blockiert oder 
                gelöscht werden. Beachten Sie jedoch, dass einige Funktionen unserer Website 
                möglicherweise nicht mehr ordnungsgemäß funktionieren, wenn Sie Cookies deaktivieren.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Weitere Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Weitere Informationen zum Datenschutz finden Sie in unserer{" "}
                <Link to="/datenschutz" className="text-primary hover:underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
