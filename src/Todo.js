import { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { newTaskName: "" };

    // function bindings
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handletoggleProperty = this.handletoggleProperty.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** executes the parent removeTodo() function by passing the todo id */
  handleRemoveTodo() {
    this.props.removeTodoFn(this.props.id);
  }

  /** executes the parent enableEdit() function by passing id of the task */
  handletoggleProperty() {
    this.props.togglePropertyFn(this.props.id);

    // setting the newTaskName equal to current so it will be easier to edit the current one
    this.setState({
      newTaskName: this.props.taskName,
    });
  }

  /** updates the current state of the input field */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /** executes the parent updateTodo() function by passing the new todo obj*/
  handleUpdateTodo(e) {
    // to prevent the page from reloading
    e.preventDefault();

    const newTask = this.state.newTaskName;

    // if in the editing state user leaves the input field empty and saves the form, the todo will be deleted.
    if (!newTask.trim()) {
      this.handleRemoveTodo();
      return;
    }

    this.props.updateTodoFn(this.props.id, newTask);
  }

  /** executes the parent toggleComplete() function by passing the task id*/
  handleToggleComplete() {
    this.props.toggleCompleteFn(this.props.id);
  }

  /** returns a div element with the task name along with delete and edit buttons */
  displayTodo() {
    const isDone = this.props.isDone;
    const classes = isDone ? "Todo-task Todo-done" : "Todo-task";
    return (
      <div className="Todo-flex">
        <span className={classes} onClick={this.handleToggleComplete}>
          {this.props.taskName}
        </span>
        <div className="Todo-buttons">
          <button onClick={this.handletoggleProperty} disabled={isDone}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={this.handleRemoveTodo}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }

  /** returns a form element to edit the todo and save it */
  displayForm() {
    return (
      <form className="Todo-edit-form" onSubmit={this.handleUpdateTodo}>
        <input
          name="newTaskName"
          value={this.state.newTaskName}
          placeholder={this.props.taskName}
          onChange={this.handleChange}
        />
        <button> Save </button>
      </form>
    );
  }

  render() {
    return (
      <li className="Todo">
        {this.props.isEditing ? this.displayForm() : this.displayTodo()}
      </li>
    );
  }
}

export default Todo;
