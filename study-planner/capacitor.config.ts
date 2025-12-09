import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studyplanner.app',
  appName: 'StudyPlanner',
  webDir: 'public',
  server: {
    url: 'https://ip2026.vercel.app',
    androidScheme: 'https'
  }
};

export default config;
