export const textFormatter = {
  capitalize(text = "") {
    if (typeof text !== "string") return;

    const excludeWords = [
      // Artigos
      "o",
      "a",
      "os",
      "as",
      "um",
      "uma",
      "uns",
      "umas",

      // Preposições
      "a",
      "ante",
      "após",
      "até",
      "com",
      "contra",
      "de",
      "desde",
      "em",
      "entre",
      "para",
      "per",
      "perante",
      "por",
      "sem",
      "sob",
      "sobre",
      "trás",

      // Contrações
      "ao",
      "aos",
      "à",
      "às",
      "da",
      "das",
      "do",
      "dos",
      "dum",
      "duma",
      "duns",
      "dumas",
      "na",
      "nas",
      "no",
      "nos",
      "num",
      "numa",
      "nuns",
      "numas",
      "pela",
      "pelas",
      "pelo",
      "pelos",
      "pra",
      "pras",
      "pro",
      "pros",

      // Conjunções comuns
      "e",
      "ou",
      "nem",
      "mas",
      "porém",
      "contudo",
      "todavia",
      "entretanto",
      "porque",
      "que",
      "se",
    ];

    return text
      .split(" ")
      .map((word) => {
        if (excludeWords.includes(word)) {
          return word;
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join(" ");
  },
};
