import styles from "./Skeleton.module.css";

const SkeletonTable = () => {
  return (
    <div className={styles.skeletonWrapper_text}>
      {" "}
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>{" "}
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>{" "}
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>
    </div>
  );
};

export default SkeletonTable;
