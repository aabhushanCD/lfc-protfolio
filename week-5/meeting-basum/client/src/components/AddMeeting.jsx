import { useMeetingStore } from "../store/useMeeting";

const AddMeeting = () => {
  const addMeeting = useMeetingStore((state) => state.addMeeting);

  const handleAdd = () => {
    addMeeting({
      id: Date.now(),
      title: "Sprint Planning",
      date: "2026-06-17",
    });
  };
  return <button onClick={handleAdd}>Add Meeting</button>;
};

export default AddMeeting;
