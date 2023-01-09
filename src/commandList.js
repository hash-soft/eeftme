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

  const dispEffectName = (id) => {
    return Utils.getDispName(animations, id);
  };

  const dispMemberName = (id) => {
    return Utils.getDispName(members, id);
  };

  const dispEnemyName = (id) => {
    return Utils.getDispName(enemies, id);
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

  const listEndMenuContents = (menuId) => {
    const menuName = Utils.getDispName(windowsets, menuId);
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
        {flagName} = {control === 0 ? 'OFF' : 'ON'}
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
        return `${dispSlotName(param1)} の登録id`;
      case 1:
        return `${dispSlotName(param1)} ${
          Utils.getRegisterMemberInfoSelectList()[param2]
        }`;
      case 2:
        return `${Utils.getPartyInfoSelectList()[param2]}`;
      case 3:
        return `${dispSlotName(param1)} ${
          Utils.getPlayerInfoSelectList()[param2]
        }`;
      case 4:
        return `${dispSlotName(param1)} の${dispItemName(param2)} の個数`;
      case 5:
        return `[オブジェクトId:${param1}] ${
          Utils.getPlayerInfoSelectList()[param2]
        }`;
      case 6:
        return `${dispSlotName(param1)} が${dispStateName(param2)} かどうか`;
      case 7:
        return Utils.getGameDataTextSelectList()[param1];
      case 8:
        return `${Utils.getActionIdList()[param2]}`;
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

  // 商品の設定
  const listGoodsContents = (parameters) => {
    const text = parameters.map((value) => dispItemName(value)).join(',');
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
  const listJudgeBattlerContents = (slotId, type, id) => {
    const slotText = dispSlotName(slotId);
    return (
      <td>
        {slotText}：{Utils.getBattlerTypeList()[type]}
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

  const listCaseContents = (result) => {
    return <td>結果が {result} の場合</td>;
  };

  const listLabelContents = (name) => {
    return <td>{name}</td>;
  };

  const listJumpContents = (name) => {
    return <td>{name}</td>;
  };

  const listGainItemContents = (type, id, memberSlotId) => {
    // 直接指定
    if (type === 0) {
      const itemName = `[${id}:道具名]`;
      return (
        <td>
          {itemName}を追加, 入手者格納スロット({dispSlotName(memberSlotId)})
        </td>
      );
    } else {
      return (
        <td>
          スロット({id})の道具(id指定)を追加, 入手者格納スロット(
          {dispSlotName(memberSlotId)})
        </td>
      );
    }
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

  const listChangeTileContents = (layerIndex, id, x, y) => {
    return (
      <td>
        レイヤー={layerIndex}, パーツ={id}({x},{y})
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
    const dispTarget = type === 1 ? dispSlotName(type) : `Id：${target}`;
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

  // 移動の設定
  const listMoveSettingsContents = (type, value) => {
    const typeText = _getMoveSettingsText(type, value);
    return <td>{typeText}</td>;
  };

  const _getMoveSettingsText = (type, value) => {
    switch (type) {
      case 0:
        return '[画面消去]' + Utils.getMoveSettingsScreenOffList()[value];
      case 1:
        return '[画面表示]' + Utils.getMoveSettingsScreenOnList()[value];
      case 2:
        return '[隊列]' + Utils.getMoveSettingsFollowerList()[value];
      case 3:
        return '[効果音]' + dispSeName(value);
      case 4:
        return '[横画面座標スロット]' + dispSlotName(value);
      case 5:
        return '[縦画面座標スロット]' + dispSlotName(value);
      default:
        return '???';
    }
  };

  const listScrollContents = (type, distanceX, distanceY, speed, wait) => {
    const typeText = ['固定', '固定解除', 'ずらす', '戻す'][type];
    const distanceText = type === 2 ? `[X:${distanceX} Y:${distanceY}]` : '';
    const speedList = [
      '1/8倍',
      '1/4倍',
      '1/2倍',
      '1倍',
      '2倍',
      '4倍',
      '8倍',
      '瞬時',
    ];
    const speedText = [2, 3].includes(type)
      ? ` ${speedList[speed > 6 ? 7 : speed]}`
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
  const listMoveRouteContents = (type, target, storage, routeId) => {
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

  const listBgmPlay = (id) => {
    return <td>{dispBgmName(id)}</td>;
  };

  const listBgmInterrupt = (id, wait, noResume) => {
    return (
      <td>
        {dispBgmName(id)},{wait > 0 ? '待機する' : ''},
        {noResume > 0 ? '終了後リジュームしない' : ''}
      </td>
    );
  };

  const listEventTriggerContents = (id) => {
    return <td>id:{id}</td>;
  };

  // 画面のフェードアウト
  const listScreenFadeOutContents = (wait) => {
    return <td>待機:{Utils.getOrNotSelectList()[wait]}</td>;
  };

  // 画面のフェードイン
  const listScreenFadeInContents = (wait) => {
    return <td>待機:{Utils.getOrNotSelectList()[wait]}</td>;
  };

  // 透明状態変更
  const listChangeTransparentContents = (type) => {
    const texts = Utils.getChangeTransparentTypeList();
    const typeText = texts[type];
    return <td>{typeText}</td>;
  };

  // 隊列の集合
  const listGatherFollowersContents = (type) => {
    const texts = Utils.getGatherFollowersTypeList();
    const typeText = texts[type];
    return <td>{typeText}</td>;
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
        title = '文章設定';
        contents = listMessageSettingsContents(...parameters);
        break;
      case COMMAND.MessageCloseWait:
        title = '文章閉じ待機';
        break;
      case COMMAND.Embedded:
        title = '組み込みメニュー';
        contents = listEmbeddedContents(...parameters);
        break;
      case COMMAND.EndEmbedded:
        title = '組み込みメニュー終了';
        break;
      case COMMAND.FLAG:
        title = 'フラグ:';
        contents = listFlagContents(...parameters);
        break;
      case COMMAND.VARIABLE:
        title = '変数:';
        contents = listVariableContents(...parameters);
        break;
      case COMMAND.OPERATESLOT:
        title = 'スロット演算:';
        contents = listOperateSlotContents(...parameters);
        break;
      case COMMAND.ASSIGNFIXDATA:
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
      case COMMAND.GOODS:
        title = '商品の設定:';
        contents = listGoodsContents(parameters);
        break;
      case COMMAND.ItemSpace:
        title = '道具追加可能判定';
        break;
      case COMMAND.JudgeTrigger:
        title = '起動起因判定';
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
      case COMMAND.LABEL:
        title = 'ラベル:';
        contents = listLabelContents(...parameters);
        break;
      case COMMAND.JUMP:
        title = 'ラベルジャンプ:';
        contents = listJumpContents(...parameters);
        break;
      case COMMAND.EXIT:
        title = '以降実行しない';
        break;
      case COMMAND.ExitLoop:
        title = 'ループ中断';
        break;
      case COMMAND.GainItem:
        title = '道具を追加:';
        contents = listGainItemContents(...parameters);
        break;
      case COMMAND.CHANGEGOLD:
        title = '所持金の変更:';
        contents = listChangeGoldContents(...parameters);
        break;
      case COMMAND.CHANGEPARTY:
        title = 'パーティの変更:';
        contents = listChangePartyContents(...parameters);
        break;
      case COMMAND.ChangeNpc:
        title = 'NPCの変更:';
        contents = listChangeNpcContents(...parameters);
        break;
      case COMMAND.RECOVER:
        title = '回復:';
        contents = listRecoverContents(...parameters);
        break;
      case COMMAND.ChangeState:
        title = '状態変更:';
        contents = listChangeStateContents(...parameters);
        break;
      case COMMAND.MAPSCRIPT:
        title = 'マップスクリプト:';
        contents = listMapScriptContents(...parameters);
        break;
      case COMMAND.COMMONSCRIPT:
        title = 'コモンスクリプト:';
        contents = listCommonScriptContents(...parameters);
        break;
      case COMMAND.CHANGETILE:
        title = 'タイル変更:';
        contents = listChangeTileContents(...parameters);
        break;
      case COMMAND.SWAPTILE:
        title = 'タイル切替:';
        contents = listSwapTileContents(...parameters);
        break;
      case COMMAND.MOVE:
        title = '場所移動:';
        contents = listMoveContents(...parameters);
        break;
      case COMMAND.MoveFromPosition:
        title = '位置リスト移動:';
        contents = listMoveFromPositionContents(...parameters);
        break;
      case COMMAND.WARP:
        title = 'ワープ:';
        contents = listWarpContents(...parameters);
        break;
      case COMMAND.Location:
        title = '位置設定:';
        contents = listLocationContents(...parameters);
        break;
      case COMMAND.MoveSettings:
        title = '移動の設定:';
        contents = listMoveSettingsContents(...parameters);
        break;
      case COMMAND.SCROLL:
        title = 'スクロールの操作:';
        contents = listScrollContents(...parameters);
        break;
      case COMMAND.MoveRoute:
        title = '移動ルート:';
        contents = listMoveRouteContents(...parameters);
        break;
      case COMMAND.MOVEROUTEWAIT:
        title = '移動ルート待機:';
        contents = listMoveRouteWaitContents(...parameters);
        break;
      case COMMAND.FOLLOWERCONTROL:
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
      case COMMAND.FOLLOWERSETTINGS:
        title = '隊列の設定:';
        contents = listFollowerSettingsContents(...parameters);
        break;
      case COMMAND.ADDRESSSETTINGS:
        title = '行先の設定:';
        contents = listAddressSettingsContents(...parameters);
        break;
      case COMMAND.SAVE:
        title = 'セーブ';
        break;
      case COMMAND.SE:
        title = '効果音:';
        contents = listSeContents(...parameters);
        break;
      case COMMAND.BGMPLAY:
        title = 'BGM演奏:';
        contents = listBgmPlay(...parameters);
        break;
      case COMMAND.BGMINTERRUPT:
        title = 'BGM割込:';
        contents = listBgmInterrupt(...parameters);
        break;
      case COMMAND.EventTrigger:
        title = 'イベント起動:';
        contents = listEventTriggerContents(...parameters);
        break;
      case COMMAND.SCREENFADEOUT:
        title = '画面のフェードアウト:';
        contents = listScreenFadeOutContents(...parameters);
        break;
      case COMMAND.SCREENFADEIN:
        title = '画面のフェードイン:';
        contents = listScreenFadeInContents(...parameters);
        break;
      case COMMAND.CHANGETRANSPARENT:
        title = '透明状態変更:';
        contents = listChangeTransparentContents(...parameters);
        break;
      case COMMAND.GatherFollowers:
        title = '隊列の集合:';
        contents = listGatherFollowersContents(...parameters);
        break;
      case COMMAND.ResetObjects:
        title = 'オブジェクトの再設定';
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
      case COMMAND.COMMENT:
        title = '';
        contents = listCommentContents(...parameters);
        break;
      default:
        title = '不明なコマンド';
    }

    if (props.command.code !== COMMAND.COMMENT) {
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
