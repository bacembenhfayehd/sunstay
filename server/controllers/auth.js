import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
      next(err);
    }
  };


  export const loginUser = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
  
      // Supprimer le cookie précédent s'il existe
     
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
      next(err);
    }
  };
  


  export const logoutUser = async (req,res,next) => {
    try {

      res.cookie("access_token" , "",{maxAge:0})
      res.status(200).json({message:"Logged out successfully"})
      
  } catch (error) {

      console.log('Error in logout controller')
      res.status(500).json('it was server error')
      
  }
  }