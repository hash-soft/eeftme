const COMMAND = {
  MESSAGE: 1,
  MENU: 2,
  ENDMENU: 3,
  MESSAGESETTINGS: 4,
  MESSAGECLOSEWAIT: 5,
  EMBEDDED: 6,
  ENDEMBEDDED: 7,
  FLAG: 11,
  VARIABLE: 12,
  OPERATESLOT: 13,
  ASSIGNFIXDATA: 14,
  ASSIGNGAMEDATA: 15,
  ASSIGNSYSTEMSLOT: 16,
  GOODS: 21,
  ITEMSPACE: 31,
  JUDGETRIGGER: 32,
  COMPARESLOT: 33,
  ASSIGNRESULT: 34,
  CASE: 51,
  ELSE: 52,
  ENDBRANCH: 53,
  BEGINLOOP: 54,
  ENDLOOP: 55,
  LABEL: 56,
  JUMP: 57,
  EXIT: 58,
  EXITLOOP: 59,
  GAINITEM: 61,
  CHANGEGOLD: 70,
  ADDFRIEND: 71, // 不要そうなので作らない
  DELETEMATE: 72, // 不要そうなので作らない
  CHANGEPARTY: 73,
  CHANGENPC: 74,
  RECOVER: 81,
  CHANGESTATE: 83,
  CHANGETILE: 99,
  SWAPTILE: 100,
  MOVE: 101,
  MOVEFROMPOSITION: 102,
  WARP: 103,
  LOCATION: 104,
  MOVESETTINGS: 106,
  SCROLL: 107,
  MOVEROUTE: 108,
  MOVEROUTEWAIT: 109,
  FOLLOWERCONTROL: 110,
  MAPSCRIPT: 111,
  COMMONSCRIPT: 112,
  WAIT: 113,
  FOLLOWERSETTINGS: 114,
  ERASEEVEMT: 115,
  ADDRESSSETTINGS: 118,
  SAVE: 119,
  SE: 121,
  BGMPLAY: 123,
  BGMINTERRUPT: 124,
  EVENTTRIGGER: 131,
  SCREENFADEOUT: 141,
  SCREENFADEIN: 142,
  CHANGETRANSPARENT: 151,
  GATHERFOLLOWERS: 152,
  RESETOBJECTS: 161,
  COMMENT: 201,
};

// キー変換
const CommandKeys = Object.keys(COMMAND).map((key) => COMMAND[key]);
// パラメータがないキー
// それほどないので手書きする
const NoParamKeys = [
  COMMAND.MESSAGECLOSEWAIT,
  COMMAND.ENDEMBEDDED,
  COMMAND.ITEMSPACE,
  COMMAND.JUDGETRIGGER,
  COMMAND.ELSE,
  COMMAND.ENDBRANCH,
  COMMAND.BEGINLOOP,
  COMMAND.ENDLOOP,
  COMMAND.EXIT,
  COMMAND.EXITLOOP,
  COMMAND.ERASEEVEMT,
  COMMAND.RESETOBJECTS,
  COMMAND.SAVE,
];

const VARIABLERANGE = {
  MIN: -9999999,
  MAX: 9999999,
};

export { COMMAND, VARIABLERANGE, CommandKeys, NoParamKeys };
