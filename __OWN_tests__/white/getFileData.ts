import { getFileData } from "../../src/lib";

describe("Caixa Branca - getFileData", () => {
  test("Retorna os dados certos se passa um caminho válido", () => {
    expect.assertions(1);
    return expect(
      getFileData("./samples/1.txt")
    ).resolves.toMatchSnapshot();
  });

  test("Mostra uma mensagem de erro humana se o argumento é inválido", () => {
    expect.assertions(1);
    return expect(
      getFileData(undefined as any)
    ).rejects.toBe(
      "Não foi possível abrir o arquivo de dados. Confira se o arquvio existe e se caminho informado está correto."
    );
  });

  test("Mostra uma mensagem de erro humana se o arquivo nao existe", () => {
    expect.assertions(1);
    return expect(getFileData("nao_existe")).rejects.toBe(
      "Não foi possível abrir o arquivo de dados. Confira se o arquvio existe e se caminho informado está correto."
    );
  });
});
