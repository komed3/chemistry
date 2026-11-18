import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { useParams } from 'react-router';


export function Playground () {
  const { id } = useParams();

  const pkg = getPackageById( id );
  if ( ! pkg || ! pkg.playground ) return <NotFound />;

  const Icon = pkg.icon;
  const Playground = pkg.playground();

  return (
    <div className= 'space-y-8'>
      <div className= 'pb-8 space-y-4 border-b border-slate-200'>
        <div className= 'flex justify-between items-start gap-4'>
          <h1 className= 'flex items-center gap-3 text-3xl font-semibold tracking-tight'>
            <Icon className= 'shrink-0 size-8 text-teal-600' />
            <span>{ pkg.name }</span>
            <span className= 'font-light text-slate-600'>Playground</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
