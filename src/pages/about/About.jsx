import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About the mini <span>Blog</span>
      </h2>
      <p>This project consists in a blog made with React on the frontend and Firebase on the backend</p>
      <Link to="/posts/create" className="btn">Create Post</Link>
    </div>
  );
};

export default About;
