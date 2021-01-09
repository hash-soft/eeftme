import React from 'react';
import './index.css';
import { COMMAND, CommandKeys, NoParamKeys } from './define';
import { Dataset, MapEventsRef, CommonEventsRef } from './contents'
import Utils from './utils'


const CommandItem = props => {

  const dataset = React.useContext(Dataset);
  const musics = dataset.musics;
  const sounds = dataset.sounds;
  const flags = dataset.flags;
  const variables = dataset.variables;
  const slots = dataset.slots;
  const members = dataset.members;
  const items = dataset.items;
  const windowsets = dataset.windowsets;
  const mapList = dataset.mapList;
  const positions = dataset.positions;
  const warpPlaces = dataset.warpPlaces;
  const mapEventsRef = React.useContext(MapEventsRef);
  const commonEventsRef = React.useContext(CommonEventsRef);

  const dispFlagName = (id, idEnd = id) => {
    return Utils.getDispValue(flags, id, idEnd);
  }

  const dispVariableName = (id, idEnd = id) => {
    return Utils.getDispValue(variables, id, idEnd);
  }

  const dispSlotName = (id, idEnd = id) => {
    return Utils.getDispValue(slots, id, idEnd);
  }

  const dispItemName = (id) => {
    return Utils.getDispName(items, id);
  }

  const dispMemberName = (id) => {
    return Utils.getDispName(members, id);
  }

  const dispMapEventName = (id) => {
    return Utils.getDispName(mapEventsRef.current, id);
  }

  const dispCommonEventName = (id) => {
    return Utils.getDispName(commonEventsRef.current, id);
  }

  const dispSeName = (id) => {
    return Utils.getDispNameSound(sounds, id);
  }

  const dispBgmName = (id) => {
    return Utils.getDispNameSound(musics, id);
  }

  const dispMapName = (id) => {
    return Utils.getDispName(mapList, id);
  }

  const dispPositionName = (id) => {
    return Utils.getDispName(positions, id);
  }

  const dispWarpName = (id) => {
    return Utils.getDispName(warpPlaces, id);
  }

  const listMessageContents = (text, nowait) => {
    const header = nowait === 1 ? '[無待機]' : '[待機]';
    const message = <td style={{ whiteSpace: 'pre-line' }}>{header}{'\n'}{text}</td>;
    
    return message;
  }

  const listMenuContents = (menuId, slotId) => {
    const menuName = Utils.getDispName(windowsets, menuId);
    return <td>{menuName}, 格納スロット({dispSlotName(slotId)})</td>
  }
  
  const listEndMenuContents = (menuId) => {
    const menuName = Utils.getDispName(windowsets, menuId);
    return <td>{menuName}</td>
  }

  const listEmbeddedContents = (menuId, slotId) => {
    const menuName = `[${menuId}]`;
    return <td>{menuName}, 格納スロット({dispSlotName(slotId)})</td>
  }
  
  const listFlagContents = (parameters) => {
    const flagId = parameters[0]; // まとめての場合parameters[1]を使用する
    const control = parameters[2];
    const flagName = dispFlagName(flagId);
    return <td>{flagName} = {control === 0 ? 'OFF' : 'ON'}</td>
  }
  
  const listVariableContents = (parameters, variables) => {
    const variableId = parameters[0]; // まとめての場合parameters[1]を使用する
    const opecode = parameters[2];
    //const operand = parameters[3];  // 定数以外いるか不明なので未実装
    const id = parameters[4];
    const variableName = '[' + Utils.alignId(variableId, 3) + ':' + Utils.getValue(variables, variableId) + ']';
    const opeTexts = ['=', '+=', '-='];
    return <td>{variableName} {opeTexts[opecode]} {id}</td>
  }

  // type:代入タイプ
  //  0:直値 1:文字列 2:json 3:変数 4:スロット 5:乱数 6:ゲームデータ 7:道具
  // param:代入タイプによって変わるパラメータ
  const listOperateSlotContents = (beginId, endId, code, type, param1, param2) => {
    const slotText = dispSlotName(beginId, endId);
    const codeText = _getOpecodeText(code);
    const paramText = _getOperateSlotParamText(type, param1, param2);
    const checkText = code === 0 ? '' : [1,2,7].includes(type) ? '★不正！' : '';
    return <td>{slotText}{codeText}{paramText}{checkText}</td>
  }

  const _getOperateSlotParamText = (type, param1, param2) => {
    switch(type) {
      case 0:
        return param1;
      case 1:
        return param1;
      case 2:
        return 'json:' + param1;
      case 3:
        return '変数:' + dispVariableName(param1);
      case 4:
        return 'スロット:' + dispSlotName(param1);
      case 5:
        return param1 + '～' + param2;
      case 6:
        return _getOperateSlotGameDataText(param1);
      case 7:
        return '道具:' + dispItemName(param1);
      default:
        return '';
    }
  }

  const _getOperateSlotGameDataText = (param) => {
    switch(param) {
      case 0:
        return '所持金';
      case 1:
        return 'パーティ生存人数';
      case 2:
        return 'パーティ人数';
      default:
        return '';
    }
  }

  const _getOpecodeText = (code) => {
    const text = ['=', '+=', '-=', '*=', '/=', '%='];
    return text[code];
  }

  const listGoodsContents = (parameters) => {
    const text = parameters.map(value => dispItemName(value)).join(',');
    return <td>{text}</td>
  }

  const listCompareSlotContents = (id, code, type, param) => {
    const slotText = dispSlotName(id);
    const codeText = _getCompareText(code);
    const paramText = _getNumberOrSlotParamText(type, param);
    return <td>{slotText}{codeText}{paramText}</td>
  }

  const _getCompareText = (code) => {
    const text = ['=', '>=', '<=', '>', '<', '!=', '&'];
    return text[code];
  }

  const listCaseContents = (result) => {
    return <td>結果が {result} の場合</td>
  }

  const listLabelContents = (name) => {
    return <td>{name}</td>
  }

  const listJumpContents = (name) => {
    return <td>{name}</td>
  }
  
  const listGainItemContents = (type, id, memberSlotId) => {
    // 直接指定
    if(type === 0) {
      const itemName = `[${id}:道具名]`;
      return <td>{itemName}を追加, 入手者格納スロット({dispSlotName(memberSlotId)})</td>
    } else {
      return <td>スロット({id})の道具(id指定)を追加, 入手者格納スロット({dispSlotName(memberSlotId)})</td>
    }
  }

  const listChangeGoldContents = (op, type, value) => {
    const opText = op === 0 ? '+' : '-';
    const paramText = _getNumberOrSlotParamText(type, value);
    return <td>{opText}{paramText}</td>
  }

  const _getNumberOrSlotParamText = (type, param) => {
    switch(type) {
      case 0:
      return param;
    case 1:
      return 'スロット:' + dispSlotName(param);
    default:
      return '';
    }
  }

  const listChangePartyContents = (type, variableId) => {
    const typeText = type === 0 ? '加える' : '外す';
    return <td>{typeText}{dispVariableName(variableId)}</td>
  }

  const listRecoverContents = (type, param, hprate, mprate, beginState, endState) => {
    const typeText = _getRecoverTypeText(type, param);
    return <td>{typeText}hp+={hprate}%, mp+={mprate}%, 状態-=優先{beginState}～{endState}</td>
  }

  const _getRecoverTypeText = (type, param) => {
    switch(type) {
      case 0:
        return 'パーティ：';
      case 1:
        return '仲間全部：';
      case 2:
        return 'メンバーId：' + dispMemberName(param);
      case 3:
        return param + '番目：';
      default:
        return '???：';
    }
  }
  
  const listMapScriptContents = (type, id) => {
    const typeText = type === 0 ? '直接：' : 'スロット：';
    const idText = type === 0 ? dispMapEventName(id) : dispSlotName(id);
    return <td>{typeText}{idText}</td>
  }
  
  const listCommonScriptContents = (type, id) => {
    const typeText = type === 0 ? '直接：' : 'スロット：';
    const idText = type === 0 ? dispCommonEventName(id) : dispSlotName(id);
    return <td>{typeText}{idText}</td>
  }

  const listChangeTileContents = (layerIndex, id, x, y) => {
    return <td>レイヤー{layerIndex}, タイル{id}({x},{y})</td>
  }

  const listSwapTileContents = (type, layerIndex) => {
    return <td>{type === 0 ? '戻す' : '置き換える'}(レイヤー={layerIndex})</td>
  }

  const listMoveContents = (type, mapId, x, y, direction) => {
    const [typeText, mapIdText, xText, yText] = _getMoveTypeText(type, mapId, x, y);
    return <td>{typeText}(map:{mapIdText},X:{xText},Y:{yText},方向:{direction})</td>
  }

  const _getMoveTypeText = (type, mapId, x, y) =>{
    if (type === 0) {
      return ['直接', dispMapName(mapId), x, y];
    } else {
      return ['スロット', dispSlotName(mapId), dispSlotName(x), dispSlotName(y)];
    }
  }

  const listMoveFromPositionContents = (type, positionId, direction) => {
    const [typeText, positionIdText] = type === 0 ? 
      ['直接', dispPositionName(positionId)] : 
      ['スロット', dispSlotName(positionId)];
    return <td>{typeText}(position:{positionIdText},方向:{direction})</td>
  }

  const listWarpContents = (type, warpId, direction) => {
    const [typeText, warpIdText] = type === 0 ? 
      ['直接', dispWarpName(warpId)] : 
      ['スロット', dispSlotName(warpId)];
    return <td>{typeText}(position:{warpIdText},方向:{direction})</td>
  }

  const listScrollContents = (type) => {
    const typeText = type === 0 ? '固定' : '固定解除';
    return <td>{typeText}</td>
  }

  const listMoveRouteContents = (target, type, routeId) => {
    if(typeof routeId === 'object') {
      routeId = 1;
    }
    return <td>対象{target} ({type === 0 ? '共通' : 'マップ'},ルートId={routeId})</td>
  }

  const listWaitContents = (frame) => {
    return <td>{frame}フレーム</td>
  }

  const listSeContents = (id) => {
    return <td>{dispSeName(id)}</td>
  }

  const listBgmPlay = (id) => {
    return <td>{dispBgmName(id)}</td>
  }

  const listBgmInterrupt = (id) => {
    return <td>{dispBgmName(id)}</td>
  }

  const listEventTriggerContents = (id) => {
    return <td>id:{id}</td>
  }

  const listCommentContents = (text) => {
    const message = <td style={{ color: 'lime', whiteSpace: 'pre-line' }}>{'#'}{text}</td>;
    return message;
  }

  const viewCommand = () => {
    const parameters = props.command.parameters;
    let title = null;
    let contents = null;
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        title = '文章:';
        contents = listMessageContents(...parameters);//<td style={{ whiteSpace: 'pre-line' }}>{parameters[0]}</td>;
        break;
      case COMMAND.MENU:
        title = 'メニュー表示:';
        contents = listMenuContents(...parameters);
        break;
      case COMMAND.ENDMENU:
        title = 'メニュー終了:';
        contents = listEndMenuContents(...parameters);
        break;
      case COMMAND.MESSAGEOUTWAIT:
        title = '文章無待機解除';
        break;
      case COMMAND.MESSAGECLOSEWAIT:
        title = '文章閉じ待機';
        break;
      case COMMAND.EMBEDDED:
        title = '組み込みメニュー';
        contents = listEmbeddedContents(...parameters);
        break;
      case COMMAND.ENDEMBEDDED:
        title = '組み込みメニュー終了';
        break;
      case COMMAND.FLAG:
        title = 'フラグ:';
        contents = listFlagContents(parameters);
        break;
      case COMMAND.VARIABLE:
        title = '変数:';
        contents = listVariableContents(parameters, variables);
        break;
      case COMMAND.OPERATESLOT:
        title = 'スロット演算:';
        contents = listOperateSlotContents(...parameters);
        break;
      case COMMAND.GOODS:
        title = '商品の設定:';
        contents = listGoodsContents(parameters);
        break;
      case COMMAND.ITEMSPACE:
        title = '道具追加可能判定';
        break;
      case COMMAND.JUDGETRIGGER:
        title = '起動起因判定';
        break;
      case COMMAND.COMPARESLOT:
        title = 'スロット比較';
        contents = listCompareSlotContents(...parameters);
        break;
      case COMMAND.CASE:
        title = 'CASE:';
        contents = listCaseContents(...parameters);
        break;
      case COMMAND.ELSE:
        title = 'ELSE';
        break;
      case COMMAND.ENDBRANCH:
        title = 'ENDBRANCH';
        break;
      case COMMAND.LABEL:
        title = 'ラベル:';
        contents = listLabelContents(...parameters);
        break;
      case COMMAND.JUMP:
        title = 'ラベルジャンプ:';
        contents = listJumpContents(...parameters);
        break;
      case COMMAND.GAINITEM:
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
      case COMMAND.RECOVER:
        title = '回復:';
        contents = listRecoverContents(...parameters);
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
      case COMMAND.MOVEFROMPOSITION:
        title = '位置リスト移動:';
        contents = listMoveFromPositionContents(...parameters);
        break;
      case COMMAND.WARP:
        title = 'ワープ:';
        contents = listWarpContents(...parameters);
        break;
      case COMMAND.SCROLL:
        title = 'スクロールの操作:';
        contents = listScrollContents(...parameters);
        break;
      case COMMAND.MOVEROUTE:
        title = '移動ルート:';
        contents = listMoveRouteContents(...parameters);
        break;
      case COMMAND.MOVEROUTEWAIT:
        title = '移動ルート待機:';
        break;
      case COMMAND.WAIT:
        title = '待機:';
        contents = listWaitContents(...parameters);
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
      case COMMAND.EVENTTRIGGER:
        title = 'イベント起動:';
        contents = listEventTriggerContents(...parameters);
        break;
      case COMMAND.SCREENFADEOUT:
        title = '画面のフェードアウト:';
        break;
      case COMMAND.SCREENFADEIN:
        title = '画面のフェードイン:';
        break;
      case COMMAND.COMMENT:
        title = '';
        contents = listCommentContents(...parameters);
        break;
      default:
        title = '不明なコマンド';
    }

    if (props.command.code !== COMMAND.COMMENT) {
      return (
        <table style={{ marginLeft: props.nest * 15 + 'px' }}><tbody><tr>
          <td style={{ color: 'gray' }}>★{title}</td>
          {contents}
        </tr></tbody></table>
      )
    } else {
      return (
        <table style={{ marginLeft: props.nest * 15 + 'px' }}><tbody><tr>
          {contents}
        </tr></tbody></table>
      )
    }
  }

  // 編集ボタン
  // パラメータなしか不明なコマンドの場合は表示しない
  const editButton = () => {
    const code = props.command.code;
    if(NoParamKeys.includes(code) || !CommandKeys.includes(code)) {
      return null;
    }
    return <button onClick={() => props.onEditClick(props.index)}>編</button>
  }

  return (
    <div className="command-item">
      <div>
      {viewCommand()}
      </div>
      <button onClick={() => props.onAddClick(props.index)}>↑加</button>
      {editButton()}
      <button onClick={() => props.onDeleteClick(props.index)}>除</button>
      <button onClick={() => props.onPasteClick(props.index)}>↑貼</button>
      <button onClick={() => props.onCopyClick(props.index)}>写</button>
    </div>
  );
}

const CommandItemLast = props => {
  return (
    <div className="command-item">
      <button onClick={() => props.onAddClick(props.index)}>追加</button>
      <button onClick={() => props.onPasteClick(props.index)}>貼る</button>
    </div>
  );
}



const CommandList = props => {

  let nest = 0;

  const listItems = props.list.map((command, index) => {
    if(COMMAND.ENDBRANCH === command.code) {
      nest -= 1;
    }
    const result = (
      <CommandItem key={index}
        index={index}
        nest={nest}
        command={command}
        onAddClick={props.onAddClick}
        onEditClick={props.onEditClick}
        onDeleteClick={props.onDeleteClick}
        onPasteClick={props.onPasteClick}
        onCopyClick={props.onCopyClick}
      />
    )
    if([COMMAND.CASE, COMMAND.ELSE].includes(command.code)) {
      nest += 1;
    }

    return result;
  })

  const getCommandList = () => {
    listItems.push(<CommandItemLast
      key={listItems.length}
      index={listItems.length}
      onAddClick={props.onAddClick}
      onPasteClick={props.onPasteClick}
    />);
    return listItems;
  }

  const listStyle = () => {
    return { pointerEvents: props.listEnable ? 'auto' : 'none' };
  }

  return (
    <div className="command-list" style={listStyle()}>
      {getCommandList()}
    </div>
  );
}

export default CommandList;