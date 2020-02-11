import React from 'react';
import {COMMAND} from './define';
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

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onMapNameChange = (e) => {
    parameters[1] = e.target.value;
  }

  const onXChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onYChange = (e) => {
    parameters[3] = parseInt(e.target.value);
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
        <input type="number" min="0" max="999"
        defaultValue={parameters[2]}
        onChange={(e) => onXChange(e)}
        />
        <font>Y：</font>
        <input type="number" min="0" max="999"
        defaultValue={parameters[3]}
        onChange={(e) => onYChange(e)}
        />
      </div>
    </CommandBase>
  );
}


const CommandEditor = props => {

  const viewEditor = () => {
    switch(props.command.code) {
    case COMMAND.MESSAGE:
      return <Message 
      text='mes'
      {...props}/>
    case COMMAND.MOVE:
      return <Move
      {...props}/>
    case COMMAND.VARIABLE:
      return <p>変数の操作</p>
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