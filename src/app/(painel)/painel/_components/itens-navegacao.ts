import {
  Gift,
  HandCoins,
  House,
  Inbox,
  Menu,
  Palette,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ItemNavegacao = {
  href: string;
  rotulo: string;
  icone: LucideIcon;
};

export const itensPrincipais: ItemNavegacao[] = [
  { href: "/painel", rotulo: "Início", icone: House },
  { href: "/painel/presentes", rotulo: "Presentes", icone: Gift },
  { href: "/painel/recebidos", rotulo: "Recebidos", icone: Inbox },
  { href: "/painel/pix-avulsos", rotulo: "Pix avulsos", icone: HandCoins },
];

export const itensSecundarios: ItemNavegacao[] = [
  { href: "/painel/categorias", rotulo: "Categorias", icone: Tags },
  { href: "/painel/personalizar", rotulo: "Personalizar", icone: Palette },
  { href: "/painel/usuarios", rotulo: "Usuários", icone: Users },
];

export const itemMais: ItemNavegacao = {
  href: "/painel/mais",
  rotulo: "Mais",
  icone: Menu,
};

export function estaAtivo(caminhoAtual: string, href: string) {
  if (href === "/painel") return caminhoAtual === "/painel";
  return caminhoAtual.startsWith(href);
}