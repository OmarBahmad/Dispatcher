import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connecToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connecToDB;
    const user = await User.findOne({ username: credentials.username });
    console.log('user',user)

    if (!user) throw new Error("Wrong Credentials");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong Password");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("failed to Login");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.username = user.username
        token.img = user.img
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({session,token}){
      if(token){
        session.user.username = token.username
        session.user.img = token.img
        session.user.isAdmin = token.isAdmin
      }
      return session
    }
  }
});
