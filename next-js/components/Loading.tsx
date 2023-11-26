import Image from 'next/image';
import loading from '../assets/hugging-grogu.gif';

export default function Loading() {
  return (
    <div className="loading">
      <Image
        src={loading}
        alt="loading..."
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className="text-style">Loading...</div>
    </div>
  );
}
