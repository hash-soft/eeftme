import React, { useState, useEffect} from 'react';
import './index.css';

// イベントリスト
const EventList = React.forwardRef((props, ref) =>{

  useEffect(() => {
    console.log('list effect');
  });

  const initNames = () => {
    return refreshNames(props.events);
  }

  const refreshNames = (events) => {
    const names = events.map(step => {
      return step.name;
    });
    return names;
  }

  const [names, updateNames] = useState(() => initNames());
  const [index, updateIndex] = useState(0);
  const [size, updateSize] = useState(props.events.length);

  React.useImperativeHandle(ref, () => {
    return {
      names : names,
      updateNames : updateNames,
      index : index,
      updateIndex : updateIndex,
      refreshNames : refreshNames,
      size : size,
      updateSize : updateSize,
    }
  });

  const listItem = names.map((name, move) => {
    const num = move + 1;
    const keyText = num.toString();
    const dispNum = ('000' + num).slice(-3);
    return <option key={keyText} value={move}>{dispNum + ':'}{name}</option>
  })
  //<select size="10" value={props.index} onChange={(e) => props.changeEvent(e)}>

  const onSizeChange = (e) => {
    const newSize = e.target.value;
    updateSize(newSize);
  }

  return (
    <div className="event-list">
      <select size="10" value={index} onChange={(e) => props.changeEvent(e)}>
      {listItem}
      </select>
      <div>
        <font>最大数：</font>
        <input type="number" min="1" max="100"
          value={size}
          onChange={(e) => onSizeChange(e)}
        />
        <button onClick={props.eventSizeClick}>変更</button>
      </div>
    </div>
  )
});

export default EventList;