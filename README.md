# npm-upgrade-genie

🔮 AI-powered assistant to analyze and upgrade npm dependencies safely.

## Features
- Detect outdated dependencies.
- Classify upgrades as `patch`, `minor`, or `major`.
- CLI + API interface.
- AI-powered patch generator using GPT (`--ai-patch`).

## Install
```bash
npm install -g npm-upgrade-genie
```

## Usage
Check for outdated dependencies (no AI)
```bash
upgrade-genie
```

Generate AI-powered patch
```bash
export OPENAI_API_KEY="sk-xxxxxx..."   # set your OpenAI API key
upgrade-genie --ai-patch
```

```bash
Without --ai-patch, the CLI will not require an API key.
With --ai-patch, you must set OPENAI_API_KEY, otherwise the CLI will exit with an error.
```


## Output Example
Regular dependency check
```yaml
⚡ Found updates:
chalk: 4.1.2 → 5.3.0 (major)
ora: 5.4.0 → 7.0.0 (minor)
```

AI-powered patch
```yaml
⚡ Found updates:
chalk: 4.1.2 → 5.3.0 (major)
ora: 5.4.0 → 7.0.0 (minor)
AI-generated patch saved to package.json.patch
```

```
The patch is in diff format, ready to apply with git apply or patch.
```

## License
MIT
