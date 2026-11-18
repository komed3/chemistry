import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { ExternalLink, Terminal } from 'lucide-react';
import { Link, useParams } from 'react-router';


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
          <div className= 'flex justify-between items-start gap-4'>
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

            <div className= 'flex items-center gap-3'>
              <a
                href= { pkg.githubUrl }
                target= '_blank'
                rel= 'noreferrer'
                className= {
                  'inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium ' +
                  'text-slate-700 bg-white border border-slate-300 rounded-sm ' +
                  'hover:text-slate-900 hover:border-slate-400 transition-colors'
                }
              >
                <span>GitHub</span>
                <ExternalLink className= 'shrink-0 size-3.5' />
              </a>

              <Link
                to= { `/pkg/${ pkg.id }/playground` }
                className= {
                  'inline-flex items-center gap-2 px-3.5 py-1.5 text-[13px] font-medium ' +
                  'text-white bg-teal-600 rounded-sm hover:bg-teal-700 transition-colors'
                }
              >
                <Terminal className= 'shrink-0 size-3.5' />
                <span>Try It</span>
              </Link>
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
