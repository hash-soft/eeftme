function Utils() { }

Utils.alignFlagId = function(id) {
  return ('000' + id).slice(-3)
}

Utils.alignVariableId = function(id) {
  return ('000' + id).slice(-3)
}

export default Utils;