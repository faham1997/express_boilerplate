import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt, { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const createToken = (user: any) => {
  return sign(
    {
      id: user._id,
      email: user.email,
      profession: user.profession,
    },
    process.env.secrets
  );
};

//Register Function
export const register = async (req: Request, res: Response) => {
  const { name, email, password, gender, profession } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: "error",
      error: "Please fill up all the required fields!",
    });
  }

  try {
    const oldUser = await User.findOne({
      email: email,
    });
    if (oldUser) {
      return res.json({
        status: "error",
        error: "User already exists with same email!",
      });
    }

    const hpassword = await bcrypt.hash(password, 9);

    const newUser = User.create({
      name,
      password: hpassword,
      email: email,
      gender: gender,
      profession: profession,
    });

    if (!newUser) {
      return res.json({
        status: "error",
        error: "Unable to create new user!",
      });
    } else {
      return res.json({
        status: "ok",
        message: "User successfully created!",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      error: "Internal Server error!!",
    });
  }
};

//Login Function
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      error: "Email or password is required!",
    });
  }

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.json({
        status: "error",
        error: "The email is not registered!",
      });
    }

    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      const token = createToken(user);
      if (token) {
        return res.json({
          status: "ok",
          user: token,
          message: "Successfully logged in!!",
        });
      }
    } else {
      return res.json({
        status: "error",
        error: "Wrong password entered",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      error: "Internal Server error",
    });
  }
};
