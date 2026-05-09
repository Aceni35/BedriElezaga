// Translates between the three site languages: Albanian (sq), English (en),
// and Montenegrin (me — served via Serbian "sr" since MyMemory does not
// support "me" directly). On any failure (network, parse, rate limit) we
// fall back to the source text so a translation never blocks a save.

export type Lang = "sq" | "en" | "me";
export const LANGS: Lang[] = ["sq", "en", "me"];

const ENDPOINT = "https://api.mymemory.translated.net/get";
const TIMEOUT_MS = 8000;

const API_CODE: Record<Lang, string> = {
  sq: "sq",
  en: "en",
  me: "sr",
};

export interface Translated {
  sq: string;
  en: string;
  me: string;
}

async function translateOne(
  text: string,
  source: Lang,
  target: Lang
): Promise<string> {
  if (!text || source === target) return text;
  const params = new URLSearchParams({
    q: text,
    langpair: `${API_CODE[source]}|${API_CODE[target]}`,
  });
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) params.set("de", email);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
      signal: ctrl.signal,
    });
    if (!res.ok) return text;
    const json = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const out = json.responseData?.translatedText?.trim();
    return out || text;
  } catch {
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export async function translateText(
  text: string,
  source: Lang
): Promise<Translated> {
  const value = (text ?? "").trim();
  if (!value) return { sq: "", en: "", me: "" };

  const result: Translated = { sq: "", en: "", me: "" };
  result[source] = value;

  const targets = LANGS.filter((l) => l !== source);
  const translated = await Promise.all(
    targets.map((t) => translateOne(value, source, t))
  );
  targets.forEach((t, i) => {
    result[t] = translated[i];
  });
  return result;
}

export async function translateMany(
  texts: string[],
  source: Lang
): Promise<Translated[]> {
  return Promise.all(texts.map((t) => translateText(t, source)));
}
