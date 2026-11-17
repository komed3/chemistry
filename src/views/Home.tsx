import { PACKAGES } from '@/src/packages/registry';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';


export function Home () {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyInstall = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className= 'space-y-12'>
      <section className= 'pb-10 space-y-6 border-b border-slate-200'>
        <p className= 'text-sm font-medium tracking-wide text-teal-700'>
          TypeScript Chemistry Libraries
        </p>

        <h1 className= 'max-w-2xl text-5xl font-semibold tracking-tight text-balance text-slate-900'>
          Lightweight modules for chemical operations.
        </h1>

        <p className= 'max-w-2xl text-lg leading-relaxed text-slate-600'>
          Open-source npm packages by komed3, supporting ESM and CommonJS projects.
          More about chemical elements, molecules and their properties, visit { ' ' }
          <a href= 'https://pse-info.de' className= 'text-teal-600 hover:underline'>
            pse-info.de
          </a>
          { ' ' } and the { ' ' }
          <a href= 'https://github.com/pseinfo' className= 'text-teal-600 hover:underline'>
            @pseinfo GitHub organization
          </a>.
        </p>

        <div className= 'flex flex-wrap items-center gap-3 pt-2'>
          { PACKAGES.slice( 0, 3 ).map( ( { id, name, icon: Icon } ) => (
            <Link
              key= { id }
              to= { `/pkg/${ id }` }
              className= {
                'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-teal-600 ' +
                'rounded-sm transition-colors hover:bg-teal-700'
              }
            >
              <Icon className= 'shrink-0 size-4' />
              <span>{ name }</span>
            </Link>
          ) ) }
        </div>
      </section>

      <section className= 'space-y-6'>
        <div className= 'flex justify-between items-baseline'>
          <h2 className= 'text-lg font-semibold text-slate-900'>
            Packages
          </h2>

          <span className= 'text-xs text-slate-500 font-mono tabular-nums'>
            { PACKAGES.length } Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          { PACKAGES.map( ( { id, name, tagline, icon: Icon, version, license, highlights, installCmd } ) => (
            <div
              key= { id }
              className= 'flex flex-col justify-between gap-6 p-6 bg-white border border-slate-200 rounded-sm'
            >
              <div className= 'space-y-4'>
                <div className= 'flex justify-between items-center gap-4'>
                  <div className= 'flex items-center gap-3'>
                    <Icon className= 'shrink-0 size-6 text-teal-600' />
                    <h3 className= 'text-xl font-semibold text-slate-900'>{ name }</h3>
                  </div>

                  <div className= 'text-xs font-mono tabular-nums whitespace-nowrap text-slate-500'>
                    <span>v{ version }</span>
                    <span className= 'mx-1.5'>—</span>
                    <span>{ license }</span>
                  </div>
                </div>

                <p className= 'text-base leading-relaxed text-slate-600'>{ tagline }</p>

                <ul className= 'space-y-1.5 text-sm text-slate-700'>
                  { highlights.map( item => (
                    <li key= { item } className= 'flex items-start gap-2'>
                      <Check className= 'shrink-0 mt-0.5 size-4 text-teal-600' />
                      <span>{ item }</span>
                    </li>
                  ) ) }
                </ul>
              </div>

              <div className= 'pt-4 space-y-4 border-t border-slate-200'>
                <div
                  className= {
                    'flex justify-between items-center px-3 py-2 text-xs font-mono text-slate-700 ' +
                    'bg-slate-50 border border-slate-200 rounded-sm'
                  }
                >
                  <span>{ installCmd }</span>
                  <button
                    type= 'button'
                    onClick= { () => copyInstall( id, installCmd ) }
                    className= 'inline-flex items-center gap-1 text-slate-500 hover:text-teal-700 transition-colors'
                    aria-label= { `Copy ${ installCmd }` }
                  >
                    { copiedId === id ? (
                      <Check className= 'size-3.5 text-teal-600' />
                    ) : (
                      <Copy className= 'size-3.5' />
                    ) }
                  </button>
                </div>
              </div>
            </div>
          ) ) }
        </div>
      </section>
    </div>
  );
}
