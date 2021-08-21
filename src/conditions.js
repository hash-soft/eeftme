import React, { useState, useEffect } from 'react';
import {
  FlagSelectBox,
  VariableSelectBox,
  SlotSelectBox,
  ItemSelectBox,
  MemberSelectBox,
} from './selectBoxSet';
import { NumberEdit } from './editBoxSet';
import './index.css';

const DeleteButton = (props) => {
  return <button onClick={props.onClick}>削除</button>;
};

// 条件種別
const ConditionType = (props) => {
  const onChange = (e) => {
    const condition = props.condition;
    condition.type = parseInt(e.target.value);
    // 種別ごとにパラメータを初期化する
    switch (condition.type) {
      case 0: // フラグ
        condition.param1 = 1;
        condition.param2 = 0;
        condition.compare = 1;
        break;
      case 1: // 変数
        condition.param1 = 1;
        condition.param2 = 0;
        condition.compare = 0;
        break;
      case 2: // スロット
        condition.param1 = 1;
        condition.param2 = 0;
        condition.compare = 0;
        break;
      case 3: // 道具
        condition.param1 = 1;
        condition.param2 = 0;
        condition.compare = 1;
        break;
      case 4: // メンバー
        condition.param1 = 1;
        condition.param2 = 0;
        condition.compare = 1;
        break;
      default:
        break;
    }
    props.onUpdateConditions();
  };

  return (
    <select value={props.condition.type} onChange={(e) => onChange(e)}>
      <option value="0">フラグ</option>
      <option value="1">変数</option>
      <option value="2">スロット</option>
      <option value="3">道具</option>
      <option value="4">メンバー</option>
    </select>
  );
};

// フラグ
const ConditionFlag = (props) => {
  const onFlagChange = (e) => {
    props.condition.param1 = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  const onCompareChange = (e) => {
    props.condition.compare = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  return (
    <div className="condition-item">
      <FlagSelectBox
        selectValue={props.condition.param1}
        onChange={(e) => onFlagChange(e)}
      />
      が
      <select
        value={props.condition.compare}
        onChange={(e) => onCompareChange(e)}
      >
        <option value="0">OFF</option>
        <option value="1">ON</option>
      </select>
    </div>
  );
};

// 変数
const ConditionVaribale = (props) => {
  const onVariableChange = (e) => {
    props.condition.param1 = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  // フォーカスが外れたときに値を補正する
  const onValueFocusOff = (value) => {
    props.condition.param2 = value;
    props.onUpdateConditions();
  };

  const onCompareChange = (e) => {
    props.condition.compare = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  return (
    <div className="condition-item">
      <VariableSelectBox
        selectValue={props.condition.param1}
        onChange={(e) => onVariableChange(e)}
      />
      が
      <NumberEdit
        min={-9999999}
        max={9999999}
        value={props.condition.param2}
        onValueFocusOff={onValueFocusOff}
      />
      と
      <select
        value={props.condition.compare}
        onChange={(e) => onCompareChange(e)}
      >
        <option value="0">等しい</option>
        <option value="1">以上</option>
        <option value="2">以下</option>
      </select>
    </div>
  );
};

// スロット
const ConditionSlot = (props) => {
  const onSlotChange = (e) => {
    props.condition.param1 = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  // フォーカスが外れたときに値を補正する
  const onValueFocusOff = (value) => {
    props.condition.param2 = value;
    props.onUpdateConditions();
  };

  const onCompareChange = (e) => {
    props.condition.compare = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  return (
    <div className="condition-item">
      <SlotSelectBox
        selectValue={props.condition.param1}
        onChange={(e) => onSlotChange(e)}
      />
      <select
        value={props.condition.compare}
        onChange={(e) => onCompareChange(e)}
      >
        <option value="0">=</option>
        <option value="1">&gt;=</option>
        <option value="2">&lt;=</option>
        <option value="3">&gt;</option>
        <option value="4">&lt;</option>
        <option value="5">!=</option>
        <option value="6">&amp;</option>
        <option value="7">!&amp;</option>
      </select>
      <NumberEdit
        min={-9999999}
        max={9999999}
        value={props.condition.param2}
        onValueFocusOff={onValueFocusOff}
      />
    </div>
  );
};

// 道具
const ConditionItem = (props) => {
  const onItemChange = (e) => {
    props.condition.param1 = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  const onCompareChange = (e) => {
    props.condition.compare = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  return (
    <div className="condition-item">
      <ItemSelectBox
        selectValue={props.condition.param1}
        onChange={(e) => onItemChange(e)}
      />
      を
      <select
        value={props.condition.compare}
        onChange={(e) => onCompareChange(e)}
      >
        <option value="0">持っていない</option>
        <option value="1">持っている</option>
      </select>
    </div>
  );
};

// メンバー
const ConditionMember = (props) => {
  const onMemberChange = (e) => {
    props.condition.param1 = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  const onCompareChange = (e) => {
    props.condition.compare = parseInt(e.target.value);
    props.onUpdateConditions();
  };

  return (
    <div className="condition-item">
      <MemberSelectBox
        selectValue={props.condition.param1}
        onChange={(e) => onMemberChange(e)}
      />
      が
      <select
        value={props.condition.compare}
        onChange={(e) => onCompareChange(e)}
      >
        <option value="0">いない</option>
        <option value="1">いる</option>
      </select>
    </div>
  );
};

// 条件項目
const ConditionItemList = (props) => {
  const viewEditor = () => {
    let Component = null;
    switch (props.condition.type) {
      case 0:
        Component = ConditionFlag;
        break;
      case 1:
        Component = ConditionVaribale;
        break;
      case 2:
        Component = ConditionSlot;
        break;
      case 3:
        Component = ConditionItem;
        break;
      case 4:
        Component = ConditionMember;
        break;
      default:
        return null;
    }
    return (
      <Component
        condition={props.condition}
        onUpdateConditions={props.onUpdateConditions}
      />
    );
  };

  useEffect(() => {});

  return (
    <div className="condition">
      <ConditionType
        condition={props.condition}
        onUpdateConditions={props.onUpdateConditions}
      />
      {viewEditor()}
      <DeleteButton onClick={() => props.onDeleteClick(props.index)} />
    </div>
  );
};

// 条件
const Conditions = React.forwardRef((props, ref) => {
  const [conditions, updateConditions] = useState(props.conditions);

  const update = (c) => {
    console.log('update');
    updateConditions(c);
  };

  React.useImperativeHandle(ref, () => {
    // 親コンポーネントの ref.current から実行できる関数を定義したオブジェクトを返す
    return {
      getConditions: () => conditions,
      updateConditions: update,
    };
  });

  // 条件追加
  const onAddClick = () => {
    // type : 0 = フラグ 1 = 変数
    // param1: ID
    // param2: 値（変数の場合）
    // compaire: 比較
    const condition = { type: 0, param1: 1, param2: 0, compare: 1 };
    updateConditions(conditions.concat(condition));
  };

  const onDeleteClick = (delIndex) => {
    const newConditions = conditions.filter((value, index) => {
      return delIndex !== index;
    });
    updateConditions(newConditions);
  };

  const onUpdateConditions = () => {
    const newConditions = conditions.slice();
    updateConditions(newConditions);
  };

  const conditionItems = conditions.map((step, move) => {
    const num = move + 1;
    return (
      <ConditionItemList
        key={`${num}${step.type}${step.param1}${step.param2}`}
        condition={step}
        index={move}
        onDeleteClick={onDeleteClick}
        onUpdateConditions={onUpdateConditions}
      />
    );
  });

  useEffect(() => {
    console.log('Conditions effect');
  });

  return (
    <div className="conditions">
      {conditionItems}
      <button onClick={() => onAddClick()}>出現条件追加</button>
    </div>
  );
});

export default Conditions;
