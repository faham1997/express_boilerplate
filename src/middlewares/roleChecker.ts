import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isPatient = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.profession !== "patient") {
    return res.status(400).json({
      status: "error",
      error: "Access is forbidden",
    });
  }
  next();
};

export const isDoctor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.profession !== "doctor") {
    return res.status(400).json({
      status: "error",
      error: "Access is forbidden",
    });
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.profession !== "admin") {
    return res.status(400).json({
      status: "error",
      error: "Access is forbidden",
    });
  }
  next();
};

export const auth = (req: Request, res: Response, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(400).json({
      status: "error",
      error: "No access token is found",
    });

  try {
    const decoded = jwt.verify(token, process.env.secrets);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      error: "Invalid token",
    });
  }
};
