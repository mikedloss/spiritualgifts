import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import Layout from "../../src/components/Layout";

import { useSelector } from "../../src/store";
import { getResult } from "../../src/store/results/actions";
import ResultsChart from "../../src/components/ResultsChart";

const ResultById = () => {
  const results = useSelector(state => state.results);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = router.query;
    if (id && typeof id === "string") {
      if (!results.results || results.results.documentId !== id) {
        dispatch(getResult(id));
      }
    }
  }, []);

  const hasResults = !results.loading && !isEmpty(results.results);

  console.log("results :", results);

  return hasResults ? (
    <Layout>
      <div className="mt-8 text-xs">Top 3 Gifts</div>
      {results.results.top3.map(result => {
        return (
          <div key={result.documentId} className="mb-8">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:justify-between items-left md:items-center mb-1">
                <h2 className="font-bold text-3xl m-0">{result.title}</h2>
                <p className="font-bold">Score: {result.score}</p>
              </div>
              <p>{result.description}</p>
              {result.example && (
                <div className="bg-green-100 text-green-700 p-1 my-2">
                  <div className="text-sm">
                    <span className="font-bold">For example</span>{" "}
                    {result.example}
                  </div>
                </div>
              )}
              <small className="italic text-gray-700">
                Verses: {result.verses.join(", ")}
              </small>
            </div>
          </div>
        );
      })}
      <div className="mt-8 mb-2 text-xs">Full Scoring</div>
      {results.results.simpleResults.map(result => {
        return (
          <div className="flex justify-between border-b">
            <p>{result.title}</p>
            <p>{result.score}</p>
          </div>
        );
      })}
      <div className="mt-8 text-xs">Gifts Chart</div>
      <ResultsChart data={results.results.simpleResults} />
    </Layout>
  ) : (
    <Layout>
      <p>Loading...</p>
    </Layout>
  );
};

export default ResultById;
