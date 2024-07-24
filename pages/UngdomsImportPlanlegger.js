import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UngdomsImportPlanlegger = () => {
  const [svar, setSvar] = useState({});
  const [aktivtSpørsmål, setAktivtSpørsmål] = useState(0);
  const [resultat, setResultat] = useState(null);

  const spørsmål = [
    {
      tekst: "Hva slags produkt vil du importere?",
      felt: "produkt",
      type: "text",
      placeholder: "F.eks. smartklokker, hodetelefoner, etc.",
      tips: "Velg et produkt som er etterspurt og som du tror du kan selge.",
      forklaring: "Produktvalget er avgjørende. Det bør være noe du er interessert i og som har et potensielt marked."
    },
    {
      tekst: "Hvor mange enheter planlegger du å kjøpe inn?",
      felt: "antall",
      type: "number",
      placeholder: "Antall",
      tips: "Start lavt, for eksempel 50-100 enheter.",
      forklaring: "Antallet påvirker både risikoen og potensiell fortjeneste. Et lavere antall reduserer risikoen.",
      vetIkkeVerdi: "50"
    },
    {
      tekst: "Hva er innkjøpsprisen per enhet i kroner?",
      felt: "innkjøpspris",
      type: "number",
      placeholder: "Pris i NOK",
      tips: "Sjekk priser fra flere leverandører.",
      forklaring: "Innkjøpsprisen er grunnlaget for din fortjeneste. Vær oppmerksom på at veldig lave priser kan bety lavere kvalitet.",
      vetIkkeVerdi: "100"
    },
    {
      tekst: "Hva er fraktkostnaden per enhet?",
      felt: "frakt",
      type: "number",
      placeholder: "Fraktkostnad i NOK per enhet",
      tips: "Sammenlign priser fra ulike fraktselskaper.",
      forklaring: "Fraktkostnader kan utgjøre en betydelig del av dine totale kostnader.",
      vetIkkeVerdi: "50"
    },
    {
      tekst: "Hva er tollsatsen for ditt produkt?",
      felt: "toll",
      type: "number",
      placeholder: "Tollsats i prosent",
      tips: "Sjekk tollsatser på Tolletatens nettsider.",
      forklaring: "Toll er en avgift som må betales når du importerer varer til Norge. Satsen varierer avhengig av produkttype.",
      vetIkkeVerdi: "5"
    },
    {
      tekst: "Hva er MVA-satsen for ditt produkt?",
      felt: "mva",
      type: "number",
      placeholder: "MVA i prosent",
      tips: "Standard MVA-sats i Norge er 25%.",
      forklaring: "MVA legges på de fleste varer og tjenester. Den vanligste satsen er 25%.",
      vetIkkeVerdi: "25"
    },
    {
      tekst: "Hvilken pris planlegger du å selge hver enhet for?",
      felt: "salgspris",
      type: "number",
      placeholder: "Salgspris i NOK",
      tips: "Vurder dine totale kostnader og legg til ønsket fortjeneste.",
      forklaring: "Salgsprisen må være høy nok til å dekke alle dine kostnader og gi en fortjeneste, men lav nok til å være attraktiv for kundene.",
      vetIkkeVerdi: (svar) => (parseFloat(svar.innkjøpspris || 0) * 2.5).toString()
    },
    {
      tekst: "Hvilken hovedsalgkanal vil du bruke?",
      felt: "salgkanal",
      type: "select",
      options: [
        { value: "nettbutikk", label: "Egen nettbutikk" },
        { value: "markedsplass", label: "Online markedsplass (f.eks. Finn.no)" },
        { value: "sosiale_medier", label: "Sosiale medier" },
        { value: "fysisk", label: "Fysisk butikk eller stand" }
      ],
      tips: "Velg en kanal som passer ditt produkt og der du lett kan nå din målgruppe.",
      forklaring: "Valg av salgkanal påvirker hvordan du når ut til kunder, dine kostnader, og hvordan du håndterer salg og kundeservice.",
      vetIkkeVerdi: "nettbutikk"
    }
  ];

  const oppdaterSvar = (felt, verdi) => setSvar({ ...svar, [felt]: verdi });

  const beregnResultat = () => {
    const antall = parseFloat(svar.antall || 0);
    const innkjøpspris = parseFloat(svar.innkjøpspris || 0);
    const frakt = parseFloat(svar.frakt || 0);
    const tollsats = parseFloat(svar.toll || 0) / 100;
    const mvaSats = parseFloat(svar.mva || 0) / 100;
    const salgspris = parseFloat(svar.salgspris || 0);

    const totalInnkjøpskostnad = (innkjøpspris + frakt) * antall;
    const tollKostnad = totalInnkjøpskostnad * tollsats;
    const grunnlagForMva = totalInnkjøpskostnad + tollKostnad;
    const mvaKostnad = grunnlagForMva * mvaSats;
    
    const totalKostnad = totalInnkjøpskostnad + tollKostnad + mvaKostnad;
    const totalSalg = salgspris * antall;
    const fortjeneste = totalSalg - totalKostnad;
    const fortjenesteMargin = (fortjeneste / totalSalg) * 100;

    setResultat({
      totalKostnad: totalKostnad.toFixed(2),
      totalSalg: totalSalg.toFixed(2),
      fortjeneste: fortjeneste.toFixed(2),
      fortjenesteMargin: fortjenesteMargin.toFixed(2)
    });
  };

  const nesteSpørsmål = () => {
    if (aktivtSpørsmål < spørsmål.length - 1) setAktivtSpørsmål(aktivtSpørsmål + 1);
    else beregnResultat();
  };

  return (
    <Card className="p-4 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Din Importbedrift Planlegger</CardTitle>
      </CardHeader>
      <CardContent>
        {!resultat ? (
          <div className="space-y-4">
            <h3 className="font-bold">{spørsmål[aktivtSpørsmål].tekst}</h3>
            {spørsmål[aktivtSpørsmål].type === "select" ? (
              <Select onValueChange={(value) => oppdaterSvar(spørsmål[aktivtSpørsmål].felt, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg et alternativ" />
                </SelectTrigger>
                <SelectContent>
                  {spørsmål[aktivtSpørsmål].options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={spørsmål[aktivtSpørsmål].type}
                placeholder={spørsmål[aktivtSpørsmål].placeholder}
                value={svar[spørsmål[aktivtSpørsmål].felt] || ''}
                onChange={(e) => oppdaterSvar(spørsmål[aktivtSpørsmål].felt, e.target.value)}
              />
            )}
            <p className="text-sm text-gray-600">
              <AlertCircle className="inline mr-1 w-4 h-4" />
              Tips: {spørsmål[aktivtSpørsmål].tips}
            </p>
            <p className="text-sm">{spørsmål[aktivtSpørsmål].forklaring}</p>
            <Button onClick={nesteSpørsmål} className="w-full">
              {aktivtSpørsmål === spørsmål.length - 1 ? "Se resultat" : "Neste"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Resultatet for din {svar.produkt}-import:</h3>
            <p>Total kostnad: {resultat.totalKostnad} NOK</p>
            <p>Totalt salg: {resultat.totalSalg} NOK</p>
            <p className={`font-bold ${parseFloat(resultat.fortjeneste) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Fortjeneste: {resultat.fortjeneste} NOK
            </p>
            <p>Fortjenestemargin: {resultat.fortjenesteMargin}%</p>
            <Button onClick={() => { setAktivtSpørsmål(0); setResultat(null); }} className="w-full">
              Start på nytt
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UngdomsImportPlanlegger;
