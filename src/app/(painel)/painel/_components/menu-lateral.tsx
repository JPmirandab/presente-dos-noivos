"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { sair } from "@/server/actions/auth.actions";
import { estaAtivo, itensPrincipais, itensSecundarios } from "./itens-navegacao";

const todosOsItens = [...itensPrincipais, ...itensSecundarios];

export function MenuLateral() {
  const caminhoAtual = usePathname();

  return (
    <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-60 md:flex-col md:border-r md:p-4">
      <p className="mb-6 px-3 text-lg font-semibold">Presente dos Noivos</p>

      <nav className="flex flex-1 flex-col gap-1">
        {todosOsItens.map(({ href, rotulo, icone: Icone }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
              estaAtivo(caminhoAtual, href) && "bg-muted font-medium",
            )}
          >
            <Icone className="size-4" />
            {rotulo}
          </Link>
        ))}
      </nav>

      <form action={sair}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </form>
    </aside>
  );
}