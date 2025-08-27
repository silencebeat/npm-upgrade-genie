import { checkUpdates } from "./analyzer.js";

export async function upgradeGenie() {
  const result = await checkUpdates();
  return result;
}
