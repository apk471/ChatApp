import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/generateToken.js";

export const login = (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  res.send("Logout user");
};

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;

    if (password != confirmpassword) {
      res.status(400).json({ message: "Password does not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      res.send("User already exists");
    }

    // TODO: Hash Pasword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      genrateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("signup error", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
