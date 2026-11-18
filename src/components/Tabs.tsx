interface TabsProps {
  tabs: Record< string, string >;
  tab: string;
  setTab: ( tab: string ) => void;
}


export function Tabs ( { tabs, tab, setTab }: TabsProps ) {
  return (
    <div className= 'flex flex-wrap items-center gap-4 px-4 border-b border-slate-200'>
      { Object.entries( tabs ).map( ( [ t, label ] ) => (
        <button
          key= { t }
          type= 'button'
          onClick= { () => setTab( t ) }
          className= {
            '-mb-px px-1 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ' +
            ( tab === t ? 'text-teal-700 border-teal-600' : 'text-slate-600 hover:text-slate-900' )
          }
        >
          { label }
        </button>
      ) ) }
    </div>
  );
}
