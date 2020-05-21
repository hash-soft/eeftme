import React from 'react';
import { FlagSelectBox, VariableSelectBox, SlotSelectBox } from './selectBoxSet'
import { NumberEdit } from './editBoxSet'
import { COMMAND, VARIABLERANGE } from './define';
import './index.css';




const CommandBase = props => {
  return (
    <div>
      {props.children}
      <div style={{ marginTop: '10px' }}>
        <button onClick={props.onUpdate}>適用</button>
        <button onClick={props.onCancel}>キャンセル</button>
      </div>
    </div>
  );
}

// 文章の表示
const Message = props => {

  // 0: 表示テキスト
  const textRef = React.useRef(props.command.parameters ? props.command.parameters[0] : '');

  const onChange = (e) => {
    const nText = e.target.value
    textRef.current = nText;
  }

  const onUpdate = () => {
    const command = {code: COMMAND.MESSAGE, parameters: []};
    command.parameters.push(textRef.current);
    props.onUpdate(command);
  }
  
  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <textarea cols="50" rows="10" defaultValue={textRef.current} 
        style={{resize: 'none'}}
        onChange={(e) => onChange(e)}
      >
      </textarea>
    </CommandBase>
  );
}

// メニュー表示
const Menu = props => {

  // 0: メニューId
  // 1: 格納スロットId
  const parametersRef = React.useRef(props.command.parameters || [1, 1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onSlotChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = {code: COMMAND.MENU, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>メニューId：</font>
      <NumberEdit
        min={0}
        max={100}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
      <SlotSelectBox
        selectValue = {parameters[1]}
        onChange = {(e) => onSlotChange(e)}
      />
    </CommandBase>
  );
}

// メニュー終了
const EndMenu = props => {

  // 0: メニューId
  const parametersRef = React.useRef(props.command.parameters || [1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onUpdate = () => {
    const command = {code: COMMAND.ENDMENU, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>メニューId：</font>
      <NumberEdit
        min={0}
        max={100}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}

// フラグ
const Flag = props => {

  // 0: 先頭Id
  // 1: 終端Id
  // 2: ONOFF
  const parametersRef = React.useRef(props.command.parameters || [1, 1, 1]);
  const parameters = parametersRef.current;
  const opecode = parameters[2];

  const onFlagChange = (e) => {
    parameters[0] = parseInt(e.target.value);
    parameters[1] = parameters[0];
  }

  const onRadioChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = {code: COMMAND.FLAG, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <FlagSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onFlagChange(e)}
      />
      <div>
      <input type="radio" name="opecode" value="0" defaultChecked={opecode === 0 ? 'checked' : ''}
        onChange={(e) => onRadioChange(e)}
      />OFF
      <input type="radio" name="opecode" value="1" defaultChecked={opecode === 1 ? 'checked' : ''}
        onChange={(e) => onRadioChange(e)}
      />ON
      </div>
    </CommandBase>
  );
}

// 変数
const Variable = props => {

  // 0: 先頭Id
  // 1: 終端Id
  // 2: 演算子
  // 3: 数値タイプ 0:定数
  // 4: 数値
  const parametersRef = React.useRef(props.command.parameters || [1, 1, 0, 0, 0]);
  const parameters = parametersRef.current;
  const opecode = parameters[2];

  const onVariableChange = (e) => {
    parameters[0] = parseInt(e.target.value);
    parameters[1] = parameters[0];
  }

  const onOpecodeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = {code: COMMAND.VARIABLE, parameters: parameters};
    props.onUpdate(command);
  }

  const onValueFocusOff = (value) => {
    parameters[4] = value;
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <VariableSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onVariableChange(e)}
      />
      <div>
      <input type="radio" name="opecode" value="0" defaultChecked={opecode === 0 ? 'checked' : ''}
        onChange={(e) => onOpecodeChange(e)}
      />代入
      <input type="radio" name="opecode" value="1" defaultChecked={opecode === 1 ? 'checked' : ''}
        onChange={(e) => onOpecodeChange(e)}
      />加算
      <input type="radio" name="opecode" value="2" defaultChecked={opecode === 2 ? 'checked' : ''}
        onChange={(e) => onOpecodeChange(e)}
      />減算
      </div>
      <font>定数：</font>
        <NumberEdit
          min={VARIABLERANGE.MIN}
          max={VARIABLERANGE.MAX}
          value={parameters[4]}
          onValueFocusOff={onValueFocusOff}
        />
    </CommandBase>
  );
}

// 道具をスロット格納
const ItemSlot = props => {

  // 0: 道具Id
  // 1: 道具Id格納スロット
  // 2: 道具オブジェクト格納スロット
  const parametersRef = React.useRef(props.command.parameters || [1, 1, 2]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onSlotChange = (e, i) => {
    parameters[i] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = {code: COMMAND.ITEMSLOT, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>道具Id：</font>
      <NumberEdit
        min={1}
        max={1000}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
      <div>
        <font>道具Id格納スロット：</font>
        <SlotSelectBox
          selectValue = {parameters[1]}
          onChange = {(e) => onSlotChange(e, 1)}
        />
      </div>
      <div>
        <font>道具オブジェクト格納スロット：</font>
        <SlotSelectBox
          selectValue = {parameters[2]}
          onChange = {(e) => onSlotChange(e, 2)}
        />
      </div>
    </CommandBase>
  );
}

// CASE
const Case = props => {

  // 0: 比較値
  const parametersRef = React.useRef(props.command.parameters || [0]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onUpdate = () => {
    const command = {code: COMMAND.CASE, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>比較値：</font>
      <NumberEdit
        min={-1}
        max={500}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}

// ラベル
const Label = props => {

  // 0: ラベル名
  const parametersRef = React.useRef(props.command.parameters || ['']);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = e.target.value
  }

  const onUpdate = () => {
    if(!parameters[0]) {
      return;
    }
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>ラベル名：</font>
      <input
        initialValue={parameters[0]}
        onChange={(e) => onChange(e)}
      />
    </CommandBase>
  );
}

// ラベルジャンプ
const Jump = props => {

  // 0: ラベル名
  const parametersRef = React.useRef(props.command.parameters || ['']);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = e.target.value
  }

  const onUpdate = () => {
    if(!parameters[0]) {
      return;
    }
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>ラベル名：</font>
      <input
        initialValue={parameters[0]}
        onChange={(e) => onChange(e)}
      />
    </CommandBase>
  );
}

// 道具入手
const GainItem = props => {

  // 0: 道具指定種類 0>道具Id 1>スロットId
  // 1: 道具指定Id
  // 2: 道具入手メンバー格納スロット
  const parametersRef = React.useRef(props.command.parameters || [0, 1, 1]);
  const parameters = parametersRef.current;
  const type = parameters[0];
  let itemId = parameters[1];
  let slotId = parameters[1];

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  }

  const onMemberSlotChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    // typeによりidを決定する
    parameters[1] = parameters[0] === 0 ? itemId : slotId;
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }

  const onValueFocusOff = (value) => {
    itemId = value;
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input type="radio" name="type" value="0" defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />道具
        <input type="radio" name="type" value="1" defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />スロット
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
}

// 場所移動
const Move = props => {

  const parametersRef = React.useRef(props.command.parameters || [0, '', 0, 0]);
  const parameters = parametersRef.current;
  const x = parameters[2];
  const y = parameters[3];

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onMapNameChange = (e) => {
    parameters[1] = e.target.value;
  }

  const onXValueFocusOff = (value) => {
    parameters[2] = value;
  }

  const onYValueFocusOff = (value) => {
    parameters[3] = value;
  }

  const onUpdate = () => {
    const command = {code: COMMAND.MOVE, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
      <input type="radio" name="movetype" value="0" defaultChecked={parameters[0] === 0 ? 'checked' : ''}
        onChange={(e) => onRadioChange(e)}
      />同じマップ
      <input type="radio" name="movetype" value="1" defaultChecked={parameters[0] === 1 ? 'checked' : ''}
        onChange={(e) => onRadioChange(e)}
      />別のマップ
      </div>
      <font>マップ名：</font>
      <input 
        defaultValue={parameters[1]}
        onChange={(e) => onMapNameChange(e)}
      />
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
    </CommandBase>
  );
}

// マップスクリプト
const MapScript = props => {

  // 0: スクリプトId
  const parametersRef = React.useRef(props.command.parameters || [1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onUpdate = () => {
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>スクリプトId：</font>
      <NumberEdit
        min={1}
        max={500}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}

// コモンスクリプト
const CommonScript = props => {

  // 0: スクリプトId
  const parametersRef = React.useRef(props.command.parameters || [1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onUpdate = () => {
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>スクリプトId：</font>
      <NumberEdit
        min={1}
        max={500}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}

const CommandEditor = props => {

  const viewEditor = () => {
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        return <Message
          text='mes'
          {...props} />
      case COMMAND.MENU:
        return <Menu
          {...props} />
      case COMMAND.ENDMENU:
        return <EndMenu
          {...props} />
      case COMMAND.FLAG:
        return <Flag
          {...props} />
      case COMMAND.VARIABLE:
        return <Variable
          {...props} />
      case COMMAND.ITEMSLOT:
        return <ItemSlot
          {...props} />
      case COMMAND.CASE:
        return <Case
          {...props} />
      case COMMAND.LABEL:
        return <Label
          {...props} />
      case COMMAND.JUMP:
        return <Jump
          {...props} />
      case COMMAND.GAINITEM:
        return <GainItem
          {...props} />
      case COMMAND.MOVE:
        return <Move
          {...props} />
      case COMMAND.MAPSCRIPT:
        return <MapScript
          {...props} />
      case COMMAND.COMMONSCRIPT:
        return <CommonScript
          {...props} />
      default:
        return null;
    }
  }

  return (
    <div className="command-editor">
      {viewEditor()}
    </div>
    );
}

export default CommandEditor;