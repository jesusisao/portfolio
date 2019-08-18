import * as express from "express";
import admin from "../myFirebaseAdmin";

export default function firebaseAuthMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authorization = req.header("Authorization");

  if (!authorization) {
    console.log("Authorization header is not found");
    res.sendStatus(401);
    return;
  }

  const token = authorization.split(" ");
  admin
    .auth()
    .verifyIdToken(token[1])
    .then(decodedToken => {
      console.log(decodedToken);
      res.locals.user = decodedToken;
      next();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(401);
    });
}
