import dbConnect from "@/config/dbConnect";
import User from "@/models/user.model";
import { Profile, Session } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn(_: { profile: Profile }) {
      try {
        await dbConnect();
        const profile = _.profile;
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          console.log(profile);
          await User.create({
            username: profile.name,
            email: profile.email,
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async session(_: { session: Session }) {
      try {
        await dbConnect();
        const user = await User.findOne({ email: _.session.user?.email });
        return { ..._.session, id: user.id };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
