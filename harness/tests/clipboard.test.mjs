import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = (await readFile(new URL('../../src/scripts/clipboard.js', import.meta.url), 'utf8'))
  .replace('export const copyText =', 'globalThis.copyText =');

const fixture = ({ secure = false, denied = false, result = true, throwAt, disconnected = false } = {}) => {
  const calls = [];
  const children = new Set();
  const button = {
    isConnected: !disconnected,
    focus(options) {
      calls.push(['focus', options]);
      if (throwAt === 'focus') throw new Error('focus refused');
      document.activeElement = this;
    },
  };
  const document = {
    activeElement: button,
    body: { append(element) { children.add(element); } },
    createElement(tag) {
      assert.equal(tag, 'textarea');
      return {
        value: '', style: {}, setAttribute() {},
        select() {
          document.activeElement = this;
          if (throwAt === 'select') throw new Error('selection failed');
        },
        remove() {
          children.delete(this);
          if (document.activeElement === this) document.activeElement = document.body;
        },
      };
    },
    execCommand(command) {
      assert.equal(command, 'copy');
      calls.push(['fallback']);
      if (throwAt === 'copy') throw new Error('copy failed');
      return result;
    },
  };
  const context = {
    document,
    navigator: { clipboard: { async writeText(value) {
      calls.push(['secure', value]);
      if (denied) throw new Error('permission denied');
    } } },
    window: { isSecureContext: secure },
  };
  runInNewContext(source, context);
  return { copy: context.copyText, document, button, children, calls };
};

for (const result of [true, false]) {
  test(`fallback result ${result} removes textarea and restores focus without scrolling`, async () => {
    const f = fixture({ result });
    assert.equal(await f.copy('fixture@example.test'), result);
    assert.equal(f.children.size, 0);
    assert.equal(f.document.activeElement, f.button);
    assert.equal(f.calls.at(-1)[0], 'focus');
    assert.equal(f.calls.at(-1)[1].preventScroll, true);
  });
}
for (const throwAt of ['copy', 'select']) {
  test(`${throwAt} failure removes textarea and restores focus`, async () => {
    const f = fixture({ throwAt });
    assert.equal(await f.copy('Inquiry summary\nFixture'), false);
    assert.equal(f.children.size, 0);
    assert.equal(f.document.activeElement, f.button);
  });
}
for (const denied of [false, true]) {
  test(`secure clipboard ${denied ? 'rejection' : 'success'} preserves its result and focus`, async () => {
    const f = fixture({ secure: true, denied });
    assert.equal(await f.copy('fixture@example.test'), !denied);
    assert.equal(f.children.size, 0);
    assert.equal(f.document.activeElement, f.button);
    assert.equal(f.calls.length, 1);
    assert.equal(f.calls[0][0], 'secure');
  });
}
test('empty input performs no DOM or clipboard work', async () => {
  const f = fixture();
  assert.equal(await f.copy(''), false);
  assert.equal(f.children.size, 0);
  assert.deepEqual(f.calls, []);
});
test('a disconnected prior control is not focused', async () => {
  const f = fixture({ disconnected: true });
  assert.equal(await f.copy('fixture'), true);
  assert.equal(f.children.size, 0);
  assert.deepEqual(f.calls, [['fallback']]);
});
test('focus refusal preserves successful copy result', async () => {
  const f = fixture({ throwAt: 'focus' });
  assert.equal(await f.copy('fixture'), true);
  assert.equal(f.children.size, 0);
});
