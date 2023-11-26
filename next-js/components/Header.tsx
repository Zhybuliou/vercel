import ErrorButton from './ErrorButton';
import Logo from './Logo';

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <ErrorButton />
    </div>
  );
}
