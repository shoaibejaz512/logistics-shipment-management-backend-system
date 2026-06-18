import jwt from "jsonwebtoken";

export const generateAccessToken = (user_id, res) => {
  const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });

  res.cookie("access-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};

export const generateRefreshToken = (user_id, res) => {
  const token = jwt.sign({ id: user_id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });

  res.cookie("refresh-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};
