import { PACKAGES } from '@/src/packages/registry';
import { Link } from 'react-router';


export function Home () {
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
          { PACKAGES.map( ( { id, icon: Icon } ) => (
            <div
              key= { id }
              className= 'flex flex-col justify-between gap-6 p-6 bg-white border border-slate-200 rounded-sm'
            >
              ...
            </div>
          ) ) }
        </div>
      </section>
    </div>
  );
}
