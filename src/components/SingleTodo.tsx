import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import { editTodo, doneTodo } from "../redux/actions";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  editTodo: (id: number, content: string) => void;
  doneTodo: (id: number) => void;
}> = ({ index, todo, todos, setTodos, editTodo, doneTodo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = useState<string>(todo.content);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, content: editTodoValue } : todo))
    );
    editTodo(id, editTodoValue);
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    doneTodo(id);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodoValue}
              onChange={(e) => setEditTodoValue(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : (
            <span className="todos__single--text">{todo.content}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default connect(
  null,
  {editTodo, doneTodo }
)(SingleTodo);