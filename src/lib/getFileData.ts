import * as fs from "fs";

export const getFileData = (
  filePath: string
): Promise<string> => {
  const error =
    "Não foi possível abrir o arquivo de dados. \
Confira se o arquvio existe e se caminho informado está correto.";
  if (!filePath) {
    return Promise.reject(error);
  }
  // Tornar a operação uma promessa para o código main ficar mais simples.
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

/*
```mermaid

graph TD
    1[1..9]
    2[10-11]
    3[12...15]
    4[16-17]
    5[18-19]

    1 -->|Tipo de dados inválido ou string vazia| 2
    2 --> erro
    1 --> 3
    3 --> 4
    3 -->|Arquivo não encontrado| 5

    4 --> ok
    5 --> erro

    ok --> retorna
    erro --> retorna
```
*/
