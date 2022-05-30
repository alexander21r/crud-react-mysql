import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../stylesheets/AddEdit.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  message: "",
  city: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, message, city } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  const addUser = async (data) => {
    const res = await axios.post("http://localhost:3003/posts", data);
    if (res.status === 200) {
      toast.success("Post added");
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:3003/posts/${id}`, data);
    if (res.status === 200) {
      toast.success("Post updated");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message || !city) {
      toast.error("Fill in all fields");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h1 id="errorMessage"></h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          className="inputs"
          value={name}
        />
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          className="inputs"
          value={city}
        />
        <textarea
          type="text"
          id="message"
          name="message"
          placeholder="Message.."
          onChange={handleInputChange}
          className="inputs"
          value={message}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
