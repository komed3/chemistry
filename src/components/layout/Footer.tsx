import { PACKAGES } from '@/src/packages/registry';


export function Footer () {
  return (
    <footer className= 'mt-16 bg-white border-t border-slate-200'>
      <div className= 'flex justify-between items-center gap-12 mx-auto max-w-7xl p-6 text-xs text-slate-500'>
        <p>&copy; 2025–2026 Paul Köhler (komed3) — MIT License</p>
      </div>

      <nav className= 'flex flex-wrap items-center gap-5'>
        { PACKAGES.map( ( {} ) => (
          <></>
        ) ) }
      </nav>
    </footer>
  );
}
