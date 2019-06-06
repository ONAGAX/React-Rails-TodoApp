import React from "react";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ""
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input onChange={this.props.handleChange} />
          <input type="submit" value="リストに追加" />
        </form>
      </div>
    );
  }
}

export default AddTodo;
