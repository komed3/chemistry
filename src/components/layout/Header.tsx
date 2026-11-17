import { PACKAGES } from '@/src/packages/registry';
import { NavLink } from 'react-router';


const BTN = ( isActive: boolean ) =>
  'shrink-0 p-0.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ' +
  ( isActive ? 'border-teal-600' : 'text-slate-600 hover:text-slate-900 border-transparent' )


export function Header () {
  return (
    <header className= 'sticky top-0 z-30 bg-white/95 border-b border-slate-200 backdrop-blur-sm'>
      <div className= 'relative mx-auto max-w-7xl h-14'>
        <div className= 'absolute top-1/2 left-6 -translate-y-1/2 text-base whitespace-nowrap'>
          <strong className= 'font-black'>chemistry</strong> by komed3
        </div>

        <nav className= 'absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-6'>
          <NavLink to= '/' className= { ( { isActive } ) => BTN( isActive ) }>
            Overview
          </NavLink>

          { PACKAGES.map( ( { id, name } ) => (
            <NavLink key= { id } to= { `/pkg/${ id }` } className= { ( { isActive } ) => BTN( isActive ) }>
              { name }
            </NavLink>
          ) ) }
        </nav>
      </div>
    </header>
  );
}
