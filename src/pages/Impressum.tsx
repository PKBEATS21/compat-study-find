import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Impressum() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Impressum</h1>
          
          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Angaben gemäß § 5 TMG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-muted-foreground text-base leading-relaxed">
              <p>StudyBuddy Match</p>
              <p>Universitätsallee 1</p>
              <p>21355 Lüneburg</p>
              <p>Deutschland</p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Kontakt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-muted-foreground text-base leading-relaxed">
              <p>Telefon: +49 15737007306</p>
              <p>E-Mail: kontakt@studybuddymatch.de</p>
            </CardContent>
          </Card>

          <Card className="mb-4 md:mb-6">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-muted-foreground text-base leading-relaxed">
              <p>Arian Ohdah</p>
              <p>Los-Angeles-Platz 56</p>
              <p>10789 Berlin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Haftungsausschluss</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
