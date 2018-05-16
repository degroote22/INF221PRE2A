
const _expect = (x: any) => {
  return {
    toBe: (y: any) => {
      if (x == y) {
        console.log(`Teste passou:
${x} é igual a ${y}.
`);
      } else {
        console.log(`Teste falhou:
Recebido: ${x} Esperado: ${y}.
`);
      }
    }
  };
};
enum Tipo {
  Equilatero = "Equilátero",
  Isosceles = "Isósceles",
  Escaleno = "Escaleno"
}

interface Ponto {
  x: number;
  y: number;
}

interface Triangulo {
  p1: Ponto;
  p2: Ponto;
  p3: Ponto;
}

const mostraTipo = (triangulo: Triangulo): Tipo => {
  const equals = (a: number, b: number) => {
    const TRESHOLD = 0.01;
    return Math.abs(a - b) < TRESHOLD;
  };

  const getDistance = (a: Ponto, b: Ponto): number => {
    const diffx = a.x - b.x;
    const diffy = a.y - b.y;

    return Math.sqrt(
      Math.pow(diffx, 2) + Math.pow(diffy, 2)
    );
  };

  const dab = getDistance(triangulo.p1, triangulo.p2);
  const dac = getDistance(triangulo.p2, triangulo.p3);
  const dbc = getDistance(triangulo.p1, triangulo.p3);

  if (
    equals(dab, dac) &&
    equals(dac, dbc) &&
    equals(dab, dbc)
  ) {
    return Tipo.Equilatero;
  }

  if (
    equals(dab, dac) ||
    equals(dac, dbc) ||
    equals(dab, dbc)
  ) {
    return Tipo.Isosceles;
  }

  return Tipo.Escaleno;
};

const Equilatero = {
  p1: { x: 1, y: 0 },
  p2: { x: 0, y: 0 },
  p3: { x: 0.5, y: 0.866 }
};

const Isosceles = {
  p1: { x: 0, y: 0 },
  p2: { x: 0, y: 1 },
  p3: { x: 1, y: 0 }
};

const Escaleno = {
  p1: { x: 0, y: 0 },
  p2: { x: 0, y: 2 },
  p3: { x: 1, y: 0 }
};

console.log("Testando o identificador de tipos");
_expect(mostraTipo(Equilatero)).toBe(Tipo.Equilatero);
_expect(mostraTipo(Isosceles)).toBe(Tipo.Isosceles);
_expect(mostraTipo(Escaleno)).toBe(Tipo.Escaleno);

