import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { ExternalLink, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router';
import remarkGfm from 'remark-gfm';


export function Package () {
  const { id } = useParams();

  const pkg = getPackageById( id );
  if ( ! pkg ) return <NotFound />;

  const Icon = pkg.icon;

  return (
    <div className= 'flex items-start gap-12'>
      <aside className= 'shrink-0 w-80'>
        <div className= 'bg-white border border-slate-200 px-4 py-2'>
          <table className= 'w-full'>
            <tbody className= 'divide-y divide-dashed divide-slate-200'>
              { [
                [ 'Version', `v${ pkg.version }` ], [ 'Install', pkg.installCmd ],
                [ 'Year', pkg.year ], [ 'License', pkg.license ]
              ].map( ( [ label, value ] ) => (
                <tr key= { label } className= 'text-[13px] *:px-3 *:py-2.5'>
                  <td>{ label }</td>
                  <td className= 'text-right font-mono tabular-nums'>{ value }</td>
                </tr>
              ) ) }
            </tbody>
          </table>
        </div>
      </aside>

      <div className= 'flex-1 space-y-8'>
        <div className= 'pb-8 space-y-4 border-b border-slate-200'>
          <div className= 'flex justify-between items-start gap-4'>
            <h1 className= 'flex items-center gap-3 text-3xl font-semibold tracking-tight'>
              <Icon className= 'shrink-0 size-8 text-teal-600' />
              <span>{ pkg.name }</span>
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

        <div className= 'readme min-w-0 hyphens-auto md:hyphens-none' lang= 'en'>
          <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
            { pkg.readme }
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
