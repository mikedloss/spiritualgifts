import { NextApiRequest, NextApiResponse } from "next";
import { utcToZonedTime } from "date-fns-tz";

import { SpiritualGifts } from "../../../src/utils/calculateResults";
import { getFirebaseObject } from "../../../src/utils/getFirebaseObject";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { answers, docId } = body;

  if (!body || !answers || !docId) return res.status(500).send("Data required");

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

  const newRecord = {
    ...spiritualGifts.results,
    docId,
    dateCreated: new Date().toISOString()
  };

  return firebase
    .collection("results")
    .doc(docId)
    .set(newRecord)
    .then(docRef => {
      return res.json({ ...newRecord });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};
