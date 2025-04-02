
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/Generatetoken.js";

// Signup Function
export const signup = async (req, res) => {
  try {
    const { Username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      Username,
      email,
      password: hashedPassword,
    });
    await newuser.save();
    if (newuser) {
      createTokenAndSaveCookie(newuser._id, res);
      return res.status(201).json({ message: "User registered successfully",user:{
        _id:newuser._id,
        Username:newuser.Username}, });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Function
export const login = async (req, res) => {
    const { email, password } = req.body;
  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid user or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid user or password" });
    }
    createTokenAndSaveCookie(user._id, res);
    return res.status(200).json({ message: "Login successful" ,user:{
        _id:user._id,
        Username:user.Username
        
    }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
export const logout= async(req,res)=>{
  try { 
    res.clearCookie("jwt");
    res.status(200).json({ message: "user log out sucessfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};





export const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id; 
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(200).json({ filteredUser }); 
  } catch (error) {
    console.error('Error in getUserProfile controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
