// Utilitário compartilhado pelos serviços para remover espaços externos e,
// quando solicitado, padronizar texto em minúsculas antes de persistir.
export const textFormatter = {
  normalize(text, lowercase) {
    if (lowercase) return text.trim().toLowerCase();

    return text.trim();
  },
};

export default textFormatter;
