import React from "react";
import { formatDistanceToNow } from "date-fns";
import styles from "./TimeStampToRelativeTime.module.css";

const TimestampToRelativeTime = ({ timestamp }) => {
  // O timestamp do Firebase (com as propriedades nanoseconds e seconds)
  const { seconds, nanoseconds } = timestamp;

  // Criando um objeto Date a partir do timestamp (convertendo segundos para milissegundos)
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  // Usando o formatDistanceToNow para calcular o tempo relativo
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span className={styles.timeAgo}>{timeAgo}...</span>;
};

export default TimestampToRelativeTime;
