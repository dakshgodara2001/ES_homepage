import React from 'react';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss'
import InfiniteScrolling from '../components/InfiniteScrolling/InfiniteScrolling'
import { fetchAPI } from '../components/fetchAPI/fetchAPI'

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Header />
      <ul className={styles.articles}>
			<InfiniteScrolling dataArrayList={data} dataDisplayLimit={1}>
				{({ modifiedDataArrayList }) => {
					return modifiedDataArrayList.map((article, index) => {
						return (
              <div key={index}>
              <img src={`${article.avatar}?unique=${article.id}`} alt={article.title} />
              <h2>{article.title}</h2>
              <h4>{article.contentSnippet}</h4>
              <p>{article.pubDate}</p>
              <hr />
            </div>
              )
					})}
				}
			</InfiniteScrolling>
		</ul>
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

