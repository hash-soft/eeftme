const TRIGGER = {
  TALK : 0,
  SEARCH : 1,
  SELFCONTACT: 2,
};

const COMMAND = {
  MESSAGE: 1,
  MENU: 2,
  ENDMENU: 3,
  FLAG: 11,
  VARIABLE: 12,
  ITEMSLOT: 14,
  ITEMSPACE: 31,
  CASE: 51,
  ELSE: 52,
  ENDBRANCH: 53,
  LABEL: 56,
  JUMP: 57,
  GAINITEM: 61,
  MOVE: 101,
  MAPSCRIPT: 111,
  COMMONSCRIPT: 112,
};

// キー変換
const CommandKeys = Object.keys(COMMAND).map((key) => COMMAND[key]);
// パラメータがないキー
// それほどないので手書きする
const NoParamKeys = [COMMAND.ITEMSPACE, COMMAND.ELSE, COMMAND.ENDBRANCH];

const VARIABLERANGE = {
  MIN : -9999999,
  MAX : 9999999
}

export {TRIGGER, COMMAND, VARIABLERANGE, CommandKeys, NoParamKeys};