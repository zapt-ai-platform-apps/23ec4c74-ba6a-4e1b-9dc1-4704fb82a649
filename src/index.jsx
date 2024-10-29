import { render } from 'solid-js/web';
import App from './App';
import { Router } from '@solidjs/router';
import './index.css';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  integrations: [Sentry.browserTracingIntegration()],
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// إضافة دعم PWA للتطبيق
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://your_icon_url_here",
  name: "التطبيق الجديد",
  shortName: "التطبيق الجديد"
};

let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/your_app_id/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));