import React, { useState } from 'react';
import CommandList from './commandList'
import CommandEditor from './commandEditor'
import {COMMAND, NoParamKeys} from './define';
import './index.css';

// コマンド選択ポップアップ
const CommandPopup = props => {
  return (
    <div className='modal'>
      <div className='popup-inner'>
        <h1>{props.text}</h1>
        <div className='command-menu'>
          <button onClick={() => props.closePopup(COMMAND.MESSAGE)}>文章の表示</button>
          <button onClick={() => props.closePopup(COMMAND.MENU)}>メニュー表示</button>
          <button onClick={() => props.closePopup(COMMAND.ENDMENU)}>メニュー終了</button>
          <button onClick={() => props.closePopup(COMMAND.FLAG)}>フラグの処理</button>
          <button onClick={() => props.closePopup(COMMAND.VARIABLE)}>変数の処理</button>
          <button onClick={() => props.closePopup(COMMAND.ITEMSLOT)}>道具をスロット格納</button>
          <button onClick={() => props.closePopup(COMMAND.ITEMSPACE)}>道具追加可能判定</button>
          <button onClick={() => props.closePopup(COMMAND.CASE)}>CASE</button>
          <button onClick={() => props.closePopup(COMMAND.ELSE)}>ELSE</button>
          <button onClick={() => props.closePopup(COMMAND.ENDBRANCH)}>ENDBRANCH</button>
          <button onClick={() => props.closePopup(COMMAND.LABEL)}>ラベル</button>
          <button onClick={() => props.closePopup(COMMAND.JUMP)}>ラベルジャンプ</button>
          <button onClick={() => props.closePopup(COMMAND.GAINITEM)}>道具を追加</button>
          <button onClick={() => props.closePopup(COMMAND.MOVE)}>場所移動</button>
          <button onClick={() => props.closePopup(COMMAND.MAPSCRIPT)}>マップスクリプト</button>
          <button onClick={() => props.closePopup(COMMAND.COMMONSCRIPT)}>コモンスクリプト</button>
        </div>
        <button onClick={() => props.closePopup(0)}>close me</button>
      </div>
    </div>
  );
}

// コマンド編集領域
const Commands = React.forwardRef((props, ref) => {
  const [popup, updatePopup] = useState(false);
  const [listEnable, updateListEnable] = useState(true);
  const [list, updateList] = useState(props.list);
  const commandRef = React.useRef({code: 0, parameters: null})
  const editInfoRef = React.useRef({index: 0, new: true});

  const update = (list) => {
    updateList(list);
  }

  React.useImperativeHandle(ref, () => {
    return {
      getList: () => list,
      updateList: update,
      eraseEditor: () => {
        commandRef.current.code = 0;
        updateListEnable(true);
      }
    }
  });


  const onAddClick = (index) => {
    const editInfo = editInfoRef.current;
    editInfo.index = index;
    editInfo.new = true;
    updateListEnable(false);
    updatePopup(true);
  }

  const onDeleteClick = (index) => {
    const newList = list.filter((value, n) => index !== n);
    updateList(newList);
  }

  const onEditClick = (index) => {
    const editInfo = editInfoRef.current;
    editInfo.index = index;
    editInfo.new = false;
    updateListEnable(false);
    editCommand(list[index]);
  }

  const onUpdate = (command) => {
    const editInfo = editInfoRef.current;
    const newList = list.slice();
    if(editInfo.new) {
      // CASEかELSEの場合ENDBRANCHもセットで追加する
      if([COMMAND.CASE, COMMAND.ELSE].includes(command.code)) {
        const command2 = {code: COMMAND.ENDBRANCH, parameters: []};
        newList.splice(editInfo.index, 0, command, command2);
      } else {
        newList.splice(editInfo.index, 0, command);
      }
    } else {
      newList[editInfo.index] = command;
    }
    updateList(newList);
    commandRef.current.code = 0;

    updateListEnable(true);
  }

  const onCancel = () => {
    commandRef.current.code = 0;
    updateListEnable(true);
  }

  const closePopup = (commandId) => {
    commandRef.current.code = commandId;
    commandRef.current.parameters = null;
    updatePopup(false);
    
    if(NoParamKeys.includes(commandId)) {
      // パラメータなしのコマンドの場合ここでコマンドを追加する
      const command = {code: commandId, parameters: []};
      onUpdate(command);
    } else if(commandId === 0) {
      // キャンセル
      updateListEnable(true);
    }
  }

  const viewPopup = () => {
    if(popup) {
      return (
        <CommandPopup 
          text={'コマンド'}
          closePopup={closePopup}
        />
      );
    } else {
      return null;
    }
  }

  const editCommand = (command) => {
    commandRef.current.code = command.code;
    commandRef.current.parameters = command.parameters;
  }

  return (
    <div className="commands">
      <CommandList
        onAddClick={onAddClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        listEnable={listEnable}
        list={list}
      />
      <CommandEditor
        command={commandRef.current}
        onUpdate={onUpdate}
        onCancel={onCancel}
      />
      {viewPopup()}
    </div>
    );
}
);

export default Commands;