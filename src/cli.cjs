#!/usr/bin/env node

(async () => {
  const { default: ora } = await import('ora');
  const { default: chalk } = await import('chalk');
  const { checkUpdates } = await import('./analyzer.js');

  const args = process.argv.slice(2);
  const aiPatch = args.includes('--ai-patch');

  // Spinner untuk cek update dependency
  const spinner = ora('Checking updates...').start();
  const updates = await checkUpdates();
  spinner.stop();

  if (updates.length === 0) {
    console.log(chalk.green('✨ All dependencies are up to date!'));
  } else {
    console.log(chalk.yellow('⚡ Found updates:'));
    updates.forEach(u => {
      console.log(
        `${chalk.cyan(u.dependency)}: ${chalk.red(u.current)} → ${chalk.green(u.latest)} (${u.upgradeType})`
      );
    });
  }

  // === AI patch HANYA jika flag aktif ===
  if (aiPatch) {
    // cek API key dulu
    if (!process.env.OPENAI_API_KEY) {
      console.error(chalk.red("🚨 Please set your OPENAI_API_KEY to use --ai-patch"));
      process.exit(1);
    }

    // baru import patcher (dan GPT di dalamnya)
    const { createPatch } = await import('./patcher.js');

    const patchFile = await createPatch('package.json', 'Upgrade dependencies safely using AI');
    console.log(chalk.blue(`AI-generated patch saved to ${patchFile}`));
  }
})();
