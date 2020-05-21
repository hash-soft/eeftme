import React from 'react';
import { Flags, Variables, Slots } from './contents'
import Utils from './utils'


const simpleSelectItems = (items) => {
  const selectItems = items.map((value, index) => {
    const num = index;
    const keyText = num.toString();
    return <option key={keyText} value={num}>{value}</option>
  })

  return selectItems;
}

const SelectBoxBase = props => {

  const selectItems = () => {
    const selectItems = props.items.map((step, move) => {
      const num = move + 1;
      const keyText = num.toString();
      const dispNum = Utils.alignId(num, props.digits);
      return <option key={keyText} value={num}>{dispNum + ':'}{step.name}</option>
    })

    const selectValue = props.selectValue;
    // 選択している変数がなくなっていた場合の対策
    if (selectValue > props.items.length) {
      selectItems.push(<option key={selectValue.toString()} value={selectValue}>{'削除:'}{selectValue}</option>)
    }

    return selectItems;
  }

  return (
    <div>
      {props.children}
      <select defaultValue={props.selectValue} onChange={(e) => props.onChange(e)}>
        {selectItems()}
      </select>
    </div>
  );
}

// フラグセレクトボックス
// UI操作以外では選択を変えない想定
const FlagSelectBox = props => {

  const flags = React.useContext(Flags);

  return (
    <SelectBoxBase
      items={flags}
      digits={3}
      {...props}
    >
    </SelectBoxBase>
  )
}

// 変数セレクトボックス
// UI操作以外では選択を変えない想定
const VariableSelectBox = props => {

  const variables = React.useContext(Variables);

  return (
    <SelectBoxBase
      items={variables}
      digits={3}
      {...props}
    >
    </SelectBoxBase>
  )
}

// スロットセレクトボックス
// UI操作以外では選択を変えない想定
const SlotSelectBox = props => {

  const slots = React.useContext(Slots);

  return (
    <SelectBoxBase
      items={slots}
      digits={2}
      {...props}
    >
    </SelectBoxBase>
  )
}

export { simpleSelectItems, FlagSelectBox, VariableSelectBox, SlotSelectBox }