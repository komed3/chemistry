interface TabsProps< T extends string > {
  tabs: Record< T, string >;
  tab: T;
  setTab: ( tab: T ) => void;
}


export function Tabs < T extends string > ( { tabs, tab, setTab }: TabsProps< T > ) {
  return (
    <div className= 'flex flex-wrap items-center gap-4 border-b border-slate-200'>
      { Object.entries( tabs ).map( ( [ t, label ] ) => (
        <button
          key= { t }
          type= 'button'
          onClick= { () => setTab( t as T ) }
          className= {
            '-mb-px px-1 py-2 text-xs font-semibold whitespace-nowrap ' +
            'border-b-2 transition-colors ' + ( tab === t
              ? 'text-teal-700 border-teal-600'
              : 'text-slate-500 border-transparent hover:text-slate-900'
            )
          }
        >
          { label as string }
        </button>
      ) ) }
    </div>
  );
}
