import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Primeiro usuário: só cria se o banco ainda não tiver nenhum
  const totalUsuarios = await prisma.usuario.count();

  if (totalUsuarios === 0) {
    const usuario = process.env.SEED_USUARIO;
    const senha = process.env.SEED_SENHA;

    if (!usuario || !senha) {
      throw new Error("Defina SEED_USUARIO e SEED_SENHA no .env");
    }
    if (senha.length < 6) {
      throw new Error("A SEED_SENHA precisa ter pelo menos 6 caracteres");
    }

    await prisma.usuario.create({
      data: {
        usuario,
        senhaHash: await bcrypt.hash(senha, 10),
      },
    });
    console.log(`✔ Usuário "${usuario}" criado`);
  } else {
    console.log("• Já existe usuário, nada a fazer");
  }

  // 2. Categoria "Geral"
  await prisma.categoria.upsert({
    where: { nome: "Geral" },
    update: {},
    create: { nome: "Geral", ordem: 1 },
  });
  console.log("✔ Categoria Geral ok");

  // 3. Configuração padrão da página (registro único, id = 1)
  await prisma.configuracao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nomesCasal: "Ana Júlia & João Pedro",
      textoBoasVindas:
        "Que alegria ter você aqui! Preparamos esta lista com muito carinho para o começo da nossa nova casa.",
      textoAgradecimento:
        "Obrigado, {nome}! Seu presente foi registrado com muito carinho. Cada gesto seu faz parte do começo da nossa nova história. Mal podemos esperar para celebrar com você!",
      textoPixAvulso:
        "Prefere nos ajudar com um Pix? Qualquer valor é recebido com muito amor.",
    },
  });
  console.log("✔ Configuração padrão ok");
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());