import { type TodoSchemaType } from "../schema/TodoSchema";

import { useState } from "react";
import { useTodoStore } from "../store/todo.store";

type TodoProps = {
  todo: { _id: string; title: string; description: string; completed: boolean };
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoList = ({ todo, toggleComplete, deleteTodo }: TodoProps) => {
  const [editing, setEditing] = useState(false);
  const { updateTodo } = useTodoStore();
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  } as TodoSchemaType);

  const handleSubmit = async (data: TodoSchemaType) => {
    try {
      if (!editing) return; // Prevent submission if not in editing mode
      await updateTodo(todo._id, data);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // You can handle input changes here if needed
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      key={todo._id}
      className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
    >
      <div className="flex-1 flex flex-col gap-2">
        {editing ? (
          <input
            type="text"
            onChange={handleChange}
            value={editData.title}
            name="title"
            className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <h2
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </h2>
        )}

        {editing ? (
          <input
            type="text"
            onChange={handleChange}
            value={editData.description}
            name="description"
            className="text-sm mt-1 bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p
            className={`text-sm mt-1 ${
              todo.completed ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          type="button"
          onClick={() => toggleComplete(todo._id, !todo.completed)}
          className={`text-xs px-3 py-1 rounded-lg ${
            todo.completed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {todo.completed ? "Done" : "Mark"}
        </button>
        {editing && (
          <button
            onClick={() => handleSubmit(editData)}
            className={`text-xs px-3 py-1 rounded-lg bg-green-600`}
          >
            Save
          </button>
        )}
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing((prev) => !prev)}
            className={`text-xs px-3 py-1 rounded-lg`}
          >
            Edit
          </button>
        )}

        <button
          type="button"
          onClick={() => deleteTodo(todo._id)}
          className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoList;
