import React from "react";
import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Search</h1>
      {posts && posts.length == 0 && (
        <>
          <p>Results not found for: {search}</p>
          <Link to="/" className="btn btn-dark">
            Back
          </Link>
        </>
      )}
      {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      <Link to="/" className="btn btn-dark">
        Back
      </Link>
    </div>
  );
};

export default Search;
