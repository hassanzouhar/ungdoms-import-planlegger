import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  question: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  tip: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  explanation: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '20px',
  },
  result: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '4px',
    marginTop: '20px',
  },
  profit: {
    fontWeight: 'bold',
  },
  progress: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

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

  const forrigeSpørsmål = () => {
    if (aktivtSpørsmål > 0) setAktivtSpørsmål(aktivtSpørsmål - 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Din Importbedrift Planlegger</h1>
      {!resultat ? (
        <div style={styles.question}>
          <div style={styles.progress}>
            <p>Spørsmål {aktivtSpørsmål + 1} av {spørsmål.length}</p>
          </div>
          <h3>{spørsmål[aktivtSpørsmål].tekst}</h3>
          {spørsmål[aktivtSpørsmål].type === "select" ? (
            <select 
              value={svar[spørsmål[aktivtSpørsmål].felt] || ''}
              onChange={(e) => oppdaterSvar(spørsmål[aktivtSpørsmål].felt, e.target.value)}
              style={styles.select}
            >
              <option value="">Velg et alternativ</option>
              {spørsmål[aktivtSpørsmål].options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={spørsmål[aktivtSpørsmål].type}
              placeholder={spørsmål[aktivtSpørsmål].placeholder}
              value={svar[spørsmål[aktivtSpørsmål].felt] || ''}
              onChange={(e) => oppdaterSvar(spørsmål[aktivtSpørsmål].felt, e.target.value)}
              style={styles.input}
            />
          )}
          <p style={styles.tip}>Tips: {spørsmål[aktivtSpørsmål].tips}</p>
          <p style={styles.explanation}>{spørsmål[aktivtSpørsmål].forklaring}</p>
          <div style={styles.buttonContainer}>
            {aktivtSpørsmål > 0 && (
              <button onClick={forrigeSpørsmål} style={styles.button}>
                Forrige
              </button>
            )}
            <button onClick={nesteSpørsmål} style={styles.button}>
              {aktivtSpørsmål === spørsmål.length - 1 ? "Se resultat" : "Neste"}
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.result}>
          <h3>Resultatet for din {svar.produkt}-import:</h3>
          <p>Total kostnad: {resultat.totalKostnad} NOK</p>
          <p>Totalt salg: {resultat.totalSalg} NOK</p>
          <p style={{...styles.profit, color: parseFloat(resultat.fortjeneste) >= 0 ? 'green' : 'red'}}>
            Fortjeneste: {resultat.fortjeneste} NOK
          </p>
          <p>Fortjenestemargin: {resultat.fortjenesteMargin}%</p>
          <button onClick={() => { setAktivtSpørsmål(0); setResultat(null); }} style={styles.button}>
            Start på nytt
          </button>
        </div>
      )}
    </div>
  );
};

export default UngdomsImportPlanlegger;

