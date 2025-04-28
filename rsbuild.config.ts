import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { builtinModules } from 'node:module';
import { Logger, LoggerEvent, CompilerPipelineValue } from 'babel-plugin-react-compiler';

const stdoutLogger: Logger = {
  logEvent: (filename: string | null, event: LoggerEvent) => {
    console.error('LOG');
  },

  debugLogIRs: (value: CompilerPipelineValue) => {
    console.error('LOG');
  }
};

const externals = {
  'electron': 'commonjs electron'
};
for (const module of builtinModules) {
  externals[module] = 'commonjs ' + module;
}

const ReactCompilerConfig = {
  target: '17',
  logger: stdoutLogger,
  sources: (filename: string) => {
    return filename.indexOf('src/renderer/') !== -1;
  },
};

export default defineConfig({
  source: {
    entry: {
      renderer: './src/renderer/index.tsx'
    }
  },
  html: {
    template: './templates/index.html'
  },
  output: {
    target: 'web',
    assetPrefix: './',
    minify: false,
    distPath: {
      root: './build/window',
    },
    cleanDistPath: {
      keep: [/styles*/, /images*/, /svg*/],
    },
    externals,
  },
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift([
          'babel-plugin-react-compiler',
          ReactCompilerConfig,
        ]);
      },
    }),
  ],
});
