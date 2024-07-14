import React from "react";
import styles from "./loadingComponent.module.css";

export default function LoadingComponent() {
  return (
    <div className={styles.loader}>
      Loading
      <span></span>
    </div>
  );
}
