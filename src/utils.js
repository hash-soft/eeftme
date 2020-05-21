function Utils() { }

Utils.alignId = function(id, digits) {
  return (('000000') + id).slice(-1 * digits);
}

export default Utils;