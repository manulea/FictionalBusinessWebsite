// filepath: /c:/Users/sione_2rriuqr/OneDrive/Desktop/Rory's Repos/my-svelte-app/svelte.config.js
import sveltePreprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      typescript: true,
    }),
  ],
  compilerOptions: {
    compatibility: {
      componentApi: 4,
    },
  },
};