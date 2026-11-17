import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { sair } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default async function PainelPage() {
  const sessao = await auth();
  if (!sessao) redirect("/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Olá, {sessao.user?.name}! 💛</h1>
      <form action={sair}>
        <Button type="submit" variant="outline">
          Sair
        </Button>
      </form>
    </main>
  );
}