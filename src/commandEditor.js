import React from 'react';
import { FlagSelectBox, VariableSelectBox } from './selectBoxSet'
import { NumberEdit } from './editBoxSet'
import { COMMAND, VARIABLERANGE } from './define';
import './index.css';




const CommandBase = props => {
  return (
    <div>
      {props.children}
      <div>
        <button onClick={props.onUpdate}>適用</button>
        <button onClick={props.onCancel}>キャンセル</button>
      </div>
    </div>
  );
}

// 文章の表示
const Message = props => {

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

// フラグ
const Flag = props => {

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


const CommandEditor = props => {

  const viewEditor = () => {
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        return <Message
          text='mes'
          {...props} />
      case COMMAND.MOVE:
        return <Move
          {...props} />
      case COMMAND.FLAG:
        return <Flag
          {...props} />
      case COMMAND.VARIABLE:
        return <Variable
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