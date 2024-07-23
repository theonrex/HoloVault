import React from "react";
import styles from "./errorComponent.module.css";
import Image from "next/image";
import errorPng from "../../public/images/error.png";

export default function ErrorComponent() {
  return (
    <div className={styles.loader}>
      <Image src={errorPng} alt="Error" width={700} height={700} />
    </div>
  );
}
