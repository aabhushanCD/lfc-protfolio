import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema, type TodoSchemaType } from "../schema/TodoSchema";
import { useForm } from "react-hook-form";
import { useTodoStore } from "../store/todo.store";

// interface TodoInputsFormProps {
//   handleSubmit: UseFormHandleSubmit<TodoSchemaType>;
//   register: UseFormRegister<TodoSchemaType>;
//   reset: UseFormReset<TodoSchemaType>;
//   errors: FieldErrors<TodoSchemaType>;
//   isSubmitting: boolean;
//   addTodo: (data: TodoSchemaType) => Promise<void>;
// }

const TodoInputsForm = () => {
  const { addTodo } = useTodoStore();
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
  const onSubmit = async (data: TodoSchemaType) => {
    await addTodo(data);
    reset();
  };
  return (
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
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
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
  );
};

export default TodoInputsForm;
