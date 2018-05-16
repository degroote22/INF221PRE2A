import * as fs from "fs";

let isInsideMarkdownTSCode = false;

let init = `
const _expect = (x: any) => {
  return {
    toBe: (y: any) => {
      if (x == y) {
        console.log(\`Teste passou:\n\${x} é igual a \${y}.\n\`);
      } else {
        console.log(\`Teste falhou:\nRecebido: \${x} Esperado: \${y}.\n\`);
      }
    }
  };
};
`;

const processData = (data: string) => {
  return (
    data
      // Split our file up into all of its lines.
      .split("\n")
      // Reduce our file back so that it is just SQL.
      .reduce((ts, line) => {
        // If we are inside some SQL code, we want to include this code in our
        // final file.
        if (isInsideMarkdownTSCode) {
          // If this line closes our SQL, do not include this line, but do
          // change our state.
          if (line === "```") {
            isInsideMarkdownTSCode = false;
            return `${ts}\n`;
          }
          return `${ts}${line}\n`;
        }
        // If we are not inside some SQL code, we should just return back the
        // code so far.
        else {
          // If this line opens a block of SQL, change our state.
          if (line === "```typescript")
            isInsideMarkdownTSCode = true;
          return ts;
        }
      }, init)
  );
};

fs.readFile(
  "./respostas/456/index.md",
  "utf-8",
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const ts = processData(data);
      fs.writeFile(
        "./respostas/456/index.ts",
        ts,
        console.error
      );
      // console.log(ts);
    }
  }
);
