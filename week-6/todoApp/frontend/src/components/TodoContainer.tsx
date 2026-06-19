import TodoInputsForm from "./TodoInputsForm";
import TodoList from "./TodoList";
import { useTodoStore } from "../store/todo.store";
import { useEffect } from "react";

const TodoContainer = () => {
  const todos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const getTodos = useTodoStore((state) => state.getTodos);
  useEffect(() => { 
    getTodos();
  }, [getTodos]);
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Todo App
        </h1>

        {/* FORM */}
        <TodoInputsForm />

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {todos?.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No todos yet</p>
          ) : (
            todos?.map((todo) => (
              <TodoList
                key={todo._id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
