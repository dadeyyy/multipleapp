'use client';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { useOptimistic, useState } from 'react';
import { todoDataTypes } from '../page';
import { createTodo } from '@/actions/TodoActions/createtodo';
import { deleteTodo } from '@/actions/TodoActions/deletetodo';
import { useTaskStatus } from '@/hooks/useTaskStatus';
import TaskRow from './TaskRow';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function TaskForm({
  todos,
  user_id,
  priority,
}: {
  todos: todoDataTypes[];
  user_id: string;
  priority: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { handleCheckboxClick, status, setStatus } = useTaskStatus(todos);
  const [showEditModal, setShowEditModal] = useState<{ show: boolean; data: todoDataTypes | null }>({
    show: false,
    data: null,
  });
  const [optimisticTodos, addOptimisticTodos] = useOptimistic(todos, (state, newTodo: todoDataTypes) => {
    return [newTodo, ...state];
  });

  const formAction = async (formData: FormData) => {
    const newTask = {
      task_name: formData.get('task') as string,
      task_priority: formData.get('priority') as string,
      task_status: 'todo',
    };

    addOptimisticTodos({
      id: '',
      task_name: newTask.task_name,
      created_at: Date.now().toString(),
      task_priority: newTask.task_priority,
      task_status: newTask.task_status,
    });
    toast.success('Task created!');
    const newId = await createTodo(user_id, newTask);
    const newItem = [...status, { id: newId, status: 'todo' }];
    setStatus(newItem);
  };

  const deleteTodoHandler = async (id: string) => {
    await deleteTodo(id);
    toast.success('Task Deleted!');
  };

  const editTodoHandler = async (data: todoDataTypes) => {
    setShowEditModal({
      show: true,
      data: data,
    });
  };

  const handleChangePriority = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('priority', val);
    } else {
      params.delete('priority');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {showEditModal.show && (
        <Modal todo={showEditModal.data!} editModal={showEditModal} setEditModal={setShowEditModal} />
      )}
      <div className="w-full max-w-3xl">
        <table className="w-full text-lg text-gray-700">
          <thead>
            <tr className="text-left font-semibold">
              <th className="py-2"></th>
              <th className="py-2">Task</th>
              <th className="py-2">Priority</th>
              <th className="py-2">Date</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {optimisticTodos.map((data) => {
              const isDone = status.find((s) => s.id === data.id && s.status === 'done');
              return (
                <TaskRow
                  key={data.id}
                  data={data}
                  isDone={isDone}
                  onCheckBoxChange={handleCheckboxClick}
                  onDelete={() => deleteTodoHandler(data.id)}
                  onEdit={editTodoHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <form
        className="w-full max-w-md flex flex-col px-8 border-2 border-gray-200 rounded-lg shadow-lg py-8 gap-6 bg-white"
        action={formAction}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="task" className="text-lg font-medium text-gray-700">
            Task:
          </label>
          <input
            id="task"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            type="text"
            name="task"
            placeholder="Enter your task"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-lg font-medium text-gray-700">
            Priority:
          </label>
          <select
            id="priority"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none appearance-none bg-white"
            name="priority"
            onChange={(e) => handleChangePriority(e.target.value)}
            defaultValue={searchParams.get('priority')?.toString()}
          >
            <option value="low">LOW</option>
            <option value="medium">MEDIUM</option>
            <option value="high">HIGH</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none"
        >
          Submit
        </button>
      </form>
    </>
  );
}
