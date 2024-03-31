import { authOptions } from "@/config/nextauth";
import { getServerSession } from "next-auth";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }
  
  return session.user;
};
