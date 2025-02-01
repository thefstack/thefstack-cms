import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

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
        const user = {
          id: "1",
          name: "Admin",
          email: "admin@gmail.com",
          password: "123456",
        };

        if (credentials.email === user.email && credentials.password === user.password) {
          const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1d" });
          return { ...user, token };
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
