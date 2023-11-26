import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import loading from '../assets/hugging-grogu.gif';

const LOADER_THRESHOLD = 250;

export default function NavigationLoader() {
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    const start = () =>
      (timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD));

    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <div className="navigation-loader">
      <div className="loading">
        <Image
          src={loading}
          alt="loading..."
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div className="text-style">Loading...</div>
      </div>
    </div>
  );
}
