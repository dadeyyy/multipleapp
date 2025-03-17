'use client';

import { statusColor } from '@/utils/helper/todoutils';
import { todoDataTypes } from '../page';
import { BaselineDelete } from '@/icons/deleteIcon';
import { BaselineEdit } from '@/icons/editIcon';

type TaskRowType = {
  data: todoDataTypes;
  isDone:
    | {
        id: string;
        status: string;
      }
    | undefined;
  onCheckBoxChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onEdit: (data: todoDataTypes) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskRow({ data, isDone, onCheckBoxChange, onEdit, onDelete }: TaskRowType) {
  return (
    <tr key={data.id} className={`hover:bg-gray-100 transition-all ${isDone ? 'line-through text-gray-400' : ''}`}>
      <td>
        <input type="checkbox" checked={isDone ? true : false} onChange={(e) => onCheckBoxChange(e, data.id)} />
      </td>
      <td className="py-3">{data.task_name}</td>
      <td>
        {' '}
        <span className={`py-0.5 rounded-lg px-2 text-gray-100 font-semibold ${statusColor(data.task_priority)}`}>
          {data.task_priority}
        </span>
      </td>
      <td className="py-3">{new Date(data.created_at).toLocaleDateString()}</td>
      <td className="py-3 flex gap-3">
        <button className="cursor-pointer" onClick={async () => await onEdit(data)}>
          <BaselineEdit />
        </button>
        <button onClick={async () => await onDelete(data.id)} className="cursor-pointer text-gray-500">
          <BaselineDelete />
        </button>
      </td>
    </tr>
  );
}
