import React, { useState, useEffect, useRef } from 'react';
import Conditions from './conditions';
import Commands from './commands';
import EventList from './eventList';
import { TRIGGER } from './define';
import { simpleSelectItems } from './selectBoxSet'
import './index.css';


// イベント名
const EventName = React.forwardRef((props, ref) => {
  const [name, updateName] = useState(props.name);

  React.useImperativeHandle(ref, () => {
    return {
      name : name,
      updateName : updateName
    }
  });

  const onNameChange = (e) => {
    const cname = e.target.value
    updateName(cname);
    props.updateEventList(cname);
  }

  return (
    <div className="event-name">
      <font size="3" >名前：</font>
      <input 
        value={name}
        onChange={(e) => onNameChange(e)}
      />
    </div>
  )
});

// 開始条件
const Trigger = React.forwardRef((props, ref) => {
  
  const [trigger, updateTrigger] = useState(props.trigger || 0);

  React.useImperativeHandle(ref, () => {
    return {
      trigger: trigger,
      updateTrigger: updateTrigger
    }
  });

  const onChange = (e) => {
    const cTrigger = parseInt(e.target.value);
    console.log('trigger change ' + cTrigger);
    updateTrigger(cTrigger);
  }

  return (
    <div className="event-name">
      <font size="3" >開始条件：</font>
      <select value={trigger} onChange={(e) => onChange(e)}>
        {simpleSelectItems(['話す', '調べる', '触れる'])}
      </select>
    </div>
  )
});


// イベント項目
const Event = (props) => {

  useEffect(() => {
    console.log('event effect');
  });

  return (
    <div className="event">
      <div className="event-left">
        <EventName
          name={props.event.name}
          updateEventList={props.updateEventList}
          ref={props.nameRef}
        />
        <Trigger
          trigger={props.event.trigger}
          ref={props.triggerRef}
        />
        <Conditions
          conditions={props.event.conditions}
          ref={props.conditionsRef}
        />
      </div>
      <div className="event-right">
        <Commands
          list={props.event.list}
          ref={props.commandsRef}
        />
      </div>
    </div>
  )
}



// エディタ部ルート
const EventEditor = React.forwardRef((props, ref) => {

  const listRef = useRef(null);
  const conditionsRef = useRef(null);
  const commandsRef = useRef(null);
  const nameRef = useRef(null);
  const triggerRef = useRef(null);

  // 親が参照できる機能
  React.useImperativeHandle(ref, () => {
    return {
      setEditEvent: setEditEvent,
      refreshEvents: refreshEvents
    }
  });

  const refreshEventList = () => {
    const names = listRef.current.refreshNames(props.eventsRef.current);
    console.log(names);
    listRef.current.updateNames(names);
    listRef.current.updateSize(names.length);
  }

  const refreshEvent = (event) => {
    nameRef.current.updateName(event.name);
    triggerRef.current.updateTrigger(event.trigger || 0);
    conditionsRef.current.updateConditions(event.conditions);
    commandsRef.current.updateList(event.list);
  }

  // イベント読み直し
  const refreshEvents = (newEvents, index) => {
    index = index || 0;
    index = Math.min(newEvents.length, index + 1) - 1;
    props.eventsRef.current = newEvents;
    listRef.current.updateIndex(index);
    refreshEventList();
    const event = newEvents[index];
    refreshEvent(event);
  }

  // 編集中のイベントリスト更新
  const updateEventList = (name) => {
    const index = listRef.current.index;
    const names = listRef.current.names.slice();
    names[index] = name;
    listRef.current.updateNames(names);
  }

  // 編集中のイベントを保存
  const setEditEvent = () => {
    const events = props.eventsRef.current;
    const index = listRef.current.index;
    const event = events[index];

    event.name = nameRef.current.name;
    event.trigger = triggerRef.current.trigger;
    event.conditions = conditionsRef.current.getConditions();
    event.list = commandsRef.current.getList();
  }

  // 編集イベント変更
  const onSelectChange = (e) =>{
    console.log('選択インデックス変更:' + e.target.selectedIndex);

    // イベントコマンド画面消去
    commandsRef.current.eraseEditor();

    // 編集中イベント保存
    setEditEvent();

    // イベント名リストを更新
    const name = nameRef.current.name;
    updateEventList(name);

    // リストインデックスを更新
    listRef.current.updateIndex(e.target.selectedIndex);
    // イベントを更新
    const events = props.eventsRef.current;
    const editEvent = events[e.target.selectedIndex];
    refreshEvent(editEvent);
  }

  // イベント数変更
  const onEventSizeClick = () => {
    const events = props.eventsRef.current;
    const oldSize = events.length;
    const newNum = Number(listRef.current.size);
    const newSize = Math.max(Math.min(newNum, 100), 1);

    if(oldSize === newSize) {
      return;
    }

    setEditEvent();

    for(let i = oldSize; i < newSize; i++) {
      // イベントのデータ
      const event = {id:i + 1, 
        name: 'ev' + (i + 1), 
        trigger: TRIGGER.TALK,
        conditions: [], 
        list: []}
      events.push(event);
    }
    if(newSize < oldSize) {
      events.length = newSize;
    }

    refreshEvents(events, listRef.current.index);
    
    console.log('old = ' + oldSize + ' new = ' + newSize);
  }

  React.useEffect(() => {
    console.log('EventEditor effect');
  });

  // returnが先に呼ばれるからここで渡す値を用意することはできない
  React.useLayoutEffect(() => {
    console.log('EventEditor layout');
  });

  // eventsの数が変わったときrefIndexの値に補正をかける必要あり

  return (
    <div className="edit-area">
      <EventList
        events={props.eventsRef.current}
        changeEvent={onSelectChange}
        eventSizeClick={onEventSizeClick}
        ref={listRef}
      />
      <Event
        event={props.eventsRef.current[0]}
        updateEventList={updateEventList}
        nameRef={nameRef}
        triggerRef={triggerRef}
        conditionsRef={conditionsRef}
        commandsRef={commandsRef}
      />
    </div>
  )
});

export default EventEditor;