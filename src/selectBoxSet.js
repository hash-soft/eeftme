import React from 'react';
import { Dataset, MapEventsRef, CommonEventsRef } from './contents';
import Utils from './utils';

const simpleSelectItems = (items) => {
  const selectItems = items.map((value, index) => {
    const num = index;
    const keyText = num.toString();
    return (
      <option key={keyText} value={num}>
        {value}
      </option>
    );
  });

  return selectItems;
};

const pairSelectItems = (items) => {
  const selectItems = items.map((value, index) => {
    const keyText = index.toString();
    return (
      <option key={keyText} value={value.value}>
        {value.text}
      </option>
    );
  });

  return selectItems;
};

const SelectBoxBase = (props) => {
  const selectItems = () => {
    const selectItems = props.items.map((value, index) => {
      const num = index + 1;
      const keyText = num.toString();
      const dispNum = Utils.alignId(num, props.digits);
      if (props.single) {
        return (
          <option key={keyText} value={num}>
            {dispNum + ':'}
            {value}
          </option>
        );
      } else {
        return (
          <option key={keyText} value={num}>
            {dispNum + ':'}
            {value.name}
          </option>
        );
      }
    });

    const selectValue = props.selectValue;
    // 選択している変数がなくなっていた場合の対策
    if (selectValue > props.items.length) {
      selectItems.push(
        <option key={selectValue.toString()} value={selectValue}>
          {'削除:'}
          {selectValue}
        </option>
      );
    }

    // 未使用選択可能な場合は先頭にindex0の項目を追加する
    if (props.unuse) {
      const text = props.unuseText ? props.unuseText : 'なし';
      selectItems.unshift(
        <option key={0} value={0}>
          {text}
        </option>
      );
    }

    return selectItems;
  };

  return (
    <select
      defaultValue={props.selectValue}
      onChange={(e) => props.onChange(e)}
    >
      {selectItems()}
    </select>
  );
};

// フラグセレクトボックス
// UI操作以外では選択を変えない想定
const FlagSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const flags = dataset.flags;

  return (
    <SelectBoxBase
      items={flags}
      digits={3}
      single={true}
      {...props}
    ></SelectBoxBase>
  );
};

// 変数セレクトボックス
// UI操作以外では選択を変えない想定
const VariableSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const variables = dataset.variables;

  return (
    <SelectBoxBase
      items={variables}
      digits={3}
      single={true}
      {...props}
    ></SelectBoxBase>
  );
};

// スロットセレクトボックス
// UI操作以外では選択を変えない想定
const SlotSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const slots = dataset.slots;

  return (
    <SelectBoxBase
      items={slots}
      digits={3}
      single={true}
      {...props}
    ></SelectBoxBase>
  );
};

// メッセージセレクトボックス
const MessageSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const messages = dataset.messages;

  return (
    <SelectBoxBase
      items={messages}
      digits={3}
      single={true}
      {...props}
    ></SelectBoxBase>
  );
};

// 道具セレクトボックス
const ItemSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const items = dataset.items;

  return <SelectBoxBase items={items} digits={3} {...props}></SelectBoxBase>;
};

// メンバーセレクトボックス
const MemberSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const members = dataset.members;

  return <SelectBoxBase items={members} digits={3} {...props}></SelectBoxBase>;
};

// メニューセレクトボックス
const MenuSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const windowsets = dataset.windowsets;

  return (
    <SelectBoxBase items={windowsets} digits={3} {...props}></SelectBoxBase>
  );
};

// マップセレクトボックス
const MapSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const mapList = dataset.mapList;

  return <SelectBoxBase items={mapList} digits={3} {...props}></SelectBoxBase>;
};

// 位置セレクトボックス
const PositionSelectBox = (props) => {
  const positions = React.useContext(Dataset).positions;

  return (
    <SelectBoxBase items={positions} digits={3} {...props}></SelectBoxBase>
  );
};

// ワープセレクトボックス
const WarpSelectBox = (props) => {
  const warpPlaces = React.useContext(Dataset).warpPlaces;

  return (
    <SelectBoxBase items={warpPlaces} digits={3} {...props}></SelectBoxBase>
  );
};

// 効果音セレクトボックス
const SeSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const sounds = dataset.sounds;

  return (
    <SelectBoxBase
      items={sounds}
      digits={3}
      unuseText={'停止'}
      {...props}
    ></SelectBoxBase>
  );
};

// BGMセレクトボックス
const BgmSelectBox = (props) => {
  const dataset = React.useContext(Dataset);
  const musics = dataset.musics;

  return (
    <SelectBoxBase
      items={musics}
      digits={3}
      unuseText={'停止'}
      {...props}
    ></SelectBoxBase>
  );
};

// マップイベントセレクトボックス
const MapEventSelectBox = (props) => {
  const mapEventsRef = React.useContext(MapEventsRef);

  return (
    <SelectBoxBase
      items={mapEventsRef.current}
      digits={3}
      {...props}
    ></SelectBoxBase>
  );
};

// 共通イベントセレクトボックス
const CommonEventSelectBox = (props) => {
  const commonEventsRef = React.useContext(CommonEventsRef);

  return (
    <SelectBoxBase
      items={commonEventsRef.current}
      digits={3}
      {...props}
    ></SelectBoxBase>
  );
};

export {
  simpleSelectItems,
  pairSelectItems,
  FlagSelectBox,
  VariableSelectBox,
  SlotSelectBox,
  MessageSelectBox,
  ItemSelectBox,
  MemberSelectBox,
  MenuSelectBox,
  MapSelectBox,
  PositionSelectBox,
  WarpSelectBox,
  SeSelectBox,
  BgmSelectBox,
  MapEventSelectBox,
  CommonEventSelectBox,
};
