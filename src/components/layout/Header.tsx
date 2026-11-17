import flask from '@/src/assets/flask.png';
import { PACKAGES } from '@/src/packages/registry';
import { NavLink } from 'react-router';


const BTN = ( isActive: boolean ) =>
  'shrink-0 p-0.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ' +
  ( isActive ? 'border-teal-600' : 'text-slate-600 hover:text-slate-900 border-transparent' )


export function Header () {
  return (
    <header className= 'sticky top-0 z-30 bg-white/95 border-b border-slate-200 backdrop-blur-sm select-none'>
      <div className= 'relative mx-auto max-w-7xl h-14'>
        <div className= 'absolute top-1/2 left-6 -translate-y-1/2 flex items-center gap-4'>
          <img
            src= { flask }
            loading= 'lazy'
            alt= 'Chemistry Tools by komed3'
            className= 'shrink-0 size-9'
          />

          <span className= 'shrink-0 font-semibold whitespace-nowrap'>
            Chemistry Tools
          </span>
        </div>

        <nav className= 'absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-6'>
          <NavLink to= '/' className= { ( { isActive } ) => BTN( isActive ) }>
            Overview
          </NavLink>

          { PACKAGES.map( ( { id, name } ) => (
            <NavLink
              key= { id } to= { `/pkg/${ id }` }
              className= { ( { isActive } ) => BTN( isActive ) }
            >
              { name }
            </NavLink>
          ) ) }
        </nav>

        <div className= 'absolute top-1/2 right-6 -translate-y-1/2'>
          <a
            href= 'https://ko-fi.com/komed3'
            target= '_blank'
            rel= 'noopener noreferrer'
            className= {
              'px-4 py-1.5 uppercase text-sm font-semibold text-white bg-teal-600 ' +
              'rounded transition-colors hover:bg-teal-700'
            }
          >
            <span>Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
