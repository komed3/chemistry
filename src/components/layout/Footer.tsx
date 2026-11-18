import { PACKAGES } from '@/src/packages/registry';
import { ExternalLink } from 'lucide-react';


export function Footer () {
  return (
    <footer className= 'mt-16 bg-white border-t border-slate-200 select-none'>
      <div className= 'flex justify-between items-center gap-12 mx-auto max-w-7xl p-6 text-xs text-slate-500'>
        <p>&copy; 2025–2026 Paul Köhler (komed3) — MIT License</p>

        <nav className= 'flex flex-wrap items-center gap-5'>
          { PACKAGES.map( ( { id, githubUrl, npmName } ) => (
            <a
              key= { id }
              href= { githubUrl }
              target= '_blank'
              rel= 'noopener noreferrer'
              className= 'inline-flex items-center gap-1 transition-colors hover:text-slate-900'
            >
              <span>{ npmName }</span>
              <ExternalLink className= 'shrink-0 size-3' />
            </a>
          ) ) }
        </nav>
      </div>
    </footer>
  );
}
