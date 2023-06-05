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
    <div className={styles.fav}></div>
      <ul className={styles.articles}>
			<InfiniteScrolling dataArrayList={data} dataDisplayLimit={1}>
				{({ modifiedDataArrayList }) => {
					return modifiedDataArrayList.length > 0 && modifiedDataArrayList.map((article, index) => {
						return (

<div key={article.id}>
          <img src={article.avatar}  alt={article.title} />
          <h2>{article.title}</h2>
          <h4>{article.contentSnippet}</h4>
          <p>{article.pubDate}</p>
          <hr />
        </div>              )
					})}
				}
			</InfiniteScrolling>
		</ul>
    
    </div>
  )
}

Home.getInitialProps = () => {
	return fetchAPI()
	.then((res) => {
		return { data : res }
	})
} 

