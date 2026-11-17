import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/server/db/prisma";
import { loginSchema } from "@/lib/validations/auth";

const UM_ANO_EM_SEGUNDOS = 60 * 60 * 24 * 365;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: UM_ANO_EM_SEGUNDOS,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        usuario: {},
        senha: {},
      },
      async authorize(credentials) {
        const dados = loginSchema.safeParse(credentials);
        if (!dados.success) return null;

        const { usuario, senha } = dados.data;

        const encontrado = await prisma.usuario.findUnique({ where: { usuario } });
        if (!encontrado) return null;

        const senhaConfere = await bcrypt.compare(senha, encontrado.senhaHash);
        if (!senhaConfere) return null;

        return { id: encontrado.id, name: encontrado.usuario };
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});