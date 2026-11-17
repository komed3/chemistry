export function Header () {
  return (
    <header className= 'sticky top-0 z-30 bg-white/95 border-b border-slate-200 backdrop-blur-sm'>
      <div className= 'relative mx-auto max-w-7xl h-14'>
        <div className= 'absolute top-1/2 left-6 -translate-y-1/2'>
          <h1 className= 'shrink-0 text-base whitespace-nowrap'>
            <strong className= 'font-black text-teal-800'>chemistry</strong> by komed3
          </h1>
        </div>
      </div>
    </header>
  );
}
