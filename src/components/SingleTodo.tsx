import React, { useState, useRef, useEffect } from 'react';
import Todo from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setedit] = useState<boolean>(false);
  const [editTodo, seteditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setedit(false);
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
          onChange={(e) => seteditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        {!edit && !todo.isDone && (
          <button className="icon" title="Edit" type="button" onClick={() => setedit(true)}>
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
          onClick={() => handleDelete(todo.id)}
        >
          <AiFillDelete />
        </button>
        <button
          className="icon"
          title="Mark as done"
          type="button"
          onClick={() => handleDone(todo.id)}
        >
          <MdDone />
        </button>
      </div>
    </form>
  );
};

export default SingleTodo;
