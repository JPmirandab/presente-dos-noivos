-- CreateEnum
CREATE TYPE "FormaPresente" AS ENUM ('COMPRA', 'PIX');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracao" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "nomesCasal" TEXT NOT NULL,
    "fotoCasalUrl" TEXT,
    "corPrimaria" TEXT NOT NULL DEFAULT '#B76E79',
    "corSecundaria" TEXT NOT NULL DEFAULT '#F5EFE6',
    "textoBoasVindas" TEXT NOT NULL,
    "textoAgradecimento" TEXT NOT NULL,
    "textoPixAvulso" TEXT NOT NULL,
    "chavePix" TEXT,
    "qrCodeUrl" TEXT,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valorCentavos" INTEGER NOT NULL,
    "fotoUrl" TEXT,
    "categoriaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkPresente" (
    "id" TEXT NOT NULL,
    "presenteId" TEXT NOT NULL,
    "loja" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LinkPresente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escolha" (
    "id" TEXT NOT NULL,
    "presenteId" TEXT NOT NULL,
    "forma" "FormaPresente" NOT NULL,
    "nomeConvidado" TEXT NOT NULL,
    "mensagem" TEXT,
    "valorCentavos" INTEGER NOT NULL,
    "tokenCancelamentoHash" TEXT NOT NULL,
    "pixRecebidoEm" TIMESTAMP(3),
    "itemCompradoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Escolha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PixAvulso" (
    "id" TEXT NOT NULL,
    "nomeConvidado" TEXT NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "mensagem" TEXT,
    "recebidoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PixAvulso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE INDEX "Presente_categoriaId_idx" ON "Presente"("categoriaId");

-- CreateIndex
CREATE INDEX "LinkPresente_presenteId_idx" ON "LinkPresente"("presenteId");

-- CreateIndex
CREATE UNIQUE INDEX "Escolha_presenteId_key" ON "Escolha"("presenteId");

-- AddForeignKey
ALTER TABLE "Presente" ADD CONSTRAINT "Presente_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkPresente" ADD CONSTRAINT "LinkPresente_presenteId_fkey" FOREIGN KEY ("presenteId") REFERENCES "Presente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escolha" ADD CONSTRAINT "Escolha_presenteId_fkey" FOREIGN KEY ("presenteId") REFERENCES "Presente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
