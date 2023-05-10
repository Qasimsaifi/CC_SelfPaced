import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    async function logJSONData() {
      let url =
        'https://codingchaska.up.railway.app/api/v1/course/course_list/?grade=&subject=&is_published=true&course_type=';
      const response = await fetch(url);
      const jsonData = await response.json();
      setLoading(false);
      setCourses(jsonData.results);
      // console.log(jsonData);
    }

    logJSONData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Courses</title>
      </Head>
  
      {loading && <div className={styles.loading}>Loading...</div>}
  
      <div className={styles.courseGrid}>
        {courses.map((course, index) => (
          <div className={styles.courseCard} key={index}>
            <Link href={'/course/' + course.slug}>
              <img className={styles['course-img']} src={course.image} width={200} height={'auto'} />
              <h3 className={styles['course-name']}>{course.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}
