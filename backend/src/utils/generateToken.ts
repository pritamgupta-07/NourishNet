import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const generateTokenAndSetCookie = (userId:any, req:Request) => {
  const token = jwt.sign({ userId }, "thisisasecret", {
    expiresIn: "15d",
  });

  // req.cookies("jwt", token, {
  //   maxAge: 15 * 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure:process.env.NODE_ENV !== "development"
  // });
  req.cookies.jwt = token

  
};

export default generateTokenAndSetCookie;
