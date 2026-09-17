import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Wine,
  type WizardAnswers,
  type WineOption,
  type WizardStep,
  finishWizard,
  fmtPrice,
  getFlow,
} from "../lib/wizard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Cosmos · Empório Cosmopolita",
      },
      {
        name: "description",
        content:
          "Cosmos — sommelier digital do Empório Cosmopolita. Recomendações personalizadas de vinhos finos, espumantes e cervejas especiais.",
      },
      {
        property: "og:title",
        content: "Cosmos · Empório Cosmopolita",
      },
      {
        property: "og:description",
        content:
          "Descubra rótulos selecionados pelo sommelier digital do Empório Cosmopolita.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ── Estado do wizard ─────────────────────────────────────────────── */
type Screen = "opener" | "wizard" | "loading" | "results";

function Index() {
  const [screen, setScreen] = useState<Screen>("opener");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [catalog, setCatalog] = useState<Wine[]>([]);
  const [results, setResults] = useState<Wine[]>([]);
  const [relaxNote, setRelaxNote] = useState("");
  const [catalogReady, setCatalogReady] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  /* Carrega catálogo das fontes originais */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/gdrive?action=catalog");
        if (res.ok) {
          const data = await res.json();
          if (data.wines?.length) {
            if (!cancelled) {
              setCatalog(data.wines);
              setCatalogReady(true);
            }
            return;
          }
        }
      } catch {
        /* fallback silencioso */
      }
      try {
        const res = await fetch("/api/wines-db");
        if (res.ok) {
          const data = await res.json();
          if (data.wines?.length) {
            if (!cancelled) {
              setCatalog(data.wines);
              setCatalogReady(true);
            }
            return;
          }
        }
      } catch {
        /* último fallback */
      }
      if (!cancelled) setCatalogReady(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const flow = useMemo(() => getFlow(answers.tipo), [answers.tipo]);
  const currentStep: WizardStep | undefined = flow[step];
  const totalSteps = flow.length;

  function start() {
    setScreen("wizard");
    setStep(0);
    setAnswers({});
    setResults([]);
    setRelaxNote("");
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function selectOption(option: WineOption) {
    if (!currentStep) return;
    const key = currentStep.key as keyof WizardAnswers;
    const nextAnswers: WizardAnswers =
      key === "price"
        ? { ...answers, price: option }
        : { ...answers, [key]: option.label };

    setAnswers(nextAnswers);

    if (step + 1 >= flow.length) {
      finish(nextAnswers);
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      setScreen("opener");
    }
  }

  function finish(finalAnswers: WizardAnswers) {
    setScreen("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Pequena pausa para a experiência de revelação
    setTimeout(() => {
      const { wines, relaxNote: note } = finishWizard(catalog, finalAnswers);
      setResults(wines);
      setRelaxNote(note);
      setScreen("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  }

  function restart() {
    setScreen("opener");
    setStep(0);
    setAnswers({});
    setResults([]);
    setRelaxNote("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <HeadContent />

      <Header />

      <main ref={mainRef} className="mx-auto max-w-[960px] px-6">
        {screen === "opener" && <Opener onStart={start} catalogReady={catalogReady} />}
        {screen === "wizard" && currentStep && (
          <Wizard
            stepIndex={step}
            totalSteps={totalSteps}
            step={currentStep}
            answers={answers}
            onSelect={selectOption}
            onBack={goBack}
          />
        )}
        {screen === "loading" && <LoadingStep answers={answers} />}
        {screen === "results" && (
          <Results
            wines={results}
            relaxNote={relaxNote}
            answers={answers}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}

/* ── Cabeçalho ─────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-6">
        <span className="font-serif text-2xl tracking-tight">Cosmos</span>
      </div>
    </header>
  );
}

/* ── Rodapé ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-8">
        <span className="font-serif text-lg">Cosmos</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Empório Cosmopolita
        </span>
      </div>
    </footer>
  );
}

/* ── Tela inicial ──────────────────────────────────────────────────── */
function Opener({
  onStart,
  catalogReady,
}: {
  onStart: () => void;
  catalogReady: boolean;
}) {
  return (
    <section className="pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
      <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-accent">
        Jornada guiada
      </p>
      <h1 className="mx-auto max-w-[720px] font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
        Encontre seu próximo{" "}
        <em className="not-italic text-accent">rótulo</em>
      </h1>
      <p className="mx-auto mt-6 max-w-[460px] text-[15px] leading-relaxed text-muted-foreground">
        Responda a poucas perguntas. Nosso sommelier digital cruza suas
        preferências com o acervo do Empório Cosmopolita.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 ease-premium hover:bg-foreground"
        >
          Começar degustação
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">
            →
          </span>
        </button>
        {!catalogReady && (
          <span className="text-xs text-muted-foreground">
            Carregando acervo…
          </span>
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-[720px] grid-cols-3 gap-px border border-foreground/10 bg-foreground/10">
        {[
          ["Perguntas", "5–6 etapas"],
          ["Filtros", "Preço, tipo, uva, país, harmonização"],
          ["Resultado", "Rótulos reais do acervo"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-background p-4 text-center sm:p-6"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Wizard ─────────────────────────────────────────────────────────── */
function Wizard({
  stepIndex,
  totalSteps,
  step,
  answers,
  onSelect,
  onBack,
}: {
  stepIndex: number;
  totalSteps: number;
  step: WizardStep;
  answers: WizardAnswers;
  onSelect: (option: WineOption) => void;
  onBack: () => void;
}) {
  const selectedValue = getSelectedValue(step.key, answers);
  const stepNumber = String(stepIndex + 1).padStart(2, "0");
  const totalNumber = String(totalSteps).padStart(2, "0");
  const flowLabel = getFlowLabel(answers.tipo);

  return (
    <section className="pb-24 pt-10 sm:pt-14">
      {/* Progresso */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done = i <= stepIndex;
          return (
            <span
              key={i}
              className={`transition-all duration-500 ease-premium ${
                done
                  ? "h-[3px] w-8 rounded-full bg-accent"
                  : "h-2 w-2 rounded-full bg-foreground/15"
              }`}
            />
          );
        })}
        <span className="ml-3 text-xs tabular-nums tracking-wide text-muted-foreground">
          Etapa {stepNumber} / {totalNumber}
        </span>
      </div>

      {/* Pergunta */}
      <div className="mb-2 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-accent">
          {flowLabel} · Etapa {stepNumber}
        </p>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          {step.label}
        </h2>
      </div>

      {/* Opções */}
      <div className="mx-auto mt-10 max-w-[760px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {step.options.map((option, idx) => {
            const optionNumber = String(idx + 1).padStart(2, "0");
            const isSelected = selectedValue === option.label;
            return (
              <button
                key={option.label}
                onClick={() => onSelect(option)}
                className={`group relative text-left border p-5 transition-all duration-300 ease-premium ${
                  isSelected
                    ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                    : "border-foreground/10 bg-card hover:border-accent hover:bg-accent/[0.03]"
                }`}
              >
                <span
                  className={`block font-serif text-sm transition-colors duration-300 ${
                    isSelected ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                  }`}
                >
                  {optionNumber}
                </span>
                <span className="mt-2 block text-[15px] font-medium leading-snug">
                  {option.flag && (
                    <img
                      src={`https://flagcdn.com/24x18/${option.flag}.png`}
                      srcSet={`https://flagcdn.com/48x36/${option.flag}.png 2x`}
                      width={24}
                      height={18}
                      alt={option.label}
                      className="mr-2 inline-block align-middle"
                      loading="lazy"
                    />
                  )}
                  {option.label}
                </span>
                <span
                  className={`absolute right-5 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ease-premium ${
                    isSelected
                      ? "translate-x-0 text-accent"
                      : "text-foreground/20 group-hover:translate-x-1 group-hover:text-accent"
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span className="transition-transform duration-300 ease-premium group-hover:-translate-x-1">
              ←
            </span>
            Voltar
          </button>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {flowLabel}
          </span>
        </div>
      </div>
    </section>
  );
}

function getSelectedValue(key: string, answers: WizardAnswers): string | undefined {
  if (key === "price") return answers.price?.label;
  return (answers as Record<string, string | undefined>)[key];
}

function getFlowLabel(tipo?: string): string {
  if (tipo === "Espumante") return "Espumantes";
  if (tipo === "Vinho Branco") return "Vinhos brancos";
  return "Vinhos tintos";
}

/* ── Loading ──────────────────────────────────────────────────────── */
function LoadingStep({ answers }: { answers: WizardAnswers }) {
  const lines = useMemo(
    () => [
      answers.tipo || "Vinho Tinto",
      answers.price?.label || "Qualquer faixa",
      answers.uva || answers.estilo || "Perfil em construção",
      answers.pais || "Qualquer origem",
      answers.harmonizacao || "Qualquer harmonização",
    ],
    [answers]
  );

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-10 h-1 w-40 overflow-hidden bg-foreground/10">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-loading-bar bg-accent" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.35em] text-accent">
        Cosmos está escolhendo
      </p>
      <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">
        Montando sua seleção
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Cruzando suas respostas com os rótulos disponíveis no acervo.
      </p>

      <div className="mt-10 space-y-3 text-left">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex items-center gap-4 opacity-0"
            style={{
              animation: `fadeInUp 500ms cubic-bezier(0.22, 1, 0.36, 1) ${
                i * 120
              }ms forwards`,
            }}
          >
            <span className="font-serif text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-12 bg-foreground/10" />
            <span className="text-sm text-foreground/80">{line}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
      `}</style>
    </section>
  );
}

/* ── Resultados ─────────────────────────────────────────────────────── */
function Results({
  wines,
  relaxNote,
  answers,
  onRestart,
}: {
  wines: Wine[];
  relaxNote: string;
  answers: WizardAnswers;
  onRestart: () => void;
}) {
  const summary = useMemo(() => {
    const tags: string[] = [];
    if (answers.price) tags.push(answers.price.label);
    if (answers.tipo) tags.push(answers.tipo);
    if (answers.estilo && answers.estilo !== "Sem preferência")
      tags.push(answers.estilo);
    if (answers.uva && answers.uva !== "Sem preferência") tags.push(answers.uva);
    if (answers.pais && answers.pais !== "Sem preferência") tags.push(answers.pais);
    if (answers.harmonizacao && answers.harmonizacao !== "Sem preferência")
      tags.push(answers.harmonizacao);
    return tags;
  }, [answers]);

  if (wines.length === 0) {
    return (
      <section className="py-24 text-center">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          Nenhum rótulo encontrado
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {answers.tipo === "Espumante"
            ? "Nenhum espumante encontrado na faixa selecionada."
            : "Nenhum vinho encontrado na faixa selecionada."}
          Verifique se o catálogo está carregado.
        </p>
        <button
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-2 border border-foreground/15 px-6 py-3 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          Nova pesquisa
        </button>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-4 border-b border-foreground/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-accent">
            Curadoria
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            Seleção para o seu perfil
          </h2>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {wines.length} {wines.length === 1 ? "rótulo" : "rótulos"}
        </span>
      </div>

      {relaxNote && (
        <div className="mb-8 border-l-2 border-accent bg-accent/5 p-4 text-sm text-foreground/80">
          {relaxNote}
        </div>
      )}

      {summary.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {summary.map((tag) => (
            <span
              key={tag}
              className="border border-foreground/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {wines.map((wine, index) => (
          <WineCard key={wine.id} wine={wine} index={index} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <button
          onClick={onRestart}
          className="group inline-flex items-center gap-3 border border-foreground/15 px-8 py-4 text-sm font-medium transition-all duration-300 ease-premium hover:border-accent hover:text-accent"
        >
          <span className="transition-transform duration-300 ease-premium group-hover:-translate-x-1">
            ←
          </span>
          Nova pesquisa
        </button>
      </div>
    </section>
  );
}

function WineCard({ wine, index }: { wine: Wine; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group border border-foreground/10 bg-card p-5 transition-all duration-300 ease-premium hover:border-accent/40">
      <div className="mb-4 flex items-start justify-between">
        <span className="font-serif text-sm text-accent">{number}</span>
        <span className="font-serif text-lg text-primary">{fmtPrice(wine)}</span>
      </div>

      <div className="mb-5 aspect-[3/4] bg-muted/50 outline outline-1 -outline-offset-1 outline-foreground/5 grid place-items-center">
        <WineImagePlaceholder name={wine.name} />
      </div>

      <h3 className="font-serif text-xl leading-tight tracking-tight">
        {wine.name}
      </h3>
      {wine.producer && (
        <p className="mt-1 text-sm text-muted-foreground">
          {wine.producer}
          {wine.country && ` · ${wine.country}`}
        </p>
      )}

      <dl className="mt-5 space-y-2 text-sm">
        {wine.type && (
          <div className="flex justify-between border-b border-foreground/5 py-2">
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Tipo
            </dt>
            <dd>{wine.type}</dd>
          </div>
        )}
        {wine.grapes && (
          <div className="flex justify-between border-b border-foreground/5 py-2">
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Uva
            </dt>
            <dd>{wine.grapes}</dd>
          </div>
        )}
        {wine.temperature && (
          <div className="flex justify-between border-b border-foreground/5 py-2">
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Temperatura
            </dt>
            <dd>{wine.temperature}</dd>
          </div>
        )}
        {wine.pairing && (
          <div className="flex justify-between border-b border-foreground/5 py-2">
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Harmoniza
            </dt>
            <dd className="text-right">{wine.pairing}</dd>
          </div>
        )}
        {wine.tannins && (
          <div className="flex justify-between border-b border-foreground/5 py-2">
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Taninos
            </dt>
            <dd>{wine.tannins}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

function WineImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-muted-foreground/40"
      >
        <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4z" />
      </svg>
      <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
        Imagem
      </span>
    </div>
  );
}
