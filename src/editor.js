import React, { useState } from 'react';
import EventEditor from './eventEditor'
import {Dataset} from './contents'
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
    
    if (props.type === 'events') {
      refreshEvents(json, contents, file.name.split(/\.(?=[^.]+$)/));
    } else if (props.type === 'dataset') {
      refreshDataset(json, contents);
    }
  }

  const refreshEvents = (json, contents, filename) => {
    // 最初の要素は表示しないので除去する
    json.shift();
    props.eventEditorRef.current.refreshEvents(json);
    props.eventFileNameRef.current.updateName(filename[0]);
    localStorage.setItem('events', contents);
    localStorage.setItem('filename', filename[0]);
  }

  const refreshDataset = (json, contents) => {
    props.shiftDataset(json);
    props.update(json);
    localStorage.setItem('dataset', contents);
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
        label={'コマンドを開く'}
        type={'events'}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
      />
      <LoadButton
        label={'データセットを開く'}
        type={'dataset'}
        shiftDataset={props.shiftDataset}
        update={props.updateDataset}
      />
      <SaveButton
        label={'コマンドを保存'}
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

  const initDataset = () => {
    const datasetText = localStorage.getItem('dataset');
    if(datasetText == null) {
      return {flags: ['flag1', 'flag2'],
        variables: ['variable1', 'variable2'],
        slots: ['slot1', 'slot2'],
        members: [],
        items: [],
        windowsets: []
      }
    }
    const dataset = JSON.parse(datasetText);
    shiftDataset(dataset);
    return dataset;
  }

  const shiftDataset = (dataset) => {
    dataset.flags.shift();
    dataset.variables.shift();
    dataset.slots.shift();
    dataset.members.shift();
    if(dataset.items) dataset.items.shift();
    dataset.windowsets.shift();
  }

  const eventsRef = React.useRef(initEvents());
  const [dataset, updateDataset] = useState(() => initDataset());

  React.useEffect(() => {
    console.log('Editor effect');
  });

  return (
    <div className="editor">
      <Dataset.Provider value={dataset}>
      <InOut
        fileName={initFileName()}
        eventsRef={eventsRef}
        shiftDataset={shiftDataset}
        updateDataset={updateDataset}
        eventEditorRef={eventEditorRef}
      />
      <EventEditor
        eventsRef={eventsRef}
        ref={eventEditorRef}
      />
      </Dataset.Provider>
    </div>
  );
}

export default Editor;