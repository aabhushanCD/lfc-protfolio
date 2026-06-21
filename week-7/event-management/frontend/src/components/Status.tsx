type StatusType = "error" | "success";

type Props = {
  status: StatusType;
  message?: string;
};

const StatusToast = ({ status, message }: Props) => {
  return (
    <div className="fixed top-5 right-5 z-50">
      {status === "error" && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow">
          ❌ {message || "Something went wrong"}
        </div>
      )}

      {status === "success" && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
          ✅ {message || "Success"}
        </div>
      )}
    </div>
  );
};

export default StatusToast;
