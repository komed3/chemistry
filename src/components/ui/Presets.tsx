type PresetOption< T extends string > = { label: string, value: T };
type MultiPresetOption< T extends string > = { label: string, values: readonly T[] };

type PresetsProps< T extends string > = { label?: string } & ( {
  mode?: 'single';
  presets: readonly T[] | readonly PresetOption< T >[];
  active: T;
  setActive: ( value: T ) => void;
} | {
  mode: 'multi';
  presets: readonly MultiPresetOption< T >[];
  active: readonly T[];
  setActive: ( value: T[] ) => void;
} );


const BTN = ( active: boolean ) =>
  'px-2 py-1 text-xs font-mono bg-white border rounded transition-colors ' +
  ( active ? 'border-slate-900' : 'text-slate-600 border-slate-200' );


export function Presets < T extends string > ( props: PresetsProps< T > ) {
  return (
    <div className= 'flex flex-wrap items-center gap-1.5'>
      { props.label && <span className= 'mr-2 text-xs text-slate-500'>{ props.label }</span> }

      { props.mode === 'multi' ? props.presets.map( ( { label, values } ) => (
        <button
          key= { label }
          type= 'button'
          onClick= { () => props.setActive( [ ...values ] ) }
          className= { BTN( JSON.stringify( values ) === JSON.stringify( props.active ) ) }
        >
          { label }
        </button>
      ) ) : props.presets.map( preset => {
        const value = typeof preset === 'string' ? preset : preset.value;
        const label = typeof preset === 'string' ? preset : preset.label;

        return (
          <button
            key= { label }
            type= 'button'
            onClick= { () => props.setActive( value ) }
            className= { BTN( value === props.active ) }
          >
            { label }
          </button>
        );
      } ) }
    </div>
  );
}
