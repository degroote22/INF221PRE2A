import * as fs from "fs";

const getTracks = (data: string) => {
  const lines = data
    .split(/\r?\n/)
    .filter(x => typeof x === "string" && x !== "");

  const [linesNumber, ...rest] = lines;
  if (parseInt(linesNumber, 10) !== lines.length - 1) {
    throw Error("Numero de linhas invalido");
  }
  return rest;
};

fs.readFile("./samples/1.txt", "utf8", (err, data) => {
  if (!err) {
    const tracks = getTracks(data);
    console.log(`tracks`, tracks);
  
  } else {
    console.error(err);
  }
});
