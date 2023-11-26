import router from 'next/router';
import { useState } from 'react';

export default function SearchBlock() {
  const [search, setSearch] = useState('');

  function handlerOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value);
  }
  function addSearchParams(search: string) {
    const page = '1';
    const newPathObject = {
      pathname: router.pathname,
      query: { ...router.query, search, page },
    };
    router.push(newPathObject, undefined, { shallow: false });
  }

  return (
    <div className="search-block">
      <input
        data-testid="input-search"
        className="search-block-input"
        name="value"
        type="text"
        placeholder="search character ..."
        value={search}
        onChange={(event) => handlerOnChange(event)}
        onKeyUp={(event) => event.key === 'Enter' && addSearchParams(search)}
      />
      <button
        data-testid="button-search"
        onClick={() => addSearchParams(search)}
        type="submit"
        className="search-block-button"
      >
        Search
      </button>
    </div>
  );
}
