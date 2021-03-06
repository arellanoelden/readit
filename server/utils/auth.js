import config from "../config";
import { User } from "../resources/user/user.model";
import jwt from "jsonwebtoken";

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password required" });
  }
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.send({ token });
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password required" });
  }

  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(401).send({ message: "Not Authorized" });
  }
  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: "Not Authorized" });
    }
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Not Authorized" });
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log("IN PROTECT");
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  console.log("Userr: ", user);
  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
