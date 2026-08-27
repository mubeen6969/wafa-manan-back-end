const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.unlock = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required." });
  }

  const isValid = await bcrypt.compare(password, process.env.NDA_PASSWORD_HASH);

  if (!isValid) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  const token = jwt.sign({ scope: "nda" }, process.env.JWT_SECRET, { expiresIn: "24h" });

  res.json({ token, ttlHours: 24 });
};