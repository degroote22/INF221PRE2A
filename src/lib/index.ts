import { getFileData } from "./getFileData";
export * from "./getFileData";
import { getTracks } from "./getTracks";
export * from "./getTracks";
import { getCosts } from "./costs";
export * from "./costs";
import { getSmaller } from "./getSmaller";
export * from "./getSmaller";
export * from "./interfaces";

export const processByFilename = async (
  fileName: string
) => {
  const data = await getFileData(fileName);
  const tracks = getTracks(data);
  const costs = getCosts(tracks);

  // A resposta começa do 1, e até agora usa-se index
  // com base 0.
  const smaller = getSmaller(costs) + 1;

  return smaller;
};
