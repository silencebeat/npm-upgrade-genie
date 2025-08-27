import fs from "fs";
import semver from "semver";
import { execSync } from "child_process";

export interface UpgradeReport {
  dependency: string;
  current: string;
  latest: string;
  upgradeType: "patch" | "minor" | "major";
}

export async function checkUpdates(): Promise<UpgradeReport[]> {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const reports: UpgradeReport[] = [];

  for (const dep in deps) {
    const currentVersion = deps[dep].replace(/^[^\d]*/, ""); // buang ^ ~ dll
    try {
      const latest = execSync(`npm view ${dep} version`).toString().trim();
      if (semver.valid(currentVersion) && semver.valid(latest)) {
        const diff = semver.diff(currentVersion, latest);
        if (diff) {
          reports.push({
            dependency: dep,
            current: currentVersion,
            latest,
            upgradeType: diff as "patch" | "minor" | "major"
          });
        }
      }
    } catch (err) {
      console.warn(`Gagal cek ${dep}:`, err);
    }
  }

  return reports;
}
