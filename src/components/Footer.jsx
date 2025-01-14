import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>
        React project to improve my skills, made with React and Firebase. By
        Luccas Fialho dos Santos
      </h3>
      <p>MyMiniBlog &copy; 2025</p>
    </footer>
  );
};

export default Footer;
