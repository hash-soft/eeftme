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

Utils.getMoveSettingsVisibleList = function () {
  return ['そのまま', '表示', '非表示'];
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

Utils.getMessageTypeList = function () {
  return ['次段落', '次行', '基準行'];
};

Utils.getMessageOptionTypeSelectList = function () {
  return [
    '待機',
    '自動待機速度',
    '自動待機する',
    '自動待機しない',
    '一時停止',
    'メッセージ音',
    '字下げ',
    '休止',
    '自動一時停止',
    'モード',
    'ベースライン巻き上げ',
    '基点行を追加',
    '基点行を削除',
    '行をリセット',
    '入力待ち時間',
  ];
};

Utils.getOrNotSelectList = function () {
  return ['しない', 'する'];
};

Utils.getMessageModeList = function () {
  return ['戦闘中', '戦闘結果'];
};

Utils.getDirectOrSlotList = function () {
  return ['直接', 'スロット'];
};

Utils.getDirectOrRefList = function () {
  return ['直接', '参照'];
};

Utils.getOpecodeSelectList = function () {
  return ['=', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '&=~'];
};

Utils.getAssignSelectList = function () {
  return [
    '定数',
    '文字列',
    'フラグ',
    '変数',
    'スロット',
    '乱数',
    'ゲームデータ',
    'スロット値の参照',
  ];
};

Utils.getAOrDList = function () {
  return ['追加', '削除'];
};

Utils.getBattlerTypeList = function () {
  return ['指定なし', 'メンバー', '敵', '仲間（未実装）'];
};

Utils.getActionExtraList = function () {
  return ['即時行動', '表示更新', '処理を抜ける', '強制行動'];
};

Utils.getFixDataTypeSelectList = function () {
  return ['メッセージ', 'どうぐ', 'システムスロットId', 'ぎのう'];
};

Utils.getItemInfoSelectList = function () {
  return ['名前'];
};

Utils.getSkillInfoSelectList = function () {
  return ['名前'];
};

Utils.getGameDataTypeSelectList = function () {
  return [
    'パーティメンバー',
    '登録メンバー',
    'キャラクター',
    'タイル',
    'どうぐ',
    '状態',
    'パーティ',
    'テキスト',
    '行動',
  ];
};

Utils.getGameDataPartyMemberList = function () {
  return ['並び位置', '表示位置'];
};

Utils.getMapInfoList = function () {
  return ['基本情報', '実行イベント', '値'];
};

Utils.getMapInfoStandardList = function () {
  return ['マップId', '横サイズ', '縦サイズ'];
};

Utils.getMapInfoEventList = function () {
  return ['オブジェクトId', '起因'];
};

Utils.getLocationDestList = function () {
  return ['直接指定', 'スロット指定', '指定キャラ', 'スロットの指定キャラ'];
};

Utils.getGameDataTextSelectList = function () {
  return ['パーティの呼び名', '敵のむれ呼び名', '全体の呼び名'];
};

Utils.getRecoverTypeSelectList = function () {
  return ['仲間全体', 'パーティ', '登録Id'];
};

Utils.getRegisterMemberInfoSelectList = function () {
  return [
    '並び位置',
    '表示位置',
    'メンバーid',
    '名前',
    'レベル',
    '必要経験値',
    '最大レベル',
  ];
};

Utils.getPartyInfoSelectList = function () {
  return [
    '所持金',
    'メンバー数',
    '生存人数',
    '表示人数',
    '生存＋NPC人数',
    '行先の数',
  ];
};

Utils.getPlayerInfoSelectList = function () {
  return [
    'オブジェクトId',
    'マップX',
    'マップY',
    '向き',
    '画像id',
    '画像インデックス',
  ];
};

Utils.getActionIdList = function () {
  return ['行動者', '対象者'];
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
  return ['通常', '集合位置で消える', '集合完了後消える'];
};

Utils.getCallScriptTimingList = function () {
  return ['即座', '予約'];
};

Utils.getReferenceTypeList = function () {
  return ['絶対', '相対'];
};

Utils.getChangeStateTypeList = function () {
  return ['付加', '除去'];
};

Utils.getChangeEnableList = function () {
  return ['無効', '有効'];
};

Utils.getPreRegisterIdSelectList = function () {
  return [
    { value: -1, text: '仲間全体' },
    { value: 0, text: 'パーティ' },
  ];
};

Utils.getShakeTypeList = function () {
  return ['既定', 'マップだけ', 'キャラクター強制'];
};

Utils.getScrollSpeedList = function () {
  return [
    { value: 0, text: '1/8倍' },
    { value: 1, text: '1/4倍' },
    { value: 2, text: '1/2倍' },
    { value: 3, text: '1倍' },
    { value: 4, text: '2倍' },
    { value: 5, text: '4倍' },
    { value: 6, text: '8倍' },
    { value: 99, text: '瞬時' },
  ];
};

Utils.getShakeSpeedList = function () {
  return [
    { value: 0, text: '1/8倍' },
    { value: 1, text: '1/4倍' },
    { value: 2, text: '1/2倍' },
    { value: 3, text: '1倍' },
    { value: 4, text: '2倍' },
    { value: 5, text: '4倍' },
    { value: 6, text: '8倍' },
  ];
};

Utils.getMapAnimationTargetTypeList = function () {
  return ['マップ', 'キャラクター', 'タイル'];
};

Utils.getMapAnimationWaitTypeList = function () {
  return ['しない', '指定の長さ', '終了まで'];
};

Utils.getEnemyGroupTypeList = function () {
  return ['トループ', 'エンカウンター', 'プレイヤー位置'];
};

Utils.getPreemptiveTypeList = function () {
  return ['通常どおり', '味方強襲', '味方不意打ち', '敵強襲', '敵不意打ち'];
};

Utils.getLocationKindList = function () {
  return ['地形Id', 'タイルId'];
};

Utils.getAnchorTypeList = function () {
  return ['左上', '中央', '左下'];
};

export default Utils;
