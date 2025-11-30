import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // cek user masih ada di DB
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(403).json({ message: "User not found" });

    req.userId = user._id;
    req.role = user.role;
    next();
  });
};
