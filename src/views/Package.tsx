import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { useParams } from 'react-router';


export function Package () {
  const { id } = useParams();
  const pkg = getPackageById( id );

  if ( ! pkg ) return <NotFound />;

  return (
    <div className= 'flex items-start gap-12'>
      <aside className= 'shrink-0 w-80'>
        ...
      </aside>

      <div className= 'flex-1 space-y-12'>
        <div className= 'pb-8 space-y-4 border-b border-slate-200'>
          <div className= 'flex justify-between items-center gap-4'>
            <div className= 'space-y-1'>
              <h1 className= 'text-3xl font-semibold tracking-tight'>
                { pkg.name }
              </h1>
            </div>
          </div>

          <p className= 'text-lg leading-relaxed text-slate-600'>
            { pkg.tagline }
          </p>
        </div>
      </div>
    </div>
  );
}
