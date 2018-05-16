import { processByFilename } from "./lib";

export const getFilenameFromInput = () => {
  const fileName = process.argv[2];

  if (typeof fileName !== "string") {
    throw Error(
      "Argumento para o nome do arquivo inválido"
    );
  }
  return fileName;
};

const main = async () => {
  try {
    const smaller = await processByFilename(
      getFilenameFromInput()
    );
    console.log(smaller);
  } catch (err) {
    // Se houver algum erro no programa, mostrar no console apenas.
    console.error(err);
  }
};

// inicializa o programa
main();
