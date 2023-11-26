import { nanoid } from 'nanoid';
import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './NotFound';

export default function Cards({ result }: { result: IPeople[] }) {
  return (
    <>
      {result?.length &&
        result?.map((card: IPeople) => (
          <Card name={card.name} url={card.url} key={nanoid()} />
        ))}
      {!result && <PageNotFound />}
    </>
  );
}
