import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { sair } from "@/server/actions/auth.actions";
import { itensSecundarios } from "../_components/itens-navegacao";

export default function MaisPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mais opções</h1>

      <ul className="divide-y rounded-lg border">
        {itensSecundarios.map(({ href, rotulo, icone: Icone }) => (
          <li key={href}>
            <Link href={href} className="flex items-center gap-3 p-4 hover:bg-muted">
              <Icone className="size-5" />
              <span className="flex-1">{rotulo}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>

      <form action={sair}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg border p-4 text-destructive hover:bg-muted"
        >
          <LogOut className="size-5" />
          Sair
        </button>
      </form>
    </div>
  );
}