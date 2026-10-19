export const textFormatter = {
  normalize(text, lowercase) {
    if (lowercase) return text.trim().toLowerCase();

    return text.trim();
  },
};

export default textFormatter;
