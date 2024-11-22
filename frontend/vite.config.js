// import react from '@vitejs/plugin-react-swc';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     mimeTypes: {
//       '.js': 'application/javascript',
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})