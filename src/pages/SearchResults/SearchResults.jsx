import React, { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ResultSearchRow from "../../components/ResultSearchRow";

import styles from "./SearchResults.module.css";

function PageCount({ pageNumbers, setCurrentPage, currentPage, keyword}) {
  const navigate = useNavigate();

  const numbers = [];

  for (let i = 0; i < pageNumbers; i++) {
    numbers.push(i + 1);
  }

  return (
    <div className={styles.pageCount}>
      {numbers.map((number) => {
        return (
          <button
            key={number}
            className={`${styles.number} ${number === currentPage && styles.activePageNumber}`}
            onClick={() => {
              setCurrentPage(number)
              navigate(`/search-results/${keyword}/${number}`)
            }}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default function SearchResults() {
  const [data, keyword] = useLoaderData();

  const [resultData, setResultData] = useState(data?.data);
  const [currentPage, setCurrentPage] = useState(data.pagination.current_page);

  const url = `https://api.jikan.moe/v4/anime?q=${keyword}&page=${currentPage}`;

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get(url);
      setResultData(res.data.data);
    }

    fetchData();

  }, [url])

  return (
    <div className={styles.container}>
      {data.data.length === 0 ? (
        <h1 className={styles.resultsHeader}>
          No results found for "{keyword}"
        </h1>
      ) : (
        <>
          <h1 className={styles.resultsHeader}>Results for "{keyword}"</h1>
          <ul>
            {resultData?.map((result) => {
              return (
                <ResultSearchRow
                  key={result.mal_id}
                  item={result}
                  styles={styles}
                  showGenres={true}
                />
              );
            })}
          </ul>
          <PageCount
            pageNumbers={data.pagination.last_visible_page}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            keyword={keyword}
          />
        </>
      )}
    </div>
  );
}

export const searchResultsDataLoader = async ({ params }) => {
  try {
    const url = `https://api.jikan.moe/v4/anime?q=${params.searchKeyword}&limit=25`;

    const res = await axios.get(url);
    const data = res.data;
    return [data, params.searchKeyword];
  } catch (error) {
    console.log(error);
  }

  return null;
};
