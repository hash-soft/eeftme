import React from 'react';
import {
  simpleSelectItems,
  pairSelectItems,
  FlagSelectBox,
  VariableSelectBox,
  SlotSelectBox,
  MessageSelectBox,
  EffectSelectBox,
  SystemSlotIdSelectBox,
  ItemSelectBox,
  SkillSelectBox,
  StateSelectBox,
  MenuSelectBox,
  MapSelectBox,
  PositionSelectBox,
  WarpSelectBox,
  SeSelectBox,
  BgmSelectBox,
  MapEventSelectBox,
  CommonEventSelectBox,
  MemberSelectBox,
  EnemySelectBox,
  TerrainSelectBox,
  TroopSelectBox,
  EncounterSelectBox,
} from './selectBoxSet';
import { NumberEdit } from './editBoxSet';
import Utils from './utils';
import { COMMAND, VariableRange } from './define';
import './index.css';

const sliceParameters = (parameters) => {
  return parameters && parameters.slice();
};

const CommandBase = (props) => {
  return (
    <div>
      <div style={{ color: 'red', fontSize: '20px' }}>{props.title}</div>
      {props.children}
      <div style={{ marginTop: '10px' }}>
        <button onClick={props.onUpdate}>適用</button>
        <button onClick={props.onCancel}>キャンセル</button>
      </div>
    </div>
  );
};

// 文章の表示
const Message = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 表示テキスト
  // 1: 追加タイプ
  const parametersRef = React.useRef(data || ['', 0]);
  const parameters = parametersRef.current;
  const typeList = Utils.getMessageTypeList();

  const onChange = (e) => {
    parameters[0] = e.target.value;
  };

  const onRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <textarea
          cols="50"
          rows="10"
          defaultValue={parameters[0]}
          style={{ resize: 'none' }}
          onChange={(e) => onChange(e)}
        ></textarea>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[1] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[1] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[2]}
      </div>
    </CommandBase>
  );
};

// メニュー表示
const Menu = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: メニューId
  // 1: 初期インデックス -1なら記憶インデックス
  // 2: 親ウィンドウ
  // 3: 追加データを格納する開始スロットId
  // 4: 追加データ数を格納するスロットId
  // 5: キャンセルインデックス
  // 6: クローズタイプ
  const parametersRef = React.useRef(data || [1, -1, 0, 0, 0, -1, 0]);
  const parameters = parametersRef.current;
  const closeTypeList = ['閉じない', '閉じる', 'キャンセル時だけ閉じる'];

  const onMenuChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onInitIndexFocusOff = (value) => {
    parameters[1] = value;
  };

  const onParentChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onCountSlotChange = (e) => {
    parameters[4] = parseInt(e.target.value);
  };

  const onCancelFocusOff = (value) => {
    parameters[5] = value;
  };

  const onCloseTypeChange = (e) => {
    parameters[6] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'メニュー表示'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>メニューId：</font>
        <MenuSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onMenuChange(e)}
        />
      </div>
      <div>
        <font>初期位置：</font>
        <NumberEdit
          min={-1}
          max={50}
          value={parameters[1]}
          onValueFocusOff={onInitIndexFocusOff}
        />
      </div>
      <div>
        <font>親Id：</font>
        <MenuSelectBox
          selectValue={parameters[2]}
          onChange={(e) => onParentChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <font>追加データ開始格納スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[3]}
          onChange={(e) => onSlotChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <font>追加データ数格納スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[4]}
          onChange={(e) => onCountSlotChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <font>キャンセルインデックス：</font>
        <NumberEdit
          min={-1}
          max={50}
          value={parameters[5]}
          onValueFocusOff={onCancelFocusOff}
        />
      </div>
      <font>クローズタイプ：</font>
      <select
        defaultValue={parameters[6]}
        onChange={(e) => onCloseTypeChange(e)}
      >
        {simpleSelectItems(closeTypeList)}
      </select>
    </CommandBase>
  );
};

// メニュー終了
const EndMenu = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: メニューId
  const parametersRef = React.useRef(data || [1]);
  const parameters = parametersRef.current;

  const onMenuChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>メニューId：</font>
      <MenuSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onMenuChange(e)}
      />
    </CommandBase>
  );
};

// 文章の設定
const MessageSettings = (props) => {
  // 0: 設定タイプ
  // 1: 値
  const parameters = GetParameters(props.command.parameters, [0, 0]);
  let waitCount = parameters[1];
  let waitSpeed = parameters[1];
  let wordsSoundId = parameters[1];
  let indent = parameters[1];
  let suspend = parameters[1];
  let autoPause = parameters[1];
  let mode = parameters[1];
  let hoist = parameters[1];

  const selectList = Utils.getMessageOptionTypeSelectList();
  const orNotList = Utils.getOrNotSelectList();
  const modeList = Utils.getMessageModeList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onWaitCountFocusOff = (value) => {
    waitCount = value;
  };

  const onWaitSpeedFocusOff = (value) => {
    waitSpeed = value;
  };

  const onWordsSoundIdChange = (e) => {
    wordsSoundId = parseInt(e.target.value);
  };

  const onIndentFocusOff = (value) => {
    indent = value;
  };

  const onSuspendRadioChange = (e) => {
    suspend = parseInt(e.target.value);
  };

  const onAutoPauseChange = (e) => {
    autoPause = parseInt(e.target.value);
  };

  const onModeChange = (e) => {
    mode = parseInt(e.target.value);
  };

  const onHoistChange = (e) => {
    hoist = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[1] = [
      waitCount,
      waitSpeed,
      0,
      0,
      0,
      wordsSoundId,
      indent,
      suspend,
      autoPause,
      mode,
      hoist,
      0,
      0,
      0,
    ][parameters[0]];
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'文章の設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[0]}
        <NumberEdit
          min={0}
          max={100}
          value={waitCount}
          onValueFocusOff={onWaitCountFocusOff}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[1]}
        <NumberEdit
          min={0}
          max={8}
          value={waitSpeed}
          onValueFocusOff={onWaitSpeedFocusOff}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[2]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="3"
          defaultChecked={parameters[0] === 3 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[3]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="4"
          defaultChecked={parameters[0] === 4 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[4]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="5"
          defaultChecked={parameters[0] === 5 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[5]}
        <SeSelectBox
          selectValue={wordsSoundId}
          onChange={(e) => onWordsSoundIdChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="6"
          defaultChecked={parameters[0] === 6 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[6]}
        <NumberEdit
          min={0}
          max={5}
          value={indent}
          onValueFocusOff={onIndentFocusOff}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="7"
          defaultChecked={parameters[0] === 7 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[7]}
        <input
          type="radio"
          name="suspend"
          value="0"
          defaultChecked={suspend === 0 ? 'checked' : ''}
          onChange={(e) => onSuspendRadioChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="suspend"
          value="1"
          defaultChecked={suspend === 1 ? 'checked' : ''}
          onChange={(e) => onSuspendRadioChange(e)}
        />
        {orNotList[1]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="8"
          defaultChecked={parameters[0] === 8 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[8]}
        <input
          type="radio"
          name="autoPause"
          value="0"
          defaultChecked={suspend === 0 ? 'checked' : ''}
          onChange={(e) => onAutoPauseChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="autoPause"
          value="1"
          defaultChecked={suspend === 1 ? 'checked' : ''}
          onChange={(e) => onAutoPauseChange(e)}
        />
        {orNotList[1]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="9"
          defaultChecked={parameters[0] === 9 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[9]}
        <input
          type="radio"
          name="mode"
          value="0"
          defaultChecked={suspend === 0 ? 'checked' : ''}
          onChange={(e) => onModeChange(e)}
        />
        {modeList[0]}
        <input
          type="radio"
          name="mode"
          value="1"
          defaultChecked={suspend === 1 ? 'checked' : ''}
          onChange={(e) => onModeChange(e)}
        />
        {modeList[1]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="10"
          defaultChecked={parameters[0] === 10 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[10]}
        <input
          type="radio"
          name="hoist"
          value="0"
          defaultChecked={suspend === 0 ? 'checked' : ''}
          onChange={(e) => onHoistChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="hoist"
          value="1"
          defaultChecked={suspend === 1 ? 'checked' : ''}
          onChange={(e) => onHoistChange(e)}
        />
        {orNotList[1]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="11"
          defaultChecked={parameters[0] === 11 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[11]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="12"
          defaultChecked={parameters[0] === 12 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[12]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="13"
          defaultChecked={parameters[0] === 13 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[13]}
      </div>
    </CommandBase>
  );
};

// 組み込みメニュー
const Embedded = (props) => {
  // 0: メニューId
  // 1: 開始位置
  // 2: 遅延時間
  const parameters = GetParameters(props.command.parameters, [1, 0, -1]);

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onStartPosFocusOff = (value) => {
    parameters[1] = value;
  };

  const onDelayTimeFocusOff = (value) => {
    parameters[2] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'組み込みメニュー'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>組み込みId：</font>
      <NumberEdit
        min={0}
        max={100}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
      <font>開始位置：</font>
      <NumberEdit
        min={0}
        max={100}
        value={parameters[1]}
        onValueFocusOff={onStartPosFocusOff}
      />
      <div>
        <font>遅延時間：</font>
        <NumberEdit
          min={-1}
          max={60}
          value={parameters[2]}
          onValueFocusOff={onDelayTimeFocusOff}
        />
      </div>
    </CommandBase>
  );
};

// フラグ
const Flag = (props) => {
  // 0: 先頭Id
  // 1: 終端Id
  // 2: ONOFF
  // 3: 0 直接 1 スロット参照
  const parameters = GetParameters(props.command.parameters, [1, 1, 1, 0]);
  const opecode = parameters[2];
  let direct = parameters[3] === 0 ? parameters[0] : 1;
  let refId = parameters[3] === 1 ? parameters[0] : 1;
  let multi = parameters[0] !== parameters[1];
  const typeList = Utils.getDirectOrSlotList();

  const onFlagChange = (e) => {
    direct = parseInt(e.target.value);
  };

  const onFlagEndChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onMultiCheck = (e) => {
    multi = e.target.checked;
  };

  const onSlotChange = (e) => {
    refId = parseInt(e.target.value);
  };

  const onRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onTypeRadioChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[0] = [direct, refId][parameters[3]];
    if (!multi || parameters[3] === 1) {
      parameters[1] = parameters[0];
    } else {
      const values = parameters.slice(0, 2).sort((a, b) => a - b);
      parameters.splice(0, 2, ...values);
    }

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'フラグの処理'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <div>
          <input
            type="radio"
            name="type"
            value="0"
            defaultChecked={parameters[3] === 0 ? 'checked' : ''}
            onChange={(e) => onTypeRadioChange(e)}
          />
          {typeList[0]}
        </div>
        <FlagSelectBox selectValue={direct} onChange={(e) => onFlagChange(e)} />
        ～
        <input
          type="checkbox"
          name="multi"
          defaultChecked={multi ? 'checked' : ''}
          onChange={(e) => onMultiCheck(e)}
        />
        <FlagSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onFlagEndChange(e)}
        />
        <div>
          <input
            type="radio"
            name="type"
            value="1"
            defaultChecked={parameters[3] === 1 ? 'checked' : ''}
            onChange={(e) => onTypeRadioChange(e)}
          />
          {typeList[1]}
        </div>
        <SlotSelectBox selectValue={refId} onChange={(e) => onSlotChange(e)} />
      </div>
      <font>操作：</font>
      <div>
        <input
          type="radio"
          name="opecode"
          value="0"
          defaultChecked={opecode === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        OFF
        <input
          type="radio"
          name="opecode"
          value="1"
          defaultChecked={opecode === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        ON
      </div>
    </CommandBase>
  );
};

// 変数
const Variable = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 先頭Id
  // 1: 終端Id
  // 2: 演算子
  // 3: 数値タイプ 0:定数
  // 4: 数値
  const parametersRef = React.useRef(data || [1, 1, 0, 0, 0]);
  const parameters = parametersRef.current;
  const opecode = parameters[2];
  let multi = parameters[0] !== parameters[1];

  const onVariableChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onVariableEndChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onMultiCheck = (e) => {
    multi = e.target.checked;
  };

  const onOpecodeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onValueFocusOff = (value) => {
    parameters[4] = value;
  };

  const onUpdate = () => {
    if (!multi) {
      parameters[1] = parameters[0];
    } else {
      const values = parameters.slice(0, 2).sort((a, b) => a - b);
      parameters.splice(0, 2, ...values);
    }
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'変数の処理'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <VariableSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onVariableChange(e)}
      />
      ～
      <input
        type="checkbox"
        name="multi"
        defaultChecked={multi ? 'checked' : ''}
        onChange={(e) => onMultiCheck(e)}
      />
      <VariableSelectBox
        selectValue={parameters[1]}
        onChange={(e) => onVariableEndChange(e)}
      />
      <div>
        <input
          type="radio"
          name="opecode"
          value="0"
          defaultChecked={opecode === 0 ? 'checked' : ''}
          onChange={(e) => onOpecodeChange(e)}
        />
        代入
        <input
          type="radio"
          name="opecode"
          value="1"
          defaultChecked={opecode === 1 ? 'checked' : ''}
          onChange={(e) => onOpecodeChange(e)}
        />
        加算
        <input
          type="radio"
          name="opecode"
          value="2"
          defaultChecked={opecode === 2 ? 'checked' : ''}
          onChange={(e) => onOpecodeChange(e)}
        />
        減算
      </div>
      <font>定数：</font>
      <NumberEdit
        min={VariableRange.MIN}
        max={VariableRange.MAX}
        value={parameters[4]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
};

// スロット演算
const OperateSlot = (props) => {
  // 0: 先頭Id
  // 1: 終端Id
  // 2: 演算子
  // 3: 演算タイプ
  // 4: パラメータ1
  // 5: パラメータ2
  // 6: 0 直接 1 スロット参照
  const parameters = GetParameters(
    props.command.parameters,
    [1, 1, 0, 0, 0, 0, 0]
  );
  const code = parameters[2];
  const type = parameters[3];
  let num = type === 0 ? parameters[4] : 0;
  let str = type === 1 ? parameters[4] : '';
  let flagId = type === 2 ? parameters[4] : '';
  let variableId = type === 3 ? parameters[4] : 1;
  let slotId = type === 4 ? parameters[4] : 1;
  let [rand1, rand2] = type === 5 ? [parameters[4], parameters[5]] : [0, 0];
  let gameId = type === 6 ? parameters[4] : 0;
  let multi = parameters[0] !== parameters[1];
  let refSlotId = type === 7 ? parameters[4] : 1;
  const gameList = ['所持金', 'パーティ生存人数', 'パーティ人数'];
  const opeList = Utils.getOpecodeSelectList();
  const assignList = Utils.getAssignSelectList();
  const typeList = Utils.getDirectOrRefList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onSlotEndChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onMultiCheck = (e) => {
    multi = e.target.checked;
  };

  const onCodeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onValueFocusOffNum = (value) => {
    num = value;
  };

  const onStrChange = (e) => {
    str = e.target.value;
  };

  const onFlagChange = (e) => {
    flagId = parseInt(e.target.value);
  };

  const onVariableChange = (e) => {
    variableId = parseInt(e.target.value);
  };

  const onSlotIdChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onValueFocusOffRand1 = (value) => {
    rand1 = value;
  };

  const onValueFocusOffRand2 = (value) => {
    rand2 = value;
  };

  const onGameIdChange = (e) => {
    gameId = parseInt(e.target.value);
  };

  const onRefSlotIdChange = (e) => {
    refSlotId = parseInt(e.target.value);
  };

  const onRefTypeRadioChange = (e) => {
    parameters[6] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const values1 = [
      num,
      str,
      flagId,
      variableId,
      slotId,
      rand1,
      gameId,
      refSlotId,
    ];
    const values2 = [0, 0, 0, 0, 0, rand2, 0];
    const newType = parameters[3];
    [parameters[4], parameters[5]] = [values1[newType], values2[newType]];
    if (!multi) {
      parameters[1] = parameters[0];
    } else {
      const values = parameters.slice(0, 2).sort((a, b) => a - b);
      parameters.splice(0, 2, ...values);
    }

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'スロット演算'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      ～
      <input
        type="checkbox"
        name="multi"
        defaultChecked={multi ? 'checked' : ''}
        onChange={(e) => onMultiCheck(e)}
      />
      <SlotSelectBox
        selectValue={parameters[1]}
        onChange={(e) => onSlotEndChange(e)}
      />
      <div>
        <font>操作対象：</font>
        <input
          type="radio"
          name="reftype"
          value="0"
          defaultChecked={parameters[6] === 0 ? 'checked' : ''}
          onChange={(e) => onRefTypeRadioChange(e)}
        />
        {typeList[0]}
        <input
          type="radio"
          name="reftype"
          value="1"
          defaultChecked={parameters[6] === 1 ? 'checked' : ''}
          onChange={(e) => onRefTypeRadioChange(e)}
        />
        {typeList[1]}
      </div>
      <div>
        <input
          type="radio"
          name="code"
          value="0"
          defaultChecked={code === 0 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[0]}</font>
        <input
          type="radio"
          name="code"
          value="1"
          defaultChecked={code === 1 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[1]}</font>
        <input
          type="radio"
          name="code"
          value="2"
          defaultChecked={code === 2 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[2]}</font>
        <input
          type="radio"
          name="code"
          value="3"
          defaultChecked={code === 3 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[3]}</font>
        <input
          type="radio"
          name="code"
          value="4"
          defaultChecked={code === 4 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[4]}</font>
        <input
          type="radio"
          name="code"
          value="5"
          defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[5]}</font>
        <input
          type="radio"
          name="code"
          value="6"
          defaultChecked={code === 6 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[6]}</font>
        <input
          type="radio"
          name="code"
          value="7"
          defaultChecked={code === 7 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[7]}</font>
        <input
          type="radio"
          name="code"
          value="8"
          defaultChecked={code === 8 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>{opeList[8]}</font>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[0]}：</font>
        <NumberEdit
          min={VariableRange.MIN}
          max={VariableRange.MAX}
          value={num}
          onValueFocusOff={onValueFocusOffNum}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[1]}：</font>
        <textarea
          cols="30"
          rows="4"
          defaultValue={str}
          style={{ resize: 'none' }}
          onChange={(e) => onStrChange(e)}
        ></textarea>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[2]}：</font>
        <FlagSelectBox selectValue={flagId} onChange={(e) => onFlagChange(e)} />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="3"
          defaultChecked={type === 3 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[3]}：</font>
        <VariableSelectBox
          selectValue={variableId}
          onChange={(e) => onVariableChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="4"
          defaultChecked={type === 4 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[4]}：</font>
        <SlotSelectBox
          selectValue={slotId}
          onChange={(e) => onSlotIdChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="5"
          defaultChecked={type === 5 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[5]}：</font>
        <NumberEdit
          min={VariableRange.MIN}
          max={VariableRange.MAX}
          value={rand1}
          onValueFocusOff={onValueFocusOffRand1}
        />
        <font>～</font>
        <NumberEdit
          min={VariableRange.MIN}
          max={VariableRange.MAX}
          value={rand2}
          onValueFocusOff={onValueFocusOffRand2}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="6"
          defaultChecked={type === 6 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[6]}：</font>
        <select defaultValue={gameId} onChange={(e) => onGameIdChange(e)}>
          {simpleSelectItems(gameList)}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="7"
          defaultChecked={type === 7 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{assignList[7]}：</font>
        <SlotSelectBox
          selectValue={refSlotId}
          onChange={(e) => onRefSlotIdChange(e)}
        />
      </div>
    </CommandBase>
  );
};

/**
 * 固定データ取得
 * @param {*} props
 */
const AssignFixData = (props) => {
  // 0: スロットId
  // 1: データの種類
  // 2: パラメータ1
  // 3: パラメータ2
  // 4: 参照にするかどうか
  const parameters = GetParameters(props.command.parameters, [1, 0, 1, 0, 0]);
  const type = parameters[1];
  let messageId = type === 0 ? parameters[2] : 1;
  let itemId = type === 1 ? parameters[2] : 1;
  let itemProperty = type === 1 ? parameters[3] : 0;
  let systemSlotName = type === 2 ? parameters[2] : '';
  let refId = parameters[4] === 1 ? parameters[2] : 1;
  const typeList = Utils.getFixDataTypeSelectList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onMessageIdChange = (e) => {
    messageId = parseInt(e.target.value);
  };

  const onItemIdChange = (e) => {
    itemId = parseInt(e.target.value);
  };

  const onItemPropertyChange = (e) => {
    itemProperty = parseInt(e.target.value);
  };

  const onSystemSlotIdChange = (e) => {
    systemSlotName = e.target.value;
  };

  const onRefCheckChange = (e) => {
    parameters[4] = e.target.checked ? 1 : 0;
  };

  const onRefSlotChange = (e) => {
    refId = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const values1 = [messageId, itemId, systemSlotName];
    const values2 = [0, itemProperty];
    const newType = parameters[1];
    [parameters[2], parameters[3]] = [values1[newType], values2[newType]];
    if (parameters[4] === 1) {
      parameters[2] = refId;
    }

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'固定データ取得'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[0]}：</font>
        <div>
          <MessageSelectBox
            selectValue={messageId}
            onChange={(e) => onMessageIdChange(e)}
          />
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[1]}：</font>
        <div>
          <ItemSelectBox
            selectValue={itemId}
            onChange={(e) => onItemIdChange(e)}
          />
          の
          <select
            defaultValue={itemProperty}
            onChange={(e) => onItemPropertyChange(e)}
          >
            {simpleSelectItems(Utils.getItemInfoSelectList())}
          </select>
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[2]}：</font>
        <div>
          <SystemSlotIdSelectBox
            selectValue={systemSlotName}
            onChange={(e) => onSystemSlotIdChange(e)}
          />
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          name="wait"
          defaultChecked={parameters[4] === 1 ? 'checked' : ''}
          onChange={(e) => onRefCheckChange(e)}
        />
        対象を参照にする
      </div>
      <SlotSelectBox selectValue={refId} onChange={(e) => onRefSlotChange(e)} />
    </CommandBase>
  );
};

/**
 * ゲームデータ取得
 * @param {*} props
 */
const AssignGameData = (props) => {
  // 0: スロットId
  // 1: データの種類
  // 2: パラメータ1
  // 3: パラメータ2
  const parameters = GetParameters(props.command.parameters, [1, 0, 0, 0]);
  const type = parameters[1];
  let partyRef = type === 0 ? parameters[1] : 0;
  let partySlotId = type === 0 ? parameters[2] : 1;
  let memberSlotId = type === 1 ? parameters[2] : 1;
  let registerMemberProperty = type === 1 ? parameters[3] : 0;
  let characterSlotId = type === 2 ? parameters[2] : 1;
  let characterProperty = type === 2 ? parameters[3] : 0;
  let tileSlotId = type === 3 ? parameters[2] : 1;
  let tileProperty = type === 3 ? parameters[3] : 0;
  let itemSubjectSlotId = type === 4 ? parameters[2] : 1;
  let itemId = type === 4 ? parameters[3] : 1;
  let stateSubjectSlotId = type === 5 ? parameters[2] : 1;
  let stateId = type === 5 ? parameters[3] : 1;
  let partyProperty = type === 6 ? parameters[3] : 0;
  let textType = type === 7 ? parameters[2] : 0;
  let actionProperty = type === 8 ? parameters[3] : 0;
  const typeList = Utils.getGameDataTypeSelectList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onPartyRefChange = (e) => {
    partyRef = parseInt(e.target.value);
  };

  const onPartySlotIdChange = (e) => {
    partySlotId = parseInt(e.target.value);
  };

  const onMemberSlotIdChange = (e) => {
    memberSlotId = parseInt(e.target.value);
  };

  const onRegisterMemberPropertyChange = (e) => {
    registerMemberProperty = parseInt(e.target.value);
  };

  const onPlayerSlotIdChange = (e) => {
    characterSlotId = parseInt(e.target.value);
  };

  const onPlayerPropertyChange = (e) => {
    characterProperty = parseInt(e.target.value);
  };

  const onTileSlotIdChange = (e) => {
    tileSlotId = parseInt(e.target.value);
  };

  const onTilePropertyChange = (e) => {
    tileProperty = parseInt(e.target.value);
  };

  const onItemSubjectSlotIdChange = (e) => {
    itemSubjectSlotId = parseInt(e.target.value);
  };

  const onItemIdChange = (e) => {
    itemId = parseInt(e.target.value);
  };

  const onStateSubjectSlotIdChange = (e) => {
    stateSubjectSlotId = parseInt(e.target.value);
  };

  const onStateIdChange = (e) => {
    stateId = parseInt(e.target.value);
  };

  const onPartyPropertyChange = (e) => {
    partyProperty = parseInt(e.target.value);
  };

  const onTextTypeChange = (e) => {
    textType = parseInt(e.target.value);
  };

  const onActionPropertyChange = (e) => {
    actionProperty = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const values1 = [
      partySlotId,
      memberSlotId,
      characterSlotId,
      tileSlotId,
      itemSubjectSlotId,
      stateSubjectSlotId,
      0,
      textType,
      0,
    ];
    const values2 = [
      partyRef,
      registerMemberProperty,
      characterProperty,
      tileProperty,
      itemId,
      stateId,
      partyProperty,
      0,
      actionProperty,
    ];
    const newType = parameters[1];
    [parameters[2], parameters[3]] = [values1[newType], values2[newType]];

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'ゲームデータ取得'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>格納スロット：</font>
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[0]}：</font>
        <div>
          <SlotSelectBox
            selectValue={partySlotId}
            onChange={(e) => onPartySlotIdChange(e)}
          />
          番目の
          <select defaultValue={partyRef} onChange={(e) => onPartyRefChange(e)}>
            {simpleSelectItems(Utils.getGameDataPartyMemberList())}
          </select>
          の登録id
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[1]}：</font>
        <div>
          登録id
          <SlotSelectBox
            selectValue={memberSlotId}
            onChange={(e) => onMemberSlotIdChange(e)}
          />
          の
          <select
            defaultValue={registerMemberProperty}
            onChange={(e) => onRegisterMemberPropertyChange(e)}
          >
            {simpleSelectItems(Utils.getRegisterMemberInfoSelectList())}
          </select>
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[2]}：</font>
        <div>
          対象Id
          <SlotSelectBox
            selectValue={characterSlotId}
            onChange={(e) => onPlayerSlotIdChange(e)}
          />
          の
          <select
            defaultValue={characterProperty}
            onChange={(e) => onPlayerPropertyChange(e)}
          >
            {simpleSelectItems(Utils.getPlayerInfoSelectList())}
          </select>
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="3"
          defaultChecked={type === 3 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[3]}：</font>
        <div>
          対象Id
          <SlotSelectBox
            selectValue={tileSlotId}
            onChange={(e) => onTileSlotIdChange(e)}
          />
          の
          <select
            defaultValue={tileProperty}
            onChange={(e) => onTilePropertyChange(e)}
          >
            {simpleSelectItems(Utils.getPlayerInfoSelectList())}
          </select>
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="4"
          defaultChecked={type === 4 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[4]}：</font>
        <div>
          登録id
          <SlotSelectBox
            selectValue={itemSubjectSlotId}
            onChange={(e) => onItemSubjectSlotIdChange(e)}
          />
          の道具
          <ItemSelectBox
            selectValue={itemId}
            onChange={(e) => onItemIdChange(e)}
          />
          の個数
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="5"
          defaultChecked={type === 5 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[5]}：</font>
        <div>
          登録id
          <SlotSelectBox
            selectValue={stateSubjectSlotId}
            onChange={(e) => onStateSubjectSlotIdChange(e)}
          />
          の状態
          <StateSelectBox
            selectValue={itemId}
            onChange={(e) => onStateIdChange(e)}
          />
          になっている
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="6"
          defaultChecked={type === 6 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[6]}：</font>
        <select
          defaultValue={partyProperty}
          onChange={(e) => onPartyPropertyChange(e)}
        >
          {simpleSelectItems(Utils.getPartyInfoSelectList())}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="7"
          defaultChecked={type === 7 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[7]}：</font>
        <select defaultValue={textType} onChange={(e) => onTextTypeChange(e)}>
          {simpleSelectItems(Utils.getGameDataTextSelectList())}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="8"
          defaultChecked={type === 8 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[8]}：</font>
        <select
          defaultValue={actionProperty}
          onChange={(e) => onActionPropertyChange(e)}
        >
          {simpleSelectItems(Utils.getActionIdList())}
        </select>
      </div>
    </CommandBase>
  );
};

/**
 * システムスロットに代入
 * @param {*} props
 */
const AssignSystemSlot = (props) => {
  // 0: システムスロット名
  // 1: スロットId
  const parameters = GetParameters(props.command.parameters, ['', 1]);

  const onSystemSlotIdChange = (e) => {
    parameters[0] = e.target.value;
  };

  const onSlotChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'システムスロットに代入'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>システムスロット：</font>
        <SystemSlotIdSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onSystemSlotIdChange(e)}
        />
      </div>
      <div>
        <font>スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
    </CommandBase>
  );
};

/**
 * マップ情報取得
 * @param {*} props
 */
const AssignMapInfo = (props) => {
  // 0: スロットId
  // 1: データの種類 0: 基本情報 1: 実行イベント 2: 値
  // 2: パラメータ1
  const parameters = GetParameters(props.command.parameters, [1, 0, 0]);
  const type = parameters[1];
  let standard = type === 0 ? parameters[2] : 0;
  let event = type === 1 ? parameters[2] : 0;
  let index = type === 2 ? parameters[2] : 0;
  const typeList = Utils.getMapInfoList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onStandardChange = (e) => {
    standard = parseInt(e.target.value);
  };

  const onEventChange = (e) => {
    event = parseInt(e.target.value);
  };

  const onValueFocusOff = (value) => {
    index = value;
  };

  const onUpdate = () => {
    const values1 = [standard, event, index];
    const newType = parameters[1];
    parameters[2] = values1[newType];

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'マップ情報取得'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>格納スロット：</font>
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[0]}：</font>
        <select defaultValue={standard} onChange={(e) => onStandardChange(e)}>
          {simpleSelectItems(Utils.getMapInfoStandardList())}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[1]}：</font>
        <select defaultValue={event} onChange={(e) => onEventChange(e)}>
          {simpleSelectItems(Utils.getMapInfoEventList())}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>{typeList[2]}：</font>
        <NumberEdit
          min={0}
          max={9}
          value={index}
          onValueFocusOff={onValueFocusOff}
        />
        <font>番目</font>
      </div>
    </CommandBase>
  );
};

// 商品の設定
const Goods = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 道具Id配列
  const parametersRef = React.useRef(data || []);
  const parameters = parametersRef.current;

  const onChange = (e, n) => {
    parameters[n] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = {
      code: props.command.code,
      parameters: parameters.filter((value) => !!value),
    };
    props.onUpdate(command);
  };

  const GoodsList = () => {
    const inputList = new Array(8);
    for (let i = 0; i < inputList.length; i++) {
      inputList[i] = (
        <div>
          <ItemSelectBox
            selectValue={parameters[i]}
            unuse={true}
            onChange={(e) => onChange(e, i)}
          />
        </div>
      );
    }
    return inputList;
  };

  return (
    <CommandBase
      title={'商品の設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>道具Id：</font>
      <GoodsList />
    </CommandBase>
  );
};

// スロット比較
const CompareSlot = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: スロットId
  // 1: 比較演算子
  // 2: 指定タイプ
  // 3: パラメータ
  const parametersRef = React.useRef(data || [1, 0, 0, 0]);
  const parameters = parametersRef.current;
  const code = parameters[1];
  const type = parameters[2];
  let num = type === 0 ? parameters[3] : 0;
  let slotId = type === 1 ? parameters[3] : 1;

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onCodeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onValueFocusOffNum = (value) => {
    num = value;
  };

  const onSlotIdChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[3] = parameters[2] === 0 ? num : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'スロット比較'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input
          type="radio"
          name="code"
          value="0"
          defaultChecked={code === 0 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>=</font>
        <input
          type="radio"
          name="code"
          value="1"
          defaultChecked={code === 1 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>&gt;=</font>
        <input
          type="radio"
          name="code"
          value="2"
          defaultChecked={code === 2 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>&lt;=</font>
        <input
          type="radio"
          name="code"
          value="3"
          defaultChecked={code === 3 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>&gt;</font>
        <input
          type="radio"
          name="code"
          value="4"
          defaultChecked={code === 4 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>&lt;</font>
        <input
          type="radio"
          name="code"
          value="5"
          defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>!=</font>
        <input
          type="radio"
          name="code"
          value="6"
          defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        />
        <font>&amp;</font>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>定数：</font>
      </div>
      <NumberEdit
        min={VariableRange.MIN}
        max={VariableRange.MAX}
        value={num}
        onValueFocusOff={onValueFocusOffNum}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>スロット：</font>
        <SlotSelectBox
          selectValue={slotId}
          onChange={(e) => onSlotIdChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// 結果代入
const AssignResult = (props) => {
  // 0: スロットId
  const parameters = GetParameters(props.command.parameters, [1]);

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'結果代入'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>スロット：</font>
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
    </CommandBase>
  );
};

// 戦闘者判定
const JudgeBattler = (props) => {
  // 0: スロットId
  // 1: 0-指定なし 1-味方 2-敵 3-仲間（未実装）
  // 2: メンバーId or 敵Id or 仲間Id
  const parameters = GetParameters(props.command.parameters, [1, 0, 0]);
  let memberId = parameters[1] === 1 ? parameters[2] : 1;
  let enemyId = parameters[1] === 2 ? parameters[2] : 1;
  const typeList = Utils.getBattlerTypeList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onMemberChange = (e) => {
    memberId = parseInt(e.target.value);
  };

  const onEnemyChange = (e) => {
    enemyId = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[2] = [0, memberId, enemyId, 0][parameters[1]];
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'戦闘者判定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        <div>
          <input
            type="radio"
            name="type"
            value="0"
            defaultChecked={parameters[1] === 0 ? 'checked' : ''}
            onChange={(e) => onRadioChange(e)}
          />
          <font>{typeList[0]}</font>
        </div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        <font>{typeList[1]}：</font>
        <div>
          <MemberSelectBox
            selectValue={memberId}
            onChange={(e) => onMemberChange(e)}
          />
        </div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[1] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        <font>{typeList[2]}：</font>
        <div>
          <EnemySelectBox
            selectValue={enemyId}
            onChange={(e) => onEnemyChange(e)}
          />
        </div>
      </div>
    </CommandBase>
  );
};

// CASE
const Case = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 比較値
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>比較値：</font>
      <NumberEdit
        min={-1}
        max={500}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
};

// ラベル
const Label = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: ラベル名
  const parametersRef = React.useRef(data || ['']);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = e.target.value;
  };

  const onUpdate = () => {
    if (!parameters[0]) {
      return;
    }
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>ラベル名：</font>
      <input defaultValue={parameters[0]} onChange={(e) => onChange(e)} />
    </CommandBase>
  );
};

// ラベルジャンプ
const Jump = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: ラベル名
  const parametersRef = React.useRef(data || ['']);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = e.target.value;
  };

  const onUpdate = () => {
    if (!parameters[0]) {
      return;
    }
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>ラベル名：</font>
      <input defaultValue={parameters[0]} onChange={(e) => onChange(e)} />
    </CommandBase>
  );
};

// 道具入手
const GainItem = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 道具指定種類 0>道具Id 1>スロットId
  // 1: 道具指定Id
  // 2: 道具入手メンバー格納スロット
  const parametersRef = React.useRef(data || [0, 1, 1]);
  const parameters = parametersRef.current;
  const type = parameters[0];
  let itemId = parameters[1];
  let slotId = parameters[1];

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onMemberSlotChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    // typeによりidを決定する
    parameters[1] = parameters[0] === 0 ? itemId : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  const onValueFocusOff = (value) => {
    itemId = value;
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        道具
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        スロット
      </div>
      <div>
        <font>道具：</font>
        <NumberEdit
          min={1}
          max={1000}
          value={parameters[1]}
          onValueFocusOff={onValueFocusOff}
        />
      </div>
      <div>
        <font>スロット：</font>
        <SlotSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        <font>入手メンバー格納スロット：</font>
        <SlotSelectBox
          selectValue={parameters[2]}
          onChange={(e) => onMemberSlotChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// 所持金変更
const ChangeGold = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 操作 0>増加 1>減少
  // 1: タイプ 0 直接 1 スロット
  // 2: 値
  const parametersRef = React.useRef(data || [0, 0, 1]);
  const parameters = parametersRef.current;
  const type = parameters[1];
  let number = parameters[2];
  let slotId = parameters[2];

  const onOpChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onValueFocusOff = (value) => {
    number = value;
  };

  const onUpdate = () => {
    // typeによりidを決定する
    parameters[2] = parameters[1] === 0 ? number : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="op"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onOpChange(e)}
        />
        増加
        <input
          type="radio"
          name="op"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onOpChange(e)}
        />
        減少
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        直値
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        スロット
      </div>
      <div>
        <font>値：</font>
        <NumberEdit
          min={0}
          max={99999999}
          value={parameters[2]}
          onValueFocusOff={onValueFocusOff}
        />
      </div>
      <div>
        <font>スロット：</font>
        <SlotSelectBox
          selectValue={parameters[2]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// 仲間登録
const RegisterMate = (props) => {
  // 0: 登録するメンバー
  // 1: 登録idを保存する変数Id
  const parameters = GetParameters(props.command.parameters, [1, 1]);

  const onMemberChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onVariableChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'仲間登録'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>仲間：</font>
        <MemberSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onMemberChange(e)}
        />
      </div>
      <div>
        <font>変数：</font>
        <VariableSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onVariableChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// パーティ変更
const ChangeParty = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: タイプ 0 加える 1 外す
  // 1: 変数Id
  const parametersRef = React.useRef(data || [0, 1]);
  const parameters = parametersRef.current;
  const type = parameters[0];

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onVariableChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'パーティ変更'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        加える
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        外す
      </div>
      <div>
        <font>変数：</font>
        <VariableSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onVariableChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// NPC変更
const ChangeNpc = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: タイプ 0 加える 1 外す
  // 1: 変数Id
  const parametersRef = React.useRef(data || [0, 1]);
  const parameters = parametersRef.current;
  const type = parameters[0];

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onVariableChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'NPC変更'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        加える
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        外す
      </div>
      <div>
        <font>変数：</font>
        <VariableSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onVariableChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// 回復
const Recover = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 操作 0>仲間全体 1>パーティ 2>登録id
  // 1: 登録id>メンバーid
  // 2: hp回復率
  // 3: mp回復率
  // 4: 状態回復優先度先頭
  // 5: 状態回復優先度終端
  const parametersRef = React.useRef(data || [1, 1, 100, 100, 0, 80]);
  const parameters = parametersRef.current;
  const type = parameters[0];
  let memberId = parameters[1];
  const list = Utils.getRecoverTypeSelectList();

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onMemberChange = (e) => {
    memberId = parseInt(e.target.value);
  };

  const onRecoverValueFocusOff = (value, n) => {
    parameters[n] = value;
  };

  const onUpdate = () => {
    parameters[1] = memberId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase title={'回復'} onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        {list[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        {list[2]}
      </div>
      <div>
        <font>登録id：</font>
        <SlotSelectBox
          selectValue={memberId}
          onChange={(e) => onMemberChange(e)}
        />
      </div>
      <div>
        <font>hp回復率：</font>
        <NumberEdit
          min={0}
          max={100}
          value={parameters[2]}
          onValueFocusOff={(value) => onRecoverValueFocusOff(value, 2)}
        />
        <font>%</font>
      </div>
      <div>
        <font>mp回復率：</font>
        <NumberEdit
          min={0}
          max={100}
          value={parameters[3]}
          onValueFocusOff={(value) => onRecoverValueFocusOff(value, 3)}
        />
        <font>%</font>
      </div>
      <div>
        <font>状態優先度範囲：</font>
        <NumberEdit
          min={0}
          max={100}
          value={parameters[4]}
          onValueFocusOff={(value) => onRecoverValueFocusOff(value, 4)}
        />
        <font>～</font>
        <NumberEdit
          min={0}
          max={100}
          value={parameters[5]}
          onValueFocusOff={(value) => onRecoverValueFocusOff(value, 5)}
        />
      </div>
    </CommandBase>
  );
};

// 状態変更
const ChangeState = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 登録id参照スロット -1>仲間全体 0>パーティ 1以上>スロットid
  // 1: 変更タイプ 0:付加 1:除去
  // 2: 変更する状態
  const parametersRef = React.useRef(data || [1, 0, 1]);
  const parameters = parametersRef.current;
  const type = parameters[1];
  const changeList = Utils.getChangeStateTypeList();

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onStateChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'状態変更'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <div>
          <font>対象</font>
        </div>
        <font>登録id：</font>
        <SlotSelectBox
          selectValue={parameters[0]}
          preItems={Utils.getPreRegisterIdSelectList()}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        <div>
          <font>操作</font>
        </div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        {changeList[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        {changeList[1]}
      </div>
      <div>
        <font>状態：</font>
        <StateSelectBox
          selectValue={parameters[2]}
          onChange={(e) => onStateChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// タイル変更
const ChangeTile = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 変更するレイヤー(-1は全部)
  // 1: パーツid
  // 2: x座標
  // 3: y座標
  const parametersRef = React.useRef(data || [-1, 1, 0, 0]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'タイル変更'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>変更するレイヤー：</font>
        <NumberEdit
          min={-1}
          max={3}
          value={parameters[0]}
          onValueFocusOff={(value) => onValueFocusOff(value, 0)}
        />
      </div>
      <div>
        <font>タイルid：</font>
        <NumberEdit
          min={1}
          max={999}
          value={parameters[1]}
          onValueFocusOff={(value) => onValueFocusOff(value, 1)}
        />
      </div>
      <div>
        <font>X：</font>
        <NumberEdit
          min={0}
          max={999}
          value={parameters[2]}
          onValueFocusOff={(value) => onValueFocusOff(value, 2)}
        />
        <font>Y：</font>
        <NumberEdit
          min={0}
          max={999}
          value={parameters[3]}
          onValueFocusOff={(value) => onValueFocusOff(value, 3)}
        />
      </div>
    </CommandBase>
  );
};

// タイル切替
const SwapTile = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 切り替えるタイルgid
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'タイル切替'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>タイルgid：</font>
      <NumberEdit
        min={0}
        max={9999}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
};

// 場所移動
const Move = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0 直接指定 1 スロット指定
  // 1: マップId
  // 2: x座標
  // 3: y座標
  // 4: 方向
  // 5: 位置指定 0:絶対 1:相対
  const parametersRef = React.useRef(data || [0, 1, 0, 0, -1, 0]);
  const parameters = parametersRef.current;
  let [mapId, mapIdSlot] = [parameters[1], parameters[1]];
  let [x, xSlot] = [parameters[2], parameters[2]];
  let [y, ySlot] = [parameters[3], parameters[3]];
  const referenceList = Utils.getReferenceTypeList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onMapIdChange = (e) => {
    mapId = parseInt(e.target.value);
  };

  const onXValueFocusOff = (value) => {
    x = value;
  };

  const onYValueFocusOff = (value) => {
    y = value;
  };

  const onMapIdSlotChange = (e) => {
    mapIdSlot = parseInt(e.target.value);
  };

  const onXSlotChange = (e) => {
    xSlot = parseInt(e.target.value);
  };

  const onYSlotChange = (e) => {
    xSlot = parseInt(e.target.value);
  };

  const onDirectionChange = (e) => {
    parameters[4] = parseInt(e.target.value);
  };

  const onPosRadioChange = (e) => {
    parameters[5] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    if (parameters[0] === 0) {
      parameters[1] = mapId;
      parameters[2] = x;
      parameters[3] = y;
    } else {
      parameters[1] = mapIdSlot;
      parameters[2] = xSlot;
      parameters[3] = ySlot;
    }

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        直接
      </div>
      <font>マップId：</font>
      <MapSelectBox selectValue={mapId} onChange={(e) => onMapIdChange(e)} />
      <div>
        <font>X：</font>
        <NumberEdit
          min={-999}
          max={999}
          value={x}
          onValueFocusOff={onXValueFocusOff}
        />
        <font>Y：</font>
        <NumberEdit
          min={-999}
          max={999}
          value={y}
          onValueFocusOff={onYValueFocusOff}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        スロット
      </div>
      <font>マップId：</font>
      <SlotSelectBox
        selectValue={mapIdSlot}
        onChange={(e) => onMapIdSlotChange(e)}
      />
      <div>
        <font>X：</font>
        <SlotSelectBox selectValue={xSlot} onChange={(e) => onXSlotChange(e)} />
        <font>Y：</font>
        <SlotSelectBox selectValue={ySlot} onChange={(e) => onYSlotChange(e)} />
      </div>
      <div>
        <font>方向：</font>
        <select
          defaultValue={parameters[4]}
          onChange={(e) => onDirectionChange(e)}
        >
          {pairSelectItems(Utils.getDirectionSelectList())}
        </select>
      </div>
      <div>座標指定</div>
      <div>
        <input
          type="radio"
          name="pos"
          value="0"
          defaultChecked={parameters[5] === 0 ? 'checked' : ''}
          onChange={(e) => onPosRadioChange(e)}
        />
        {referenceList[0]}
        <input
          type="radio"
          name="pos"
          value="1"
          defaultChecked={parameters[5] === 1 ? 'checked' : ''}
          onChange={(e) => onPosRadioChange(e)}
        />
        {referenceList[1]}
      </div>
    </CommandBase>
  );
};

// 位置リスト移動
const MoveFromPosition = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0 直接指定 1 スロット指定
  // 1: 位置Id
  // 2: 方向
  const parametersRef = React.useRef(data || [0, 1, -1]);
  const parameters = parametersRef.current;
  let [positionId, positionIdSlot] = [parameters[1], parameters[1]];

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onPositionIdChange = (e) => {
    positionId = parseInt(e.target.value);
  };

  const onPositionIdSlotChange = (e) => {
    positionIdSlot = parseInt(e.target.value);
  };

  const directionList = [
    { value: -1, text: 'そのまま' },
    { value: 0, text: '下' },
    { value: 1, text: '右' },
    { value: 2, text: '左' },
    { value: 3, text: '上' },
  ];

  const onDirectionChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    if (parameters[0] === 0) {
      parameters[1] = positionId;
    } else {
      parameters[1] = positionIdSlot;
    }

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        直接
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        スロット
      </div>
      <font>位置Id：</font>
      <PositionSelectBox
        selectValue={positionId}
        onChange={(e) => onPositionIdChange(e)}
      />
      <font>位置Id：</font>
      <SlotSelectBox
        selectValue={positionIdSlot}
        onChange={(e) => onPositionIdSlotChange(e)}
      />
      <div>
        <font>方向：</font>
        <select
          defaultValue={parameters[2]}
          onChange={(e) => onDirectionChange(e)}
        >
          {pairSelectItems(directionList)}
        </select>
      </div>
    </CommandBase>
  );
};

// ワープ
const Warp = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0 直接指定 1 スロット指定 2 アドレスインデックス指定
  // 1: ワープId
  // 2: 方向
  const parametersRef = React.useRef(data || [0, 1, -1]);
  const parameters = parametersRef.current;
  let [warpId, warpIdSlot, addressIdSlot] = [
    parameters[1],
    parameters[1],
    parameters[1],
  ];

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onPositionIdChange = (e) => {
    warpId = parseInt(e.target.value);
  };

  const onPositionIdSlotChange = (e) => {
    warpIdSlot = parseInt(e.target.value);
  };

  const onAddressIdSlotChange = (e) => {
    addressIdSlot = parseInt(e.target.value);
  };

  const onDirectionChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const values = [warpId, warpIdSlot, addressIdSlot];
    parameters[1] = values[parameters[0]];

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        <font>直接ワープId：</font>
        <WarpSelectBox
          selectValue={warpId}
          onChange={(e) => onPositionIdChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        <font>スロットワープId：</font>
        <SlotSelectBox
          selectValue={warpIdSlot}
          onChange={(e) => onPositionIdSlotChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        <font>アドレスId：</font>
        <SlotSelectBox
          selectValue={addressIdSlot}
          onChange={(e) => onAddressIdSlotChange(e)}
        />
      </div>
      <div>
        <font>方向：</font>
        <select
          defaultValue={parameters[2]}
          onChange={(e) => onDirectionChange(e)}
        >
          {pairSelectItems(Utils.getDirectionSelectList())}
        </select>
      </div>
    </CommandBase>
  );
};

// 位置設定
const Location = (props) => {
  // 0: 0:直接 1:スロット
  // 1: キャラクターId or 格納スロット
  // 2: 0 直接指定 1 スロット指定 2:交換直接指定 3:交換参照指定
  // 3: x座標 or 交換id or 交換参照スロット
  // 4: y座標
  // 5: 方向
  const parameters = GetParameters(
    props.command.parameters,
    [0, 0, 0, 0, 0, -1]
  );
  let target = parameters[1];
  let [x, y] = [parameters[3], parameters[4]];
  let [slotX, slotY] = [parameters[3], parameters[4]];
  let pos = parameters[3];
  let posSlotId = parameters[3];
  let exchange = parameters[4];
  const list = Utils.getLocationDestList();

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
  };

  const onTypeRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    target = parseInt(e.target.value);
  };

  const onRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onXValueFocusOff = (value) => {
    x = value;
  };

  const onYValueFocusOff = (value) => {
    y = value;
  };

  const onXSlotChange = (e) => {
    slotX = parseInt(e.target.value);
  };

  const onYSlotChange = (e) => {
    slotY = parseInt(e.target.value);
  };

  const onPosFocusOff = (value) => {
    pos = value;
  };

  const onPosSlotChange = (e) => {
    posSlotId = parseInt(e.target.value);
  };

  const onExchangeCheckChange = (e) => {
    exchange = e.target.checked ? 1 : 0;
  };

  const onDirectionChange = (e) => {
    parameters[5] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    if (parameters[0] === 1) {
      parameters[1] = target;
    }
    const values2 = [x, slotX, pos, posSlotId];
    const values3 = [y, slotY, exchange, exchange];
    parameters[3] = values2[parameters[2]];
    parameters[4] = values3[parameters[2]];

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'位置設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>対象：</font>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onTypeRadioChange(e)}
        />
        直接
        <NumberEdit
          min={-1}
          max={9999}
          value={parameters[1]}
          onValueFocusOff={(value) => onValueFocusOff(value, 1)}
        />
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onTypeRadioChange(e)}
        />
        スロット
        <SlotSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        <div>
          <input
            type="radio"
            name="dest"
            value="0"
            defaultChecked={parameters[2] === 0 ? 'checked' : ''}
            onChange={(e) => onRadioChange(e)}
          />
          {list[0]}
          <div>
            <font>X：</font>
            <NumberEdit
              min={0}
              max={999}
              value={x}
              onValueFocusOff={onXValueFocusOff}
            />
            <font>Y：</font>
            <NumberEdit
              min={0}
              max={999}
              value={y}
              onValueFocusOff={onYValueFocusOff}
            />
          </div>
        </div>
        <div>
          <input
            type="radio"
            name="dest"
            value="1"
            defaultChecked={parameters[2] === 1 ? 'checked' : ''}
            onChange={(e) => onRadioChange(e)}
          />
          {list[1]}
          <div>
            <div>
              <font>X：</font>
              <SlotSelectBox
                selectValue={slotX}
                onChange={(e) => onXSlotChange(e)}
              />
            </div>
            <div>
              <font>Y：</font>
              <SlotSelectBox
                selectValue={slotX}
                onChange={(e) => onYSlotChange(e)}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            type="radio"
            name="dest"
            value="2"
            defaultChecked={parameters[2] === 2 ? 'checked' : ''}
            onChange={(e) => onRadioChange(e)}
          />
          {list[2]}
          <div>
            <NumberEdit
              min={-1}
              max={9999}
              value={parameters[3]}
              onValueFocusOff={(value) => onPosFocusOff(value)}
            />
          </div>
        </div>
        <div>
          <input
            type="radio"
            name="dest"
            value="3"
            defaultChecked={parameters[2] === 3 ? 'checked' : ''}
            onChange={(e) => onRadioChange(e)}
          />
          {list[3]}
          <div>
            <SlotSelectBox
              selectValue={posSlotId}
              onChange={(e) => onPosSlotChange(e)}
            />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="exchange"
            defaultChecked={parameters[4] === 1 ? 'checked' : ''}
            onChange={(e) => onExchangeCheckChange(e)}
          />
          位置交換
        </div>
      </div>
      <div>
        <font>方向：</font>
        <select
          defaultValue={parameters[5]}
          onChange={(e) => onDirectionChange(e)}
        >
          {pairSelectItems(Utils.getDirectionSelectList())}
        </select>
      </div>
    </CommandBase>
  );
};

// 移動の設定
const MoveSettings = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: タイプ
  // 1: 値
  const parametersRef = React.useRef(data || [0, 0]);
  const parameters = parametersRef.current;
  let screenOff = parameters[1];
  let screenOn = parameters[1];
  let follower = parameters[1];
  let soundId = parameters[1];
  let shiftXId = parameters[1];
  let shiftYId = parameters[1];

  const screenOffList = Utils.getMoveSettingsScreenOffList();
  const screenOnList = Utils.getMoveSettingsScreenOnList();
  const followerList = Utils.getMoveSettingsFollowerList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onScreenOffChange = (e) => {
    screenOff = parseInt(e.target.value);
  };

  const onScreenOnChange = (e) => {
    screenOn = parseInt(e.target.value);
  };

  const onFollowerChange = (e) => {
    follower = parseInt(e.target.value);
  };

  const onSoundIdChange = (e) => {
    soundId = parseInt(e.target.value);
  };

  const onShiftXIdChange = (e) => {
    shiftXId = parseInt(e.target.value);
  };

  const onShiftYIdChange = (e) => {
    shiftYId = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const values = [screenOff, screenOn, follower, soundId, shiftXId, shiftYId];
    parameters[1] = values[parameters[0]];
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title="移動の設定"
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        画面消去
        <select defaultValue={screenOff} onChange={(e) => onScreenOffChange(e)}>
          {simpleSelectItems(screenOffList)}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        画面表示
        <select defaultValue={screenOn} onChange={(e) => onScreenOnChange(e)}>
          {simpleSelectItems(screenOnList)}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        隊列
        <select defaultValue={follower} onChange={(e) => onFollowerChange(e)}>
          {simpleSelectItems(followerList)}
        </select>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="3"
          defaultChecked={parameters[0] === 3 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        効果音
        <SeSelectBox
          selectValue={soundId}
          onChange={(e) => onSoundIdChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="4"
          defaultChecked={parameters[0] === 4 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        横画面座標スロット:
        <SlotSelectBox
          selectValue={shiftXId}
          unuse={true}
          onChange={(e) => onShiftXIdChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="5"
          defaultChecked={parameters[0] === 5 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        縦画面座標スロット:
        <SlotSelectBox
          selectValue={shiftYId}
          unuse={true}
          onChange={(e) => onShiftYIdChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// スクロール
const Scroll = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0 固定 1 固定解除 2:ずらす 3:もどす 4:横だけ戻す 5:縦だけ戻す
  // 1: 移動速度
  // 2: ずらす場合の横距離
  // 3: ずらす場合の縦距離
  // 4: 待機するか
  const parametersRef = React.useRef(data || [0, 0, 0, 3, 0]);
  const parameters = parametersRef.current;

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onXValueFocusOff = (value) => {
    parameters[1] = value;
  };

  const onYValueFocusOff = (value) => {
    parameters[2] = value;
  };

  const speedList = Utils.getScrollSpeedList();

  const onSpeedChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onWaitCheckChange = (e) => {
    parameters[4] = e.target.checked ? 1 : 0;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'スクロール'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        固定
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        固定解除
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        ずらす
        <input
          type="radio"
          name="type"
          value="3"
          defaultChecked={parameters[0] === 3 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        戻す
      </div>
      <div>
        <font>X：</font>
        <NumberEdit
          min={-500}
          max={500}
          value={parameters[1]}
          onValueFocusOff={onXValueFocusOff}
        />
        <font>Y：</font>
        <NumberEdit
          min={-500}
          max={500}
          value={parameters[2]}
          onValueFocusOff={onYValueFocusOff}
        />
      </div>
      <div>
        <font>速度：</font>
        <select defaultValue={parameters[3]} onChange={(e) => onSpeedChange(e)}>
          {pairSelectItems(speedList)}
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          name="wait"
          defaultChecked={parameters[4] === 1 ? 'checked' : ''}
          onChange={(e) => onWaitCheckChange(e)}
        />
        待機
      </div>
    </CommandBase>
  );
};

// 移動ルート
const MoveRoute = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0:直接 1:スロット
  // 1: キャラクターId or 格納スロット
  // 2: 0 共通 1 マップ
  // 3: ルートId
  const parametersRef = React.useRef(data || [0, 0, 0, 1]);
  const parameters = parametersRef.current;
  let target = parameters[1];

  const onTypeRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
  };

  const onSlotChange = (e) => {
    target = parseInt(e.target.value);
  };

  const onStorageRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    if (parameters[0] === 1) {
      parameters[1] = target;
    }
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'移動ルート'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>対象：</font>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onTypeRadioChange(e)}
        />
        直接
        <NumberEdit
          min={-1}
          max={9999}
          value={parameters[1]}
          onValueFocusOff={(value) => onValueFocusOff(value, 1)}
        />
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onTypeRadioChange(e)}
        />
        スロット
        <SlotSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>

      <div>
        <input
          type="radio"
          name="storage"
          value="0"
          defaultChecked={parameters[2] === 0 ? 'checked' : ''}
          onChange={(e) => onStorageRadioChange(e)}
        />
        共通
        <input
          type="radio"
          name="storage"
          value="1"
          defaultChecked={parameters[2] === 1 ? 'checked' : ''}
          onChange={(e) => onStorageRadioChange(e)}
        />
        マップ
      </div>
      <font>ルートId：</font>
      <NumberEdit
        min={1}
        max={1000}
        value={parameters[3]}
        onValueFocusOff={(value) => onValueFocusOff(value, 3)}
      />
    </CommandBase>
  );
};

// 移動ルート待機
const MoveRouteWait = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 待機中の足踏み 0:しない 1:する
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;
  const orNotList = Utils.getOrNotSelectList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'移動ルート待機'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>待機中の足踏み：</font>
      <div>
        <input
          type="radio"
          name="step"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="step"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[1]}
      </div>
    </CommandBase>
  );
};

// 隊列の操作
const FollowerControl = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 0 再設定 1 一列 2 集合
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        再設定
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        一列
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        集合
      </div>
    </CommandBase>
  );
};

// マップスクリプト
const MapScript = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 指定タイプ 0:直接 1:スロット
  // 1: スクリプトId
  // 2: 呼び出しタイミング 0:直接 1:予約
  const parametersRef = React.useRef(data || [0, 1, 0]);
  const parameters = parametersRef.current;
  let scriptId = parameters[1];
  let slotId = parameters[1];
  const typeList = Utils.getDirectOrSlotList();
  const timingList = Utils.getCallScriptTimingList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onEventChange = (e) => {
    scriptId = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onTimingRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[1] = parameters[0] === 0 ? scriptId : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'マップスクリプト'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>スクリプト</font>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[0]}：
        <MapEventSelectBox
          selectValue={scriptId}
          onChange={(e) => onEventChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[1]}：
        <SlotSelectBox selectValue={slotId} onChange={(e) => onSlotChange(e)} />
      </div>
      <div>
        <font>タイミング</font>
      </div>
      <div>
        <input
          type="radio"
          name="timing"
          value="0"
          defaultChecked={parameters[2] === 0 ? 'checked' : ''}
          onChange={(e) => onTimingRadioChange(e)}
        />
        {timingList[0]}
        <input
          type="radio"
          name="timing"
          value="1"
          defaultChecked={parameters[2] === 1 ? 'checked' : ''}
          onChange={(e) => onTimingRadioChange(e)}
        />
        {timingList[1]}
      </div>
    </CommandBase>
  );
};

// コモンスクリプト
const CommonScript = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 指定タイプ 0:直接 1:スロット
  // 1: スクリプトId
  // 2: 呼び出しタイミング 0:直接 1:予約
  const parametersRef = React.useRef(data || [0, 1, 0]);
  const parameters = parametersRef.current;
  let scriptId = parameters[1];
  let slotId = parameters[1];
  const typeList = Utils.getDirectOrSlotList();
  const timingList = Utils.getCallScriptTimingList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onEventChange = (e) => {
    scriptId = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  };

  const onTimingRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[1] = parameters[0] === 0 ? scriptId : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'コモンスクリプト'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>スクリプト</font>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[0]}：
        <CommonEventSelectBox
          selectValue={scriptId}
          onChange={(e) => onEventChange(e)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[1]}：
        <SlotSelectBox selectValue={slotId} onChange={(e) => onSlotChange(e)} />
      </div>
      <div>
        <font>タイミング</font>
      </div>
      <div>
        <input
          type="radio"
          name="timing"
          value="0"
          defaultChecked={parameters[2] === 0 ? 'checked' : ''}
          onChange={(e) => onTimingRadioChange(e)}
        />
        {timingList[0]}
        <input
          type="radio"
          name="timing"
          value="1"
          defaultChecked={parameters[2] === 1 ? 'checked' : ''}
          onChange={(e) => onTimingRadioChange(e)}
        />
        {timingList[1]}
      </div>
    </CommandBase>
  );
};

// 待機
const Wait = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: フレーム数
  const parametersRef = React.useRef(data || [60]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase title={'待機'} onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>フレーム：</font>
      <NumberEdit
        min={1}
        max={600}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
};

// 隊列の設定
const FollowerSettings = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 種類 > 0 追いかけ 1 間隔
  // 1: 追いかけ > 0 する 1 しない
  //    間隔
  const parametersRef = React.useRef(data || [0, 0]);
  const parameters = parametersRef.current;
  let chase = parameters[0] === 0 ? parameters[1] : 0;
  const list = Utils.getFollowerSettingsTypeList();
  const chaseList = Utils.getFollowerSettingsChaseList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onchaseRadioChange = (e) => {
    chase = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[1] = [chase][parameters[0]];
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'隊列の設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <div>
          <input
            type="radio"
            name="chase"
            value="0"
            defaultChecked={chase === 0 ? 'checked' : ''}
            onChange={(e) => onchaseRadioChange(e)}
          />
          {chaseList[0]}
          <input
            type="radio"
            name="chase"
            value="1"
            defaultChecked={chase === 1 ? 'checked' : ''}
            onChange={(e) => onchaseRadioChange(e)}
          />
          {chaseList[1]}
        </div>
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

// 行先の設定
const AddressSettings = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 種類 > 0 追加 1 削除
  // 1: 行先id
  const parametersRef = React.useRef(data || [0, 1]);
  const parameters = parametersRef.current;
  const list = Utils.getAOrDList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onPositionIdChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'行先の設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
      <div>
        <font>行先Id：</font>
        <WarpSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onPositionIdChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// 効果音
const Se = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 効果音Id
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>効果音Id：</font>
      <SeSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onChange(e)}
        unuse={true}
      />
    </CommandBase>
  );
};

// BGM演奏
const BgmPlay = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 効果音Id
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <font>BGMId：</font>
      <BgmSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onChange(e)}
        unuse={true}
      />
    </CommandBase>
  );
};

// BGM割込
const BgmInterrupt = (props) => {
  // 0: 効果音Id
  // 1: 0:待機しない 1:待機する
  // 2: 0:終了後リジュームしない 1:する
  const parameters = GetParameters(props.command.parameters, [0, 0, 0]);

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onWaitCheck = (e) => {
    parameters[1] = e.target.checked;
  };

  const onNoResumeCheck = (e) => {
    parameters[2] = e.target.checked;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'BGM割り込み'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>BGMId：</font>
        <BgmSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onChange(e)}
          unuse={true}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="multi"
          defaultChecked={parameters[1] ? 'checked' : ''}
          onChange={(e) => onWaitCheck(e)}
        />
        待機する
      </div>
      <div>
        <input
          type="checkbox"
          name="noResume"
          defaultChecked={parameters[2] ? 'checked' : ''}
          onChange={(e) => onNoResumeCheck(e)}
        />
        終了後再開しない
      </div>
    </CommandBase>
  );
};

// イベント起動
const EventTrigger = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 起因値
  const parametersRef = React.useRef(data || [1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'イベント起動'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>起因値：</font>
      <NumberEdit
        min={0}
        max={100}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
};

// 戦闘開始
const BattleStart = (props) => {
  // 0: 敵の群れ 0>トループ 1>エンカウンター 2>プレイヤーの位置
  // 1: 群れ指定id>トループid or エンカウンターidを指定
  // 2: 地形id 0>現在位置 1以降>地形id
  // 3: 逃走可能か 0>不可 1>可能
  // 4: 逃走時スクリプトid
  // 5: 勝利時スクリプトid
  // 6: 敗北時スクリプトid
  // 7: 先制攻撃 0>なし 1>あり
  // 8: 先制タイプ 0>通常どおり 1>味方強襲 2>味方不意打ち 3>敵強襲 4>敵不意打ち
  const parameters = GetParameters(
    props.command.parameters,
    [0, 1, 0, 0, 0, 0, 0, 0, 0]
  );
  let troopId = parameters[1];
  let encounterId = parameters[1];
  const groupList = Utils.getEnemyGroupTypeList();
  const preemptiveType = Utils.getPreemptiveTypeList();

  const onEnemyGroupChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onTroopChange = (e) => {
    troopId = parseInt(e.target.value);
  };

  const onEncounterChange = (e) => {
    encounterId = parseInt(e.target.value);
  };

  const onTerrainChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onEscapeCheck = (e) => {
    parameters[3] = e.target.checked ? 1 : 0;
  };

  const onEscapeChange = (e) => {
    parameters[4] = parseInt(e.target.value);
  };

  const onWinChange = (e) => {
    parameters[5] = parseInt(e.target.value);
  };

  const onLoseChange = (e) => {
    parameters[6] = parseInt(e.target.value);
  };

  const onPreemptiveCheck = (e) => {
    parameters[7] = e.target.checked ? 1 : 0;
  };

  const onPreemptiveTypeChange = (e) => {
    parameters[8] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    parameters[1] = parameters[0] === 0 ? troopId : encounterId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'戦闘開始'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onEnemyGroupChange(e)}
        />
        {groupList[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onEnemyGroupChange(e)}
        />
        {groupList[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onEnemyGroupChange(e)}
        />
        {groupList[2]}
      </div>
      <div>
        <font>トループ：</font>
        <TroopSelectBox
          selectValue={troopId}
          onChange={(e) => onTroopChange(e)}
        />
      </div>
      <div>
        <font>エンカウンター：</font>
        <EncounterSelectBox
          selectValue={encounterId}
          onChange={(e) => onEncounterChange(e)}
        />
      </div>
      <div>
        <font>地形：</font>
        <TerrainSelectBox
          unuseText={'プレイヤー位置の地形'}
          unuse={true}
          selectValue={parameters[2]}
          onChange={(e) => onTerrainChange(e)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="escape"
          defaultChecked={parameters[3] === 1 ? 'checked' : ''}
          onChange={(e) => onEscapeCheck(e)}
        />
        逃走可能
      </div>
      <div>
        <font>逃走時スクリプト：</font>
        <CommonEventSelectBox
          unuse={true}
          selectValue={parameters[4]}
          onChange={(e) => onEscapeChange(e)}
        />
      </div>
      <div>
        <font>勝利時スクリプト：</font>
        <CommonEventSelectBox
          unuse={true}
          selectValue={parameters[5]}
          onChange={(e) => onWinChange(e)}
        />
      </div>
      <div>
        <font>敗北時スクリプト：</font>
        <CommonEventSelectBox
          unuse={true}
          selectValue={parameters[6]}
          onChange={(e) => onLoseChange(e)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="preemptive"
          defaultChecked={parameters[7] === 1 ? 'checked' : ''}
          onChange={(e) => onPreemptiveCheck(e)}
        />
        先制あり
      </div>
      <div>
        <select
          defaultValue={parameters[8]}
          onChange={(e) => onPreemptiveTypeChange(e)}
        >
          {simpleSelectItems(preemptiveType)}
        </select>
      </div>
    </CommandBase>
  );
};

// 画面のフェードアウト
const ScreenFadeOut = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 待機 0:しない 1:する
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;
  const orNotList = Utils.getOrNotSelectList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'画面のフェードアウト'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>待機：</font>
      <div>
        <input
          type="radio"
          name="wait"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="wait"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[1]}
      </div>
    </CommandBase>
  );
};

// 画面のフェードイン
const ScreenFadeIn = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 待機 0:しない 1:する
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;
  const orNotList = Utils.getOrNotSelectList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'画面のフェードイン'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>待機：</font>
      <div>
        <input
          type="radio"
          name="wait"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[0]}
        <input
          type="radio"
          name="wait"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {orNotList[1]}
      </div>
    </CommandBase>
  );
};

// シェイク
const ScreenShake = (props) => {
  // 0: 0 既定 1 マップだけ 2:キャラクター強制
  // 1: シェイク横幅
  // 2: シェイク縦幅
  // 3: シェイク速度
  // 4: 期間
  // 5: 待機するか
  const parameters = GetParameters(
    props.command.parameters,
    [0, 8, 8, 3, 60, 0]
  );
  const typeList = Utils.getShakeTypeList();
  const speedList = Utils.getShakeSpeedList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onXValueFocusOff = (value) => {
    parameters[1] = value;
  };

  const onYValueFocusOff = (value) => {
    parameters[2] = value;
  };

  const onSpeedChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onFrameValueFocusOff = (value) => {
    parameters[4] = value;
  };

  const onWaitCheckChange = (e) => {
    parameters[5] = e.target.checked ? 1 : 0;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'シェイク'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[2]}
      </div>
      <div>
        <font>X：</font>
        <NumberEdit
          min={-128}
          max={128}
          value={parameters[1]}
          onValueFocusOff={onXValueFocusOff}
        />
        <font>Y：</font>
        <NumberEdit
          min={-128}
          max={128}
          value={parameters[2]}
          onValueFocusOff={onYValueFocusOff}
        />
      </div>
      <div>
        <font>速度：</font>
        <select defaultValue={parameters[3]} onChange={(e) => onSpeedChange(e)}>
          {pairSelectItems(speedList)}
        </select>
      </div>
      <div>
        <font>フレーム：</font>
        <NumberEdit
          min={1}
          max={999}
          value={parameters[4]}
          onValueFocusOff={onFrameValueFocusOff}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="wait"
          defaultChecked={parameters[5] === 1 ? 'checked' : ''}
          onChange={(e) => onWaitCheckChange(e)}
        />
        待機
      </div>
    </CommandBase>
  );
};

// マップアニメーション
const MapAnimation = (props) => {
  // 0: 0:マップ 1:キャラクター 2:タイル
  // 1: 対象Id格納スロット
  // 2: アニメーションId
  // 3: ウェイトタイプ 0:しない 1:指定の長さ 2:終了まで
  const parameters = GetParameters(props.command.parameters, [0, 1, 1, 0]);
  const targetTypeList = Utils.getMapAnimationTargetTypeList();
  const waitTypeList = Utils.getMapAnimationWaitTypeList();

  const onTargetTypeRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onSlotChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onAnimationChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  };

  const onWaitRadioChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'マップアニメーション'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>対象タイプ：</font>
      <div>
        <input
          type="radio"
          name="target"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onTargetTypeRadioChange(e)}
        />
        {targetTypeList[0]}
        <input
          type="radio"
          name="target"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onTargetTypeRadioChange(e)}
        />
        {targetTypeList[1]}
        <input
          type="radio"
          name="target"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onTargetTypeRadioChange(e)}
        />
        {targetTypeList[2]}
      </div>
      <div>
        対象：
        <SlotSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        エフェクト：
        <EffectSelectBox
          selectValue={parameters[2]}
          onChange={(e) => onAnimationChange(e)}
        />
      </div>
      ウェイトタイプ：
      <div>
        <input
          type="radio"
          name="wait"
          value="0"
          defaultChecked={parameters[3] === 0 ? 'checked' : ''}
          onChange={(e) => onWaitRadioChange(e)}
        />
        {waitTypeList[0]}
        <input
          type="radio"
          name="wait"
          value="1"
          defaultChecked={parameters[3] === 1 ? 'checked' : ''}
          onChange={(e) => onWaitRadioChange(e)}
        />
        {waitTypeList[1]}
        <input
          type="radio"
          name="wait"
          value="2"
          defaultChecked={parameters[3] === 2 ? 'checked' : ''}
          onChange={(e) => onWaitRadioChange(e)}
        />
        {waitTypeList[2]}
      </div>
    </CommandBase>
  );
};

// 透明状態変更
const ChangeTransparent = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 対象
  // 1: 透明状態 > 0 透明にする 1 解除する
  const parametersRef = React.useRef(data || [0, 0]);
  const parameters = parametersRef.current;
  const list = Utils.getChangeTransparentTypeList();

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  };

  const onRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'透明状態変更'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>対象：</font>
      <NumberEdit
        min={-1}
        max={9999}
        value={parameters[0]}
        onValueFocusOff={(value) => onValueFocusOff(value)}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[1] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

// 隊列の集合
const GatherFollowers = (props) => {
  const data = sliceParameters(props.command.parameters);
  // 0: 種類 > 0 通常 1 集合位置で消える 2 集合完了後消える
  const parametersRef = React.useRef(data || [0, 1]);
  const parameters = parametersRef.current;
  const list = Utils.getGatherFollowersTypeList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onWaitChange = (e) => {
    parameters[1] = e.target.checked ? 1 : 0;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'隊列の集合'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[0] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[2]}
      </div>
      <div>
        <input
          type="checkbox"
          name="wait"
          defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onWaitChange(e)}
        />
        完了まで待機する
      </div>
    </CommandBase>
  );
};

/**
 * 戦闘メッセージ指定
 * @param {*} props
 */
const ActionMessage = (props) => {
  // 0: メッセージId
  // 1: タイプId
  const parameters = GetParameters(props.command.parameters, [1, 0]);
  const typeList = Utils.getMessageTypeList();

  const onMessageIdChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'戦闘文章指定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>{typeList[0]}：</font>
        <div>
          <MessageSelectBox
            selectValue={parameters[0]}
            onChange={(e) => onMessageIdChange(e)}
          />
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[1] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[1]}
        <input
          type="radio"
          name="type"
          value="2"
          defaultChecked={parameters[1] === 2 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {typeList[2]}
      </div>
    </CommandBase>
  );
};

// 戦闘文章の設定
const ActionMessageSettings = (props) => {
  // 0: 設定タイプ
  const parameters = GetParameters(props.command.parameters, [11]);
  const selectList = Utils.getMessageOptionTypeSelectList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'戦闘文章の設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="11"
          defaultChecked={parameters[0] === 11 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[11]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="12"
          defaultChecked={parameters[0] === 12 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[12]}
      </div>
      <div>
        <input
          type="radio"
          name="type"
          value="13"
          defaultChecked={parameters[0] === 13 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {selectList[13]}
      </div>
    </CommandBase>
  );
};

/**
 * 戦闘エフェクト指定
 * @param {*} props
 * @returns
 */
const ActionEffect = (props) => {
  // 0: エフェクトId
  const parameters = GetParameters(props.command.parameters, [0]);

  const onEffectIdChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'戦闘エフェクト指定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>エフェクト：</font>
        <div>
          <EffectSelectBox
            selectValue={parameters[0]}
            unuse={true}
            onChange={(e) => onEffectIdChange(e)}
          />
        </div>
      </div>
    </CommandBase>
  );
};

/**
 * 行動対象指定
 * @param {*} props
 */
const ActionTarget = (props) => {
  // 0: スロットId
  const parameters = GetParameters(props.command.parameters, [1]);

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'行動対象指定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
    </CommandBase>
  );
};

/**
 * 追加行動指定
 * @param {*} props
 * @returns
 */
const ActionExtra = (props) => {
  // 0: 追加タイプ
  const parameters = GetParameters(props.command.parameters, [2]);
  const typeList = Utils.getActionExtraList();

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'追加行動指定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>追加行動タイプ：</font>
      <select defaultValue={parameters[0]} onChange={(e) => onTypeChange(e)}>
        {simpleSelectItems(typeList)}
      </select>
    </CommandBase>
  );
};

/**
 * 追加行動指定
 * @param {*} props
 */
const ActionForce = (props) => {
  // 0: スロットId
  // 1: スキルId
  const parameters = GetParameters(props.command.parameters, [1, 1]);

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onSkillChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'強制行動指定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <font>スロットId：</font>
        <SlotSelectBox
          selectValue={parameters[0]}
          onChange={(e) => onSlotChange(e)}
        />
      </div>
      <div>
        <font>スキルId：</font>
        <SkillSelectBox
          selectValue={parameters[1]}
          onChange={(e) => onSkillChange(e)}
        />
      </div>
    </CommandBase>
  );
};

// コメント
const Comment = (props) => {
  const parameters = GetParameters(props.command.parameters, ['']);

  const onChange = (e) => {
    parameters[0] = e.target.value;
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase onUpdate={onUpdate} onCancel={props.onCancel}>
      <div>
        <textarea
          cols="50"
          rows="10"
          defaultValue={parameters[0]}
          style={{ resize: 'none' }}
          onChange={(e) => onChange(e)}
        ></textarea>
      </div>
    </CommandBase>
  );
};

// 床ダメージ切替
const ChangeFloorDamage = (props) => {
  // 0: 床ダメージ > 0 無効 1 有効
  const parameters = GetParameters(props.command.parameters, [1]);
  const list = Utils.getChangeEnableList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'床ダメージ切替'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

// 歩行ダメージ切替
const ChangeSlipDamage = (props) => {
  // 0: 歩行ダメージ > 0 無効 1 有効
  const parameters = GetParameters(props.command.parameters, [1]);
  const list = Utils.getChangeEnableList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'歩行ダメージ切替'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

// エンカウント切替
const ChangeEncounter = (props) => {
  // 0: 歩行ダメージ > 0 無効 1 有効
  const parameters = GetParameters(props.command.parameters, [1]);
  const list = Utils.getChangeEnableList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'エンカウント切替'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

// 部屋移動設定
const RoomMoveSettings = (props) => {
  // 0: 切替 > 0 しない 1 する
  const parameters = GetParameters(props.command.parameters, [1]);
  const list = Utils.getChangeEnableList();

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  };

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  };

  return (
    <CommandBase
      title={'部屋移動設定'}
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input
          type="radio"
          name="type"
          value="0"
          defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[0]}
        <input
          type="radio"
          name="type"
          value="1"
          defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />
        {list[1]}
      </div>
    </CommandBase>
  );
};

const GetParameters = (settingData, initData) => {
  const data = sliceParameters(settingData);
  const parametersRef = React.useRef(data || initData);
  return parametersRef.current;
};

const CommandEditor = (props) => {
  const viewEditor = () => {
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        return <Message text="mes" {...props} />;
      case COMMAND.MENU:
        return <Menu {...props} />;
      case COMMAND.EndMenu:
        return <EndMenu {...props} />;
      case COMMAND.MessageSettings:
        return <MessageSettings {...props} />;
      case COMMAND.Embedded:
        return <Embedded {...props} />;
      case COMMAND.FLAG:
        return <Flag {...props} />;
      case COMMAND.VARIABLE:
        return <Variable {...props} />;
      case COMMAND.OperateSlot:
        return <OperateSlot {...props} />;
      case COMMAND.AssignFixData:
        return <AssignFixData {...props} />;
      case COMMAND.AssignGameData:
        return <AssignGameData {...props} />;
      case COMMAND.AssignSystemSlot:
        return <AssignSystemSlot {...props} />;
      case COMMAND.AssignMapInfo:
        return <AssignMapInfo {...props} />;
      case COMMAND.GOODS:
        return <Goods {...props} />;
      case COMMAND.CompareSlot:
        return <CompareSlot {...props} />;
      case COMMAND.AssignResult:
        return <AssignResult {...props} />;
      case COMMAND.JudgeBattler:
        return <JudgeBattler {...props} />;
      case COMMAND.CASE:
        return <Case {...props} />;
      case COMMAND.Label:
        return <Label {...props} />;
      case COMMAND.Jump:
        return <Jump {...props} />;
      case COMMAND.GainItem:
        return <GainItem {...props} />;
      case COMMAND.ChangeGold:
        return <ChangeGold {...props} />;
      case COMMAND.RegisterMate:
        return <RegisterMate {...props} />;
      case COMMAND.ChangeParty:
        return <ChangeParty {...props} />;
      case COMMAND.ChangeNpc:
        return <ChangeNpc {...props} />;
      case COMMAND.RECOVER:
        return <Recover {...props} />;
      case COMMAND.ChangeState:
        return <ChangeState {...props} />;
      case COMMAND.CHANGETILE:
        return <ChangeTile {...props} />;
      case COMMAND.SWAPTILE:
        return <SwapTile {...props} />;
      case COMMAND.MOVE:
        return <Move {...props} />;
      case COMMAND.MoveFromPosition:
        return <MoveFromPosition {...props} />;
      case COMMAND.WARP:
        return <Warp {...props} />;
      case COMMAND.Location:
        return <Location {...props} />;
      case COMMAND.MoveSettings:
        return <MoveSettings {...props} />;
      case COMMAND.SCROLL:
        return <Scroll {...props} />;
      case COMMAND.MoveRoute:
        return <MoveRoute {...props} />;
      case COMMAND.MoveRouteWait:
        return <MoveRouteWait {...props} />;
      case COMMAND.FOLLOWERCONTROL:
        return <FollowerControl {...props} />;
      case COMMAND.MAPSCRIPT:
        return <MapScript {...props} />;
      case COMMAND.COMMONSCRIPT:
        return <CommonScript {...props} />;
      case COMMAND.WAIT:
        return <Wait {...props} />;
      case COMMAND.FOLLOWERSETTINGS:
        return <FollowerSettings {...props} />;
      case COMMAND.AddressSettings:
        return <AddressSettings {...props} />;
      case COMMAND.Se:
        return <Se {...props} />;
      case COMMAND.BgmPlay:
        return <BgmPlay {...props} />;
      case COMMAND.BgmInterrupt:
        return <BgmInterrupt {...props} />;
      case COMMAND.EventTrigger:
        return <EventTrigger {...props} />;
      case COMMAND.BattleStart:
        return <BattleStart {...props} />;
      case COMMAND.ScreenFadeOut:
        return <ScreenFadeOut {...props} />;
      case COMMAND.ScreenFadeIn:
        return <ScreenFadeIn {...props} />;
      case COMMAND.ScreenShake:
        return <ScreenShake {...props} />;
      case COMMAND.MapAnimation:
        return <MapAnimation {...props} />;
      case COMMAND.ChangeTransparent:
        return <ChangeTransparent {...props} />;
      case COMMAND.GatherFollowers:
        return <GatherFollowers {...props} />;
      case COMMAND.ActionMessage:
        return <ActionMessage {...props} />;
      case COMMAND.ActionMessageSettings:
        return <ActionMessageSettings {...props} />;
      case COMMAND.ActionEffect:
        return <ActionEffect {...props} />;
      case COMMAND.ActionTarget:
        return <ActionTarget {...props} />;
      case COMMAND.ActionExtra:
        return <ActionExtra {...props} />;
      case COMMAND.ActionForce:
        return <ActionForce {...props} />;
      case COMMAND.Comment:
        return <Comment {...props} />;
      case COMMAND.ChangeFloorDamage:
        return <ChangeFloorDamage {...props} />;
      case COMMAND.ChangeSlipDamage:
        return <ChangeSlipDamage {...props} />;
      case COMMAND.ChangeEncounter:
        return <ChangeEncounter {...props} />;
      case COMMAND.RoomMoveSettings:
        return <RoomMoveSettings {...props} />;
      default:
        return null;
    }
  };

  return <div className="command-editor">{viewEditor()}</div>;
};

export default CommandEditor;
