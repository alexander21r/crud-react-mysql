import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../stylesheets/View.css";

const View = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, [id]);
  
  // Fetching single post with id
  const getSinglePost = async (id) => {
    const res = await axios.get(`http://localhost:3003/posts/${id}`);
    if (res.status === 200) {
      setPost(res.data);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>Info</p>
        </div>
        <div className="container">
          {" "}
          <strong>Name:</strong>
          <span>{post.name}</span>
          <br />
          <br />
          <strong>Message:</strong>
          <span>{post.message}</span>
          <br />
          <br />
          <strong>City:</strong>
          <span>{post.city}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
