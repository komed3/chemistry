import { prismTheme } from '@/src/lib/prism';
import { getPackageById } from '@/src/packages/registry';
import { NotFound } from '@/src/views/NotFound';
import { Check, CodeXml, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import remarkGfm from 'remark-gfm';


SyntaxHighlighter.registerLanguage( 'javascript', javascript );
SyntaxHighlighter.registerLanguage( 'markup', markup );
SyntaxHighlighter.registerLanguage( 'typescript', typescript );

const languageMap: Record< string, string > = { html: 'markup', js: 'javascript', ts: 'typescript' } as const;


export function Package () {
  const { id } = useParams();

  const pkg = getPackageById( id );
  if ( ! pkg ) return <NotFound />;

  const Icon = pkg.icon;

  return (
    <div className= 'flex flex-col-reverse lg:flex-row items-stretch lg:items-start gap-8 lg:gap-12'>
      <aside className= 'shrink-0 w-full space-y-8 lg:w-80'>
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

        <Link
          to= { `/pkg/${ pkg.id }/playground` }
          className= {
            'flex justify-center items-center gap-3 px-5 py-3 font-medium text-white ' +
            'bg-teal-600 rounded hover:bg-teal-700 transition-colors'
          }
        >
          <CodeXml className= 'shrink-0 size-5' />
          <span>Open Playground</span>
        </Link>

        <ul className= 'px-4 space-y-1.5 text-sm text-slate-700'>
          { pkg.highlights.map( item => (
            <li key= { item } className= 'flex items-start gap-2'>
              <Check className= 'shrink-0 mt-0.5 size-4 text-teal-600' />
              <span>{ item }</span>
            </li>
          ) ) }
        </ul>

        <hr className= 'border-t border-slate-200' />

        <div className= 'space-y-2 text-xs'>
          <a
            href= { pkg.githubUrl }
            target= '_blank'
            rel= 'noreferrer'
            className= {
              'flex justify-between items-center px-2 py-1 text-slate-600 ' +
              'hover:text-slate-900 transition-colors'
            }
          >
            <span>GitHub Repository</span>
            <ExternalLink className= 'shrink-0 size-3.5' />
          </a>

          <a
            href= { pkg.npmUrl }
            target= '_blank'
            rel= 'noreferrer'
            className= {
              'flex justify-between items-center px-2 py-1 text-slate-600 ' +
              'hover:text-slate-900 transition-colors'
            }
          >
            <span>npm Package</span>
            <ExternalLink className= 'shrink-0 size-3.5' />
          </a>

          { pkg.jsDelivrUrl && (
            <a
              href= { pkg.jsDelivrUrl }
              target= '_blank'
              rel= 'noreferrer'
              className= {
                'flex justify-between items-center px-2 py-1 text-slate-600 ' +
                'hover:text-slate-900 transition-colors'
              }
            >
              <span>Browser CDN jsDelivr</span>
              <ExternalLink className= 'shrink-0 size-3.5' />
            </a>
          ) }
        </div>
      </aside>

      <div className= 'flex-1 min-w-0 space-y-8'>
        <div className= 'pb-8 space-y-4 border-b border-slate-200'>
          <div className= 'flex flex-col sm:flex-row sm:justify-between items-start sm:items-start gap-4'>
            <h1 className= 'flex items-center gap-3 text-2xl sm:text-3xl font-semibold tracking-tight'>
              <Icon className= 'shrink-0 size-8 text-teal-600' />
              <span>{ pkg.name }</span>
            </h1>

            <div className= 'flex flex-wrap items-center gap-3'>
              <a
                href= { pkg.githubUrl }
                target= '_blank'
                rel= 'noreferrer'
                className= {
                  'inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium ' +
                  'text-slate-700 bg-white border border-slate-300 rounded ' +
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
                  'text-white bg-teal-600 rounded hover:bg-teal-700 transition-colors'
                }
              >
                <CodeXml className= 'shrink-0 size-4' />
                <span>Try It</span>
              </Link>
            </div>
          </div>

          <p className= 'text-lg leading-relaxed text-slate-600'>
            { pkg.tagline }
          </p>
        </div>

        <div className= 'readme min-w-0 hyphens-auto md:hyphens-none' lang= 'en'>
          <ReactMarkdown
            remarkPlugins= { [ remarkGfm ] }
            components= { {
              table ( { children } ) {
                return (
                  <div className= 'min-w-0 max-w-full overflow-x-auto'>
                    <table>{ children }</table>
                  </div>
                );
              },

              code ( { className, children, ...props } ) {
                const lng = className?.match( /language-(\w+)/ )?.[ 1 ]?.toLowerCase();
                const highlighterLng = lng ? languageMap[ lng ] : undefined;

                return highlighterLng ? (
                  <SyntaxHighlighter
                    language= { highlighterLng }
                    style= { prismTheme }
                    PreTag= 'div'
                    customStyle= { { margin: 0, padding: 0, maxWidth: '100%', overflowX: 'auto' } }
                  >
                    { String( children ).replace( /\n$/, '' ) }
                  </SyntaxHighlighter>
                ) : (
                  <code className= { className } { ...props }>{ children }</code>
                );
              }
            } }
          >
            { pkg.readme }
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
