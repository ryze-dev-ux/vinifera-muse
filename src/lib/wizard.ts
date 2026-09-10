/*
 * Cosmos — Empório Cosmopolita
 * Módulo do wizard de descoberta de vinhos.
 *
 * Conteúdo preservado do app.js original:
 * - etapas, opções, textos, valores e ordem
 * - fluxos por tipo de bebida
 * - lógica de filtragem e relaxamento
 * - normalização e formatação
 */

export interface WineOption {
  label: string;
  any?: boolean;
  min?: number;
  max?: number;
  flag?: string;
}

export interface WizardStep {
  key: string;
  label: string;
  icon: string;
  options: WineOption[];
}

export interface Wine {
  id: string;
  name: string;
  producer: string;
  qty: number;
  cost_display: string;
  cost_value: number;
  country: string;
  grapes: string;
  type: string;
  color: string;
  temperature: string;
  tannins: string;
  pairing: string;
  in_stock: boolean;
}

export interface WizardAnswers {
  price?: WineOption;
  tipo?: string;
  estilo?: string;
  uva?: string;
  pais?: string;
  harmonizacao?: string;
}

/* ── Etapas base (compartilhadas) ─────────────────────────────────── */
export const STEP_PRICE: WizardStep = {
  key: "price",
  label: "Faixa de Preço",
  icon: "💰",
  options: [
    { label: "Até R$ 80", min: 0, max: 80 },
    { label: "R$ 80 a R$ 130", min: 80, max: 130 },
    { label: "R$ 130 a R$ 200", min: 130, max: 200 },
    { label: "R$ 200 a R$ 250", min: 200, max: 250 },
    { label: "R$ 250 a R$ 300", min: 250, max: 300 },
    { label: "Acima de R$ 300", min: 300, max: Infinity },
  ],
};

export const STEP_TIPO: WizardStep = {
  key: "tipo",
  label: "Tipo de Bebida",
  icon: "🍷",
  options: [
    { label: "Vinho Tinto" },
    { label: "Vinho Branco" },
    { label: "Espumante" },
  ],
};

export const STEP_ESTILO_VINHO: WizardStep = {
  key: "estilo",
  label: "Estilo",
  icon: "✨",
  options: [
    { label: "Sem preferência", any: true },
    { label: "Seco" },
    { label: "Meio Seco" },
    { label: "Suave" },
  ],
};

export const STEP_ESTILO_ESPUMANTE: WizardStep = {
  key: "estilo",
  label: "Estilo",
  icon: "✨",
  options: [
    { label: "Sem preferência", any: true },
    { label: "Brut" },
    { label: "Demi-sec" },
    { label: "Moscatel" },
    { label: "Rosé" },
  ],
};

export const STEP_UVA_TINTO: WizardStep = {
  key: "uva",
  label: "Tipo de Uva",
  icon: "🍇",
  options: [
    { label: "Sem preferência", any: true },
    { label: "Blend de Uvas" },
    { label: "Cabernet Sauvignon" },
    { label: "Malbec" },
    { label: "Carmenere" },
    { label: "Merlot" },
    { label: "Shiraz / Syrah" },
    { label: "Tannat" },
    { label: "Sangiovese" },
    { label: "Cabernet Franc" },
    { label: "Petit Verdot" },
    { label: "Pinotage" },
    { label: "Pinot Noir" },
    { label: "Nebbiolo" },
    { label: "Bonarda" },
    { label: "Tempranillo" },
  ],
};

export const STEP_UVA_BRANCO: WizardStep = {
  key: "uva",
  label: "Tipo de Uva",
  icon: "🍇",
  options: [
    { label: "Sem preferência", any: true },
    { label: "Blend de Uvas" },
    { label: "Chardonnay" },
    { label: "Sauvignon Blanc" },
    { label: "Pinot Grigio" },
    { label: "Gewürztraminer" },
    { label: "Viognier" },
    { label: "Savagnin Blanc" },
    { label: "Riesling" },
    { label: "Moscatel" },
    { label: "Encruzado" },
  ],
};

export const STEP_PAIS: WizardStep = {
  key: "pais",
  label: "País de Origem",
  icon: "🌍",
  options: [
    { label: "Sem preferência", any: true },
    { label: "Argentina", flag: "ar" },
    { label: "Chile", flag: "cl" },
    { label: "Brasil", flag: "br" },
    { label: "França", flag: "fr" },
    { label: "Itália", flag: "it" },
    { label: "Portugal", flag: "pt" },
    { label: "Espanha", flag: "es" },
    { label: "Uruguai", flag: "uy" },
    { label: "África do Sul", flag: "za" },
    { label: "Austrália", flag: "au" },
    { label: "Estados Unidos", flag: "us" },
  ],
};

export const STEP_HARMONIZACAO: WizardStep = {
  key: "harmonizacao",
  label: "Harmonização",
  icon: "🍽️",
  options: [
    { label: "Carnes Vermelhas" },
    { label: "Carnes Brancas" },
    { label: "Massas e Risotos" },
    { label: "Queijos e Frios" },
    { label: "Peixes e Frutos do Mar" },
    { label: "Sem preferência", any: true },
  ],
};

/* ── Fluxos por tipo de bebida ─────────────────────────────────────── */
export const FLOW_TINTO = [
  STEP_PRICE,
  STEP_TIPO,
  STEP_ESTILO_VINHO,
  STEP_UVA_TINTO,
  STEP_PAIS,
  STEP_HARMONIZACAO,
];

export const FLOW_BRANCO = [
  STEP_PRICE,
  STEP_TIPO,
  STEP_ESTILO_VINHO,
  STEP_UVA_BRANCO,
  STEP_PAIS,
  STEP_HARMONIZACAO,
];

export const FLOW_ESPUMANTE = [
  STEP_PRICE,
  STEP_TIPO,
  STEP_ESTILO_ESPUMANTE,
  STEP_PAIS,
  STEP_HARMONIZACAO,
];

export function getFlow(tipo?: string): WizardStep[] {
  if (tipo === "Espumante") return FLOW_ESPUMANTE;
  if (tipo === "Vinho Branco") return FLOW_BRANCO;
  return FLOW_TINTO;
}

/* ── Utilitários ───────────────────────────────────────────────────── */
export function norm(s: unknown): string {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function fmtPrice(w: Wine): string {
  const num = w.cost_value || 0;
  if (num > 0) return "R$ " + num.toFixed(2).replace(".", ",");
  return "—";
}

export function flagImg(cc?: string, label?: string): string {
  if (!cc) return "";
  return `https://flagcdn.com/16x12/${cc}.png`;
}

export const COUNTRY_CC: Record<string, string> = {
  argentina: "ar",
  chile: "cl",
  brasil: "br",
  franca: "fr",
  italia: "it",
  portugal: "pt",
  espanha: "es",
  uruguai: "uy",
  "africa do sul": "za",
  australia: "au",
  "estados unidos": "us",
};

/* ── Filtros ───────────────────────────────────────────────────────── */
export function applyFilters(
  wines: Wine[],
  ans: WizardAnswers,
  relaxed = false
): Wine[] {
  return wines.filter((w) => {
    // Preço
    const pr = ans.price;
    if (pr) {
      const cv = w.cost_value || 0;
      if (cv < (pr.min ?? 0) || cv > (pr.max ?? Infinity)) return false;
    }

    // Tipo
    if (ans.tipo && w.type) {
      const wt = norm(w.type);
      const map: Record<string, string> = {
        "vinho tinto": "tinto",
        "vinho branco": "branco",
        espumante: "espumante",
      };
      const keyword =
        map[norm(ans.tipo)] || norm(ans.tipo).replace("vinho ", "");
      if (!wt.startsWith(keyword) && !wt.includes(keyword)) return false;
    }

    // Estilo
    if (ans.estilo && w.type) {
      const wt = norm(w.type);
      const es = norm(ans.estilo);
      const estiloStep =
        ans.tipo === "Espumante" ? STEP_ESTILO_ESPUMANTE : STEP_ESTILO_VINHO;
      const estiloAny = estiloStep.options.find((o) => o.label === ans.estilo)?.any;
      if (!estiloAny) {
        const esMap: Record<string, string[]> = {
          "demi-sec": ["demi", "meio seco"],
          rose: ["rose", "rosé"],
          moscatel: ["moscatel"],
        };
        const alts = esMap[es] || [es];
        if (!alts.some((a) => wt.includes(norm(a)))) return false;
      }
    }

    // Uva
    const uvaStep = ans.tipo === "Vinho Branco" ? STEP_UVA_BRANCO : STEP_UVA_TINTO;
    const uvaAny = uvaStep.options.find((o) => o.label === ans.uva)?.any;
    if (
      ans.uva &&
      !uvaAny &&
      norm(ans.uva) !== "blend de uvas" &&
      w.grapes
    ) {
      const wg = norm(w.grapes);
      const terms = norm(ans.uva)
        .replace("shiraz  syrah", "syrah shiraz")
        .split(/[\s/]+/)
        .filter((t) => t.length > 2);
      if (!terms.some((t) => wg.includes(t))) return false;
    }

    // País
    if (
      !relaxed &&
      ans.pais &&
      !STEP_PAIS.options.find((o) => o.label === ans.pais)?.any
    ) {
      if (norm(w.country || "") !== norm(ans.pais)) return false;
    }

    // Harmonização
    if (
      !relaxed &&
      ans.harmonizacao &&
      !STEP_HARMONIZACAO.options.find((o) => o.label === ans.harmonizacao)?.any &&
      w.pairing
    ) {
      const wp = norm(w.pairing);
      const hterms = norm(ans.harmonizacao)
        .split(" e ")
        .flatMap((t) => t.split(" "))
        .filter((t) => t.length > 3);
      if (!hterms.some((t) => wp.includes(t))) return false;
    }

    return true;
  });
}

/* ── Relaxamento progressivo ───────────────────────────────────────── */
export interface FilterResult {
  wines: Wine[];
  relaxNote: string;
}

export function finishWizard(wines: Wine[], answers: WizardAnswers): FilterResult {
  let result = applyFilters(wines, answers, false);
  let relaxNote = "";

  if (result.length < 3) {
    const a1 = { ...answers, harmonizacao: undefined };
    result = applyFilters(wines, a1, false);
    relaxNote = "Mostrando sugestões próximas ao seu perfil.";
  }
  if (result.length < 3) {
    const a2 = { ...answers, harmonizacao: undefined, pais: undefined };
    result = applyFilters(wines, a2, false);
    relaxNote = "Não encontramos exatamente, mas aqui estão os mais próximos.";
  }
  if (result.length < 3) {
    const a3 = {
      ...answers,
      harmonizacao: undefined,
      pais: undefined,
      uva: undefined,
    };
    result = applyFilters(wines, a3, false);
    relaxNote = "Sugestões baseadas no tipo e faixa de preço escolhidos.";
  }
  if (result.length < 3) {
    const a4 = {
      ...answers,
      harmonizacao: undefined,
      pais: undefined,
      uva: undefined,
      estilo: undefined,
    };
    result = applyFilters(wines, a4, false);
    relaxNote = "Sugestões baseadas no tipo e faixa de preço escolhidos.";
  }
  if (result.length < 3) {
    const a5 = {
      ...answers,
      harmonizacao: undefined,
      pais: undefined,
      uva: undefined,
      estilo: undefined,
    };
    result = applyFilters(wines, a5, false);
    relaxNote = "Sugestões baseadas no tipo e faixa de preço escolhidos.";
  }
  if (result.length < 3) {
    result = wines.filter((w) => {
      const cv = w.cost_value || 0;
      const pr = answers.price;
      if (pr && (cv < (pr.min ?? 0) || cv > (pr.max ?? Infinity))) return false;
      if (answers.tipo && w.type) {
        const map: Record<string, string> = {
          "vinho tinto": "tinto",
          "vinho branco": "branco",
          espumante: "espumante",
        };
        const keyword =
          map[answers.tipo.toLowerCase()] || answers.tipo.toLowerCase();
        if (!w.type.toLowerCase().includes(keyword)) return false;
      }
      return cv > 1;
    });
    relaxNote = "Sugestões disponíveis na faixa de preço escolhida.";
  }
  if (result.length < 3) {
    result = wines.filter((w) => {
      if (answers.tipo && w.type) {
        const map: Record<string, string> = {
          "vinho tinto": "tinto",
          "vinho branco": "branco",
          espumante: "espumante",
        };
        const keyword =
          map[answers.tipo.toLowerCase()] || answers.tipo.toLowerCase();
        if (!w.type.toLowerCase().includes(keyword)) return false;
      }
      return (w.cost_value || 0) > 1;
    });
    relaxNote = "Aqui estão nossas sugestões de " + (answers.tipo || "bebidas") + ".";
  }

  result = result.sort((a, b) => (a.cost_value || 0) - (b.cost_value || 0));
  return { wines: result, relaxNote };
}
