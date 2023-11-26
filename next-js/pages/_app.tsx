import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import NavigateLoader from '@/components/NavigateLoader';

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <ErrorBoundary>
      <Layout>
        <NavigateLoader />
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default MyApp;
