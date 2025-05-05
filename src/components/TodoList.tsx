// src/components/TodoList.tsx
import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import SingleTodo from './SingleTodo';
import Todo from '../model';
import './styles.css';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceId = active.id as string;
    const destId = over.id as string;

    // Find item in one of the lists
    const item =
      todos.find((t) => t.id.toString() === sourceId) ||
      completedTodos.find((t) => t.id.toString() === sourceId);
    if (!item) return;

    // Remove from source
    if (todos.some((t) => t.id.toString() === sourceId)) {
      setTodos(todos.filter((t) => t.id.toString() !== sourceId));
    } else {
      setCompletedTodos(completedTodos.filter((t) => t.id.toString() !== sourceId));
    }

    // Add to destination
    if (destId === 'todo-list') {
      setTodos((prev) => [...prev, { ...item, isDone: false }]);
    } else if (destId === 'completed-list') {
      setCompletedTodos((prev) => [...prev, { ...item, isDone: true }]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <Droppable id="todo-list">
          <span className="todos__heading">Active Tasks</span>
          {todos.map((todo) => (
            <Draggable key={todo.id} id={todo.id.toString()}>
              <SingleTodo
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                moveToOtherList={setCompletedTodos}
              />{' '}
            </Draggable>
          ))}
        </Droppable>

        <Droppable id="completed-list">
          <span className="todos__heading remove">Completed Tasks</span>
          {completedTodos.map((todo) => (
            <Draggable key={todo.id} id={todo.id.toString()}>
              <SingleTodo
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                moveToOtherList={setTodos}
              />{' '}
            </Draggable>
          ))}
        </Droppable>
      </div>
    </DndContext>
  );
};

export default TodoList;
