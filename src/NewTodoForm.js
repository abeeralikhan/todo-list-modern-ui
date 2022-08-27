import { Component } from "react";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { taskName: "" };

    // function binds
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** updates the current state of the input field */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /** executes the parent addTodo() function by passing the new todo obj*/
  handleSubmit(e) {
    // to prevent the page from refreshing
    e.preventDefault();

    if (this.state.taskName.trim()) {
      // executing parent function passed as prop to send the data
      this.props.addTodoFn(this.state);
    }

    // set the input field's state back to empty
    this.setState({ taskName: "" });
  }

  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.handleSubmit}>
        <input
          name="taskName"
          value={this.state.taskName}
          placeholder="Create a new todo"
          onChange={this.handleChange}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default NewTodoForm;
