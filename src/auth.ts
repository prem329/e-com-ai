import NextAuth from "next-auth";

// Later we'll add real providers (e.g. OAuth, Credentials)
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
