export const getTracks = (data: string) => {
  // Separa as linhas por newline
  const lines = data
    .split(/\r?\n/) //unix, windows e mac
    .filter(x => typeof x === "string" && x !== "");

  // A primeira linha é a quantidade e o resto são as linhas.
  // Se os valores são incosistentes, reportar o erro.
  const [linesNumber, ...rest] = lines;
  if (parseInt(linesNumber, 10) !== lines.length - 1) {
    throw Error(
      "Numero de linhas inconsistente com o valor informado."
    );
  }
  return rest;
};
