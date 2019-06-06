import React from "react";

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.todos);
    const list = this.props.todos.map(todo => {
      return (
        <li key={todo.id}>
          {todo.id}: {todo.todo}
          <button
            onClick={() => {
              this.props.handleDelete(todo.id);
            }}
          >
            消去
          </button>
        </li>
      );
    });
    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}
