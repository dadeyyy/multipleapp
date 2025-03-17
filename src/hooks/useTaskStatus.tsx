'use client';

import { todoDataTypes } from '@/app/features/todo/page';
import { useState } from 'react';
import { editStatus } from '@/actions/TodoActions/setStatus';

export function useTaskStatus(todos: todoDataTypes[]) {
  const statusState = todos.map((data) => {
    return { id: data.id, status: data.task_status };
  });
  const [status, setStatus] = useState(statusState);

  const handleCheckboxClick = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedStatus = status.map((data) =>
      data.id === id ? { ...data, status: event.target.checked ? 'done' : 'todo' } : data
    );

    setStatus(updatedStatus);
    await editStatus(id, event.target.checked);
  };

  return { status, handleCheckboxClick, setStatus };
}
