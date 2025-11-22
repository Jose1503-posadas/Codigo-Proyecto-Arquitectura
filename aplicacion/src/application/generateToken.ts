import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "user",
    },
    SECRET_KEY,
    { expiresIn: "1d" } // Expira en 1 día
  );
}
