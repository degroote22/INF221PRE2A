import { Cost } from "./interfaces";

export const getSmaller = (costs: Cost[]): number => {
  const smaller = costs.reduce(
    (prev, curr) => {
      // Se é o primeiro ou só tem 1, retorna ele
      if (!prev) {
        return curr;
      }

      const currSmaller = Math.min(
        curr.forward,
        curr.reverse
      );

      const prevSmaller = Math.min(
        prev.forward,
        prev.reverse
      );

      // Só manda o atual se ele for estritamente menor.
      // Isso garante o retorno do menor índice caso sejam iguais.
      if (currSmaller < prevSmaller) {
        return curr;
      }

      // Se o atual não for estritamente menor,
      // o anterior é menor ou igual. Garante que o de
      // menor índice é retornado.
      return prev;
    },
    // Inicializado em null mas com o tipo Cost, que é o retorno.
    // Se o resultado for null, lança um erro
    null as Cost | null
  );

  if (smaller === null) {
    throw Error(
      "Não foi encontrado o menor valor, provavelmente não foi \
informado valor algum na listas de valores desta trilha."
    );
  }
  return smaller.index;
};
