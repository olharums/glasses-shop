const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.methos === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log("token", token);
      if (!token) {
        res.status(401).json({ message: "Not authorized" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        res.status(403).json({ message: "No access" });
      }
      // console.log("role", decoded.role);

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  };
};
