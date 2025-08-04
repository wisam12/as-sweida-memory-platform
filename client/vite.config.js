import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/heroes_input': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                },
                '/pending_heroes': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                },
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    };
});
