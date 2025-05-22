import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <div className="p-2">This is an example table with mocked userdata</div>;
}
