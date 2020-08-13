import React from 'react';

// 数値入力
const NumberEdit = props => {

  const [value, updateValue] = React.useState(props.value);
  const allowEmpty = props.allowEmpty;

  // changeの時点ではそのまま表示するだけだから中で閉じ込めて置けるかも
  const onChange = (e) => {
    updateValue(e.target.value);
  }

  const onBlur = (e) => {
    const alignValue = getValue(e.target.value);

    props.onValueFocusOff(alignValue);
    updateValue(alignValue);
  }

  const getValue = (value) => {
    if(value === '' && allowEmpty) {
      return;
    }
    const valueNum = Number(value);
    const alignValue = Math.max(Math.min(valueNum, props.max), props.min);
    return alignValue;
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