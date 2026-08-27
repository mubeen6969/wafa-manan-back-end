const jwt = require("jsonwebtoken");

module.exports = function ndaAccess(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  req.ndaUnlocked = false;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.scope === "nda") req.ndaUnlocked = true;
    } catch {
      // expired or invalid token — request just stays locked, no error thrown
    }
  }

  next();
};