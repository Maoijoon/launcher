import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'nga',
      exposes: {
        './Initializer': './src/components/Initializer.tsx',
        './NgCredits': './src/components/NgCredits.tsx',
        './NgFaves': './src/components/NgFaves.tsx',
        './NgRating': './src/components/NgRating.tsx',
        './NgRatingGridIcon': './src/components/NgRatingGridIcon.tsx',
        './NgRatingListIcon': './src/components/NgRatingListIcon.tsx',
        './NgRuffleEmbed': './src/components/NgRuffleEmbed.tsx',
        './NgScore': './src/components/NgScore.tsx',
        './NgViews': './src/components/NgViews.tsx',
        './NgRatingSearchableSelect': './src/components/NgRatingSearchableSelect.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] }
      },
    })
  ],
  source: {
    entry: {
      index: './src/init.ts',
    },
  },
  lib: [
    {
      format: 'mf',
      dts: false,
      output: {
        distPath: {
          root: 'static'
        },
        assetPrefix: 'auto',
        minify: false,
        cleanDistPath: {
          keep: [/assets*/, /\.css/],
        }
      },
    }
  ],
  output: {
    target: 'web'
  },
});
