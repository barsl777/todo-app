import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";
import { addTodo } from "./redux/actions";

const App: React.FC = (props: any) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>(props.todos);

  useEffect(() => {
    setTodos(props.todos);
  }, [props.todos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      props.addTodo(todo);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add: any;
    let active = todos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    }

    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="app-wrapper">
          <span className="heading">Task Todo</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default connect(
  (state: any) => {
    return state.todos
  },
  { addTodo }
)(App);