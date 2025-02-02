import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.SECRET_KEY;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          if (await bcrypt.compare(credentials.password, user.password)) {
            const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1d" });
            user.token = token;
            await user.save();
            const { password, token: userToken, ...userWithoutSensitiveInfo } = user.toObject();
            return { ...userWithoutSensitiveInfo, token };
          } else {
            user.decrementFailedLoginAttempts();
            await user.save();
          }
        }
        return null;
      },
    }),
  ],
  secret: SECRET_KEY,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.authToken = user.token;
      return token;
    },
    async session({ session, token }) {
      session.authToken = token.authToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
