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
  // COMMAND定数を変えるときはここで変えないと使用箇所が変わらない
  return (
    <div className="modal">
      <div className="popup-inner">
        <h1>{props.text}</h1>
        <div className="command-menu">
          {commandButton(COMMAND.MESSAGE, '文章の表示')}
          {commandButton(COMMAND.MENU, 'メニュー表示')}
          {commandButton(COMMAND.EndMenu, 'メニュー終了')}
          {commandButton(COMMAND.MessageSettings, '文章の設定')}
          {commandButton(COMMAND.MessageCloseWait, '文章閉じ待機')}
          {commandButton(COMMAND.Embedded, '組み込みメニュー')}
          {commandButton(COMMAND.EndEmbedded, '組み込みメニュー終了')}
          <button onClick={() => props.closePopup(COMMAND.FLAG)}>
            フラグの処理
          </button>
          <button onClick={() => props.closePopup(COMMAND.VARIABLE)}>
            変数の処理
          </button>
          {commandButton(COMMAND.OperateSlot, 'スロット演算')}
          {commandButton(COMMAND.AssignFixData, '固定データ取得')}
          {commandButton(COMMAND.AssignGameData, 'ゲームデータ取得')}
          {commandButton(COMMAND.AssignSystemSlot, 'システムスロットに代入')}
          {commandButton(COMMAND.AssignMapInfo, 'マップ情報取得')}
          {commandButton(COMMAND.Goods, '商品の設定')}
          {commandButton(COMMAND.ItemSpace, '道具追加可能判定')}
          {commandButton(COMMAND.CompareSlot, 'スロット比較')}
          {commandButton(COMMAND.AssignResult, '結果代入')}
          {commandButton(COMMAND.JudgeBattler, '戦闘者判定')}
          {commandButton(COMMAND.CASE, 'Case')}
          {commandButton(COMMAND.ELSE, 'Else')}
          {commandButton(COMMAND.EndBranch, 'EndBranch')}
          {commandButton(COMMAND.BeginLoop, 'ループ')}
          {commandButton(COMMAND.EndLoop, 'ループ終端')}
          {commandButton(COMMAND.Label, 'ラベル')}
          {commandButton(COMMAND.Jump, 'ラベルジャンプ')}
          {commandButton(COMMAND.EXIT, '以降実行しない')}
          {commandButton(COMMAND.ExitLoop, 'ループ中断')}
          {commandButton(COMMAND.ChangeItem, '道具変更')}
          {commandButton(COMMAND.ChangeGold, '所持金変更')}
          {commandButton(COMMAND.RegisterMate, '仲間の登録')}
          {commandButton(COMMAND.ChangeParty, 'パーティの変更')}
          {commandButton(COMMAND.ChangeNpc, 'NPCの変更')}
          {commandButton(COMMAND.RefreshMarch, '隊列のリフレッシュ')}
          {commandButton(COMMAND.RECOVER, '回復')}
          {commandButton(COMMAND.ChangeState, '状態変更')}
          <button onClick={() => props.closePopup(COMMAND.CHANGETILE)}>
            タイル変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.SWAPTILE)}>
            タイル切替
          </button>
          <button onClick={() => props.closePopup(COMMAND.MOVE)}>
            場所移動
          </button>
          {commandButton(COMMAND.MoveFromPosition, '位置リスト移動')}
          <button onClick={() => props.closePopup(COMMAND.WARP)}>ワープ</button>
          {commandButton(COMMAND.Location, 'キャラクター位置設定')}
          <button onClick={() => props.closePopup(COMMAND.MoveSettings)}>
            移動の設定
          </button>
          <button onClick={() => props.closePopup(COMMAND.SCROLL)}>
            マップスクロール
          </button>
          {commandButton(COMMAND.MoveRoute, '移動ルート')}
          {commandButton(COMMAND.MoveRouteWait, '移動ルート待機')}
          <button onClick={() => props.closePopup(COMMAND.FOLLOWERCONTROL)}>
            隊列の操作
          </button>
          {commandButton(COMMAND.MapScript, 'マップスクリプト')}
          {commandButton(COMMAND.CommonScript, 'コモンスクリプト')}
          <button onClick={() => props.closePopup(COMMAND.WAIT)}>待機</button>
          <button onClick={() => props.closePopup(COMMAND.FOLLOWERSETTINGS)}>
            隊員の設定変更
          </button>
          <button onClick={() => props.closePopup(COMMAND.EraseEvent)}>
            イベントの消去
          </button>
          {commandButton(COMMAND.SAVE, 'セーブ')}
          {commandButton(COMMAND.AddressSettings, '行先の設定')}
          {commandButton(COMMAND.Se, '効果音')}
          {commandButton(COMMAND.BgmPlay, 'BGM演奏')}
          {commandButton(COMMAND.BgmInterrupt, 'BGM割込')}
          {commandButton(COMMAND.EventTrigger, 'イベント起動')}
          {commandButton(COMMAND.BattleStart, '戦闘開始')}
          {commandButton(COMMAND.ScreenFadeOut, '画面のフェードアウト')}
          {commandButton(COMMAND.ScreenFadeIn, '画面のフェードイン')}
          {commandButton(COMMAND.ScreenShake, '画面のシェイク')}
          {commandButton(COMMAND.MapAnimation, 'マップアニメーション')}
          {commandButton(COMMAND.ChangeTransparent, '透明状態変更')}
          {commandButton(COMMAND.GatherFollowers, '隊列の集合')}
          {commandButton(COMMAND.CharacterOptions, 'キャラオプション')}
          {commandButton(COMMAND.ResetObjects, 'オブジェクトの再設定')}
          {commandButton(COMMAND.PushActionResult, '行動結果追加')}
          {commandButton(COMMAND.ActionMessage, '行動文章指定')}
          {commandButton(COMMAND.ActionMessageSettings, '行動文章の設定')}
          {commandButton(COMMAND.ActionEffect, '行動エフェクト指定')}
          {commandButton(COMMAND.ActionTarget, '行動対象指定')}
          {commandButton(COMMAND.ActionExtra, '追加行動指定')}
          {commandButton(COMMAND.ActionForce, '強制行動指定')}
          {commandButton(COMMAND.Comment, 'コメント')}
          {commandButton(COMMAND.ChangeFloorDamage, '床ダメージ切替')}
          {commandButton(COMMAND.ChangeSlipDamage, '歩行ダメージ切替')}
          {commandButton(COMMAND.ChangeEncounter, 'エンカウント切替')}
          {commandButton(COMMAND.RoomMoveSettings, '部屋移動設定')}
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
        const command2 = { code: COMMAND.EndBranch, parameters: [] };
        newList.splice(editInfo.index, 0, command, command2);
      } else if (command.code === COMMAND.BeginLoop) {
        newList.splice(editInfo.index, 0, command, {
          code: COMMAND.EndLoop,
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
