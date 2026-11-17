"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";

export type EstadoLogin = { erro?: string } | undefined;

export async function entrar(
  _estadoAnterior: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  try {
    await signIn("credentials", {
      usuario: formData.get("usuario"),
      senha: formData.get("senha"),
      redirectTo: "/painel",
    });
  } catch (erro) {
    if (erro instanceof AuthError) {
      return { erro: "Usuário ou senha incorretos" };
    }
    throw erro;
  }
}

export async function sair() {
  await signOut({ redirectTo: "/login" });
}