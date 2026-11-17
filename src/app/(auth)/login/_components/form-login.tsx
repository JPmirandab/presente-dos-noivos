"use client";

import { useActionState } from "react";
import { entrar } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormLogin() {
  const [estado, acao, pendente] = useActionState(entrar, undefined);

  return (
    <form action={acao} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="usuario">Usuário</Label>
        <Input
          id="usuario"
          name="usuario"
          autoComplete="username"
          autoCapitalize="none"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          name="senha"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {estado?.erro && (
        <p className="text-sm text-destructive">{estado.erro}</p>
      )}

      <Button type="submit" className="w-full" disabled={pendente}>
        {pendente ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}