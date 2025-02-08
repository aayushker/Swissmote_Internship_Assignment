const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Temporary bypass of JWT authentication:
  // const token = req.header("Authorization")?.replace("Bearer ", "");
  // if (!token) {
  //   return res.status(401).json({ message: "No token, authorization denied" });
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: "Invalid token" });
  // }
  next();
};

module.exports = authMiddleware;