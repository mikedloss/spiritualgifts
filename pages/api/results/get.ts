import { NextApiRequest, NextApiResponse } from "next";

import { getFirebaseObject } from "../../../src/utils/getFirebaseObject";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req;

  if (!id) return res.status(500).send("ID missing");

  const firebase = getFirebaseObject();

  return firebase
    .collection("results")
    .doc(id as string)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.json({ ...doc.data() });
      } else {
        return res.status(404).send(false);
      }
    })
    .catch(error => {
      return res.json({ error });
    });
};
