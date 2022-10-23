import React, { useState } from 'react';
import CommandList from './commandList';
import CommandEditor from './commandEditor';
import { COMMAND, NoParamKeys } from './define';
import './index.css';

// コマンド選択ポップアップ
const CommandPopup = (props) => {
  const commandButton = (code, title) => {
    return <button onClick={() => props.closePopup(code)}>{title}</button>;
  };
  return (
    <div className="modal">
      <div className="popup-inner">
        <h1>{props.text}</h1>
        <div className="command-menu">
          {commandButton(COMMAND.MESSAGE, '文章の表示')}
          {commandButton(COMMAND.MENU, 'メニュー表示')}
          <button onClick={() => props.closePopup(COMMAND.ENDMENU)}>
            メニュー終了
          </button>
          <button onClick={() => props.closePopup(COMMAND.MessageSettings)}>
            文章の設定
          </button>
          <button onClick={() => props.closePopup(COMMAND.MessageCloseWait)}>
            文章閉じ待機
          </button>
          <button onClick={() => props.closePopup(COMMAND.EMBEDDED)}>
            組み込みメニュー
          </button>
          <button onClick={() => props.closePopup(COMMAND.EndEmbedded)}>
            組み込みメニュー終了
          </button>
          <button onClick={() => props.closePopup(COMMAND.FLAG)}>
            フラグの処理
          </button>
          <button onClick={() => props.closePopup(COMMAND.VARIABLE)}>
            変数の処理
          </button>
          <button onClick={() => props.closePopup(COMMAND.OPERATESLOT)}>
            スロット演算
          </button>
          <button onClick={() => props.closePopup(COMMAND.ASSIGNFIXDATA)}>
            固定データ取得
          </button>
          <button onClick={() => props.closePopup(COMMAND.ASSIGNGAMEDATA)}>
            ゲームデータ取得
          </button>
          {commandButton(COMMAND.ASSIGNSYSTEMSLOT, 'システムスロットに代入')}
          <button onClick={() => props.closePopup(COMMAND.ITEMSPACE)}>
            道具追加可能判定
          </button>
          <button onClick={() => props.closePopup(COMMAND.JudgeTrigger)}>
            起動起因判定
          </button>
          <button onClick={() => props.closePopup(COMMAND.GOODS)}>
            商品の設定
          </button>
          {commandButton(COMMAND.COMPARESLOT, 'スロット比較')}
          {commandButton(COMMAND.ASSIGNRESULT, '結果代入')}
          {commandButton(COMMAND.CASE, 'CASE')}
          {commandButton(COMMAND.ELSE, 'ELSE')}
          {commandButton(COMMAND.ENDBRANCH, 'ENDBRANCH')}
          {commandButton(COMMAND.BEGINLOOP, 'ループ')}
          {commandButton(COMMAND.ENDLOOP, 'ループ終端')}
          <button onClick={() => props.closePopup(COMMAND.LABEL)}>
            ラベル
          </button>
          <button onClick={() => props.closePopup(COMMAND.JUMP)}>
            ラベルジャンプ
          </button>
          {commandButton(COMMAND.EXIT, '以降実行しない')}
          {commandButton(COMMAND.EXITLOOP, 'ループ中断')}
          <button onClick={() => props.closePopup(COMMAND.GAINITEM)}>
            道具を追加
          </button>
          <button onClick={() => props.closePopup(COMMAND.CHANGEGOLD)}>
            所持金変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.CHANGEPARTY)}>
            パーティの変更
          </button>
          {commandButton(COMMAND.CHANGENPC, 'NPCの変更')}
          {commandButton(COMMAND.RECOVER, '回復')}
          {commandButton(COMMAND.CHANGESTATE, '状態変更')}
          <button onClick={() => props.closePopup(COMMAND.CHANGETILE)}>
            タイル変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.SWAPTILE)}>
            タイル切替
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVE)}>
            場所移動
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVEFROMPOSITION)}>
            位置リスト移動
          </button>
          <button onClick={() => props.closePopup(COMMAND.WARP)}>ワープ</button>
          <button onClick={() => props.closePopup(COMMAND.LOCATION)}>
            キャラクター位置設定
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVESETTINGS)}>
            移動の設定
          </button>
          <button onClick={() => props.closePopup(COMMAND.SCROLL)}>
            マップスクロール
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVEROUTE)}>
            移動ルート
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVEROUTEWAIT)}>
            移動ルート待機
          </button>
          <button onClick={() => props.closePopup(COMMAND.FOLLOWERCONTROL)}>
            隊列の操作
          </button>
          <button onClick={() => props.closePopup(COMMAND.MAPSCRIPT)}>
            マップスクリプト
          </button>
          <button onClick={() => props.closePopup(COMMAND.COMMONSCRIPT)}>
            コモンスクリプト
          </button>
          <button onClick={() => props.closePopup(COMMAND.WAIT)}>待機</button>
          <button onClick={() => props.closePopup(COMMAND.FOLLOWERSETTINGS)}>
            隊員の設定変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.EraseEvent)}>
            イベントの消去
          </button>
          {commandButton(COMMAND.SAVE, 'セーブ')}
          {commandButton(COMMAND.ADDRESSSETTINGS, '行先の設定')}
          <button onClick={() => props.closePopup(COMMAND.SE)}>効果音</button>
          <button onClick={() => props.closePopup(COMMAND.BGMPLAY)}>
            BGM演奏
          </button>
          <button onClick={() => props.closePopup(COMMAND.BGMINTERRUPT)}>
            BGM割込
          </button>
          <button onClick={() => props.closePopup(COMMAND.EVENTTRIGGER)}>
            イベント起動
          </button>
          {commandButton(COMMAND.SCREENFADEOUT, '画面のフェードアウト')}
          {commandButton(COMMAND.SCREENFADEIN, '画面のフェードイン')}
          <button onClick={() => props.closePopup(COMMAND.CHANGETRANSPARENT)}>
            透明状態変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.GATHERFOLLOWERS)}>
            隊列の集合
          </button>
          {commandButton(COMMAND.ResetObjects, 'オブジェクトの再設定')}
          {commandButton(COMMAND.PushActionResult, '戦闘行動結果追加')}
          {commandButton(COMMAND.BattleMessage, '戦闘文章指定')}
          {commandButton(COMMAND.BattleMessageSettings, '戦闘文章の設定')}
          {commandButton(COMMAND.BattleEffect, '戦闘エフェクト指定')}
          {commandButton(COMMAND.BattleTarget, '戦闘行動対象指定')}
          <button onClick={() => props.closePopup(COMMAND.COMMENT)}>
            コメント
          </button>
        </div>
        <button onClick={() => props.closePopup(0)}>close me</button>
      </div>
    </div>
  );
};

// コマンド編集領域
const Commands = React.forwardRef((props, ref) => {
  const [popup, updatePopup] = useState(false);
  const [listEnable, updateListEnable] = useState(true);
  const [list, updateList] = useState(props.list);
  const commandRef = React.useRef({ code: 0, parameters: null });
  const editInfoRef = React.useRef({ index: 0, new: true });
  const copyRef = React.useRef({ code: 0, parameters: null });

  const update = (list) => {
    updateList(list);
  };

  React.useImperativeHandle(ref, () => {
    return {
      getList: () => list,
      updateList: update,
      eraseEditor: () => {
        commandRef.current.code = 0;
        updateListEnable(true);
      },
    };
  });

  const onAddClick = (index) => {
    const editInfo = editInfoRef.current;
    editInfo.index = index;
    editInfo.new = true;
    updateListEnable(false);
    updatePopup(true);
  };

  const onDeleteClick = (index) => {
    const newList = list.filter((value, n) => index !== n);
    updateList(newList);
  };

  const onEditClick = (index) => {
    const editInfo = editInfoRef.current;
    editInfo.index = index;
    editInfo.new = false;
    updateListEnable(false);
    editCommand(list[index]);
  };

  const onCopyClick = (index) => {
    const item = list[index];
    console.log(item);
    copyRef.current.code = item.code;
    copyRef.current.parameters = item.parameters.slice();
  };

  const onPasteClick = (index) => {
    if (copyRef.current.code === 0) {
      return;
    }
    const item = {
      code: copyRef.current.code,
      parameters: copyRef.current.parameters.slice(),
    };
    const newList = list.slice();
    newList.splice(index, 0, item);
    updateList(newList);
  };

  const onUpdate = (command) => {
    const editInfo = editInfoRef.current;
    const newList = list.slice();
    if (editInfo.new) {
      // CASEかELSEの場合ENDBRANCHもセットで追加する
      if ([COMMAND.CASE, COMMAND.ELSE].includes(command.code)) {
        const command2 = { code: COMMAND.ENDBRANCH, parameters: [] };
        newList.splice(editInfo.index, 0, command, command2);
      } else if (command.code === COMMAND.BEGINLOOP) {
        newList.splice(editInfo.index, 0, command, {
          code: COMMAND.ENDLOOP,
          parameters: [],
        });
      } else {
        newList.splice(editInfo.index, 0, command);
      }
    } else {
      newList[editInfo.index] = command;
    }
    updateList(newList);
    commandRef.current.code = 0;

    updateListEnable(true);
  };

  const onCancel = () => {
    commandRef.current.code = 0;
    updateListEnable(true);
  };

  const closePopup = (commandId) => {
    commandRef.current.code = commandId;
    commandRef.current.parameters = null;
    updatePopup(false);

    if (NoParamKeys.includes(commandId)) {
      // パラメータなしのコマンドの場合ここでコマンドを追加する
      const command = { code: commandId, parameters: [] };
      onUpdate(command);
    } else if (commandId === 0) {
      // キャンセル
      updateListEnable(true);
    }
  };

  const viewPopup = () => {
    if (popup) {
      return <CommandPopup text={'コマンド'} closePopup={closePopup} />;
    } else {
      return null;
    }
  };

  const editCommand = (command) => {
    commandRef.current.code = command.code;
    commandRef.current.parameters = command.parameters;
  };

  return (
    <div className="commands">
      <CommandList
        onAddClick={onAddClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onCopyClick={onCopyClick}
        onPasteClick={onPasteClick}
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
});

export default Commands;
