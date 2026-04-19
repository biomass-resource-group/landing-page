#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const guard = resolve(dirname(fileURLToPath(import.meta.url)), '../orchestration/pre-bash-guard.mjs');

const tests = [
  ['git push' + ' -f origin feat/thing', 2, 'short -f blocked'],
  ['git push' + ' -fu origin feat/thing', 2, 'grouped -fu blocked'],
  ['git push --force-with-lease origin feat/thing', 0, '--force-with-lease allowed'],
  ['rm -f' + ' -r src', 2, 'split flags blocked'],
  ['rm -fr public/', 2, 'rm -fr blocked'],
  ['rm --recursive --force "src"', 2, 'long-option rm blocked'],
  ['rm src/', 2, 'bare rm of protected dir blocked'],
  ['rm -rf src-old', 0, 'src-old not blocked'],
  ['git push origin main-fix', 0, 'main-fix not blocked'],
  ['git push origin HEAD:main', 2, 'refspec HEAD:main blocked'],
  ['git push origin HEAD:refs/heads/main', 2, 'refspec refs/heads/main blocked'],
  ['git -c core.pager=cat push origin main', 2, 'git -c push main blocked'],
  ['git --no-pager push' + ' -f origin feat/x', 2, 'git --no-pager push -f blocked'],
  ['git -C /tmp push origin main', 2, 'git -C push main blocked'],
  ["git -c user.name='A B' push origin main", 2, 'git -c quoted value push main blocked'],
  ['rm -rf -- src', 2, 'rm -rf -- src blocked'],
  ['rm -rf -- public/', 2, 'rm -rf -- public/ blocked'],
  ['git push \'--force\' origin feat/x', 2, 'quoted --force blocked'],
  ['git push "--force" origin feat/x', 2, 'double-quoted --force blocked'],
  ['git push origin --all', 2, '--all push blocked'],
  ['git push --mirror origin', 2, '--mirror push blocked'],
  ['git push origin :main', 2, 'deletion refspec :main blocked'],
  ['git push origin :refs/heads/main', 2, 'deletion refspec :refs/heads/main blocked'],
  ['git reset -q --hard', 2, 'reset -q --hard blocked'],
  ['git push --no-verify origin feat', 2, 'push --no-verify blocked'],
  ['git merge --no-verify feat', 2, 'merge --no-verify blocked'],
  ['rm -rf /workspace/landing-page/src', 2, 'absolute path rm blocked'],
  ['rm -rf /home/user/landing-page/harness/', 2, 'absolute path rm harness blocked'],
  ['git push origin +main', 2, '+refspec force push to main blocked'],
  ['git push origin +feat/x', 2, '+refspec force push blocked'],
  ['rm -rf tmp src', 2, 'rm with protected dir as second operand blocked'],
  ['rm -rf foo public bar', 2, 'rm with protected dir as middle operand blocked'],
  ['rm -rf my-src-file', 0, 'rm of non-protected file not blocked'],
  ['git --exec-path /tmp push origin' + ' main', 2, 'git --exec-path push blocked'],
  ['git commit -n -m test', 2, 'commit -n (short --no-verify) blocked'],
  ['git push -n origin feature', 0, 'push -n (dry-run) not blocked'],
  ['git merge -n feature', 0, 'merge -n (no-stat) not blocked'],
  ['git push origin main;echo done', 2, 'push main with semicolon blocked'],
  ['git push origin main&&echo ok', 2, 'push main with && blocked'],
  ['rm -rf src;echo done', 2, 'rm src with semicolon blocked'],
  ['git push origin main&', 2, 'push main with background & blocked'],
  ['rm -rf src>/dev/null', 2, 'rm src with redirect blocked'],
  ["git --work-tree \"/tmp/a b\" push origin main", 2, 'git --work-tree quoted push blocked'],
  ['git --config-env user.name=MY_ENV push origin main', 2, 'git --config-env push blocked'],
  ['echo git push origin main', 0, 'echo of git push not blocked'],
  ['echo "rm -rf src"', 0, 'echo of rm not blocked'],
  ['echo ok\ngit push origin main', 2, 'newline-separated push blocked'],
  ['echo ok' + ' & git push origin main', 2, 'background &-separated push blocked'],
  ['git --work-tree="/tmp/a b" push origin main', 2, 'git --opt=quoted push blocked'],
  ['git commit -nm "msg"', 2, 'commit -nm (grouped no-verify) blocked'],
  ['git commit -nS -m msg', 2, 'commit -nS (uppercase grouped) blocked'],
  ['git push origin ma\\\nin', 2, 'escaped newline push blocked'],
  ['env X=1 git push origin main', 2, 'env-prefixed push blocked'],
  ['command rm -rf src', 2, 'command-prefixed rm blocked'],
  ['sudo git push origin main', 2, 'sudo-prefixed push blocked'],
  ['FOO=1 git push origin main', 2, 'assignment-prefixed push blocked'],
  ['FOO=1 rm -rf src', 2, 'assignment-prefixed rm blocked'],
  ['env A=1 B=2 git push origin main', 2, 'multi-env push blocked'],
  ['echo $(git push origin main)', 2, 'command substitution push blocked'],
  ['git push origin "main"', 2, 'quoted refspec main blocked'],
  ['rm -rf src*', 2, 'glob rm src* blocked'],
  ['git commit -m "fix -n bug"', 0, 'commit message containing -n not blocked'],
  ['git commit -n -m "fix bug"', 2, 'commit -n before -m blocked'],
  ['(git push origin main)', 2, 'subshell push blocked'],
  ['(rm -rf src)', 2, 'subshell rm blocked'],
  ['/usr/bin/git push origin main', 2, 'absolute path git blocked'],
  ['/bin/rm -rf src', 2, 'absolute path rm blocked'],
  ['git commit --message "fix -n bug"', 0, 'commit --message with -n not blocked'],
  ['echo $(echo $(git push origin main))', 2, 'nested substitution push blocked'],
  ['FOO="a b" git push origin main', 2, 'quoted assignment prefix push blocked'],
  ['env FOO="a b" rm -rf src', 2, 'quoted env assignment rm blocked'],
  ['cat <(git push origin main)', 2, 'process substitution push blocked'],
  ["bash -c 'git push origin main'", 2, 'bash -c push blocked'],
  ['sh -c "rm -rf src"', 2, 'sh -c rm blocked'],
  ['eval "git push origin main"', 2, 'eval push blocked'],
  ['env -i git push origin main', 2, 'env -i push blocked'],
  ['sudo -u root rm -rf src', 2, 'sudo -u rm blocked'],
  ['command -- git push origin main', 2, 'command -- push blocked'],
];

let failed = 0;
for (const [cmd, expected, desc] of tests) {
  const r = spawnSync('node', [guard], {
    input: JSON.stringify({ tool_input: { command: cmd } }),
    encoding: 'utf8',
  });
  const ok = r.status === expected;
  console.log(ok ? '  PASS' : '  FAIL', desc, `(exit: ${r.status}, expected: ${expected})`);
  if (!ok) failed++;
}
console.log(`\n${tests.length - failed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
