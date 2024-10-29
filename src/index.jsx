import { render } from 'solid-js/web';
import App from './App';
import './index.css';

// Add PWA support to the app
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://your_icon_url_here",
  name: "New App",
  shortName: "New App"
};

let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/your_app_id/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => <App />, document.getElementById('root'));