import { verifyToken } from "./auth";

export function getUserFromReq(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token) as { id: string; role: string };

  return { id: decoded.id, role: decoded.role };
}