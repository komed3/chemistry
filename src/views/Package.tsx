import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { useParams } from 'react-router';


export function Package () {
  const { id } = useParams();
  const pkg = getPackageById( id );

  if ( ! pkg ) return <NotFound />;

  return (
    <></>
  );
}
