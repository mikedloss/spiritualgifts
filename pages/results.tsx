import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import Layout from "../src/components/Layout";

import { useSelector } from "../src/store";

const Results = () => {
  const survey = useSelector(state => state.survey);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!survey.finished || isEmpty(survey.results)) {
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <h1>results!</h1>
    </Layout>
  );
};

export default Results;
