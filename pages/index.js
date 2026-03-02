import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss'
import InfiniteScrolling from '../components/InfiniteScrolling/InfiniteScrolling'
import { fetchAPI } from '../components/fetchAPI/fetchAPI'

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.articles}>
        <InfiniteScrolling initialData={data} styles={styles}>
          {({ modifiedDataArrayList }) => {
            return modifiedDataArrayList.map((article) => {
              return (
                <div key={article.id} className={styles.article}>
                  <div className={styles.imageWrapper}>
                    <Image src={`${article.avatar}?unique=${article.id}`} alt={article.title} width={720} height={400} />
                  </div>
                  <div className={styles.content}>
                    <h2 className={styles.title}>{article.title}</h2>
                    <p className={styles.snippet}>{article.contentSnippet}</p>
                    <p className={styles.date}>{article.pubDate}</p>
                  </div>
                </div>
              )
            })
          }}
        </InfiniteScrolling>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const data = await fetchAPI(1, 20);
    return { props: { data } }
  } catch (err) {
    console.error(err);
    return { props: { data: [] } }
  }
}
