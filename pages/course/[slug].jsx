import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/CoursePage.module.css';

const Lessons = ({ topic }) => {
  const [loadingLesson, setLoadingLesson] = useState(true);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchLesson() {
      let url = `https://codingchaska.up.railway.app/api/v1/lesson/lessons/?ordering=order&topic=${topic.id}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setLoadingLesson(false);
      setLessons(jsonData.results);
    }

    fetchLesson();
  }, []);

  return (
    <div className={styles.lessonContainer}>
      {loadingLesson && <p>Loading..</p>}

      {lessons.map((lesson, index) => (
        <div className={styles.lesson} key={index}>
          <Link href={'/lesson/' + lesson.slug}>
            <p>{lesson.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

const CoursePage = ({ data }) => {
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    async function logJSONData() {
      let url = `https://codingchaska.up.railway.app/api/v1/lesson/topics/?course=${data.id}&ordering=order`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setLoadingTopics(false);
      setTopics(jsonData.results);
    }

    logJSONData();
  }, []);

  const handleTopicClick = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.name}</h1>

      {loadingTopics && <p className={styles.loading}>Loading..</p>}

      {topics.map((topic, index) => (
        <div
          key={index}
          className={`${styles.topic} ${
            selectedTopic === topic ? styles.selectedTopic : ''
          }`}
          onClick={() => handleTopicClick(topic)}
        >
          <h2>{topic.name}</h2>
          {selectedTopic === topic && <Lessons topic={topic} />}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  let url = 'https://codingchaska.up.railway.app/api/v1/course/course/' + slug + '/';
  const res = await fetch(url);
  const data = await res.json();
  return { props: { data } };
}

export default CoursePage;
