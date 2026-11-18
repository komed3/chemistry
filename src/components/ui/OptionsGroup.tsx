export function OptionGroup < T extends string > ( {
  label, options, value, setValue, format
}: {
  label: string;
  options: readonly T[];
  value: T;
  setValue: ( value: T ) => void;
  format?: ( value: T ) => string;
} ) {
  return (
    <div className= 'space-y-2'>
      <span className= 'block text-xs font-medium text-slate-700'>{ label }</span>

      <div className= 'flex w-full gap-1 p-1 bg-slate-100 border border-slate-200 rounded'>
        { options.map( option => (
          <button
            key= { option }
            type= 'button'
            onClick= { () => setValue( option ) }
            aria-pressed= { value === option }
            className= {
              'flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ' +
              ( value === option
                ? 'text-slate-900 bg-white border border-slate-200'
                : 'text-slate-600 border border-transparent hover:text-slate-900'
              )
            }
          >
            { format ? format( option ) : option }
          </button>
        ) ) }
      </div>
    </div>
  );
}
