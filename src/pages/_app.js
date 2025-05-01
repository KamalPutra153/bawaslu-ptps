import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/globals.css';
import dynamic from 'next/dynamic';

// Import Bootstrap JS hanya di sisi klien menggunakan dynamic import
const Bootstrap = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min.js'), { 
  ssr: false // Menonaktifkan server-side rendering untuk Bootstrap JS
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
