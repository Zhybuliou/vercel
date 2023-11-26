export default function ErrorComponent() {
  throw new Error(' This is a test error');
  return <div>Error Boundary</div>;
}
