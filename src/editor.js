import React, { useState } from 'react';
import EventEditor from './eventEditor'
import Variables from './variables'
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
    // 先頭に空のオブジェクトを追加
    const events = [{}].concat(props.events);
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
        label={'変数を開く'}
        type={'variables'}
        update={props.updateVariables}
      />
      <SaveButton
        label={'イベントを保存'}
        events={props.eventsRef.current}
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

  const initVariables = () => {
    const variablesText = localStorage.getItem('variables');
    if(variablesText == null) {
      return [{id:1, name:'one'}];
    }
    const variables = JSON.parse(variablesText);
    variables.shift();
    return variables;
  }

  const eventsRef = React.useRef(initEvents());
  const [variables, updateVariables] = useState(() => initVariables());

  React.useEffect(() => {
    console.log('Editor effect');
  });

  return (
    <div className="editor">
      <Variables.Provider value={variables}>
      <InOut
        fileName={initFileName()}
        eventsRef={eventsRef}
        updateVariables={updateVariables}
        eventEditorRef={eventEditorRef}
      />
      <EventEditor
        eventsRef={eventsRef}
        ref={eventEditorRef}
      />
      </Variables.Provider>
    </div>
  );
}

export default Editor;