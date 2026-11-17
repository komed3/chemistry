export function Home () {
  return (
    <div className= 'space-y-12'>
      <section className= 'pb-10 space-y-4 border-b border-slate-200'>
        <p className= 'text-xs font-medium tracking-wide text-teal-700'>
          TypeScript Chemistry Libraries
        </p>

        <h1 className= 'max-w-2xl text-4xl font-semibold tracking-tight text-balance text-slate-900'>
          Lightweight formula parsing and stoichiometric balancing.
        </h1>

        <p className= 'max-w-2xl text-base leading-relaxed text-slate-600'>
          Open-source npm packages by komed3 for parsing chemical formulas, comparing compositions,
          and balancing reaction equations with exact rational arithmetic.
        </p>
      </section>
    </div>
  );
}
