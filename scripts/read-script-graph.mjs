import { realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';
import { build } from 'esbuild';

export const readScriptGraph = async (directory, entry) => {
  const root = realpathSync(directory);
  const result = await build({
    absWorkingDir: root,
    entryPoints: [`./${entry}`],
    bundle: true,
    write: false,
    treeShaking: true,
    logLevel: 'silent',
    plugins: [{
      name: 'local-dist-scripts',
      setup(builder) {
        builder.onResolve({ filter: /.*/ }, (args) => {
          if (!['entry-point', 'import-statement'].includes(args.kind)
            || !/^(?:\.\.?\/|\/)/.test(args.path)) {
            throw new Error(`Expected a local static script import: ${args.path}`);
          }
          const path = realpathSync(args.path.startsWith('/')
            ? resolve(root, `.${args.path}`)
            : resolve(args.resolveDir, args.path));
          const fromRoot = relative(root, path);
          if (fromRoot.startsWith('..') || isAbsolute(fromRoot) || !path.endsWith('.js')) {
            throw new Error(`Script import escapes dist or is not JavaScript: ${args.path}`);
          }
          return { path };
        });
      },
    }],
  });
  // Inputs can include unused imported exports; only retained code establishes behavior.
  return result.outputFiles.map((file) => file.text).join('\n');
};
