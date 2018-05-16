import { processByFilename } from "../src/lib";

describe("Teste de caixa preta", () => {
  test("Funciona dentro do tempo esperado (<1s)", async () => {
    const MULT = 100;
    const MULT_ARR = Array.from(Array(100).keys());
    expect.assertions(MULT);
    return Promise.all(
      MULT_ARR.map(_ => {
        const init = new Date().getTime();
        return processByFilename("./samples/1.txt").then(
          i => {
            const end = new Date().getTime();
            expect(end - init).toBeLessThan(1000);
          }
        );
      })
    );
  });
  test("Funciona corretamente com o exemplo 1", () => {
    expect.assertions(1);
    return expect(
      processByFilename("./samples/1.txt")
    ).resolves.toBe(2);
  });
  test("Funciona corretamente com o exemplo 2", () => {
    expect.assertions(1);
    return expect(
      processByFilename("./samples/2.txt")
    ).resolves.toBe(2);
  });
  test("Retorna uma mensagem de erro humana se o arquivo não existir ou se o dado passado for inválido", () => {
    const examples = [
      "./samples/nao_existe.txt",
      0,
      "",
      null,
      undefined,
      1,
      1.0,
      void 0
    ];
    expect.assertions(examples.length);
    return Promise.all(
      examples.map(e => {
        return expect(
          processByFilename(e as any)
        ).rejects.toBe(
          "Não foi possível abrir o arquivo de dados. \
Confira se o arquvio existe e se caminho informado está correto."
        );
      })
    );
  });
});
