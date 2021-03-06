function Utils() {}

Utils.alignId = function (id, digits) {
  return this.leftFillNum(id, digits);
};

Utils.leftFillNum = function (num, length) {
  return num.toString().padStart(length, 0);
};

Utils.getDispValue = function (data, id, idEnd = id) {
  // 無効idならなしを返す
  if (!id) {
    return 'なし';
  }
  if (id !== idEnd) {
    return this.addBracket(this.getRangeId(id, idEnd));
  }
  const name = this.getValue(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
};

Utils.getValue = function (data, id) {
  const item = data[id - 1];
  if (!item) {
    return '';
  }
  return item;
};

Utils.getDispName = function (data, id) {
  if (!id) {
    return 'なし';
  }
  const name = this.getName(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
};

Utils.getDispNameSound = function (data, id) {
  if (!id) {
    return '停止';
  }
  const name = this.getName(data, id);
  return this.addBracket(this.alignId(id, 3) + ':' + name);
};

Utils.getName = function (data, id) {
  const item = data[id - 1];
  if (!item) {
    return '???';
  }
  return item.name;
};

Utils.getRangeId = function (id, idEnd) {
  return this.alignId(id, 3) + '～' + this.alignId(idEnd, 3);
};

Utils.addBracket = function (text) {
  return '[' + text + ']';
};

Utils.getMoveSettingsScreenOffList = function () {
  return ['フェードアウト', '消去しない'];
};

Utils.getMoveSettingsScreenOnList = function () {
  return ['フェードイン', '瞬時'];
};

Utils.getMoveSettingsFollowerList = function () {
  return ['そのまま', '集合', '一列'];
};

Utils.getDirectionSelectList = function () {
  return [
    { value: -1, text: 'そのまま' },
    { value: 0, text: '下' },
    { value: 1, text: '左' },
    { value: 2, text: '右' },
    { value: 3, text: '上' },
  ];
};

Utils.getDirectionInfoList = function () {
  return this.getDirectionSelectList().map((info) => info.text);
};

Utils.getDirectOrSlotList = function () {
  return ['直接', 'スロット'];
};

Utils.getOpecodeSelectList = function () {
  return ['=', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '&=~'];
};

Utils.getAOrDList = function () {
  return ['追加', '削除'];
};

Utils.getFixDataTypeSelectList = function () {
  return ['メッセージ', 'どうぐ'];
};

Utils.getItemInfoSelectList = function () {
  return ['名前'];
};

Utils.getGameDataTypeSelectList = function () {
  return [
    'パーティメンバー',
    '登録メンバー',
    'パーティ',
    'プレイヤー',
    'どうぐ',
    'オブジェクト',
  ];
};

Utils.getRegistMemberInfoSelectList = function () {
  return ['並び位置', '表示位置', 'メンバーid', '名前', 'レベル'];
};

Utils.getPartyInfoSelectList = function () {
  return ['所持金', '人数', '生存人数', '表示人数'];
};

Utils.getPlayerInfoSelectList = function () {
  return ['登録id', 'マップX', 'マップY', '向き', '画像id', '画像インデックス'];
};

Utils.getFollowerSettingsTypeList = function () {
  return ['追いかけ', '間隔'];
};

Utils.getFollowerSettingsChaseList = function () {
  return ['する', 'しない'];
};

Utils.getChangeTransparentTypeList = function () {
  return ['透明にする', '解除する'];
};

Utils.getGatherFollowersTypeList = function () {
  return ['通常', '集合位置で消える'];
};

Utils.getCallScriptTimingList = function () {
  return ['即座', '予約'];
};

Utils.getReferenceTypeList = function () {
  return ['絶対', '相対'];
};

export default Utils;
