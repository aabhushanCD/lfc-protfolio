import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TodoSchema, type TodoSchemaType } from "./schema/TodoSchema";
import { useTodo } from "./hooks/todo.hook";
import { axiosInstance } from "./api/fetch";
import { useEffect } from "react";

const App = () => {
  const { todos, addTodo, deleteTodo, toggleComplete, setTodos } = useTodo();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });
  useEffect(() => {
    // fetch todos on mount
    const fetchTodos = async () => {
      const response = await axiosInstance.get("/todos/");
      setTodos(response.data);
    };
    fetchTodos();
  }, [handleSubmit, setTodos]);

  // wrapper so we can reset form after submit
  const onSubmit = async (data: TodoSchemaType) => {
    await addTodo(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Todo App
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-xl shadow space-y-3"
        >
          {/* Title */}
          <div>
            <input
              {...register("title")}
              placeholder="Title"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-lg transition"
          >
            {isSubmitting ? "Adding..." : "Add Todo"}
          </button>
        </form>

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No todos yet</p>
          ) : (
            todos?.map((todo) => (
              <div
                key={todo._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <h2
                    className={`text-lg font-semibold ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </h2>

                  <p
                    className={`text-sm mt-1 ${
                      todo.completed ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => toggleComplete(todo._id)}
                    className={`text-xs px-3 py-1 rounded-lg ${
                      todo.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {todo.completed ? "Done" : "Mark"}
                  </button>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
