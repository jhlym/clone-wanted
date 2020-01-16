export const decodeUnicode = str =>
  decodeURIComponent(JSON.parse('"' + str.replace(/\"/g, '\\"') + '"'));
