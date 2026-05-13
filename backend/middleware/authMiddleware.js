import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==========================================
// PROTECT MIDDLEWARE
// ==========================================

const protect = async (req, res, next) => {
  let token;

  try {
    // CHECK AUTH HEADER

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // GET TOKEN

      token =
        req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // GET USER

      req.user = await User.findById(
        decoded.id
      ).select("-password");

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
  } catch (error) {
    console.log(
      "Auth middleware error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default protect;