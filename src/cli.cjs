#!/usr/bin/env node

(async () => {
  const oraModule = await import('ora');
  const chalkModule = await import('chalk');
  const { checkUpdates } = await import('./analyzer.js');

  const ora = oraModule.default;
  const chalk = chalkModule.default;

  const spinner = ora('Checking updates...').start();
  const updates = await checkUpdates();
  spinner.stop();

  if (updates.length === 0) {
    console.log(chalk.green('✨ All dependencies are up to date!'));
    return;
  }

  console.log(chalk.yellow('⚡ Found updates:'));
  updates.forEach(u => {
    console.log(
      `${chalk.cyan(u.dependency)}: ${chalk.red(u.current)} → ${chalk.green(u.latest)} (${u.upgradeType})`
    );
  });
})();
