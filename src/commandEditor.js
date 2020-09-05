import React from 'react';
import { simpleSelectItems, pairSelectItems, FlagSelectBox, 
  VariableSelectBox, SlotSelectBox, ItemSelectBox, MemberSelectBox, MenuSelectBox, 
  SeSelectBox, BgmSelectBox,
  MapEventSelectBox, CommonEventSelectBox } from './selectBoxSet'
import { NumberEdit } from './editBoxSet'
import { COMMAND, VARIABLERANGE } from './define';
import './index.css';


const sliceParameters = (parameters) => {
  return parameters && parameters.slice();
}

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

  const data = sliceParameters(props.command.parameters);
  // 0: 表示テキスト
  // 1: 無待機フラグ
  const parametersRef = React.useRef(data || ['', 0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = e.target.value;
  }

  const onNoWaitChange = (e) => {
    parameters[1] = e.target.checked ? parseInt(e.target.value) : 0;
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
      <div>
        <textarea cols="50" rows="10" defaultValue={parameters[0]}
          style={{ resize: 'none' }}
          onChange={(e) => onChange(e)}
        >
        </textarea>
      </div>
      <div>
        <input type="checkbox" name="nowait" value="1" defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onNoWaitChange(e)}
        />待機しない
      </div>
    </CommandBase>
  );
}

// メニュー表示
const Menu = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: メニューId
  // 1: 格納スロットId
  const parametersRef = React.useRef(data || [1, 1]);
  const parameters = parametersRef.current;

  const onMenuChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onSlotChange = (e) => {
    parameters[1] = parseInt(e.target.value);
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
      <font>メニューId：</font>
      <MenuSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onMenuChange(e)}
      />
      <SlotSelectBox
        selectValue = {parameters[1]}
        onChange = {(e) => onSlotChange(e)}
        unuse = {true}
      />
    </CommandBase>
  );
}

// メニュー終了
const EndMenu = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: メニューId
  const parametersRef = React.useRef(data || [1]);
  const parameters = parametersRef.current;

  const onMenuChange = (e) => {
    parameters[0] = parseInt(e.target.value);
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
      <font>メニューId：</font>
      <MenuSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onMenuChange(e)}
      />
    </CommandBase>
  );
}

// 組み込みメニュー
const Embedded = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: メニューId
  // 1: 格納スロットId
  const parametersRef = React.useRef(data || [1, 1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value) => {
    parameters[0] = value;
  }

  const onSlotChange = (e) => {
    parameters[1] = parseInt(e.target.value);
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
      <font>組み込みId：</font>
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

// フラグ
const Flag = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 先頭Id
  // 1: 終端Id
  // 2: ONOFF
  const parametersRef = React.useRef(data || [1, 1, 1]);
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
    const command = {code: props.command.code, parameters: parameters};
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

  const data = sliceParameters(props.command.parameters);
  // 0: 先頭Id
  // 1: 終端Id
  // 2: 演算子
  // 3: 数値タイプ 0:定数
  // 4: 数値
  const parametersRef = React.useRef(data || [1, 1, 0, 0, 0]);
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
    const command = {code: props.command.code, parameters: parameters};
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

// スロット演算
const OperateSlot = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 先頭Id
  // 1: 終端Id
  // 2: 演算子
  // 3: 演算タイプ
  // 4: パラメータ1
  // 5: パラメータ2
  const parametersRef = React.useRef(data || [1, 1, 0, 0, 0, 0]);
  const parameters = parametersRef.current;
  const code = parameters[2];
  const type = parameters[3];
  let num = type === 0 ? parameters[4] : 0;
  let str = type === 1 ? parameters[4] : '';
  let json = type === 2 ? parameters[4] : '';
  let variableId = type === 3 ? parameters[4] : 1;
  let slotId = type === 4 ? parameters[4] : 1;
  let [rand1, rand2] = type === 5 ? [parameters[4], parameters[5]] : [0, 0];
  let gameId = type === 6 ? parameters[4] : 0;
  const gameList = ['所持金', 'パーティ生存人数','パーティ人数'];
  let itemId = type === 7 ? parameters[4] : 1;

  const onSlotChange = (e) => {
    parameters[0] = parseInt(e.target.value);
    parameters[1] = parameters[0];
  }

  const onCodeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onTypeChange = (e) => {
    parameters[3] = parseInt(e.target.value);
  }

  const onValueFocusOffNum = (value) => {
    num = value;
  }

  const onStrChange = (e) => {
    str = e.target.value;
  }

  const onJsonChange = (e) => {
    json = e.target.value;
  }

  const onVariableChange = (e) => {
    variableId = parseInt(e.target.value);
  }

  const onSlotIdChange = (e) => {
    slotId = parseInt(e.target.value);
  }

  const onValueFocusOffRand1 = (value) => {
    rand1 = value;
  }

  const onValueFocusOffRand2 = (value) => {
    rand2 = value;
  }

  const onGameIdChange = (e) => {
    gameId = parseInt(e.target.value);
  }

  const onItemIdChange = (e) => {
    itemId = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const values1 = [num, str, json, variableId, slotId, rand1, gameId, itemId];
    const values2 = [0, 0, 0, 0, 0, rand2, 0, 0];
    const newType = parameters[3];
    [parameters[4], parameters[5]] = [values1[newType], values2[newType]];

    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  }

  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input type="radio" name="code" value="0" defaultChecked={code === 0 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>=</font>
        <input type="radio" name="code" value="1" defaultChecked={code === 1 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>+</font>
        <input type="radio" name="code" value="2" defaultChecked={code === 2 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>-</font>
        <input type="radio" name="code" value="3" defaultChecked={code === 3 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>*</font>
        <input type="radio" name="code" value="4" defaultChecked={code === 4 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>/</font>
        <input type="radio" name="code" value="5" defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>%</font>
      </div>
      <div>
        <input type="radio" name="type" value="0" defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>定数：</font>
        <NumberEdit
          min={VARIABLERANGE.MIN}
          max={VARIABLERANGE.MAX}
          value={num}
          onValueFocusOff={onValueFocusOffNum}
        />
      </div>
      <div>
        <input type="radio" name="type" value="1" defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>文字列：</font>
        <textarea cols="30" rows="10" defaultValue={str}
          style={{ resize: 'none' }}
          onChange={(e) => onStrChange(e)}
        >
        </textarea>
      </div>
      <div>
        <input type="radio" name="type" value="2" defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>json：</font>
        <input
          defaultValue={json}
          onChange={(e) => onJsonChange(e)}
        />
      </div>
      <div>
        <input type="radio" name="type" value="3" defaultChecked={type === 3 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>変数：</font>
        <VariableSelectBox
          selectValue={variableId}
          onChange={(e) => onVariableChange(e)}
        />
      </div>
      <div>
        <input type="radio" name="type" value="4" defaultChecked={type === 4 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>スロット：</font>
        <SlotSelectBox
          selectValue={slotId}
          onChange={(e) => onSlotIdChange(e)}
        />
      </div>
      <div>
        <input type="radio" name="type" value="5" defaultChecked={type === 5 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>乱数：</font>
        <NumberEdit
          min={VARIABLERANGE.MIN}
          max={VARIABLERANGE.MAX}
          value={rand1}
          onValueFocusOff={onValueFocusOffRand1}
        />
        <font>～</font>
        <NumberEdit
          min={VARIABLERANGE.MIN}
          max={VARIABLERANGE.MAX}
          value={rand2}
          onValueFocusOff={onValueFocusOffRand2}
        />
      </div>
      <div>
        <input type="radio" name="type" value="6" defaultChecked={type === 6 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>ゲームデータ：</font>
        <select defaultValue={gameId} onChange={(e) => onGameIdChange(e)}>
          {simpleSelectItems(gameList)}
        </select>
      </div>
      <div>
        <input type="radio" name="type" value="7" defaultChecked={type === 7 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>道具：</font>
        <ItemSelectBox
          selectValue={itemId}
          onChange={(e) => onItemIdChange(e)}
        />
      </div>
        
    </CommandBase>
  );
}

// 商品の設定
const Goods = props => {

  const data = sliceParameters(props.command.parameters);
  // 道具Id配列
  const parametersRef = React.useRef(data || []);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
  }

  const onUpdate = () => {
    const command = {code: props.command.code, 
      parameters: parameters.filter(value => value !== undefined)};
    props.onUpdate(command);
  }

  const GoodsList = () => {
    const inputList = new Array(8);
    for(let i = 0; i < inputList.length; i++) {
        inputList[i] = <NumberEdit
        min={1}
        max={1000}
        allowEmpty={true}
        value={parameters[i]}
        onValueFocusOff={(value) => onValueFocusOff(value, i)}
      />
    }
    return inputList;
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>道具Id：</font>
      <GoodsList
      />
    </CommandBase>
  );
}

// スロット比較
const CompareSlot = props => {

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
  }

  const onCodeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  }

  const onTypeChange = (e) => {
    parameters[2] = parseInt(e.target.value);
  }

  const onValueFocusOffNum = (value) => {
    num = value;
  }

  const onSlotIdChange = (e) => {
    slotId = parseInt(e.target.value);
  }

  const onUpdate = () => {
    parameters[3] = parameters[2] === 0 ? num : slotId;
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  }

  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <SlotSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onSlotChange(e)}
      />
      <div>
        <input type="radio" name="code" value="0" defaultChecked={code === 0 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>=</font>
        <input type="radio" name="code" value="1" defaultChecked={code === 1 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>&gt;=</font>
        <input type="radio" name="code" value="2" defaultChecked={code === 2 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>&lt;=</font>
        <input type="radio" name="code" value="3" defaultChecked={code === 3 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>&gt;</font>
        <input type="radio" name="code" value="4" defaultChecked={code === 4 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>&lt;</font>
        <input type="radio" name="code" value="5" defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>!=</font>
        <input type="radio" name="code" value="6" defaultChecked={code === 5 ? 'checked' : ''}
          onChange={(e) => onCodeChange(e)}
        /><font>&amp;</font>
      </div>
      <div>
        <input type="radio" name="type" value="0" defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />
        <font>定数：</font>
        <NumberEdit
          min={VARIABLERANGE.MIN}
          max={VARIABLERANGE.MAX}
          value={num}
          onValueFocusOff={onValueFocusOffNum}
        />
      </div>
      <div>
        <input type="radio" name="type" value="1" defaultChecked={type === 1 ? 'checked' : ''}
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
}

// CASE
const Case = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 比較値
  const parametersRef = React.useRef(data || [0]);
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

  const data = sliceParameters(props.command.parameters);
  // 0: ラベル名
  const parametersRef = React.useRef(data || ['']);
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
        defaultValue={parameters[0]}
        onChange={(e) => onChange(e)}
      />
    </CommandBase>
  );
}

// ラベルジャンプ
const Jump = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: ラベル名
  const parametersRef = React.useRef(data || ['']);
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
        defaultValue={parameters[0]}
        onChange={(e) => onChange(e)}
      />
    </CommandBase>
  );
}

// 道具入手
const GainItem = props => {

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


// 所持金変更
const ChangeGold = props => {

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
  }

  const onTypeChange = (e) => {
    parameters[1] = parseInt(e.target.value);
  }

  const onSlotChange = (e) => {
    slotId = parseInt(e.target.value);
  }

  const onValueFocusOff = (value) => {
    number = value;
  }

  const onUpdate = () => {
    // typeによりidを決定する
    parameters[2] = parameters[1] === 0 ? number : slotId;
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input type="radio" name="op" value="0" defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onOpChange(e)}
        />増加
        <input type="radio" name="op" value="1" defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onOpChange(e)}
        />減少
      </div>
      <div>
        <input type="radio" name="type" value="0" defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />直値
        <input type="radio" name="type" value="1" defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />スロット
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
}


// 回復
const Recover = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 操作 0>パーティ 1>仲間全体 2>登録id 3>並び順
  // 1: 登録id>メンバーid  並び順>並び番号
  // 2: hp回復率
  // 3: mp回復率
  // 4: 状態回復優先度先頭
  // 5: 状態回復優先度終端
  const parametersRef = React.useRef(data || [0, 1, 100, 100, 0, 80]);
  const parameters = parametersRef.current;
  const type = parameters[0];
  let memberId = parameters[1];
  let orderId = type !== 3 ? 0: parameters[1];

  const onTypeChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onMemberChange = (e) => {
    memberId = parseInt(e.target.value);
  }

  const onValueFocusOff = (value) => {
    orderId = value;
  }

  const onRecoverValueFocusOff = (value, n) => {
    parameters[n] = value;
  }

  const onUpdate = () => {
    // typeによりparamを決定する
    parameters[1] = parameters[0] !== 3 ? memberId : orderId;
    const command = {code: props.command.code, parameters: parameters};
    props.onUpdate(command);
  }
  
  return (
    <CommandBase 
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <div>
        <input type="radio" name="type" value="0" defaultChecked={type === 0 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />パーティ
        <input type="radio" name="type" value="1" defaultChecked={type === 1 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />仲間全体
        <input type="radio" name="type" value="2" defaultChecked={type === 2 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />メンバーid
        <input type="radio" name="type" value="3" defaultChecked={type === 3 ? 'checked' : ''}
          onChange={(e) => onTypeChange(e)}
        />並び指定
      </div>
      <div>
        <font>登録id：</font>
        <MemberSelectBox
          selectValue={memberId}
          onChange={(e) => onMemberChange(e)}
        />
      </div>
      <div>
        <NumberEdit
          min={0}
          max={10}
          value={orderId}
          onValueFocusOff={onValueFocusOff}
        />
        <font>番目</font>
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
}


// タイル変更
const ChangeTile = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 変更するレイヤー
  // 1: タイルid
  // 2: x座標
  // 3: y座標
  const parametersRef = React.useRef(data || [0, 1, 0, 0]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
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
      <div>
        <font>変更するレイヤー：</font>
        <NumberEdit
          min={0}
          max={3}
          value={parameters[0]}
          onValueFocusOff={(value) => onValueFocusOff(value, 0)}
        />
      </div>
      <div>
        <font>タイルid：</font>
        <NumberEdit
          min={0}
          max={9999}
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
}


// タイル切替
const SwapTile = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 0 戻す 1 置き換える
  // 1: 切り替えるレイヤー
  const parametersRef = React.useRef(data || [1, 0]);
  const parameters = parametersRef.current;

  const onRadioChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onValueFocusOff = (value) => {
    parameters[1] = value;
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
      <div>
        <input type="radio" name="replace" value="0" defaultChecked={parameters[0] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />元のタイル
      <input type="radio" name="replace" value="1" defaultChecked={parameters[0] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />設定タイル
      </div>
      <font>置き換えるレイヤー：</font>
      <NumberEdit
        min={0}
        max={3}
        value={parameters[1]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}


// 場所移動
const Move = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 0 同一マップ 1 異なるマップ
  // 1: マップ名
  // 2: x座標
  // 3: y座標
  // 4: 方向
  // 5: パターン初期化するか
  // 6: 移動音 0:なし 1:あり
  const parametersRef = React.useRef(data || [0, '', 0, 0, -1, 1, 1]);
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

  const directionList = [{value: -1, text: 'そのまま'}, {value: 0, text: '下'}, 
    {value: 1, text: '右'}, {value: 2, text: '左'}, {value: 3, text: '上'}]

  const onDirectionChange = (e) => {
    parameters[4] = parseInt(e.target.value);
  }
  
  const onPatternChange = (e) => {
    parameters[5] = parseInt(e.target.value);
  }

  const onSoundChange = (e) => {
    parameters[6] = parseInt(e.target.value);
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
      <div>
        <font>方向：</font>
        <select defaultValue={parameters[4]} onChange={(e) => onDirectionChange(e)}>
          {pairSelectItems(directionList)}
        </select>
      </div>
      <div>
        <font>パターン：</font>
        <input type="radio" name="pattern" value="0" defaultChecked={parameters[5] === 0 ? 'checked' : ''}
          onChange={(e) => onPatternChange(e)}
        />そのまま
      <input type="radio" name="pattern" value="1" defaultChecked={parameters[5] === 1 ? 'checked' : ''}
          onChange={(e) => onPatternChange(e)}
        />初期化
      </div>
      <div>
        <font>移動音：</font>
        <input type="radio" name="sound" value="0" defaultChecked={parameters[5] === 0 ? 'checked' : ''}
          onChange={(e) => onSoundChange(e)}
        />なし
      <input type="radio" name="sound" value="1" defaultChecked={parameters[5] === 1 ? 'checked' : ''}
          onChange={(e) => onSoundChange(e)}
        />あり
      </div>

    </CommandBase>
  );
}


// 移動ルート
const MoveRoute = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 対象 -1 プレイヤー 0:自キャラ その他：番号のキャラ
  // 1: 0 共通 1 マップ
  // 2: ルートId
  const parametersRef = React.useRef(data || [0, 0, 1]);
  const parameters = parametersRef.current;

  const onValueFocusOff = (value, i) => {
    parameters[i] = value;
  }

  const onRadioChange = (e) => {
    parameters[1] = parseInt(e.target.value);
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
      <font>対象：</font>
      <NumberEdit
        min={-1}
        max={1000}
        value={parameters[0]}
        onValueFocusOff={(value) => onValueFocusOff(value, 0)}
      />
      <div>
        <input type="radio" name="type" value="0" defaultChecked={parameters[1] === 0 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />共通
      <input type="radio" name="type" value="1" defaultChecked={parameters[1] === 1 ? 'checked' : ''}
          onChange={(e) => onRadioChange(e)}
        />マップ
      </div>
      <font>ルートId：</font>
      <NumberEdit
        min={1}
        max={1000}
        value={parameters[2]}
        onValueFocusOff={(value) => onValueFocusOff(value, 2)}
      />
    </CommandBase>
  );
}


// マップスクリプト
const MapScript = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: スクリプトId
  const parametersRef = React.useRef(data || [1]);
  const parameters = parametersRef.current;

  const onEventChange = (e) => {
    parameters[0] = parseInt(e.target.value);
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
      <MapEventSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onEventChange(e)}
      />
    </CommandBase>
  );
}

// コモンスクリプト
const CommonScript = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: スクリプトId
  const parametersRef = React.useRef(data || [1]);
  const parameters = parametersRef.current;

  const onEventChange = (e) => {
    parameters[0] = parseInt(e.target.value);
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
      <CommonEventSelectBox
        selectValue = {parameters[0]}
        onChange = {(e) => onEventChange(e)}
      />
    </CommandBase>
  );
}


// 待機
const Wait = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: フレーム数
  const parametersRef = React.useRef(data || [60]);
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
      <font>フレーム：</font>
      <NumberEdit
        min={1}
        max={600}
        value={parameters[0]}
        onValueFocusOff={onValueFocusOff}
      />
    </CommandBase>
  );
}


// 効果音
const Se = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 効果音Id
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  }

  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>効果音Id：</font>
      <SeSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onChange(e)}
        unuse={true}
      />
    </CommandBase>
  );
}


// BGM演奏
const BgmPlay = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 効果音Id
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  }

  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>BGMId：</font>
      <BgmSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onChange(e)}
        unuse={true}
      />
    </CommandBase>
  );
}


// BGM割込
const BgmInterrupt = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 効果音Id
  const parametersRef = React.useRef(data || [0]);
  const parameters = parametersRef.current;

  const onChange = (e) => {
    parameters[0] = parseInt(e.target.value);
  }

  const onUpdate = () => {
    const command = { code: props.command.code, parameters: parameters };
    props.onUpdate(command);
  }

  return (
    <CommandBase
      onUpdate={onUpdate}
      onCancel={props.onCancel}
    >
      <font>BGMId：</font>
      <BgmSelectBox
        selectValue={parameters[0]}
        onChange={(e) => onChange(e)}
        unuse={true}
      />
    </CommandBase>
  );
}


// イベント起動
const EventTrigger = props => {

  const data = sliceParameters(props.command.parameters);
  // 0: 起動Id
  const parametersRef = React.useRef(data || [1]);
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
      <font>起動Id：</font>
      <NumberEdit
        min={0}
        max={100}
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
      case COMMAND.EMBEDDED:
        return <Embedded
          {...props} />
      case COMMAND.FLAG:
        return <Flag
          {...props} />
      case COMMAND.VARIABLE:
        return <Variable
          {...props} />
      case COMMAND.OPERATESLOT:
        return <OperateSlot
          {...props} />
      case COMMAND.GOODS:
        return <Goods
          {...props} />
      case COMMAND.CASE:
        return <Case
          {...props} />
      case COMMAND.COMPARESLOT:
        return <CompareSlot
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
      case COMMAND.CHANGEGOLD:
        return <ChangeGold
          {...props} />
      case COMMAND.RECOVER:
        return <Recover
          {...props} />
      case COMMAND.CHANGETILE:
        return <ChangeTile
          {...props} />
      case COMMAND.SWAPTILE:
        return <SwapTile
          {...props} />
      case COMMAND.MOVE:
        return <Move
          {...props} />
      case COMMAND.MOVEROUTE:
        return <MoveRoute
          {...props} />
      case COMMAND.MAPSCRIPT:
        return <MapScript
          {...props} />
      case COMMAND.COMMONSCRIPT:
        return <CommonScript
          {...props} />
      case COMMAND.WAIT:
        return <Wait
          {...props} />
      case COMMAND.SE:
        return <Se
          {...props} />
      case COMMAND.BGMPLAY:
        return <BgmPlay
          {...props} />
      case COMMAND.BGMINTERRUPT:
        return <BgmInterrupt
          {...props} />
      case COMMAND.EVENTTRIGGER:
        return <EventTrigger
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