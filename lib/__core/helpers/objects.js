/**
 * Retorna o item dentro de obj correnpondente à query formada por ...strings
 * g({a:{g:{y:1}}}, 'a.g.y'); => 1
 * @param obj
 * @param strings
 */
global.g = function g(obj, ...strings) {
  if (typeof obj !== 'object') return;
  return strings.reduce((prev, next) => {
    if (prev && typeof next !== 'undefined' && next && typeof prev[next] !== 'undefined') {
      return prev[next];
    }
    return undefined;
  }, obj);
};
