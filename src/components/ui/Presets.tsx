type PresetsProps< T extends string, M extends 'single' | 'multi' = 'single' > = {
  mode?: 'single' | 'multi';
  label?: T;
} & ( M extends 'multi' ? {
  presets: Array< { label: string, values: T[] } >;
  active: T[];
  setActive: ( value: T[] ) => void;
} : {
  presets: T[] | Array< { label: string, value: T } >;
  active: T;
  setActive: ( value: T ) => void;
} );


export function Presets < T extends string, M extends 'single' | 'multi' = 'single' > ( {
  mode = 'single', label, presets, active, setActive
}: PresetsProps< T > ) {
  const test = JSON.stringify( active );
  const options = [];


  return (
    <div className= 'flex flex-wrap items-center gap-1.5'>
      { label && <span className= 'mr-2 text-xs text-slate-500'>{ label }</span> }

      { options.map( ( { label, value } ) => (
        <button
          key= { label }
          type= 'button'
          onClick= { () => setActive( value ) }
          className= {
            'px-2 py-1 text-xs font-mono bg-white border rounded transition-colors ' +
            ( JSON.stringify( value ) === test ? 'border-slate-900' : 'text-slate-600 border-slate-200' )
          }
        >
          { label }
        </button>
      ) ) }
    </div>
  );
}
