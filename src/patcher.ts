import fs from "fs";
import { generatePatch } from "./gpt.js";

export async function createPatch(filePath: string, instructions: string) {
  const code = fs.readFileSync(filePath, "utf-8");
  const patch = await generatePatch(code, instructions);
  const patchFile = `${filePath}.patch`;
  fs.writeFileSync(patchFile, patch);
  return patchFile;
}
