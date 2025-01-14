import React from "react";
import styles from "./Dashboard.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.js";
import { useAuthValue } from "../../context/AuthContext.jsx";
import { useDeleteDocument } from "../../hooks/useDeleteDocument.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  console.log(uid);
  console.log(posts);
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {loading && <p>Loading your posts...</p>}
      {posts && posts.length == 0 ? (
        <div className="no_posts">
          <p>No posts yet...</p>
          <Link to="/posts/create" className="btn">
            Make a post!
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div className={styles.post_row} key={post.id}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    See
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
