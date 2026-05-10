import { useParams } from "react-router-dom";

const NewMetting = () => {
  const { meetingId } = useParams();
  return (
    <div>
      <h1>New Meeting</h1>
      <p>Schedule a new meeting by filling out the form below.</p>

      <h2>{meetingId}</h2>
    </div>
  );
};

export default NewMetting;
