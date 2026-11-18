const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarReais(centavos: number) {
  return formatador.format(centavos / 100);
}