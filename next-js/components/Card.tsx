import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Card({ name, url }: { name: string; url: string }) {
  const character = url.split('/')[url.split('/').length - 2];
  const { query } = useRouter();
  return (
    <div className="card" data-testid="card">
      <Link
        href={{
          query: { ...query, character },
        }}
        passHref
        shallow
        replace
      >
        <div className="wrapper-card">
          <div className="color_bg" />
          <div
            className="card_img"
            style={{
              backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/${character}.jpg)`,
            }}
          />
          <div className="card-info">
            <h2>{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
