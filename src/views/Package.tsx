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
              <div className= 'text-xs font-mono tabular-nums text-slate-500'>
                <span>{ pkg.npmName }</span>
                <span className= 'mx-1.5'>—</span>
                <span>v{ pkg.version }</span>
                <span className= 'mx-1.5'>—</span>
                <span>{ pkg.license }</span>
              </div>

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
