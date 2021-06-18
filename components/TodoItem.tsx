import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { supabase } from '../utils/supabaseClient';

import type { Todo } from '../types';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);
  const { todos, setTodos, setErrorMessage } = useTodoContext();

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      setIsCompleted(data.is_complete);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from('todos').delete().eq('id', id);
      setTodos(todos.filter((todo) => todo.id != id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <li className="w-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
      <div className="flex items-center p-4">
        <input
          className="cursor-pointer mr-2"
          type="checkbox"
          checked={isCompleted ? true : false}
          onChange={(e) => {
            e.preventDefault();
            toggle();
          }}
        />

        <span className="w-full text-sm leading-5 font-medium truncate">
          {todo.task}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-gray-900 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
