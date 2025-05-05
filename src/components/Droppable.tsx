// Droppable.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import './styles.css';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`droppable${isOver ? ' over' : ''}`}>
      {children}
    </div>
  );
}
