import React from 'react';
import './index.css';
import { COMMAND, CommandKeys, NoParamKeys } from './define';
import { Dataset, MapEventsRef, CommonEventsRef } from './contents';
import Utils from './utils';

const CommandItem = (props) => {
  const dataset = React.useContext(Dataset);
  const musics = dataset.musics;
  const sounds = dataset.sounds;
  const flags = dataset.flags;
  const variables = dataset.variables;
  const slots = dataset.slots;
  const messages = dataset.messages;
  const items = dataset.items;
  const states = dataset.states;
  const windowsets = dataset.windowsets;
  const mapList = dataset.mapList;
  const positions = dataset.positions;
  const warpPlaces = dataset.warpPlaces;
  const animations = dataset.animations;
  const members = dataset.members;
  const enemies = dataset.enemies;
  const mapEventsRef = React.useContext(MapEventsRef);
  const commonEventsRef = React.useContext(CommonEventsRef);

  const dispFlagName = (id, idEnd = id) => {
    return Utils.getDispValue(flags, id, idEnd);
  };

  const dispVariableName = (id, idEnd = id) => {
    return Utils.getDispValue(variables, id, idEnd);
  };

  const dispSlotName = (id, idEnd = id) => {
    return Utils.getDispValue(slots, id, idEnd);
  };

  const dispMessage = (id) => {
    return Utils.getDispValue(messages, id);
  };

  const dispItemName = (id) => {
    return Utils.getDispName(items, id);
  };

  const dispSkillName = (id) => {
    return Utils.getDispName(dataset.skills, id);
  };

  const dispStateName = (id) => {
    return Utils.getDispName(states, id);
  };

  const dispMapEventName = (id) => {
    return Utils.getDispName(mapEventsRef.current, id);
  };

  const dispCommonEventName = (id) => {
    return Utils.getDispName(commonEventsRef.current, id);
  };

  const dispSeName = (id) => {
    return Utils.getDispNameSound(sounds, id);
  };

  const dispBgmName = (id) => {
    return Utils.getDispNameSound(musics, id);
  };

  const dispMapName = (id) => {
    return Utils.getDispName(mapList, id);
  };

  const dispPositionName = (id) => {
    return Utils.getDispName(positions, id);
  };

  const dispWarpName = (id) => {
    return Utils.getDispName(warpPlaces, id);
  };

  const dispVehicleName = (id) => {
    return Utils.getDispName(dataset.vehicles, id);
  };

  const dispActionConditionName = (id) => {
    return Utils.getDispName(dataset.actionConditions, id);
  };

  const dispEffectName = (id) => {
    return Utils.getDispName(animations, id);
  };

  const dispMemberName = (id) => {
    return Utils.getDispName(members, id);
  };

  const dispEnemyName = (id) => {
    return Utils.getDispName(enemies, id);
  };

  const dispTroopName = (id) => {
    return Utils.getDispName(dataset.troops, id);
  };

  const dispEncounterName = (id) => {
    return Utils.getDispName(dataset.encounters, id);
  };

  const dispPictureName = (id) => {
    return Utils.getDispName(dataset.pictures, id);
  };

  const dispTerrainName = (id) => {
    return Utils.getDispName(dataset.terrains, id);
  };

  // 文章表示
  const listMessageContents = (text, type) => {
    const header = `[${Utils.getMessageTypeList()[type]}]`;
    const message = (
      <td style={{ whiteSpace: 'pre-line' }}>
        {header}
        <br />
        {text}
      </td>
    );

    return message;
  };

  // メニュー表示
  const listMenuContents = (
    menuId,
    initIndex,
    parentId,
    slotId,
    countSlotId,
    cancelIndex,
    closeType
  ) => {
    const menuName = Utils.getDispName(windowsets, menuId);
    const parentName =
      parentId > 0 ? ', 親:' + Utils.getDispName(windowsets, parentId) : '';
    const slotName = slotId > 0 ? ', 追加:' + dispSlotName(slotId) : '';
    const countSlotName =
      countSlotId > 0 ? ', 追加数:' + dispSlotName(countSlotId) : '';
    const cancelName = cancelIndex >= 0 ? ', キャンセル:' + cancelIndex : '';
    return (
      <td>
        {menuName}, 初期位置:{initIndex}
        {parentName}
        {slotName}
        {countSlotName}
        {cancelName}, 決定時:{closeType}
      </td>
    );
  };

  // メニュー終了
  const listEndMenuContents = (menuId) => {
    const menuName = menuId ? Utils.getDispName(windowsets, menuId) : '全て';
    return <td>{menuName}</td>;
  };

  // 文章の設定
  const listMessageSettingsContents = (type, value) => {
    const [settingText, valueText] = (() => {
      switch (type) {
        case 0:
        case 1:
        case 6:
        case 7:
        case 8:
        case 10:
        case 14:
        case 15:
          return [`[${Utils.getMessageOptionTypeSelectList()[type]}]`, value];
        case 5:
          return [
            `[${Utils.getMessageOptionTypeSelectList()[type]}]`,
            dispSeName(value),
          ];
        case 9:
          return [
            `[${Utils.getMessageOptionTypeSelectList()[type]}]`,
            `${Utils.getMessageModeList()[value]}`,
          ];
        case 16:
          return [
            `[${Utils.getMessageOptionTypeSelectList()[type]}]`,
            dispSlotName(value),
          ];
        default:
          return [Utils.getMessageOptionTypeSelectList()[type], ''];
      }
    })();
    return (
      <td>
        {settingText}
        {valueText}
      </td>
    );
  };

  // 文章終了待ち
  const listMessageCloseWaitContents = (keep) => {
    const close = keep ? 'ウィンドウ閉じない' : 'ウィンドウ閉じる';
    return <td>{close}</td>;
  };

  // 組み込みメニュー
  const listEmbeddedContents = (menuId, startPos, delayTime) => {
    const menuName = `[${menuId}]`;
    return (
      <td>
        {menuName}, 開始位置({startPos}), 遅延時間({delayTime})
      </td>
    );
  };

  // フラグ
  const listFlagContents = (flagId, flagEndId, control, type = 0) => {
    const flagName =
      type === 0
        ? dispFlagName(flagId, flagEndId)
        : `参照：${dispSlotName(flagId)}`;
    return (
      <td>
        {flagName} = {Utils.getFlagOpecodeSelectList()[control]}
      </td>
    );
  };

  // 変数
  // operand は多分いらないので死にデータ
  const listVariableContents = (
    variableId,
    variableEndId,
    opecode,
    operand,
    value
  ) => {
    const variableName = dispVariableName(variableId, variableEndId);

    return (
      <td>
        {variableName} {_getOpecodeText(opecode)} {value}
      </td>
    );
  };

  // スロット演算
  // type:代入タイプ
  //  0:直値 1:文字列 2:json 3:変数 4:スロット 5:乱数 6:ゲームデータ
  // param:代入タイプによって変わるパラメータ
  const listOperateSlotContents = (
    beginId,
    endId,
    code,
    type,
    param1,
    param2,
    refType = 0
  ) => {
    const refText = Utils.getDirectOrRefList()[refType];
    const slotText = dispSlotName(beginId, endId);
    const codeText = _getOpecodeText(code);
    const paramText = _getOperateSlotParamText(type, param1, param2);
    const checkText = code === 0 ? '' : [1].includes(type) ? '★不正！' : '';
    return (
      <td>
        {refText}：{slotText}
        {codeText}
        {paramText}
        {checkText}
      </td>
    );
  };

  const _getOperateSlotParamText = (type, param1, param2) => {
    const assignList = Utils.getAssignSelectList();
    switch (type) {
      case 0:
        return param1;
      case 1:
        return param1;
      case 2:
        return `${assignList[type]}:` + dispFlagName(param1);
      case 3:
        return `${assignList[type]}:` + dispVariableName(param1);
      case 4:
        return `${assignList[type]}:` + dispSlotName(param1);
      case 5:
        return param1 + '～' + param2;
      case 6:
        return _getOperateSlotGameDataText(param1);
      case 7:
        return `${assignList[type]}:` + dispSlotName(param1);
      default:
        return '';
    }
  };

  const _getOperateSlotGameDataText = (param) => {
    switch (param) {
      case 0:
        return '所持金';
      case 1:
        return 'パーティ生存人数';
      case 2:
        return 'パーティ人数';
      default:
        return '';
    }
  };

  const _getOpecodeText = (code) => {
    return Utils.getOpecodeSelectList()[code];
  };

  /**
   * 固定データ取得
   * @param {*} slotId
   * @param {*} type
   * @param {*} param1
   * @param {*} param2
   */
  const listAssignFixDataContents = (slotId, type, param1, param2, ref = 0) => {
    const slotText = dispSlotName(slotId);
    const typeText = Utils.getFixDataTypeSelectList()[type];
    const paramText =
      ref === 0
        ? _getAssignFixDataParamText(type, param1, param2)
        : `参照->${dispSlotName(param1)}`;

    return (
      <td>
        {slotText} = {typeText}:{paramText}
      </td>
    );
  };

  const _getAssignFixDataParamText = (type, param1, param2) => {
    switch (type) {
      case 0:
        return `${dispMessage(param1)}`;
      case 1:
        return `${dispItemName(param1)}の[${
          Utils.getItemInfoSelectList()[param2]
        }]`;
      case 2:
        return param1;
      case 3:
        return `${dispSkillName(param1)}の[${
          Utils.getSkillInfoSelectList()[param2]
        }]`;
      case 4:
        return `${dispEnemyName(param1)}の[${
          Utils.getEnemyInfoSelectList()[param2]
        }]`;
      default:
        return '';
    }
  };

  /**
   * ゲームデータ取得
   * @param {*} slotId 格納するスロットId
   * @param {*} type 種類
   * @param {*} param1
   * @param {*} param2
   */
  const listAssignGameDataContents = (slotId, type, param1, param2) => {
    const slotText = dispSlotName(slotId);
    const typeText = Utils.getGameDataTypeSelectList()[type];
    const paramText = _getAssignGameDataParamText(type, param1, param2);
    return (
      <td>
        {slotText} = {typeText}:{paramText}
      </td>
    );
  };

  const _getAssignGameDataParamText = (type, param1, param2) => {
    switch (type) {
      case 0:
        return `${dispSlotName(param1)} 番目の${
          Utils.getGameDataPartyMemberList()[param2]
        }の登録id`;
      case 1:
        return `${dispSlotName(param1)} ${
          Utils.getRegisterMemberInfoSelectList()[param2]
        }`;
      case 2:
        return `${dispSlotName(param1)} ${
          Utils.getPlayerInfoSelectList()[param2]
        }`;
      case 3:
        return `${dispSlotName(param1)} ${
          Utils.getPlayerInfoSelectList()[param2]
        }`;
      case 4:
        return `${dispSlotName(param1)} の${dispItemName(param2)} の個数`;
      case 5:
        return `${dispSlotName(param1)} が${dispStateName(param2)} かどうか`;
      case 6:
        return `${Utils.getPartyInfoSelectList()[param2]}`;
      case 7:
        return Utils.getGameDataTextSelectList()[param1];
      case 8:
        return `${Utils.getActionIdList()[param2]}`;
      case 9:
        return `${dispMemberName(param1)} の${
          Utils.getMemberTypeSelectList()[param2]
        }`;
      case 10:
        return `${dispSlotName(param1)} ${
          Utils.getVehicleInfoSelectList()[param2]
        }`;
      case 11:
        return `${Utils.getSystemIdList()[param2]}`;
      case 12:
        return `${dispSlotName(param1)} ${
          Utils.getBattlerInfoSelectList()[param2]
        }`;
      default:
        return '';
    }
  };

  // システムスロットに代入
  const listAssignSystemSlotContents = (systemSlotName, slotId) => {
    const slotText = dispSlotName(slotId);
    return (
      <td>
        {systemSlotName} = {slotText}
      </td>
    );
  };

  /**
   * マップ情報取得
   * @param {*} slotId 格納するスロットId
   * @param {*} type 種類
   * @param {*} param1
   */
  const listAssignMapInfoContents = (slotId, type, param1) => {
    const slotText = dispSlotName(slotId);
    const typeText = Utils.getMapInfoList()[type];
    const paramText = _getAssignMapInfoParamText(type, param1);
    return (
      <td>
        {slotText} = {typeText}:{paramText}
      </td>
    );
  };

  const _getAssignMapInfoParamText = (type, param1) => {
    switch (type) {
      case 0:
        return `${Utils.getMapInfoStandardList()[param1]}`;
      case 1:
        return `${Utils.getMapInfoEventList()[param1]}`;
      case 2:
        return `${param1}番目`;
      case 3:
        return `${Utils.getMapInfoResultList()[param1]}`;
      case 4:
        return `${Utils.getMapInfoActionList()[param1]}`;
      default:
        return '';
    }
  };

  // 商品の設定
  const listGoodsContents = (parameters) => {
    const text = parameters.map((value) => dispItemName(value)).join(',');
    return <td>{text}</td>;
  };

  // 商品価格の設定
  const listGoodsPriceContents = (parameters) => {
    const text = parameters
      .map((value, index) => `${index + 1}:[${value}]`)
      .join(',');
    return <td>{text}</td>;
  };

  // スロット比較
  const listCompareSlotContents = (id, code, type, param) => {
    const slotText = dispSlotName(id);
    const codeText = _getCompareText(code);
    const paramText = _getNumberOrSlotParamText(type, param);
    return (
      <td>
        {slotText}
        {codeText}
        {paramText}
      </td>
    );
  };

  const _getCompareText = (code) => {
    const text = ['=', '>=', '<=', '>', '<', '!=', '&'];
    return text[code];
  };

  // 結果代入
  const listAssignResultContents = (slotId) => {
    const slotText = dispSlotName(slotId);
    return <td>結果 = {slotText}</td>;
  };

  // 戦闘者判定
  const listJudgeBattlerContents = (slotId, refSlotId, type, id) => {
    const slotText = dispSlotName(slotId);
    const refSlotText = dispSlotName(refSlotId);
    return (
      <td>
        {slotText}={refSlotText}：{Utils.getBattlerTypeList()[type]}
        {_getJudgeBattler(type, id)}
      </td>
    );
  };

  const _getJudgeBattler = (type, id) => {
    switch (type) {
      case 1:
        return dispMemberName(id);
      case 2:
        return dispEnemyName(id);
      default:
        return '';
    }
  };

  // 行動条件判定
  const listJudgeConditionContents = (slotId, conditionId) => {
    const slotText = dispSlotName(slotId);
    const conditionText = dispActionConditionName(conditionId);
    return (
      <td>
        {slotText}が{conditionText}になっている
      </td>
    );
  };

  const listCaseContents = (result) => {
    return <td>結果が {result} の場合</td>;
  };

  const listLabelContents = (name) => {
    return <td>{name}</td>;
  };

  const listJumpContents = (name) => {
    return <td>{name}</td>;
  };

  const listChangeItemContents = (type, id, memberSlotId, qty) => {
    // 直接指定
    if (type === 0) {
      return (
        <td>
          {dispItemName(id)} {qty}, 入手者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    } else {
      return (
        <td>
          スロット({id})の道具(id指定) {qty}, 入手者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    }
  };

  const listChangeSkillContents = (type, id, memberSlotId, operate) => {
    const operateText = operate === 0 ? '+' : '-';
    // 直接指定
    if (type === 0) {
      return (
        <td>
          {dispSkillName(id)} {operateText}, 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    } else {
      return (
        <td>
          スロット({id})の技能(id指定) {operateText}, 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    }
  };

  // 経験値変更
  const listChangeExpContents = (ref, expValue, memberSlotId, operate) => {
    const operateText = operate === 0 ? '+' : '-';
    // 直接指定
    if (ref === 0) {
      return (
        <td>
          {operateText} {expValue} , 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    } else {
      return (
        <td>
          {operateText} {dispSlotName(expValue)} , 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    }
  };

  // レベル変更
  const listChangeLvContents = (ref, lvValue, memberSlotId, operate) => {
    const operateText = operate === 0 ? '+' : '-';
    // 直接指定
    if (ref === 0) {
      return (
        <td>
          {operateText} {lvValue} , 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    } else {
      return (
        <td>
          {operateText} {dispSlotName(lvValue)} , 対象者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    }
  };

  // レベル適用
  const listApplyLvContents = (memberSlotId) => {
    return (
      <td>
        対象者格納スロット(
        {dispSlotName(memberSlotId)})
      </td>
    );
  };

  // 装備変更
  const listChangeEquipmentContents = (memberSlotId, item) => {
    return (
      <td>
        対象者格納スロット({dispSlotName(memberSlotId)}){dispItemName(item)}
      </td>
    );
  };

  const listChangeGoldContents = (op, type, value) => {
    const opText = op === 0 ? '+' : '-';
    const paramText = _getNumberOrSlotParamText(type, value);
    return (
      <td>
        {opText}
        {paramText}
      </td>
    );
  };

  const _getNumberOrSlotParamText = (type, param) => {
    switch (type) {
      case 0:
        return param;
      case 1:
        return 'スロット:' + dispSlotName(param);
      default:
        return '';
    }
  };

  // 仲間登録
  const listRegisterMateContents = (memberId, variableId) => {
    return (
      <td>
        {dispMemberName(memberId)}
        {dispVariableName(variableId)}
      </td>
    );
  };

  // パーティの変更
  const listChangePartyContents = (type, variableId) => {
    const typeText = type === 0 ? '加える' : '外す';
    return (
      <td>
        {typeText}
        {dispVariableName(variableId)}
      </td>
    );
  };

  // NPCの変更
  const listChangeNpcContents = (type, variableId) => {
    const typeText = type === 0 ? '加える' : '外す';
    return (
      <td>
        {typeText}
        {dispVariableName(variableId)}
      </td>
    );
  };

  // 隊列の変更
  const listChangeFollowerContents = (type, variableId) => {
    const typeText = type === 0 ? '含める' : '含めない';
    return (
      <td>
        {typeText}
        {dispVariableName(variableId)}
      </td>
    );
  };

  // 回復
  const listRecoverContents = (
    type,
    param,
    hprate,
    mprate,
    beginState,
    endState
  ) => {
    const typeText = _getRecoverTypeText(type, param);
    return (
      <td>
        {typeText}hp+={hprate}%, mp+={mprate}%, 状態-=優先{beginState}～
        {endState}
      </td>
    );
  };

  const _getRecoverTypeText = (type, param) => {
    const list = Utils.getRecoverTypeSelectList();
    switch (type) {
      case 0:
        return `${list[type]}：`;
      case 1:
        return `${list[type]}：`;
      case 2:
        return `${list[type]}：` + dispSlotName(param);
      default:
        return '???：';
    }
  };

  // 状態変更
  const listChangeStateContents = (slotId, type, stateId) => {
    const slotText =
      slotId <= 0
        ? Utils.getPreRegisterIdSelectList().find(
            (value) => value.value === slotId
          )?.text
        : dispSlotName(slotId);
    return (
      <td>
        {slotText}の{dispStateName(stateId)}を
        {Utils.getChangeStateTypeList()[type]}
      </td>
    );
  };

  // マップスクリプト
  const listMapScriptContents = (type, id, timing) => {
    const typeText = Utils.getDirectOrSlotList()[type];
    const idText = type === 0 ? dispMapEventName(id) : dispSlotName(id);
    const timingText = Utils.getCallScriptTimingList()[timing];
    return (
      <td>
        {typeText}
        {idText}
        {timingText}
      </td>
    );
  };

  // コモンスクリプト
  const listCommonScriptContents = (type, id, timing) => {
    const typeText = type === 0 ? '直接：' : 'スロット：';
    const idText = type === 0 ? dispCommonEventName(id) : dispSlotName(id);
    const timingText = Utils.getCallScriptTimingList()[timing];
    return (
      <td>
        {typeText}
        {idText}
        {timingText}
      </td>
    );
  };

  const listChangeTileContents = (layerIndex, id, x, y, posType) => {
    const typeText = Utils.getDirectOrRefList()[posType ? 1 : 0];
    const xText = posType ? dispSlotName(x) : x;
    const yText = posType ? dispSlotName(y) : y;
    return (
      <td>
        レイヤー={layerIndex}, パーツ={id} {typeText}({xText},{yText})
      </td>
    );
  };

  const listSwapTileContents = (type, layerIndex) => {
    return (
      <td>
        {type === 0 ? '戻す' : '置き換える'}(レイヤー={layerIndex})
      </td>
    );
  };

  // 場所移動
  const listMoveContents = (type, mapId, x, y, direction, pos) => {
    const [typeText, mapIdText, xText, yText] = _getMoveTypeText(
      type,
      mapId,
      x,
      y
    );
    const directionTexts = Utils.getDirectionInfoList();
    return (
      <td>
        {typeText}(map:{mapIdText},X:{xText},Y:{yText}),
        {directionTexts[direction + 1]},{Utils.getReferenceTypeList()[pos]}
      </td>
    );
  };

  const _getMoveTypeText = (type, mapId, x, y) => {
    if (type === 0) {
      return ['直接', dispMapName(mapId), x, y];
    } else {
      return [
        'スロット',
        dispSlotName(mapId),
        dispSlotName(x),
        dispSlotName(y),
      ];
    }
  };

  // 位置リスト移動
  const listMoveFromPositionContents = (type, positionId, direction) => {
    const [typeText, positionIdText] =
      type === 0
        ? ['直接', dispPositionName(positionId)]
        : ['スロット', dispSlotName(positionId)];
    return (
      <td>
        {typeText}(位置:{positionIdText}),方向:{direction}
      </td>
    );
  };

  const listWarpContents = (type, warpId, direction) => {
    const [typeText, warpIdText] = (() => {
      switch (type) {
        case 0:
          return ['直接', dispWarpName(warpId)];
        case 1:
          return ['スロット', dispSlotName(warpId)];
        case 2:
          return ['アドレス', dispSlotName(warpId)];
        default:
          return ['???', ''];
      }
    })();
    return (
      <td>
        {typeText}(行先:{warpIdText}),方向:{direction}
      </td>
    );
  };

  // 位置設定
  const listLocationContents = (
    type,
    target,
    dest,
    value1,
    value2,
    direction
  ) => {
    const dispTarget = type === 1 ? dispSlotName(target) : `Id：${target}`;
    const list = Utils.getLocationDestList();
    return (
      <td>
        {dispTarget} ({list[dest]}:{_getLocationTypeText(dest, value1, value2)},
        方向:{direction})
      </td>
    );
  };

  const _getLocationTypeText = (type, value1, value2) => {
    switch (type) {
      case 0:
        return `${value1},${value2}`;
      case 1:
        return `${dispSlotName(value1)},${dispSlotName(value2)}`;
      case 2:
        return `${value1}${value2 === 1 ? '交換' : ''}`;
      case 3:
        return dispSlotName(value1) + `${value2 === 1 ? '交換' : ''}`;
      default:
        return '???';
    }
  };

  const listMoveVehicleContents = (vehicleId, type, positionId, direction) => {
    const [typeText, positionIdText] =
      type === 0
        ? ['直接', dispPositionName(positionId)]
        : ['スロット', dispSlotName(positionId)];
    return (
      <td>
        {dispVehicleName(vehicleId)} {typeText}(位置:{positionIdText}),方向:
        {direction}
      </td>
    );
  };

  // 移動の設定
  const listMoveSettingsContents = (type, value) => {
    const typeText = _getMoveSettingsText(type, value);
    return <td>{typeText}</td>;
  };

  const _getMoveSettingsText = (type, value) => {
    const list = Utils.getTransferSettingsList();
    switch (type) {
      case 0:
        return list[type] + `[${Utils.getMoveSettingsScreenOffList()[value]}]`;
      case 1:
        return list[type] + `[${Utils.getMoveSettingsScreenOnList()[value]}]`;
      case 2:
        return list[type] + `[${Utils.getMoveSettingsFollowerList()[value]}]`;
      case 3:
        return list[type] + dispSeName(value);
      case 4:
        return list[type] + dispSlotName(value);
      case 5:
        return list[type] + dispSlotName(value);
      case 6:
        return list[type] + `[${Utils.getMoveSettingsVisibleList()[value]}]`;
      case 7:
        return list[type] + dispCommonEventName(value);
      case 8:
        return list[type];
      default:
        return '???';
    }
  };

  const listScrollContents = (type, distanceX, distanceY, speed, wait) => {
    const typeText = ['固定', '固定解除', 'ずらす', '戻す'][type];
    const distanceText = type === 2 ? `[X:${distanceX} Y:${distanceY}]` : '';
    const speedList = Utils.getScrollSpeedList();
    const speedText = [2, 3].includes(type)
      ? ` ${speedList.find((item) => item.value === speed)?.text ?? ''}`
      : '';
    const waitText = [2, 3].includes(type)
      ? ` ${wait > 0 ? '待機する' : '待機しない'}`
      : '';
    return (
      <td>
        {typeText}
        {distanceText}
        {speedText}
        {waitText}
      </td>
    );
  };

  // 移動ルート
  const listMoveRouteContents = (type, target, storage, routeId, wait) => {
    const dispTarget = type === 1 ? dispSlotName(target) : `Id：${target}`;
    if (typeof routeId === 'object') {
      routeId = 1;
    }
    return (
      <td>
        {dispTarget} ({storage === 0 ? '共通' : 'マップ'},ルートId={routeId}
        ,待機={wait ? 'する' : 'しない'})
      </td>
    );
  };

  // 移動ルート待機
  const listMoveRouteWaitContents = (stepType) => {
    return <td>足踏み:{Utils.getOrNotSelectList()[stepType]}</td>;
  };

  // 隊列の操作
  const listFollowerControlContents = (type) => {
    const texts = ['再設定', '一列', '集合'];
    const typeText = texts[type];
    return <td>{typeText}</td>;
  };

  // 待機
  const listWaitContents = (frame) => {
    return <td>{frame}フレーム</td>;
  };

  // 隊列の設定
  const listFollowerSettingsContents = (type, param) => {
    const texts = Utils.getFollowerSettingsTypeList();
    const typeText = texts[type];
    const paramText =
      type === 0 ? Utils.getFollowerSettingsChaseList()[param] : '未作成';
    return (
      <td>
        {typeText}:{paramText}
      </td>
    );
  };

  // 隊列の設定
  const listAddressSettingsContents = (type, warpId) => {
    const texts = Utils.getAOrDList();
    const typeText = texts[type];
    return (
      <td>
        {typeText}:{dispWarpName(warpId)}
      </td>
    );
  };

  // 効果音
  const listSeContents = (id) => {
    return <td>{dispSeName(id)}</td>;
  };

  // BGM
  const listBgmPlay = (id, noLoop) => {
    return (
      <td>
        {dispBgmName(id)},{noLoop > 0 ? 'ループしない' : 'ループする'}
      </td>
    );
  };

  // BGM割り込み
  const listBgmInterrupt = (id, wait, noResume) => {
    return (
      <td>
        {dispBgmName(id)},{wait > 0 ? '待機する' : ''},
        {noResume > 0 ? '終了後リジュームしない' : ''}
      </td>
    );
  };

  const listChangePlayerBgm = (id) => {
    return <td>{dispBgmName(id)}</td>;
  };

  // イベントトリガー
  const listEventTriggerContents = (triggerHex, eventId) => {
    return (
      <td>
        起因値:{triggerHex} イベントId:{eventId}
      </td>
    );
  };

  // 戦闘開始
  const listBattleStartContents = (
    groupType,
    groupId,
    terrainId,
    escape,
    escapeScript,
    winScript,
    loseScript,
    preemptive,
    preemptiveType,
    bgmId
  ) => {
    const groupText = Utils.getEnemyGroupTypeList()[groupType];
    const troopText = dispTroopName(groupId);
    const encounterText = dispEncounterName(groupId);
    const terrainText = dispTerrainName(terrainId);
    const escapeText = escape ? '逃走可能' : '逃走不可';
    const escapeScriptText = escapeScript
      ? ` 逃走時${dispCommonEventName(escapeScript)}`
      : '';
    const winScriptText = winScript
      ? ` 勝利時${dispCommonEventName(winScript)}`
      : '';
    const loseScriptText = loseScript
      ? ` 敗北時${dispCommonEventName(loseScript)}`
      : '';
    const preemptiveText = preemptive ? '先制タイプ' : '先制なし';
    const preemptiveTypeText = Utils.getPreemptiveTypeList()[preemptiveType];
    const bgmText = dispBgmName(bgmId);
    return (
      <td>
        {groupText}
        {groupType === 0 ? troopText : ''}
        {groupType === 1 ? encounterText : ''}
        {terrainId ? terrainText : ''}
        {' ' + escapeText}
        {escapeScriptText}
        {winScriptText}
        {loseScriptText}
        {' ' + preemptiveText}
        {preemptive ? `[${preemptiveTypeText}]` : ''}
        {bgmId ? bgmText : ''}
      </td>
    );
  };

  // 画面のフェードアウト
  const listScreenFadeOutContents = (wait, speed = -1, target = 0) => {
    const speedText = speed < 0 ? 'システム設定値' : `${speed}`;
    return (
      <td>
        待機:{Utils.getOrNotSelectList()[wait]} 速度:{speedText} 対象:
        {Utils.getFadeTargetList()[target]}
      </td>
    );
  };

  // 画面のフェードイン
  const listScreenFadeInContents = (wait, speed = -1, target = 0) => {
    const speedText = speed < 0 ? 'システム設定値' : `${speed}`;
    return (
      <td>
        待機:{Utils.getOrNotSelectList()[wait]} 速度:{speedText} 対象:
        {Utils.getFadeTargetList()[target]}
      </td>
    );
  };

  // 画面のシェイク
  const listScreenShakeContents = (type, x, y, speed, frame, wait) => {
    const typeText = Utils.getShakeTypeList()[type];
    const distanceText = `[X:${x} Y:${y}]`;
    const speedList = Utils.getShakeSpeedList();
    const speedText = ` ${
      speedList.find((item) => item.value === speed)?.text ?? ''
    }`;
    const frameText = ` ${frame}フレーム`;
    const waitText = ` ${wait > 0 ? '待機する' : '待機しない'}`;
    return (
      <td>
        {typeText}
        {distanceText}
        {speedText}
        {frameText}
        {waitText}
      </td>
    );
  };

  // マップアニメーション
  const listMapAnimationContents = (targetType, target, effectId, waitType) => {
    const targetTypeText = Utils.getMapAnimationTargetTypeList()[targetType];
    const targetText = [1, 2, 3].includes(targetType)
      ? ` ${dispSlotName(target)}`
      : '';
    const effectText = ` ${dispEffectName(effectId)}`;
    const waitText =
      waitType === 0
        ? ''
        : ` ${Utils.getMapAnimationWaitTypeList()[waitType]}ウェイト`;
    return (
      <td>
        {targetTypeText}
        {targetText}
        {effectText}
        {waitText}
      </td>
    );
  };

  // 透明状態変更
  const listChangeTransparentContents = (target, type) => {
    const texts = Utils.getChangeTransparentTypeList();
    const typeText = texts[type];
    return (
      <td>
        Id：{target} {typeText}
      </td>
    );
  };

  // 隊列の集合
  const listGatherFollowersContents = (type) => {
    const texts = Utils.getGatherFollowersTypeList();
    const typeText = texts[type];
    return <td>{typeText}</td>;
  };

  // 位置設定
  const listAssignLocationInformationContents = (
    slotId,
    kind,
    layer,
    locationType,
    value1,
    value2
  ) => {
    const dispSlotText = dispSlotName(slotId);
    const list = Utils.getLocationKindList();
    return (
      <td>
        {dispSlotText} = {list[kind]},レイヤー{layer}:
        {_getAssignLocationInformationText(locationType, value1, value2)}
      </td>
    );
  };

  const _getAssignLocationInformationText = (type, value1, value2) => {
    switch (type) {
      case 0:
        return `${value1},${value2}`;
      case 1:
        return `${dispSlotName(value1)},${dispSlotName(value2)}`;
      case 2:
        return `キャラクターId ${value1}`;
      case 3:
        return `キャラクターId ${dispSlotName(value1)}`;
      default:
        return '???';
    }
  };

  // ピクチャの表示
  const listShowPictureContents = (
    pictureNo,
    pictureId,
    materialName,
    anchorType,
    x,
    y
  ) => {
    const dispPictureText = dispPictureName(pictureId);
    const list = Utils.getAnchorTypeList();
    return (
      <td>
        番号:{pictureNo},{dispPictureText},{materialName},{list[anchorType]},{x}
        ,{y}
      </td>
    );
  };

  // ピクチャの移動
  const listMovePictureContents = (pictureNo, x, y, moveType, duration) => {
    const list = Utils.getMoveTypeList();
    return (
      <td>
        番号:{pictureNo},{x},{y},{list[moveType]},{duration}フレーム
      </td>
    );
  };

  // ピクチャの消去
  const listErasePictureContents = (pictureNo) => {
    return <td>番号:{pictureNo}</td>;
  };

  // 行動メッセージ指定
  const listActionMessageContents = (messageId, type) => {
    const header = `[${Utils.getMessageTypeList()[type]}]`;
    return (
      <td>
        {header}
        <br />
        {`${dispMessage(messageId)}`}
      </td>
    );
  };

  // キャラオプション
  const listCharacterOptionsContents = (type, target, storage, routeId) => {
    const dispTarget = type === 1 ? dispSlotName(type) : `Id：${target}`;
    if (typeof routeId === 'object') {
      routeId = 1;
    }
    return (
      <td>
        {dispTarget} ({storage === 0 ? '共通' : 'マップ'},ルートId={routeId})
      </td>
    );
  };

  // 行動メッセージの設定指定
  const listActionMessageSettingsContents = (type) => {
    const settingText = Utils.getMessageOptionTypeSelectList()[type];
    return <td>{settingText}</td>;
  };

  // 行動エフェクト指定
  const listActionEffectContents = (effectId) => {
    return <td>{`${dispEffectName(effectId)}`}</td>;
  };

  // 行動対象指定
  const listActionTargetContents = (slotId) => {
    return <td>{`${dispSlotName(slotId)}`}</td>;
  };

  // 追加行動指定
  const listActionExtraContents = (type) => {
    return <td>{`${Utils.getActionExtraList()[type]}`}</td>;
  };

  // 強制行動指定
  const listActionForceContents = (slotId, skillId) => {
    return <td>{`${dispSlotName(slotId)}が${dispSkillName(skillId)}`}</td>;
  };

  // 戦闘画像変更
  const listChangeBattlerImageContents = (slotId, enemyId) => {
    return (
      <td>{`${dispSlotName(slotId)}の${dispEnemyName(enemyId)}画像に変更`}</td>
    );
  };

  // 戦闘者変更
  const listTransformBattlerContents = (slotId, enemyId) => {
    return (
      <td>{`${dispSlotName(slotId)}の${dispEnemyName(enemyId)}に変更`}</td>
    );
  };

  // コメント
  const listCommentContents = (text) => {
    const message = (
      <td style={{ color: 'lime', whiteSpace: 'pre-line' }}>
        {'#'}
        {text}
      </td>
    );
    return message;
  };

  // 床ダメージ切替
  const listChangeFloorDamageContents = (type) => {
    const texts = Utils.getChangeEnableList();
    return <td>{texts[type]}</td>;
  };

  // 歩行ダメージ切替
  const listChangeSlipDamageContents = (type) => {
    const texts = Utils.getChangeEnableList();
    return <td>{texts[type]}</td>;
  };

  // エンカウント切替
  const listChangeEncounterContents = (type) => {
    const texts = Utils.getChangeEnableList();
    return <td>{texts[type]}</td>;
  };

  // 部屋移動設定
  const listRoomMoveSettingsContents = (type) => {
    const texts = Utils.getChangeEnableList();
    return <td>{texts[type]}</td>;
  };

  const viewCommand = () => {
    const parameters = props.command.parameters;
    let title = null;
    let contents = null;
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        title = '文章:';
        contents = listMessageContents(...parameters);
        break;
      case COMMAND.MENU:
        title = 'メニュー表示:';
        contents = listMenuContents(...parameters);
        break;
      case COMMAND.EndMenu:
        title = 'メニュー終了:';
        contents = listEndMenuContents(...parameters);
        break;
      case COMMAND.MessageSettings:
        title = '文章設定：';
        contents = listMessageSettingsContents(...parameters);
        break;
      case COMMAND.MessageCloseWait:
        title = '文章閉じ待機';
        contents = listMessageCloseWaitContents(...parameters);
        break;
      case COMMAND.Embedded:
        title = '組み込みメニュー：';
        contents = listEmbeddedContents(...parameters);
        break;
      case COMMAND.EndEmbedded:
        title = '組み込みメニュー終了';
        break;
      case COMMAND.EndWaitMessage:
        title = '文章待機終了';
        break;
      case COMMAND.Flag:
        title = 'フラグ:';
        contents = listFlagContents(...parameters);
        break;
      case COMMAND.Variable:
        title = '変数:';
        contents = listVariableContents(...parameters);
        break;
      case COMMAND.OperateSlot:
        title = 'スロット演算:';
        contents = listOperateSlotContents(...parameters);
        break;
      case COMMAND.AssignFixData:
        title = '固定データ取得:';
        contents = listAssignFixDataContents(...parameters);
        break;
      case COMMAND.AssignGameData:
        title = 'ゲームデータ取得:';
        contents = listAssignGameDataContents(...parameters);
        break;
      case COMMAND.AssignSystemSlot:
        title = 'システムスロットに代入:';
        contents = listAssignSystemSlotContents(...parameters);
        break;
      case COMMAND.AssignMapInfo:
        title = 'マップ情報取得:';
        contents = listAssignMapInfoContents(...parameters);
        break;
      case COMMAND.Goods:
        title = '商品の設定:';
        contents = listGoodsContents(parameters);
        break;
      case COMMAND.GoodsPrice:
        title = '商品価格の設定:';
        contents = listGoodsPriceContents(parameters);
        break;
      case COMMAND.ItemSpace:
        title = '道具追加可能判定';
        break;
      case COMMAND.CompareSlot:
        title = 'スロット比較';
        contents = listCompareSlotContents(...parameters);
        break;
      case COMMAND.AssignResult:
        title = '結果代入';
        contents = listAssignResultContents(...parameters);
        break;
      case COMMAND.JudgeBattler:
        title = '戦闘者判定';
        contents = listJudgeBattlerContents(...parameters);
        break;
      case COMMAND.JudgeCondition:
        title = '状態判定';
        contents = listJudgeConditionContents(...parameters);
        break;
      case COMMAND.CASE:
        title = 'Case';
        contents = listCaseContents(...parameters);
        break;
      case COMMAND.ELSE:
        title = 'Else';
        break;
      case COMMAND.EndBranch:
        title = 'EndBranch';
        break;
      case COMMAND.BeginLoop:
        title = 'ループ開始';
        break;
      case COMMAND.EndLoop:
        title = 'ループ終端';
        break;
      case COMMAND.Label:
        title = 'ラベル:';
        contents = listLabelContents(...parameters);
        break;
      case COMMAND.Jump:
        title = 'ラベルジャンプ:';
        contents = listJumpContents(...parameters);
        break;
      case COMMAND.EXIT:
        title = '以降実行しない';
        break;
      case COMMAND.ExitLoop:
        title = 'ループ中断';
        break;
      case COMMAND.ChangeItem:
        title = '道具変更:';
        contents = listChangeItemContents(...parameters);
        break;
      case COMMAND.ChangeSkill:
        title = '技能変更:';
        contents = listChangeSkillContents(...parameters);
        break;
      case COMMAND.ChangeExp:
        title = '経験値変更';
        contents = listChangeExpContents(...parameters);
        break;
      case COMMAND.ChangeLv:
        title = 'レベル変更';
        contents = listChangeLvContents(...parameters);
        break;
      case COMMAND.ApplyLv:
        title = 'レベル反映';
        contents = listApplyLvContents(...parameters);
        break;
      case COMMAND.ChangeEquipment:
        title = '装備変更:';
        contents = listChangeEquipmentContents(...parameters);
        break;
      case COMMAND.ChangeGold:
        title = '所持金の変更:';
        contents = listChangeGoldContents(...parameters);
        break;
      case COMMAND.RegisterMate:
        title = '仲間登録:';
        contents = listRegisterMateContents(...parameters);
        break;
      case COMMAND.ChangeParty:
        title = 'パーティの変更:';
        contents = listChangePartyContents(...parameters);
        break;
      case COMMAND.ChangeNpc:
        title = 'NPCの変更:';
        contents = listChangeNpcContents(...parameters);
        break;
      case COMMAND.RefreshMarch:
        title = '隊列のリフレッシュ';
        break;
      case COMMAND.ChangeFollower:
        title = '隊列の変更:';
        contents = listChangeFollowerContents(...parameters);
        break;
      case COMMAND.Recover:
        title = '回復:';
        contents = listRecoverContents(...parameters);
        break;
      case COMMAND.ChangeState:
        title = '状態変更:';
        contents = listChangeStateContents(...parameters);
        break;
      case COMMAND.MapScript:
        title = 'マップスクリプト:';
        contents = listMapScriptContents(...parameters);
        break;
      case COMMAND.CommonScript:
        title = 'コモンスクリプト:';
        contents = listCommonScriptContents(...parameters);
        break;
      case COMMAND.ChangeTile:
        title = 'タイル変更:';
        contents = listChangeTileContents(...parameters);
        break;
      case COMMAND.SwapTile:
        title = 'タイル切替:';
        contents = listSwapTileContents(...parameters);
        break;
      case COMMAND.Move:
        title = '場所移動:';
        contents = listMoveContents(...parameters);
        break;
      case COMMAND.MoveFromPosition:
        title = '位置リスト移動:';
        contents = listMoveFromPositionContents(...parameters);
        break;
      case COMMAND.Warp:
        title = 'ワープ:';
        contents = listWarpContents(...parameters);
        break;
      case COMMAND.Location:
        title = '位置設定:';
        contents = listLocationContents(...parameters);
        break;
      case COMMAND.MoveVehicle:
        title = '乗り物の移動:';
        contents = listMoveVehicleContents(...parameters);
        break;
      case COMMAND.MoveSettings:
        title = '移動の設定:';
        contents = listMoveSettingsContents(...parameters);
        break;
      case COMMAND.Scroll:
        title = 'スクロールの操作:';
        contents = listScrollContents(...parameters);
        break;
      case COMMAND.MoveRoute:
        title = '移動ルート:';
        contents = listMoveRouteContents(...parameters);
        break;
      case COMMAND.MoveRouteWait:
        title = '移動ルート待機:';
        contents = listMoveRouteWaitContents(...parameters);
        break;
      case COMMAND.FollowerControl:
        title = '隊列の操作:';
        contents = listFollowerControlContents(...parameters);
        break;
      case COMMAND.WAIT:
        title = '待機:';
        contents = listWaitContents(...parameters);
        break;
      case COMMAND.EraseEvent:
        title = 'イベントの消去';
        break;
      case COMMAND.FollowerSettings:
        title = '隊列の設定:';
        contents = listFollowerSettingsContents(...parameters);
        break;
      case COMMAND.AddressSettings:
        title = '行先の設定:';
        contents = listAddressSettingsContents(...parameters);
        break;
      case COMMAND.Suspend:
        title = '中断';
        break;
      case COMMAND.SAVE:
        title = 'セーブ';
        break;
      case COMMAND.Se:
        title = '効果音:';
        contents = listSeContents(...parameters);
        break;
      case COMMAND.BgmPlay:
        title = 'BGM演奏:';
        contents = listBgmPlay(...parameters);
        break;
      case COMMAND.BgmInterrupt:
        title = 'BGM割込:';
        contents = listBgmInterrupt(...parameters);
        break;
      case COMMAND.ChangePlayerBgm:
        title = 'プレイヤーBGM変更:';
        contents = listChangePlayerBgm(...parameters);
        break;
      case COMMAND.Startup:
        title = 'スタートアップ実行';
        break;
      case COMMAND.Cleanup:
        title = 'クリーンアップ実行';
        break;
      case COMMAND.EventTrigger:
        title = 'イベント起動:';
        contents = listEventTriggerContents(...parameters);
        break;
      case COMMAND.BattleStart:
        title = '戦闘開始:';
        contents = listBattleStartContents(...parameters);
        break;
      case COMMAND.ScreenFadeOut:
        title = '画面のフェードアウト:';
        contents = listScreenFadeOutContents(...parameters);
        break;
      case COMMAND.ScreenFadeIn:
        title = '画面のフェードイン:';
        contents = listScreenFadeInContents(...parameters);
        break;
      case COMMAND.ScreenShake:
        title = '画面のシェイク:';
        contents = listScreenShakeContents(...parameters);
        break;
      case COMMAND.MapAnimation:
        title = 'マップアニメーション:';
        contents = listMapAnimationContents(...parameters);
        break;
      case COMMAND.ChangeTransparent:
        title = '透明状態変更:';
        contents = listChangeTransparentContents(...parameters);
        break;
      case COMMAND.GatherFollowers:
        title = '隊列の集合:';
        contents = listGatherFollowersContents(...parameters);
        break;
      case COMMAND.GetOutVehicle:
        title = '乗り物から出る:';
        break;
      case COMMAND.CharacterOptions:
        title = 'キャラオプション:';
        contents = listCharacterOptionsContents(...parameters);
        break;
      case COMMAND.ResetObjects:
        title = 'オブジェクトの再設定';
        break;
      case COMMAND.AssignLocationInformation:
        title = '指定位置情報取得:';
        contents = listAssignLocationInformationContents(...parameters);
        break;
      case COMMAND.CancelConsume:
        title = '遅延消費キャンセル';
        break;
      case COMMAND.DelayedConsume:
        title = '遅延消費実行';
        break;
      case COMMAND.ShowPicture:
        title = 'ピクチャの表示:';
        contents = listShowPictureContents(...parameters);
        break;
      case COMMAND.MovePicture:
        title = 'ピクチャの移動:';
        contents = listMovePictureContents(...parameters);
        break;
      case COMMAND.ErasePicture:
        title = 'ピクチャの消去:';
        contents = listErasePictureContents(...parameters);
        break;
      case COMMAND.PushActionResult:
        title = '行動結果追加';
        break;
      case COMMAND.ActionMessage:
        title = '行動文章指定：';
        contents = listActionMessageContents(...parameters);
        break;
      case COMMAND.ActionMessageSettings:
        title = '行動文章の設定：';
        contents = listActionMessageSettingsContents(...parameters);
        break;
      case COMMAND.ActionEffect:
        title = '行動エフェクト指定：';
        contents = listActionEffectContents(...parameters);
        break;
      case COMMAND.ActionTarget:
        title = '行動対象指定：';
        contents = listActionTargetContents(...parameters);
        break;
      case COMMAND.ActionExtra:
        title = '追加行動指定：';
        contents = listActionExtraContents(...parameters);
        break;
      case COMMAND.ActionForce:
        title = '強制行動指定：';
        contents = listActionForceContents(...parameters);
        break;
      case COMMAND.ChangeBattlerImage:
        title = '戦闘画像変更：';
        contents = listChangeBattlerImageContents(...parameters);
        break;
      case COMMAND.TransformBattler:
        title = '戦闘者変更：';
        contents = listTransformBattlerContents(...parameters);
        break;
      case COMMAND.Comment:
        title = '';
        contents = listCommentContents(...parameters);
        break;
      case COMMAND.ChangeFloorDamage:
        title = '床ダメージ切替';
        contents = listChangeFloorDamageContents(...parameters);
        break;
      case COMMAND.ChangeSlipDamage:
        title = '歩行ダメージ切替';
        contents = listChangeSlipDamageContents(...parameters);
        break;
      case COMMAND.ChangeEncounter:
        title = 'エンカウント切替';
        contents = listChangeEncounterContents(...parameters);
        break;
      case COMMAND.RoomMoveSettings:
        title = '部屋移動設定';
        contents = listRoomMoveSettingsContents(...parameters);
        break;
      default:
        title = '不明なコマンド';
    }

    if (props.command.code !== COMMAND.Comment) {
      const mark = [COMMAND.ELSE, COMMAND.EndBranch, COMMAND.EndLoop].includes(
        props.command.code
      )
        ? '：'
        : '★';
      return (
        <table style={{ marginLeft: props.nest * 15 + 'px' }}>
          <tbody>
            <tr>
              <td style={{ color: 'gray' }}>
                {mark}
                {title}
              </td>
              {contents}
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table style={{ marginLeft: props.nest * 15 + 'px' }}>
          <tbody>
            <tr>{contents}</tr>
          </tbody>
        </table>
      );
    }
  };

  // 編集ボタン
  // パラメータなしか不明なコマンドの場合は表示しない
  const editButton = () => {
    const code = props.command.code;
    if (NoParamKeys.includes(code) || !CommandKeys.includes(code)) {
      return null;
    }
    return <button onClick={() => props.onEditClick(props.index)}>編</button>;
  };

  return (
    <div className="command-item">
      <div>{viewCommand()}</div>
      <button onClick={() => props.onAddClick(props.index)}>↑加</button>
      {editButton()}
      <button onClick={() => props.onDeleteClick(props.index)}>除</button>
      <button onClick={() => props.onPasteClick(props.index)}>↑貼</button>
      <button onClick={() => props.onCopyClick(props.index)}>写</button>
    </div>
  );
};

const CommandItemLast = (props) => {
  return (
    <div className="command-item">
      <button onClick={() => props.onAddClick(props.index)}>追加</button>
      <button onClick={() => props.onPasteClick(props.index)}>貼る</button>
    </div>
  );
};

const CommandList = (props) => {
  let nest = 0;

  const listItems = props.list.map((command, index) => {
    if ([COMMAND.EndBranch, COMMAND.EndLoop].includes(command.code)) {
      nest -= 1;
    }
    const result = (
      <CommandItem
        key={index}
        index={index}
        nest={nest}
        command={command}
        onAddClick={props.onAddClick}
        onEditClick={props.onEditClick}
        onDeleteClick={props.onDeleteClick}
        onPasteClick={props.onPasteClick}
        onCopyClick={props.onCopyClick}
      />
    );
    if (
      [COMMAND.CASE, COMMAND.ELSE, COMMAND.BeginLoop].includes(command.code)
    ) {
      nest += 1;
    }

    return result;
  });

  const getCommandList = () => {
    listItems.push(
      <CommandItemLast
        key={listItems.length}
        index={listItems.length}
        onAddClick={props.onAddClick}
        onPasteClick={props.onPasteClick}
      />
    );
    return listItems;
  };

  const listStyle = () => {
    return { pointerEvents: props.listEnable ? 'auto' : 'none' };
  };

  return (
    <div className="command-list" style={listStyle()}>
      {getCommandList()}
    </div>
  );
};

export default CommandList;
