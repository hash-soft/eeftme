function Utils() { }

Utils.alignId = function(id, digits) {
  return (('000000') + id).slice(-1 * digits);
}

Utils.getDispValue = function(data, id, idEnd = id) {
  // 無効idならなしを返す
  if(!id) {
    return 'なし';
  }
  if(id !== idEnd) {
    return this.addBracket(this.getRangeId(id, idEnd));
  }
  const name = this.getValue(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
}

Utils.getValue = function(data, id) {
  const item = data[id - 1];
  if(!item) {
    return '';
  }
  return item;
}

Utils.getDispName = function(data, id) {
  if(!id) {
    return 'なし';
  }
  const name = this.getName(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
}

Utils.getDispNameSound = function(data, id) {
  if(!id) {
    return '停止';
  }
  const name = this.getName(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
}

Utils.getName = function(data, id) {
  const item = data[id - 1];
  if(!item) {
    return '???';
  }
  return item.name;
}

Utils.getRangeId = function(id, idEnd) {
  return this.alignId(id, 3) + '～' + this.alignId(idEnd, 3);
}

Utils.addBracket = function(text) {
  return '[' + text + ']';
}

export default Utils;