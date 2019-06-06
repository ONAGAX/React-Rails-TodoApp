import React, { Component } from "react";
import axios from "axios";
import List from "./Components/List";
import AddTodo from "./Components/addTodo";
import update from "react-addons-update";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/todos")
      .then(result => {
        this.setState({ todos: result.data });
      })
      .catch(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <h2>簡単なやることリスト</h2>
        <AddTodo
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCreate={this.handleCreate}
        />
        <List todos={this.state.todos} handleDelete={this.handleDelete} />
      </div>
    );
  }
  handleChange = event => {
    const todo = event.target.value;
    this.setState({ todo: todo });
  };

  handleCreate = todo => {
    axios
      .post("http://localhost:3001/todos", { todo: todo })
      .then(response => {
        const newData = [
          ...this.state.todos,
          { id: response.data.id, todo: response.data.todo }
        ];
        this.setState({ todos: newData });
      })
      .catch(data => {
        console.log(data);
      });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.handleCreate(this.state.todo);
    this.setState({ todo: "" });
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:3001/todos/${id}`, { id: id })
      .then(response => {
        const todoIndex = this.state.todos.findIndex(x => x.id === id);
        const deletedTodos = update(this.state.todos, {
          $splice: [[todoIndex, 1]]
          // todoIndexからスタートして1個めの要素を切り取る
        });
        this.setState({ todos: deletedTodos });
      })
      .catch(data => {
        console.log(data);
      });
  };
}

export default Todo;
