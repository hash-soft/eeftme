import React from 'react';
import './index.css';
import { COMMAND } from './define';



const CommandItem = props => {

  const viewCommand = () => {
    const parameters = props.command.parameters;
    switch(props.command.code) {
    case COMMAND.MESSAGE:
      return (
        <table><tbody><tr>
          <td >文章：</td>
          <td style={{whiteSpace:'pre-line'}}>{parameters[0]}</td>
        </tr></tbody></table>
      );
    case COMMAND.MOVE:
      return (
        <table><tbody><tr>
          <td>場所移動：</td>
          <td>{parameters[0] === 0 ? '同じマップ' : parameters[1]}(X={parameters[2]},Y={parameters[3]})</td>
        </tr></tbody></table>
      )
    default:
      return null;
    }
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