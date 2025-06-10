import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import compileSCSS from './compile-scss.js'; // Note the `.js` extension

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  const port = parseInt(env.VITE_PORT || '3210', 10);

  return defineConfig({
    base: env.VITE_BASENAME || '/',
    plugins: [react(), compileSCSS()],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@globals': path.resolve(__dirname, 'src/globals'),
        '@assets': path.resolve(__dirname, 'src/assets')
      }
    },
    server: {
      host: '0.0.0.0',
      port
    },
    preview: {
      port: port + 1
    },
    build: {
      rollupOptions: {
        external: ['perf_hooks'],
        onwarn(warning, warn) {
          if (warning.code === 'EVAL') return;
          warn(warning);
        }
      }
    }
  });
};
