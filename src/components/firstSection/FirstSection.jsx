import React, { useState } from "react";
import styles from "./_first_section.module.scss";
import Search from "../search/Search";

function FirstSection() {
  const [textdata, setTextDataa] = useState([1, 2, 3, 4]);
  return (
    <section className={styles.first_section}>
      <div className="container">
        <div className={styles.firsrt_section_container}>
          <div className={styles.first_container_image}>
            <img src="/assets/images/image01.png" alt="" />
          </div>
          <Search/>
   
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
