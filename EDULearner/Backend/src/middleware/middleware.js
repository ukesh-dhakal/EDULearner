const jwt = require("jsonwebtoken");

const path = require("path");


// Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
   
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Token is not valid." });
  }
};

// Role-based Authorization Middleware
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    console.log("User object from token:", req.user);
    const { role } = req.user;
    if (!role) {
      return res.status(400).json({ message: "Role is missing in token." });
    }
    

    if (!roles.includes(role)) {
      console.log(`Access denied. User role: ${role}, Allowed roles: ${roles}`);  
      return res.status(403).json({ message: "Access denied, insufficient permissions." });
    }

    next();
  };
};



// General Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong. Please try again later." });
};

// Export all middlewares
module.exports = {
  verifyToken,
  verifyRole,
 
  
  errorHandler,
};
