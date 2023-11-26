/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://localhost:3000/page/1"}
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import ApiPagination from '@/components/ApiPagination';
import Loading from '@/components/Loading';
import Page from '@/pages/page/[page]';
import { apiMock } from '@/data/apiMock';
import mockRouter from 'next-router-mock';
import SelectCards from '@/components/SelectCards';
import Card from '@/components/Card';
import Cards from '@/components/Cards';
import planets from '@/data/planets';
import SearchBlock from '@/components/SearchBlock';
import NavigationLoader from '@/components/NavigateLoader';
import { apiResults } from '@/data/apiResults';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('next/router', () => require('next-router-mock'));

jest.mock('nanoid');

describe('Check render Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    expect(screen.getByText(/star wars/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Error/i)).toBeInTheDocument();
  });
});

describe('Check render Loading', () => {
  it('renders a Loading', () => {
    render(<Loading />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

describe('Check render SelectCards', () => {
  it('renders a SelectCards', () => {
    render(
      <ErrorBoundary>
        <Layout>
          <SelectCards />
        </Layout>
      </ErrorBoundary>
    );
    expect(screen.getByText(/per page:/i)).toBeInTheDocument();
  });
});

describe('Check render Card', () => {
  it('renders a Card', () => {
    render(
      <ErrorBoundary>
        <Layout>
          <Card name={'Luck'} url={'https://some.com'} />
        </Layout>
      </ErrorBoundary>
    );
    expect(screen.getByText(/Luck/i)).toBeInTheDocument();
  });
});

describe('Check render Cards', () => {
  it('renders a Cards', () => {
    render(
      <ErrorBoundary>
        <Layout>
          <Cards result={apiMock.results} />
        </Layout>
      </ErrorBoundary>
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});

describe('Check render  ApiPagination', () => {
  it('renders a  ApiPagination', () => {
    render(
      <ErrorBoundary>
        <Layout>
          <ApiPagination countItems={89} per_page={10} />
        </Layout>
      </ErrorBoundary>
    );
    expect(screen.getAllByRole('button').length).toBe(10);
  });
});

describe('Check render  ErrorBoundary', () => {
  it('renders a  ErrorBoundary', () => {
    render(
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    );
    const button = screen.getByText(/Get Error/i);
    waitFor(() => fireEvent.click(button));
    waitFor(() => expect(screen.getByText('oops')).toBeInTheDocument());
  });
});
describe('Check render  apiMock', () => {
  it('renders a  apiMock', () => {
    const res = apiMock;
    expect(res.count).toBe(82);
  });
});
describe('Check render  planets', () => {
  it('renders a  planets', () => {
    const res = planets;
    expect(res[1]).toBe('Tatooin');
  });
});

describe('Check render  SearchBlock', () => {
  it('renders a  SearchBlock', () => {
    render(<SearchBlock />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
describe('Check render  NavigationLoader', () => {
  it('renders a  NavigationLoader', () => {
    mockRouter.push('/page/1');
    render(
      <ErrorBoundary>
        <Layout>
          <NavigationLoader />
        </Layout>
      </ErrorBoundary>
    );
    expect(screen.getByText('Star Wars')).toBeInTheDocument();
  });
});

describe('Page', () => {
  test('renders Page', () => {
    const wrapper = render(<Page characters={apiMock} result={apiMock.results} per_page={10}/>);
    expect(wrapper.getByText(/Search/i)).toBeInTheDocument();
    expect(wrapper.getAllByTestId(/card/i).length).toBe(10);
  });
});
describe('Page count ', () => {
  test('renders Page', () => {
    const wrapper = render(<Page characters={apiMock} result={apiResults} per_page={20}/>);
    expect(wrapper.getAllByTestId(/card/i).length).toBe(20);
  });
});
