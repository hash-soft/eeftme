import React from 'react';
import './index.css';
import { COMMAND, CommandKeys, NoParamKeys } from './define';
import { Flags, Variables, Slots } from './contents'
import Utils from './utils'


const CommandItem = props => {

  const flags = React.useContext(Flags);
  const variables = React.useContext(Variables);
  const slots = React.useContext(Slots);

  const slotName = (id) => {
    const name = slots[id - 1] === undefined ? '' : slots[id - 1].name;
    return name;
  }

  const listMenuContents = (menuId, slotId) => {
    const menuName = `[${menuId}]`;
    return <td>{menuName}, 格納スロット({slotId}:{slotName(slotId)})</td>
  }
  
  const listEndMenuContents = (menuId) => {
    const menuName = `${menuId}`;
    return <td>{menuName}</td>
  }

  const listEmbeddedContents = (menuId, slotId) => {
    const menuName = `[${menuId}]`;
    return <td>{menuName}, 格納スロット({slotId}:{slotName(slotId)})</td>
  }
  
  const listFlagContents = (parameters, flags) => {
    const flagId = parameters[0]; // まとめての場合parameters[1]を使用する
    const control = parameters[2];
    const flagName = '[' + Utils.alignId(flagId, 3) + ':' + flags[flagId - 1].name + ']';
    return <td>{flagName} = {control === 0 ? 'OFF' : 'ON'}</td>
  }
  
  const listVariableContents = (parameters, variables) => {
    const variableId = parameters[0]; // まとめての場合parameters[1]を使用する
    const opecode = parameters[2];
    //const operand = parameters[3];  // 定数以外いるか不明なので未実装
    const id = parameters[4];
    const variableName = '[' + Utils.alignId(variableId, 3) + ':' + variables[variableId - 1].name + ']';
    const opeTexts = ['=', '+=', '-='];
    return <td>{variableName} {opeTexts[opecode]} {id}</td>
  }
  
  const listItemSlotContents = (itemId, slotId1, slotId2) => {
    const itemName = `[${itemId}:道具名]`;
    return <td>{itemName}, 格納スロット(id:{slotId1}:{slotName(slotId1)}, object:{slotId2}:{slotName(slotId2)})</td>
  }

  const listGoodsContents = (parameters) => {
    const goods = `[${parameters}]`;
    return <td>{goods}</td>
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
      return <td>{itemName}を追加, 入手者格納スロット({memberSlotId}:{slotName(memberSlotId)})</td>
    } else {
      return <td>スロット({id})の道具(id指定)を追加, 入手者格納スロット({memberSlotId}:{slotName(memberSlotId)})</td>
    }
  }

  const listChangeGoldContents = (op, type, value) => {
    const opText = op === 0 ? '+' : '-';
    // 直接指定
    if(type === 0) {
      return <td>{opText}{value}</td>
    } else {
      return <td>{opText}スロット({value}:{slotName(value)})</td>
    }
  }
  
  const listMapScriptContents = (id) => {
    return <td>({id})</td>
  }
  
  const listCommonScriptContents = (id) => {
    return <td>({id})</td>
  }

  const listChangeTileContents = (layerIndex, id, x, y) => {
    return <td>レイヤー{layerIndex}, タイル{id}({x},{y})</td>
  }

  const listSwapTileContents = (type, layerIndex) => {
    return <td>{type === 0 ? '戻す' : '置き換える'}(レイヤー={layerIndex})</td>
  }

  const listMoveContents = (type, name, x, y, direction, pattern) => {
    return <td>{type === 0 ? '同じマップ' : name}(X={x},Y={y},方向={direction},パターン={pattern})</td>
  }

  const listMoveRouteContents = (type, routeId, wait) => {
    return <td>{type === 0 ? '共通' : 'マップ'}(ルートId={routeId},ウェイト={wait === 0 ? 'なし' : 'あり'})</td>
  }

  const listWaitContents = (frame) => {
    return <td>{frame}フレーム</td>
  }

  const listSeContents = (id) => {
    return <td>id:{id}</td>
  }

  const listEventTriggerContents = (id) => {
    return <td>id:{id}</td>
  }

  const viewCommand = () => {
    const parameters = props.command.parameters;
    let title = null;
    let contents = null;
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        title = '文章:';
        contents = <td style={{ whiteSpace: 'pre-line' }}>{parameters[0]}</td>;
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
        title = '文章待機';
        break;
      case COMMAND.EMBEDDED:
        title = '組み込みメニュー';
        contents = listEmbeddedContents(...parameters);
        break;
      case COMMAND.FLAG:
        title = 'フラグ:';
        contents = listFlagContents(parameters, flags);
        break;
      case COMMAND.VARIABLE:
        title = '変数:';
        contents = listVariableContents(parameters, variables);
        break;
      case COMMAND.ITEMSLOT:
        title = '道具をスロット格納:';
        contents = listItemSlotContents(...parameters);
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
      case COMMAND.MOVEROUTE:
        title = '移動ルート:';
        contents = listMoveRouteContents(...parameters);
        break;
      case COMMAND.WAIT:
        title = '待機:';
        contents = listWaitContents(...parameters);
        break;
      case COMMAND.SE:
        title = '効果音:';
        contents = listSeContents(...parameters);
        break;
      case COMMAND.EVENTTRIGGER:
        title = 'イベント起動:';
        contents = listEventTriggerContents(...parameters);
        break;
      default:
        title = '不明なコマンド';
    }

    return (
      <table style={{ marginLeft: props.nest * 15 + 'px' }}><tbody><tr>
          <td style={{ color: 'gray'}}>★{title}</td>
          {contents}
        </tr></tbody></table>
    )
  }

  // 編集ボタン
  // パラメータなしか不明なコマンドの場合は表示しない
  const editButton = () => {
    const code = props.command.code;
    if(NoParamKeys.includes(code) || !CommandKeys.includes(code)) {
      return null;
    }
    return <button onClick={() => props.onEditClick(props.index)}>編集</button>
  }

  return (
    <div className="command-item">
      <div>
      {viewCommand()}
      </div>
      <button onClick={() => props.onAddClick(props.index)}>↑追加</button>
      {editButton()}
      <button onClick={() => props.onDeleteClick(props.index)}>削除</button>
    </div>
  );
}

const CommandItemLast = props => {
  return (
    <div className="command-item">
      <button onClick={() => props.onAddClick(props.index)}>追加</button>
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