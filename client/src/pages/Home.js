import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [postsList, setPostsList] = useState([]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  // Fetching all posts
  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3003/posts");
      setPostsList(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Deleting a post with id
  const deletePost = async (id) => {
    if (window.confirm("Are your sure you want to delete")) {
      const res = await axios.delete(`http://localhost:3003/posts/${id}`);
      if (res.status === 200) {
        toast.success("Post deleted");
        getPosts();
      }
    }
  };

  // Filter by city function
  const foundPostsByCity = () => {
    let inputField = document
      .querySelector("#foundPostsByCity")
      .value.toUpperCase();

    // eslint-disable-next-line
    postsList.map((item) => {
      if (inputField === item.city.toUpperCase()) {
        setFilteredData(
          postsList.filter((data) => inputField === data.city.toUpperCase())
        );
      } else if (inputField === "") {
        setFilteredData("");
      }
    });
  };

  return (
    <div>
      <h1>{!postsList.length ? "No posts added yet" : ""}</h1>
      <div className="input">
        <input
          placeholder="Filter by city"
          type="text"
          onChange={foundPostsByCity}
          id="foundPostsByCity"
          className={!postsList.length ? "disabled" : ""}
        />
      </div>
      {(filteredData ? filteredData : postsList).map((post) => {
        return (
          <div key={post.id} className="card">
            <h1>Name: {post.name}</h1>
            <h1>Message: {post.message}</h1>
            <h1>City: {post.city}</h1>
            <div className="btns">
              {" "}
              <Link to={`update/${post.id}`}>
                <button className="btn btn-edit">Edit</button>
              </Link>
              <Link to="/">
                <button
                  className="btn btn-delete"
                  onClick={() => deletePost(post.id)}>
                  Delete
                </button>
              </Link>
              <Link to={`view/${post.id}`}>
                <button className="btn btn-view">View</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
