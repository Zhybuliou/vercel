import React from 'react';
import Image from 'next/image';
import mandalorian from '../assets/shooting-fire-din-djarin.gif';
import { useRouter } from 'next/router';

export default function PageError({ ...props }) {
  const router = useRouter();
  const { error } = props;
  return (
    <div className="page-error">
      <div className="page-error-image">
        <Image src={mandalorian} alt="Page Not Found" />
      </div>
      <div className="page-error-content">
        <h2 className="text-style">oops, something went wrong issue.</h2>
        <p>`Error: {error}`</p>
        <button className="page-error-reset" onClick={() => router.reload()}>
          RESET
        </button>
      </div>
    </div>
  );
}
