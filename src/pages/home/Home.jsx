import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents:posts, loading} = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>See our recent posts...</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Or search for tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading posts...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
        {posts && posts.length == 0 && (
          <div className={styles.noposts}>
            <p>No posts yet...</p>
            <Link className="btn" to={"/posts/create"}>Create your first post!</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
