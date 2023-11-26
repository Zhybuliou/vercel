import { useState } from 'react';
import ErrorComponent from './ErrorComponent';

export default function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  return (
    <>
      <button
        className="button-error"
        type="button"
        onClick={() => setHasError(true)}
      >
        Get Error
      </button>
      {hasError && <ErrorComponent />}
    </>
  );
}
