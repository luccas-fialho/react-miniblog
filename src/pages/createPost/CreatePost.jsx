import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext.jsx";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { insertDocument, state } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("The image must be an URL.");
    }

    // create tag array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check all the values
    if (!title || !image || !body || !tags) {
      setFormError("You need to fill all the fields.");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Create a post</h2>
      <p>Share what you are thinking!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Post title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insert an image to your post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Post content:</span>
          <textarea
            type="text"
            name="body"
            required
            placeholder="Insert some content in your post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Post Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insert comma-split post tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!state.loading && <button className="btn">Post</button>}
        {state.loading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {state.error && <p className="error">{state.error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
