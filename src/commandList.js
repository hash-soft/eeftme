import React from 'react';
import './index.css';
import { COMMAND } from './define';
import { Flags, Variables } from './contents'
import Utils from './utils'


const listFlagContents = (parameters, flags) => {
  const flagId = parameters[0]; // まとめての場合parameters[1]を使用する
  const control = parameters[2];
  const flagName = '[' + Utils.alignFlagId(flagId) + ':' + flags[flagId - 1].name + ']';
  return <td>{flagName} = {control === 0 ? 'OFF' : 'ON'}</td>
}

const listVariableContents = (parameters, variables) => {
  const variableId = parameters[0]; // まとめての場合parameters[1]を使用する
  const opecode = parameters[2];
  //const operand = parameters[3];  // 定数以外いるか不明なので未実装
  const id = parameters[4];
  const variableName = '[' + Utils.alignVariableId(variableId) + ':' + variables[variableId - 1].name + ']';
  const opeTexts = ['=', '+=', '-='];
  return <td>{variableName} {opeTexts[opecode]} {id}</td>
}


const CommandItem = props => {

  const flags = React.useContext(Flags);
  const variables = React.useContext(Variables);

  const viewCommand = () => {
    const parameters = props.command.parameters;
    let title = null;
    let contents = null;
    switch (props.command.code) {
      case COMMAND.MESSAGE:
        title = '文章';
        contents = <td style={{ whiteSpace: 'pre-line' }}>{parameters[0]}</td>;
        break;
      case COMMAND.MOVE:
        title = '場所移動';
        contents = <td>{parameters[0] === 0 ? '同じマップ' : parameters[1]}(X={parameters[2]},Y={parameters[3]})</td>
        break;
      case COMMAND.FLAG:
        title = 'フラグ';
        contents = listFlagContents(parameters, flags);
        break;
      case COMMAND.VARIABLE:
        title = '変数';
        contents = listVariableContents(parameters, variables);
        break;
      default:
        return null;
    }

    return (
      <table><tbody><tr>
          <td>{title}：</td>
          {contents}
        </tr></tbody></table>
    )
  }

  return (
    <div className="command-item">
      <div>
      {viewCommand()}
      </div>
      <button onClick={() => props.onAddClick(props.index)}>追加</button>
      <button onClick={() => props.onEditClick(props.index)}>編集</button>
      <button onClick={() => props.onDeleteClick(props.index)}>削除</button>
    </div>
  );
}

const CommandItemLast = props => {
  return (
    <div className="command-item">
      <button onClick={() => props.onAddClick(props.index)}>追加</button>
    </div>
  );
}



const CommandList = props => {

  const listItems = props.list.map((command, index) => {
    return (
      <CommandItem key={index}
        index={index}
        command={command}
        onAddClick={props.onAddClick}
        onEditClick={props.onEditClick}
        onDeleteClick={props.onDeleteClick}
      />
    )
  })

  const getCommandList = () => {
    listItems.push(<CommandItemLast
      key={listItems.length}
      index={listItems.length}
      onAddClick={props.onAddClick}
    />);
    return listItems;
  }

  const listStyle = () => {
    return { pointerEvents: props.listEnable ? 'auto' : 'none' };
  }

  return (
    <div className="command-list" style={listStyle()}>
      {getCommandList()}
    </div>
  );
}

export default CommandList;