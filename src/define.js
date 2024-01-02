const COMMAND = {
  MESSAGE: 1,
  MENU: 2,
  EndMenu: 3,
  MessageSettings: 4,
  MessageCloseWait: 5,
  Embedded: 6,
  EndEmbedded: 7,
  FLAG: 11,
  VARIABLE: 12,
  OperateSlot: 13,
  AssignFixData: 14,
  AssignGameData: 15,
  AssignSystemSlot: 16,
  AssignMapInfo: 17,
  Goods: 21,
  ItemSpace: 31,
  CompareSlot: 33,
  AssignResult: 34,
  JudgeBattler: 35,
  CASE: 51,
  ELSE: 52,
  EndBranch: 53,
  BeginLoop: 54,
  EndLoop: 55,
  Label: 56,
  Jump: 57,
  EXIT: 58,
  ExitLoop: 59,
  ChangeItem: 61,
  ChangeSkill: 62,
  ChangeGold: 70,
  RegisterMate: 71,
  DeleteMate: 72, // 不要そうなので作らない
  ChangeParty: 73,
  ChangeNpc: 74,
  RefreshMarch: 75,
  ChangeFollower: 76,
  Recover: 81,
  ChangeState: 83,
  ChangeTile: 99,
  SwapTile: 100,
  Move: 101,
  MoveFromPosition: 102,
  Warp: 103,
  Location: 104,
  MoveVehicle: 105,
  MoveSettings: 106,
  Scroll: 107,
  MoveRoute: 108,
  MoveRouteWait: 109,
  FollowerControl: 110,
  MapScript: 111,
  CommonScript: 112,
  WAIT: 113,
  FollowerSettings: 114,
  EraseEvent: 115,
  AddressSettings: 116,
  SAVE: 119,
  Se: 121,
  BgmPlay: 123,
  BgmInterrupt: 124,
  ChangePlayerBgm: 125,
  EventTrigger: 131,
  BattleStart: 132,
  ScreenFadeOut: 141,
  ScreenFadeIn: 142,
  ScreenShake: 145,
  MapAnimation: 146,
  ChangeTransparent: 151,
  GatherFollowers: 152,
  GetOutVehicle: 153,
  CharacterOptions: 160,
  ResetObjects: 161,
  AssignLocationInformation: 162,
  CancelConsume: 169,
  DelayedConsume: 170,
  ShowPicture: 171,
  MovePicture: 172,
  ErasePicture: 175,
  PushActionResult: 181,
  ActionMessage: 182,
  ActionMessageSettings: 183,
  ActionEffect: 184,
  ActionTarget: 185,
  ActionExtra: 186,
  ActionForce: 187,
  Comment: 201,
  ChangeFloorDamage: 211,
  ChangeSlipDamage: 212,
  ChangeEncounter: 213,
  RoomMoveSettings: 214,
};

// キー変換
const CommandKeys = Object.keys(COMMAND).map((key) => COMMAND[key]);
// パラメータがないキー
// それほどないので手書きする
const NoParamKeys = [
  COMMAND.EndEmbedded,
  COMMAND.ItemSpace,
  COMMAND.ELSE,
  COMMAND.EndBranch,
  COMMAND.BeginLoop,
  COMMAND.EndLoop,
  COMMAND.EXIT,
  COMMAND.ExitLoop,
  COMMAND.RefreshMarch,
  COMMAND.EraseEvent,
  COMMAND.GetOutVehicle,
  COMMAND.ResetObjects,
  COMMAND.SAVE,
  COMMAND.CancelConsume,
  COMMAND.DelayedConsume,
  COMMAND.PushActionResult,
];

const VariableRange = {
  MIN: -9999999,
  MAX: 9999999,
};

export { COMMAND, VariableRange, CommandKeys, NoParamKeys };
