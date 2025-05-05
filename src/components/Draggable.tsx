import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './styles.css'; // ← make sure the path is correct

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      className="draggable"
      style={style} /* only the dynamic transform remains inline */
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
