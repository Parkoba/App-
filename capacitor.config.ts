import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'parkoba.app',
  appName: 'Parkoba',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android:{

  }
};

export default config;
