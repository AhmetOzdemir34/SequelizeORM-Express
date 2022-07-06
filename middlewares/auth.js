const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token || token == '') return res.status(401).json({ message: "Unauthorized" });

    const verified = jwt.verify(token, process.env.PG);
    req.user = verified.user;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {auth};