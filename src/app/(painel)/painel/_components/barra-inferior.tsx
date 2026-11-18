"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { estaAtivo, itemMais, itensPrincipais, itensSecundarios } from "./itens-navegacao";

export function BarraInferior() {
  const caminhoAtual = usePathname();

  const maisAtivo =
    estaAtivo(caminhoAtual, itemMais.href) ||
    itensSecundarios.some((item) => estaAtivo(caminhoAtual, item.href));

  const itens = [...itensPrincipais, itemMais];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="grid grid-cols-5">
        {itens.map(({ href, rotulo, icone: Icone }) => {
          const ativo = href === itemMais.href ? maisAtivo : estaAtivo(caminhoAtual, href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-xs text-muted-foreground",
                  ativo && "font-medium text-primary",
                )}
              >
                <Icone className="size-5" />
                {rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}