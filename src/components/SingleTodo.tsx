import React, { useState, useRef, useEffect } from 'react';
import Todo from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  moveToOtherList?: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, moveToOtherList }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // Move between active and completed lists
  const handleDone = (id: number) => {
    if (!moveToOtherList) return;
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return;
    const todoItem = todos[index];
    // Remove from current list
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
    // Add to other list
    moveToOtherList((prev: Todo[]) => [...prev, { ...todoItem, isDone: !todoItem.isDone }]);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((t) => (t.id === id ? { ...t, todo: editTodo } : t)));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (edit) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          placeholder="Edit to do"
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        {!edit && !todo.isDone && (
          <button
            className="icon"
            title="Edit"
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setEdit(true)}
          >
            <AiFillEdit />
          </button>
        )}
        {edit && (
          <button className="icon" title="Save" type="submit">
            ✅
          </button>
        )}
        <button
          className="icon"
          title="Delete item"
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleDelete(todo.id)}
        >
          <AiFillDelete />
        </button>
        <button
          className="icon"
          title="Mark as done"
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleDone(todo.id)}
        >
          <MdDone />
        </button>
      </div>
    </form>
  );
};

export default SingleTodo;
