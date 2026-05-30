// import { useState } from "react";
// import { useMeetingStore } from "../store/useMeeting";

// export const useForm = () => {
//   const [states, setStates] = useState({
//     state: "idel",
//     message: "",
//   });
//   const messages = useMeetingStore((state) => state.get(meetings));
//   const [data, setData] = useState(messages);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setStates({
//         state: "loading",
//         message: "Submitting...",
//       });

//       if (onsubmit) {
//         await onsubmit(data);
//       }
//       setStates({
//         state: "success",
//         message: "Submitted successfully",
//       });
//     } catch (error) {
//       setStates({
//         state: "error",
//         message: error.message || "Something went wrong",
//       });
//     }
//   };

//   return { states, setStates, handleChange, data, handleSubmit };
// };
