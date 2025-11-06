const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer"
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches { id, email, role } or similar
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
  console.log("👤 Authenticated User in middleware:", req.user);
};
