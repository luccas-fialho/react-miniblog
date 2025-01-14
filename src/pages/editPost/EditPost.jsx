import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext.jsx";
import { useFetchDocument } from "../../hooks/useFetchDocument.js";
import { useUpdateDocument } from "../../hooks/useUpdateDocument.js";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, state } = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editing post: {post.title}</h2>
          <p>Change the post data whatever you want!</p>
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
            <p className={styles.preview_image}>Image preview: </p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
            {!state.loading && <button className="btn">Edit Post</button>}
            {state.loading && (
              <button className="btn" disabled>
                Loading...
              </button>
            )}
            {state.error && <p className="error">{state.error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
