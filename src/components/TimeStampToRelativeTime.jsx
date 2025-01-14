import React from "react";
import { formatDistanceToNow } from "date-fns";
import styles from "./TimeStampToRelativeTime.module.css";

const TimestampToRelativeTime = ({ timestamp }) => {
  // Timestamp from Firebase (with nanoseconds and seconds properties)
  const { seconds, nanoseconds } = timestamp;

  // Creating a Date object from timestamp (converting seconds to miliseconds)
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  // Using the formatDistanceToNow to calculate relative time
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span className={styles.timeAgo}>{timeAgo}...</span>;
};

export default TimestampToRelativeTime;
