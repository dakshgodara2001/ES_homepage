import { useState, useEffect } from 'react';
import styles from "../styles/Home.module.scss";
import newsDummyImage from "../assets/images/newsDummy.png";
import Image from 'next/image';
import Header from '../components/Header';

// Mock data for news articles
const mockArticles = [
  {
    id: 1,
    title: "News Article 1",
    link: "#",
    contentSnippet: "This is the snippet of news article 1.",
    pubDate: "2023-06-01",
  },
  {
    id: 2,
    title: "News Article 2",
    link: "#",
    contentSnippet: "This is the snippet of news article 2.",
    pubDate: "2023-06-02",
 },
 {
  id: 3,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 4,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
  id: 5,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},

{
  id: 6,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 7,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
  id: 8,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 9,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
  id: 10,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 11,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},

{
  id: 12,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
  id: 13,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 14,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
  id: 15,
  title: "News Article 1",
  link: "#",
  contentSnippet: "This is the snippet of news article 1.",
  pubDate: "2023-06-01",
},
{
  id: 16,
  title: "News Article 2",
  link: "#",
  contentSnippet: "This is the snippet of news article 2.",
  pubDate: "2023-06-02",
},
{
id: 17,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},
{
id: 18,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},
{
id: 19,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},

{
id: 20,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},
{
id: 21,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},
{
id: 22,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},
{
id: 23,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},
{
id: 24,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},
{
id: 25,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},

{
id: 26,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},
{
id: 27,
title: "News Article 1",
link: "#",
contentSnippet: "This is the snippet of news article 1.",
pubDate: "2023-06-01",
},
{
id: 28,
title: "News Article 2",
link: "#",
contentSnippet: "This is the snippet of news article 2.",
pubDate: "2023-06-02",
},
];


export async function getStaticProps() {
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    props: {
      articles: mockArticles
    },
    revalidate: 60
  }
}

export default function Home({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 20;

  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dividerLine} />
      <Header />
      <div className={styles.dividerLine} />
      <div className={styles.dividerLine} />
      <ul className={styles.articles}>
        {currentArticles?.map((article) => (
          <li key={article?.guid}>
            <a href={article?.link} target="_blank">
              <Image src={article?.image || newsDummyImage} />
              <p src={newsDummyImage} alt={article?.title} />
              <h2>{article?.title}</h2>
              <p>{article?.pubDate}</p>
            </a>
            <div className={styles.dividerLine} />
          </li>
        ))}
      </ul>
      <div className={styles.dividerLine} />
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? styles.active : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}





