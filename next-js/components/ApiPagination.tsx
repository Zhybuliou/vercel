import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ApiPagination({ countItems, per_page }: { countItems: number, per_page: number }) {
  const delPagination = per_page === 10 ? 10 : 20;
  const pages = countItems && Math.ceil(countItems / delPagination);
  const pagesArray = new Array(pages).fill(1);
  const router = useRouter();

  return (
    <div className="pagination-block">
      <p>Pages: </p>
      {pagesArray.map((button, i) => (
        <Link
          role="button"
          style={
            router.asPath.includes(`/page/${button + i}`)
              ? {
                  color: '#000',
                  background: '#ffe81f',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '18px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  border: 'solid 3px #ffe81f',
                }
              : {
                  color: '#545e6f',
                  background: '#f0f0f0',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '18px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  border: 'solid 3px #ffe81f',
                }
          }
          href={{
            query: { ...router.query, page: `${button + i}` },
          }}
          key={nanoid()}
        >
          {button + i}
        </Link>
      ))}
    </div>
  );
}
