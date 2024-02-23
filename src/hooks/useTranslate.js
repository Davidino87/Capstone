import { useState, useEffect } from "react";

export const useTranslate = (text, sourceLang = "en", targetLang = "it") => {
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function translate() {
      setTranslatedText("");
      setLoading(true);
      setError(null);

      const params = { sl: sourceLang, tl: targetLang, q: text };
      const queryString = new URLSearchParams(params).toString();
      const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&${queryString}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data[0]) {
          setTranslatedText(data[0]);
        } else {
          console.error("Traduzione non riuscita");
          setTranslatedText(text);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (text) {
      translate();
    }
  }, [text, sourceLang, targetLang]);

  return { translatedText, loading, error };
};
