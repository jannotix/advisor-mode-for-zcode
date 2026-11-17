// Minimal static check: the manifests parse and the hook scripts they name exist.
// There is no type checker in this repository; this does not pretend to be one.
import fs from 'node:fs';
import path from 'node:path';

const root = 'advisor-mode-for-zcode';
const json = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
let failed = false;
const fail = (msg) => { console.error(`FAIL ${msg}`); failed = true; };

for (const f of ['marketplace.json', `${root}/.zcode-plugin/plugin.json`, `${root}/advisor-config.json`, `${root}/hooks/hooks.json`]) {
  try { json(f); console.log(`ok   ${f}`); } catch (e) { fail(`${f}: ${e.message}`); }
}

try {
  const hooks = json(`${root}/hooks/hooks.json`).hooks;
  for (const entries of Object.values(hooks)) {
    for (const entry of entries) {
      for (const h of entry.hooks) {
        for (const arg of h.args ?? []) {
          if (!arg.startsWith('${ZCODE_PLUGIN_ROOT}/')) continue;
          const file = path.join(root, arg.slice('${ZCODE_PLUGIN_ROOT}/'.length));
          if (!fs.existsSync(file)) fail(`hooks.json names a missing file: ${file}`);
        }
      }
    }
  }
} catch (e) { fail(`hooks.json structure: ${e.message}`); }

process.exit(failed ? 1 : 0);
