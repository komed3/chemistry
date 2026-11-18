import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { useParams } from 'react-router';


export function Playground () {
  const { id } = useParams();
  const pkg = getPackageById( id );

  if ( ! pkg || ! pkg.playground ) return <NotFound />;
  return pkg.playground();
}
