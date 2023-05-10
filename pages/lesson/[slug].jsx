import React from 'react';
import styles from '../../styles/SingleLesson.module.css';

const SingleLesson = ({ data }) => {
  return (
    <div className={styles.lessonContainer}>
      <div className={styles.lessonContent}>
        <div dangerouslySetInnerHTML={{ __html: data.detail }}></div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  let url = 'https://codingchaska.up.railway.app/api/v1/lesson/lesson/' + slug + '/';
  const res = await fetch(url);
  const data = await res.json();

  return { props: { data } };
}

export default SingleLesson;
