import { prisma } from "@/server/db/prisma";

export default async function Home() {
  const config = await prisma.configuracao.findUnique({ where: { id: 1 } });
  const totalCategorias = await prisma.categoria.count();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">{config?.nomesCasal}</h1>
      <p>Categorias no banco: {totalCategorias}</p>
    </main>
  );
}