import React, { useState, useEffect } from 'react';
import Variables from './variables'
import './index.css';




const DeleteButton = props => {
  return (
    <button onClick={props.onClick}>削除</button>
  );
}


// 条件項目
const ConditionItem = props => {

  const variables = React.useContext(Variables);

  const variableItems = () => {
    const selectItems = variables.map((step, move) => {
      const num = move + 1;
      const keyText = num.toString();
      const dispNum = ('000' + num).slice(-3);
      return <option key={keyText} value={num}>{dispNum + ':'}{step.name}</option>
    })

    const selectValue = props.condition.variableId;
    console.log(selectValue);
    if(selectValue > variables.length) {
      selectItems.push(<option key={selectValue.toString()} value={selectValue}>{'削除:'}{selectValue}</option>)
    }

    return selectItems;
  }

  const onVariableChange = (e) => {
    props.condition.variableId = isNaN(e.target.value) ? 0 : parseInt(e.target.value);
    props.onUpdateConditions();
  }

  const onValueChange = (e) => {
    props.condition.value = e.target.value;
    props.onUpdateConditions();
  }

  // フォーカスが外れたときに値を補正する
  const onValueFocusOff = () => {
    const valueNum = Number(props.condition.value);
    props.condition.value = Math.max(Math.min(valueNum, -9999999), 9999999);
    props.onUpdateConditions();
  }

  const onCompareChange = (e) => {
    props.condition.compare = isNaN(e.target.value) ? 0 : parseInt(e.target.value);
    props.onUpdateConditions();
  }

  useEffect(() => {
    console.log(props.condition);
  });

  return (
    <div className="condition">
      変数
      <select value={props.condition.variableId} onChange={(e) => onVariableChange(e)}>
      {variableItems()}
      </select>
      が
      <input type="number" name="example" 
        value={props.condition.value} min="-9999999" max="9999999"
        onChange={(e) => onValueChange(e)} onBlur={() => onValueFocusOff()}
      />
      と
      <select value={props.condition.compare} onChange={(e) => onCompareChange(e)}>
      <option value="0">等しい</option>
      <option value="1">以上</option>
      <option value="2">以下</option>
      </select>
      <DeleteButton onClick = {() => props.onDeleteClick(props.index)}/>
    </div>
  )
}


// 条件
const Conditions = React.forwardRef((props, ref) => {

  const [conditions, updateConditions] = useState(props.conditions);

  //const conditionsRef = useRef(null);

  const update = (c) => {
    console.log('update');
    updateConditions(c);
  }

  React.useImperativeHandle(ref, () => {
    // 親コンポーネントの ref.current から実行できる関数を定義したオブジェクトを返す
    return {
      getConditions : () => conditions,
      updateConditions : update
    }
  });

  // 条件追加
  const onAddClick = () => {
    const condition = {variableId: 1, value: 0, compare: 0};
    updateConditions(conditions.concat(condition));
  }

  const onDeleteClick = (delIndex) => {
    const newConditions = conditions.filter((value, index) => {
      return delIndex !== index;
    });
    updateConditions(newConditions)
  }

  const onUpdateConditions = () => {
    const newConditions = conditions.slice();
    updateConditions(newConditions);
  }

  const conditionItems = conditions.map((step, move) => {
    const num = move + 1;
    return (
      <ConditionItem key={num}
        condition={step}
        index={move}
        onDeleteClick={onDeleteClick}
        onUpdateConditions={onUpdateConditions}
      />
    )
  })

  useEffect(() => {
    console.log('Conditions effect');
  });

  return (
    <div className="conditions">
      <button onClick={() => onAddClick()}>条件追加</button>
      {conditionItems}
    </div>
  )
});

export default Conditions;