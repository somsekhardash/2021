export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const getAbbr = (text: string) =>
  text.split(" ").reduce((acc, curr) => `${acc}${curr.slice(0, 1)}`, "");
