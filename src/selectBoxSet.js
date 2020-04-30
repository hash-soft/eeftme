import React from 'react';
import { Flags, Variables } from './contents'
import Utils from './utils'


const simpleSelectItems = (items) => {
  const selectItems = items.map((value, index) => {
    const num = index;
    const keyText = num.toString();
    return <option key={keyText} value={num}>{value}</option>
  })

  return selectItems;
}

/*
const SimpleSelectBox = props => {

  const [value, updateValue] = React.useState(props.selectValue);

  const Items = () => {
    const selectItems = props.items.map((value, index) => {
      const num = index;
      const keyText = num.toString();
      return <option key={keyText} value={num}>{value}</option>
    })

    return selectItems;
  }

  const onChange = (e) => {
    const cValue = parseInt(e.target.value);
    updateValue(cValue);
  }

  return (
    <select value={value} onChange={(e) => onChange(e)}>
      {Items()}
    </select>
  )
}*/

// フラグセレクトボックス
// UI操作以外では選択を変えない想定
const FlagSelectBox = props => {

  const flags = React.useContext(Flags);

  const flagItems = () => {
    const selectItems = flags.map((step, move) => {
      const num = move + 1;
      const keyText = num.toString();
      const dispNum = Utils.alignFlagId(num);
      return <option key={keyText} value={num}>{dispNum + ':'}{step.name}</option>
    })

    const selectValue = props.selectValue;
    // 選択している変数がなくなっていた場合の対策
    if (selectValue > flags.length) {
      selectItems.push(<option key={selectValue.toString()} value={selectValue}>{'削除:'}{selectValue}</option>)
    }

    return selectItems;
  }

  return (
    <select defaultValue={props.selectValue} onChange={(e) => props.onChange(e)}>
      {flagItems()}
    </select>
  )
}

// 変数セレクトボックス
// UI操作以外では選択を変えない想定
const VariableSelectBox = props => {

  const variables = React.useContext(Variables);

  const variableItems = () => {
    const selectItems = variables.map((step, move) => {
      const num = move + 1;
      const keyText = num.toString();
      const dispNum = ('000' + num).slice(-3);
      return <option key={keyText} value={num}>{dispNum + ':'}{step.name}</option>
    })

    const selectValue = props.selectValue;

    // 選択している変数がなくなっていた場合の対策
    if (selectValue > variables.length) {
      selectItems.push(<option key={selectValue.toString()} value={selectValue}>{'削除:'}{selectValue}</option>)
    }

    return selectItems;
  }

  return (
    <select defaultValue={props.selectValue} onChange={(e) => props.onChange(e)}>
      {variableItems()}
    </select>
  );
}


export { simpleSelectItems, FlagSelectBox, VariableSelectBox }