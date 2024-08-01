import styles from "./Skeleton.module.css";
import SkeletonTable from "./SkeletonTable";

const SkeletonBody = () => {
  return (
    <div>
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonImage}></div>
      </div>
      <SkeletonTable />
    </div>
  );
};

export default SkeletonBody;
