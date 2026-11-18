import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router';


export function Playground () {
  const { id } = useParams();

  const pkg = getPackageById( id );
  if ( ! pkg || ! pkg.playground ) return <NotFound />;

  const Icon = pkg.icon;
  const playground = pkg.playground();

  return (
    <div className= 'space-y-8'>
      <div className= 'pb-8 space-y-4 border-b border-slate-200'>
        <div className= 'flex justify-between items-start gap-4'>
          <h1 className= 'flex items-center gap-3 text-3xl font-semibold tracking-tight'>
            <Icon className= 'shrink-0 size-8 text-teal-600' />
            <span>{ pkg.name }</span>
            <span className= 'font-light text-slate-600'>Playground</span>
          </h1>

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
              to= { `/pkg/${ pkg.id }` }
              className= {
                'inline-flex items-center gap-2 px-3.5 py-1.5 text-[13px] font-medium ' +
                'text-white bg-teal-600 rounded-sm hover:bg-teal-700 transition-colors'
              }
            >
              <BookOpen className= 'shrink-0 size-4' />
              <span>Docs</span>
            </Link>
          </div>
        </div>

        <p className= 'text-lg leading-relaxed text-slate-600'>
          { pkg.tagline }
        </p>
      </div>

      { playground }
    </div>
  );
}
