import React, { useState } from 'react';
import EventEditor from './eventEditor'
import {Flags, Variables, Slots} from './contents'
import './index.css';



// ファイル読み込みボタン
const LoadButton = (props) => {

  const showOpenFileDialog = (text) => {
    return new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json, application/json';
      input.onchange = event => { resolve(event.target.files[0]); };
      input.click();
    });
  }

  const readAsText = file => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => { resolve(reader.result); };
    });
  };

  const loadFile = async () => {
    const file = await showOpenFileDialog();
    const contents = await readAsText(file);
    console.log(contents);
    console.log(props.type);
    const json = JSON.parse(contents);
    // 最初の要素は表示しないので除去する
    json.shift();
    if(props.type === 'events') {
      refreshEvents(json, contents, file.name.split(/\.(?=[^.]+$)/));
    }  else if(props.type === 'flags') {
      refreshFlags(json, contents);
    } else if(props.type === 'variables') {
      refreshVariables(json, contents);
    }
  }

  const refreshEvents = (json, contents, filename) => {
    props.eventEditorRef.current.refreshEvents(json);
    props.eventFileNameRef.current.updateName(filename[0]);
    localStorage.setItem('events', contents);
    localStorage.setItem('filename', filename[0]);
  }

  // フラグを読み込んだ後の処理
  // ローカルストレージもも更新する
  const refreshFlags = (json, contents) => {
    props.update(json);
    localStorage.setItem('flags', contents);
  }

  const refreshVariables = (json, contents) => {
    props.update(json);
    localStorage.setItem('variables', contents);
  }

  React.useEffect(() => {
    console.log('Button effect');
  });

  return (
    <button onClick={() => loadFile()}>{props.label}</button>
  )
}

// ファイル保存ボタン
const SaveButton = (props) => {
  const saveFile = () => {
    const editEvents = props.eventsRef.current;
    // 先頭に空のオブジェクトを追加
    const events = [{}].concat(editEvents);
    // 編集が反映されていないので保存
    props.eventEditorRef.current.setEditEvent();
    const blob = new Blob([JSON.stringify(events, null, '  ')], {type: 'application/json'});
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = props.eventFileNameRef.current.name + '.json'
    link.click();
    window.URL.revokeObjectURL(link.href);

    // ローカルストレージに保存
    const eventsText = JSON.stringify(events);
    localStorage.setItem('events', eventsText);
    localStorage.setItem('filename', props.eventFileNameRef.current.name);
  }

  return (
    <button onClick={() => saveFile()}>{props.label}</button>
  )
}

// ファイル読み書きボタン
const FileButtons = (props) => {
  React.useEffect(() => {
    console.log('Buttons effect');
  });

  return (
    <div className="load-area">
      <LoadButton
        label={'イベントを開く'}
        type={'events'}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
      />
      <LoadButton
        label={'フラグを開く'}
        type={'flags'}
        update={props.updateFlags}
      />
      <LoadButton
        label={'変数を開く'}
        type={'variables'}
        update={props.updateVariables}
      />
      <SaveButton
        label={'イベントを保存'}
        eventsRef={props.eventsRef}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
      />
    </div>
  )
}

const EventFileName = React.forwardRef((props, ref) => {
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
  }

  return (
    <div className="event-file-name">
      <font size="3" >保存名：</font>
      <input 
        value={name}
        onChange={(e) => onNameChange(e)}
      />
    </div>
  )
});


// 入出力
const InOut = (props) => {
  const eventFileNameRef = React.useRef(null);

  return (
    <div className="inout-area">
      <EventFileName
        name={props.fileName}
        ref={eventFileNameRef}
      />
      <FileButtons
        {...props}
        eventFileNameRef={eventFileNameRef}
      />
    </div>
  )
}

// レイアウトベース
const Editor = () => {

  const eventEditorRef = React.useRef(null);

  const initFileName = () => {
    const fileNameText = localStorage.getItem('filename');
    if( fileNameText == null) {
      return 'event01';
    }
    return fileNameText;
  }

  const initEvents = () => {
    const eventsText = localStorage.getItem('events');
    if(eventsText == null) {
      return [{id:1, name: 'a', conditions: [], list: []}, {id:2, name: 'b', conditions: [], list: []},{id:3, name: 'c', conditions: [], list: []}];
    }
    const events = JSON.parse(eventsText);
    events.shift();
    return events;
  }

  const initFlags = () => {
    const flagsText = localStorage.getItem('flags');
    if(flagsText == null) {
      return [{id:1, name:'f_one'}];
    }
    const flags = JSON.parse(flagsText);
    flags.shift();
    return flags;
  }

  const initVariables = () => {
    const variablesText = localStorage.getItem('variables');
    if(variablesText == null) {
      return [{id:1, name:'v_one'}];
    }
    const variables = JSON.parse(variablesText);
    variables.shift();
    return variables;
  }

  const eventsRef = React.useRef(initEvents());
  const [flags, updateFlags] = useState(() => initFlags());
  const [variables, updateVariables] = useState(() => initVariables());
  const slots = [
  { name: '選択した道具' }, { name: '行動者' }, { name: '道具' }, { name: '道具Id' },
  { name: '' }, { name: '' }, { name: '' }, { name: '' },{ name: '' }, { name: '' }, { name: '' }, { name: '' },
  { name: '' }, { name: '' }, { name: '' }, { name: '' }];

  React.useEffect(() => {
    console.log('Editor effect');
  });

  return (
    <div className="editor">
      <Flags.Provider value={flags}>
      <Variables.Provider value={variables}>
      <Slots.Provider value={slots}>
      <InOut
        fileName={initFileName()}
        eventsRef={eventsRef}
        updateFlags={updateFlags}
        updateVariables={updateVariables}
        eventEditorRef={eventEditorRef}
      />
      <EventEditor
        eventsRef={eventsRef}
        ref={eventEditorRef}
      />
      </Slots.Provider>
      </Variables.Provider>
      </Flags.Provider>
    </div>
  );
}

export default Editor;