import { Cost } from "./interfaces";
export const getCost = (points: number[]): number => {
  // O custo é quantos metros a pessoa tem que subir.

  // Constroi pares do caminho

  const pairs = points.reduce(
    (prev, curr, index) => {
      const me = curr;
      const next = points[index + 1];

      // Se for o último, nao vai ter o próximo
      if (!next) {
        return prev;
      }

      const newPair = [me, next] as [number, number];

      return [...prev, newPair];
    },
    [] as [number, number][]
  );

  const cost = pairs.reduce((prev, curr) => {
    const isRising = curr[0] < curr[1];
    const currCost = curr[1] - curr[0];

    if (isRising) {
      return prev + currCost;
    }

    return prev;
  }, 0);

  return cost;
};

export const getCosts = (tracks: string[]): Cost[] => {
  return tracks.map((track, index) => {
    // Picota a string e transforma numa lista de números.
    const ints = track.split(" ").map(i => parseInt(i, 10));

    const [numberOfPoints, ...points] = ints;
    if (numberOfPoints !== points.length) {
      throw Error(
        "Dados inválidos. O tamanho do caminho não bate com o informado."
      );
    }

    const forward = getCost(points);
    const reverse = getCost(points.reverse());
    return {
      index,
      forward,
      reverse
    };
  });
};
