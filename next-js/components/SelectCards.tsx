import router from 'next/router';

export default function SelectCards() {
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
          onChange={(event) => {
            const page = '1';
            const per_page = event.target.value;
            const newPathObject = {
              pathname: router.pathname,
              query: { ...router.query, per_page, page },
            };
            router.push(newPathObject, undefined, { shallow: false });
          }}
        >
          <option data-testid="option-1" value="10">
            10
          </option>
          <option data-testid="option-2" value="20">
            20
          </option>
        </select>
      </label>
    </div>
  );
}
