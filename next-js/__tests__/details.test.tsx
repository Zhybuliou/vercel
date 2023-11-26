/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://localhost:3000/page/1?character=1&?per_page=10"}
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '@/components/Character';
import PageNotFound from '@/components/NotFound';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('next/router', () => require('next-router-mock'));

jest.mock('nanoid');

describe('Check render  Details', () => {
  it('renders a  Details', () => {
    render(<Details />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('Check render  PageNotFound', () => {
  it('renders a  PageNotFound', () => {
    render(<PageNotFound />);
    expect(
      screen.getByText('This is not page you are looking for.')
    ).toBeInTheDocument();
  });
});
