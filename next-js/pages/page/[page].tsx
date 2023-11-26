import ApiPagination from '@/components/ApiPagination';
import Cards from '@/components/Cards';
import Details from '@/components/Character';
import Loading from '@/components/Loading';
import SearchBlock from '@/components/SearchBlock';
import SelectCards from '@/components/SelectCards';
import { IPeople, IResultPeople } from '@/types/interface';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = (async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${context.query.search || ''}&page=${
      context.query.page
    }`
  );
  const repo = await res.json();

  if (context.query.per_page !== '20') {
    return {
      props: { characters: repo, result: repo.results, per_page: 10 },
    };
  } else {
    const countPages = repo?.count ? Math.ceil(repo.count / 10) : 9;
    const currentPage = context.query.page || 1;
    let myPage = +currentPage! === 1 ? currentPage : +currentPage! + 1;
    if (+currentPage > 2) {
      myPage = +currentPage + 2;
    }
    if (+currentPage >= 4) {
      myPage = +currentPage + 3;
    }
    if (+currentPage === 5) {
      myPage = 9;
    }
    const promise = await fetch(
      `https://swapi.dev/api/people/?search=${
        context.query.search || ''
      }&page=${myPage}`
    )
      .then((res) => res.json())
      .then((r) => r.results);

    const promise2 =
      countPages >= +myPage + 1
        ? await fetch(
            `https://swapi.dev/api/people/?search=${
              context.query.search || ''
            }&page=${+myPage + 1}`
          )
            .then((res) => res.json())
            .then((r) => r.results)
        : [];

    const allResults = await Promise.all([promise, promise2]).then((res) =>
      res.flat(Infinity)
    );
    return { props: { characters: repo, result: allResults, per_page: 20 } };
  }
}) satisfies GetServerSideProps<{
  characters: IResultPeople;
  result: IPeople[];
  per_page: number;
}>;

export default function Page({
  characters,
  result,
  per_page,
}: {
  characters: IResultPeople;
  result: IPeople[];
  per_page: number;
}) {
  const router = useRouter();
  const checkCharacter = router.query.character;
  return (
    <div>
      <div className="home-page">
        <div className="home-page-header">
          <SelectCards />
          <ApiPagination countItems={characters.count} per_page={per_page} />
          <SearchBlock />
        </div>
        <div className="home-page-content-wrapper">
          <div className="home-page-content">
            {!!characters ? <Cards result={result} /> : <Loading />}
          </div>
          {checkCharacter && <Details />}
        </div>
      </div>
    </div>
  );
}
