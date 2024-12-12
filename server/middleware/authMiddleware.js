import pkg from "jsonwebtoken";
const { verify } = pkg; // Destructure verify from the CommonJS default export

export default function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET); // Use verify here
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
}
