import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AGB() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">§ 1 Geltungsbereich</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der StudyBuddy Match 
                Plattform. Mit der Registrierung erkennen Sie diese Bedingungen an.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">§ 2 Leistungsbeschreibung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                StudyBuddy Match ist eine Plattform zur Vermittlung von Lernpartnern. Wir stellen 
                die technische Infrastruktur bereit, um Studenten mit kompatiblen Lernpartnern zu verbinden.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">§ 3 Registrierung und Nutzerkonto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                Für die Nutzung unserer Dienste ist eine Registrierung erforderlich. Sie sind 
                verpflichtet, wahrheitsgemäße Angaben zu machen und Ihre Zugangsdaten geheim zu halten.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">§ 4 Nutzerpflichten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>Als Nutzer verpflichten Sie sich:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Keine falschen Angaben zu machen</li>
                <li>Keine rechtswidrigen Inhalte zu verbreiten</li>
                <li>Andere Nutzer respektvoll zu behandeln</li>
                <li>Die Plattform nicht für kommerzielle Zwecke zu missbrauchen</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">§ 5 Haftung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                Wir haften nicht für die Inhalte und das Verhalten der Nutzer. Die Vermittlung 
                von Lernpartnern erfolgt ohne Gewähr. Wir übernehmen keine Garantie für den 
                Erfolg von Lernpartnerschaften.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">§ 6 Kündigung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                Sie können Ihr Konto jederzeit löschen. Wir behalten uns das Recht vor, Konten 
                bei Verstößen gegen diese AGB zu sperren oder zu löschen.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
