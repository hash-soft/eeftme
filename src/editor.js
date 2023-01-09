import React, { useState } from 'react';
import EventEditor from './eventEditor';
import { simpleSelectItems } from './selectBoxSet';
import { Dataset, MapEventsRef, CommonEventsRef } from './contents';
import './index.css';

// ファイル読み込みボタン
const LoadButton = (props) => {
  const mapEventsRef = React.useContext(MapEventsRef);
  const commonEventsRef = React.useContext(CommonEventsRef);

  const showOpenFileDialog = (text) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json, application/json';
      input.onchange = (event) => {
        resolve(event.target.files[0]);
      };
      input.click();
    });
  };

  const readAsText = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const loadFile = async () => {
    const file = await showOpenFileDialog();
    const contents = await readAsText(file);
    console.log(contents);
    console.log(props.type);
    const json = JSON.parse(contents);

    // ファイルの中身チェックをやっておきたいが。。。

    if (props.type === 'events') {
      refreshEvents(json, contents, file.name.split(/\.(?=[^.]+$)/));
    } else if (props.type === 'common') {
      refreshCommonEvents(json, contents, file.name.split(/\.(?=[^.]+$)/));
    } else if (props.type === 'dataset') {
      refreshDataset(json, contents);
    }
  };

  const refreshEvents = (json, contents, filename) => {
    // 最初の要素は表示しないので除去する
    json.shift();
    // モードがマップの時だけ更新
    if (props.modeRef.current === 0) {
      props.eventEditorRef.current.refreshEvents(json);
      props.eventFileNameRef.current.updateName(filename[0]);
    } else {
      props.eventEditorRef.current.refreshEvents(json);
      props.eventFileNameRef.current.updateName(filename[0]);
      mapEventsRef.current = json;
      props.mapNameRef.current = filename[0];
    }
    localStorage.setItem('events', contents);
    localStorage.setItem('filename', filename[0]);
  };

  const refreshCommonEvents = (json, contents, filename) => {
    // 最初の要素は表示しないので除去する
    json.shift();
    // モードが共通の時だけ更新
    if (props.modeRef.current === 1) {
      commonEventsRef.current = json;
      props.commonNameRef.current = filename[0];
      props.eventEditorRef.current.refreshEvents(json);
      props.eventFileNameRef.current.updateName(filename[0]);
    } else {
      commonEventsRef.current = json;
      props.commonNameRef.current = filename[0];
    }
    localStorage.setItem('commonEvents', contents);
    localStorage.setItem('commonFilename', filename[0]);
  };

  const refreshDataset = (json, contents) => {
    props.shiftDataset(json);
    props.update(json);
    localStorage.setItem('dataset', contents);
  };

  React.useEffect(() => {
    console.log('Button effect');
  });

  return <button onClick={() => loadFile()}>{props.label}</button>;
};

// ファイル保存ボタン
const SaveButton = (props) => {
  const mapEventsRef = React.useContext(MapEventsRef);
  const commonEventsRef = React.useContext(CommonEventsRef);

  const saveData = (current, events) => {
    const eventsText = JSON.stringify(events);
    switch (props.modeRef.current) {
      case 0:
        // マップデータを更新する
        mapEventsRef.current = current;
        // ローカルストレージに保存
        localStorage.setItem('events', eventsText);
        localStorage.setItem('filename', props.eventFileNameRef.current.name);
        break;
      case 1:
        // 共通データを更新する
        commonEventsRef.current = current;
        // ローカルストレージに保存
        localStorage.setItem('commonEvents', eventsText);
        localStorage.setItem(
          'commonFilename',
          props.eventFileNameRef.current.name
        );
        break;
      default:
        break;
    }
  };

  const download = (events) => {
    if (props.type !== 'download') {
      return;
    }
    const blob = new Blob([JSON.stringify(events, null, '  ')], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = props.eventFileNameRef.current.name + '.json';
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  const saveFile = () => {
    const editEvents = props.eventsRef.current;
    // 先頭に空のオブジェクトを追加
    const events = [{}].concat(editEvents);
    // 編集が反映されていないので保存
    props.eventEditorRef.current.setEditEvent();
    // ダウンロード
    download(events);

    saveData(editEvents, events);
  };

  return <button onClick={() => saveFile()}>{props.label}</button>;
};

// ファイル読み書きボタン
const FileButtons = (props) => {
  const mapEventsRef = React.useContext(MapEventsRef);
  const commonEventsRef = React.useContext(CommonEventsRef);
  const mapNameRef = React.useRef(props.fileName);
  const commonNameRef = React.useRef(props.commonFileName);
  const modeRef = React.useRef(0);

  React.useEffect(() => {
    console.log('Buttons effect');
  });

  // モードの変更
  const onModeChange = (e) => {
    // 編集が反映されていないので保存
    props.eventEditorRef.current.setEditEvent();
    switch (e.target.value) {
      case '0':
        modeRef.current = 0;
        commonNameRef.current = props.eventFileNameRef.current.name;
        props.eventFileNameRef.current.updateName(mapNameRef.current);
        props.eventEditorRef.current.refreshEvents(mapEventsRef.current);
        break;
      case '1':
        modeRef.current = 1;
        mapNameRef.current = props.eventFileNameRef.current.name;
        props.eventFileNameRef.current.updateName(commonNameRef.current);
        props.eventEditorRef.current.refreshEvents(commonEventsRef.current);
        break;
      default:
        modeRef.current = 99;
        break;
    }
  };

  return (
    <div className="load-area">
      <select defaultValue={0} onChange={(e) => onModeChange(e)}>
        {simpleSelectItems(['個別', '共通'])}
      </select>
      <LoadButton
        label={'コマンドを開く'}
        type={'events'}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
        modeRef={modeRef}
        mapNameRef={mapNameRef}
      />
      <LoadButton
        label={'データセットを開く'}
        type={'dataset'}
        shiftDataset={props.shiftDataset}
        update={props.updateDataset}
      />
      <LoadButton
        label={'共通コマンドを開く'}
        type={'common'}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
        modeRef={modeRef}
        commonNameRef={commonNameRef}
      />
      <SaveButton
        label={'一時保存'}
        eventsRef={props.eventsRef}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
        modeRef={modeRef}
        type={'temp'}
      />
      <SaveButton
        label={'ダウンロード'}
        eventsRef={props.eventsRef}
        eventEditorRef={props.eventEditorRef}
        eventFileNameRef={props.eventFileNameRef}
        modeRef={modeRef}
        type={'download'}
      />
    </div>
  );
};

const EventFileName = React.forwardRef((props, ref) => {
  const [name, updateName] = useState(props.name);

  React.useImperativeHandle(ref, () => {
    return {
      name: name,
      updateName: updateName,
    };
  });

  const onNameChange = (e) => {
    const cname = e.target.value;
    updateName(cname);
  };

  return (
    <div className="event-file-name">
      <font size="3">保存名：</font>
      <input value={name} onChange={(e) => onNameChange(e)} />
    </div>
  );
});

// 入出力
const InOut = (props) => {
  const eventFileNameRef = React.useRef(null);

  return (
    <div className="inout-area">
      <EventFileName name={props.fileName} ref={eventFileNameRef} />
      <FileButtons {...props} eventFileNameRef={eventFileNameRef} />
    </div>
  );
};

// レイアウトベース
const Editor = () => {
  const eventEditorRef = React.useRef(null);

  const initFileName = () => {
    const fileNameText = localStorage.getItem('filename');
    if (fileNameText == null) {
      return 'event01';
    }
    return fileNameText;
  };

  const initCommonFileName = () => {
    const fileNameText = localStorage.getItem('commonFilename');
    if (fileNameText == null) {
      return 'commonScriptset';
    }
    return fileNameText;
  };

  const initEvents = () => {
    const eventsText = localStorage.getItem('events');
    if (eventsText == null) {
      return [
        { id: 1, name: 'a', conditions: [], list: [] },
        { id: 2, name: 'b', conditions: [], list: [] },
        { id: 3, name: 'c', conditions: [], list: [] },
      ];
    }
    const events = JSON.parse(eventsText);
    events.shift();
    return events;
  };

  const initCommonEvents = () => {
    const eventsText = localStorage.getItem('commonEvents');
    if (eventsText == null) {
      return [
        { id: 1, name: 'a', conditions: [], list: [] },
        { id: 2, name: 'b', conditions: [], list: [] },
        { id: 3, name: 'c', conditions: [], list: [] },
      ];
    }
    const events = JSON.parse(eventsText);
    events.shift();
    return events;
  };

  const initDataset = () => {
    const datasetText = localStorage.getItem('dataset');
    if (datasetText == null) {
      return {
        musics: [],
        sounds: [],
        flags: ['flag1', 'flag2'],
        variables: ['variable1', 'variable2'],
        slots: ['slot1', 'slot2'],
        members: [],
        enemies: [],
        items: [],
        skills: [],
        windowsets: [],
        mapList: [],
        positions: [],
        warpPlaces: [],
        states: [],
        slotIds: {},
        animations: [],
      };
    }
    const dataset = JSON.parse(datasetText);
    shiftDataset(dataset);
    return dataset;
  };

  const shiftDataset = (dataset) => {
    dataset.musics?.shift();
    dataset.sounds?.shift();
    dataset.flags?.shift();
    dataset.variables?.shift();
    dataset.slots?.shift();
    dataset.messages?.shift();
    dataset.members?.shift();
    dataset.enemies?.shift();
    dataset.items?.shift();
    dataset.skills?.shift();
    dataset.windowsets?.shift();
    dataset.mapList?.shift();
    dataset.positions?.shift();
    dataset.warpPlaces?.shift();
    dataset.states?.shift();
    dataset.animations?.shift();
  };

  const eventsRef = React.useRef(initEvents());
  const mapEventsRef = React.useRef(eventsRef.current);
  const commonEventsRef = React.useRef(initCommonEvents());
  const [dataset, updateDataset] = useState(() => initDataset());

  React.useEffect(() => {
    console.log('Editor effect');
  });

  return (
    <div className="editor">
      <Dataset.Provider value={dataset}>
        <MapEventsRef.Provider value={mapEventsRef}>
          <CommonEventsRef.Provider value={commonEventsRef}>
            <InOut
              fileName={initFileName()}
              commonFileName={initCommonFileName()}
              eventsRef={eventsRef}
              shiftDataset={shiftDataset}
              updateDataset={updateDataset}
              eventEditorRef={eventEditorRef}
            />
            <EventEditor eventsRef={eventsRef} ref={eventEditorRef} />
          </CommonEventsRef.Provider>
        </MapEventsRef.Provider>
      </Dataset.Provider>
    </div>
  );
};

export default Editor;
