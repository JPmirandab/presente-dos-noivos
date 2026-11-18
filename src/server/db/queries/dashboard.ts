import { prisma } from "@/server/db/prisma";

export async function obterResumoDashboard() {
  const [
    totalPresentes,
    totalEscolhidos,
    pixPresentesConfirmados,
    pixPresentesPendentes,
    pixAvulsosConfirmados,
    pixAvulsosPendentes,
    itensComprados,
    itensAComprar,
  ] = await Promise.all([
    prisma.presente.count(),
    prisma.escolha.count(),
    prisma.escolha.aggregate({
      _sum: { valorCentavos: true },
      where: { forma: "PIX", pixRecebidoEm: { not: null } },
    }),
    prisma.escolha.aggregate({
      _sum: { valorCentavos: true },
      _count: true,
      where: { forma: "PIX", pixRecebidoEm: null },
    }),
    prisma.pixAvulso.aggregate({
      _sum: { valorCentavos: true },
      where: { recebidoEm: { not: null } },
    }),
    prisma.pixAvulso.aggregate({
      _sum: { valorCentavos: true },
      _count: true,
      where: { recebidoEm: null },
    }),
    prisma.escolha.count({
      where: { forma: "PIX", itemCompradoEm: { not: null } },
    }),
    prisma.escolha.count({
      where: { forma: "PIX", pixRecebidoEm: { not: null }, itemCompradoEm: null },
    }),
  ]);

  return {
    presentes: {
      total: totalPresentes,
      escolhidos: totalEscolhidos,
      disponiveis: totalPresentes - totalEscolhidos,
    },
    totalConfirmadoCentavos:
      (pixPresentesConfirmados._sum.valorCentavos ?? 0) +
      (pixAvulsosConfirmados._sum.valorCentavos ?? 0),
    aguardando: {
      centavos:
        (pixPresentesPendentes._sum.valorCentavos ?? 0) +
        (pixAvulsosPendentes._sum.valorCentavos ?? 0),
      quantidade: pixPresentesPendentes._count + pixAvulsosPendentes._count,
    },
    itens: {
      comprados: itensComprados,
      aComprar: itensAComprar,
    },
  };
}