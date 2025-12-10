import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Datenschutzerklärung</h1>
          
          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">1. Datenschutz auf einen Blick</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <h4 className="font-semibold text-foreground">Allgemeine Hinweise</h4>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">2. Datenerfassung auf dieser Website</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <h4 className="font-semibold text-foreground">Wer ist verantwortlich für die Datenerfassung?</h4>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Impressum entnehmen.
              </p>
              <h4 className="font-semibold text-foreground">Wie erfassen wir Ihre Daten?</h4>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">3. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien 
                und richten auf Ihrem Endgerät keinen Schaden an.
              </p>
              <p>
                Weitere Informationen finden Sie in unserer Cookie-Richtlinie.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">4. Ihre Rechte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="list-disc list-inside space-y-2 pl-1">
                <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
                <li>Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Löschung Ihrer Daten zu verlangen</li>
                <li>Einschränkung der Verarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">5. Speicherdauer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung 
                der Zwecke erforderlich ist oder wie es gesetzliche Aufbewahrungsfristen vorsehen.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
