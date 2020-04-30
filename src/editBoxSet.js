import React from 'react';

// 数値入力
const NumberEdit = props => {

  const [value, updateValue] = React.useState(props.value);

  // changeの時点ではそのまま表示するだけだから仲で閉じ込めて置けるかも
  const onChange = (e) => {
    updateValue(e.target.value);
  }

  const onBlur = (e) => {
    const valueNum = Number(e.target.value);
    const alignValue = Math.max(Math.min(valueNum, props.max), props.min);

    props.onValueFocusOff(alignValue);
    updateValue(alignValue);
  }

  return (
    <input type="number" min={props.min} max={props.max}
      value={value}
      onChange={(e) => onChange(e)}
      onBlur={(e) => onBlur(e)}
    />
  )
}

export { NumberEdit }