import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";

import { SpiritualGifts } from "../../../src/utils/calculateResults";
import { getFirebaseObject } from "../../../src/utils/getFirebaseObject";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { body: answers } = req;

  if (!answers) return res.status(500).send("Answers are required");

  if (req.headers["content-type"] !== "application/json") {
    return res.status(500).send("Body must be JSON");
  }

  const firebase = getFirebaseObject();
  const giftsQuery = await firebase.collection("gifts").get();

  let gifts = [];
  giftsQuery.forEach(doc => {
    gifts.push({ documentId: doc.id, ...doc.data() });
  });

  const spiritualGifts = new SpiritualGifts(answers, gifts);

  return firebase
    .collection("results")
    .add(spiritualGifts.results)
    .then(docRef => {
      return res.json({ documentId: docRef.id, ...spiritualGifts.results });
    });
};
