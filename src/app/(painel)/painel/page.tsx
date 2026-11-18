import Link from "next/link";
import { auth } from "@/lib/auth";
import { formatarReais } from "@/lib/dinheiro";
import { obterResumoDashboard } from "@/server/db/queries/dashboard";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PainelPage() {
  const [sessao, resumo] = await Promise.all([auth(), obterResumoDashboard()]);

  const cards = [
    {
      titulo: "Total recebido",
      valor: formatarReais(resumo.totalConfirmadoCentavos),
      detalhe: "Pix já conferidos no extrato",
      href: "/painel/recebidos",
    },
    {
      titulo: "Aguardando conferência",
      valor: formatarReais(resumo.aguardando.centavos),
      detalhe: `${resumo.aguardando.quantidade} Pix para conferir`,
      href: "/painel/recebidos",
    },
    {
      titulo: "Presentes escolhidos",
      valor: `${resumo.presentes.escolhidos} de ${resumo.presentes.total}`,
      detalhe: `${resumo.presentes.disponiveis} ainda disponíveis`,
      href: "/painel/presentes",
    },
    {
      titulo: "Itens a comprar",
      valor: String(resumo.itens.aComprar),
      detalhe: `${resumo.itens.comprados} já comprados com o Pix`,
      href: "/painel/recebidos",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Olá, {sessao?.user?.name}! 💛</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.titulo} href={card.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardDescription>{card.titulo}</CardDescription>
                <CardTitle className="text-2xl">{card.valor}</CardTitle>
                <p className="text-xs text-muted-foreground">{card.detalhe}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}