import { NextApiRequest, NextApiResponse } from "next";
import { sortBy } from "lodash";

import { getFirebaseObject } from "../../../src/utils/getFirebaseObject";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = getFirebaseObject();

  return firebase
    .collection("questions")
    .get()
    .then(snapshot => {
      // console.log("snapshot.docs :", snapshot.docs);
      const questions = snapshot.docs.map(q => ({
        documentId: q.id,
        ...q.data()
      }));

      // const games = snapshot.docs.map(d => buildFirebaseBoardGameObject(d));
      return res.json({ questions: sortBy(questions, ["id"]) });
    })
    .catch(error => {
      return res.json({ error });
    });
};
