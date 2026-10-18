export const textFormatter = {
  normalize(text, lowercase) {
    // Apaga os espaços em branco
    text.trim();

    // Deixa tudo em minusculo
    if (lowercase) text.toLowerCase();
  },
};

export default textFormatter;
