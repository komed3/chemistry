interface OptionGroupProps< T extends string > {
  label: string;
  options: Record< T, string >;
  value: T;
  setValue: ( value: T ) => void;
}


export function OptionGroup < T extends string > ( { label, options, value, setValue }: OptionGroupProps< T > ) {
  return (
    <div className= 'space-y-2'>
      <span className= 'block text-xs font-medium text-slate-700'>{ label }</span>

      <div className= 'flex w-full gap-1 p-1 bg-slate-100 border border-slate-200 rounded'>
        { Object.entries( options ).map( ( [ option, name ] ) => (
          <button
            key= { option }
            type= 'button'
            onClick= { () => setValue( option as T ) }
            aria-pressed= { value === option }
            className= {
              'flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ' +
              ( value === option
                ? 'text-slate-900 bg-white border border-slate-200'
                : 'text-slate-600 border border-transparent hover:text-slate-900'
              )
            }
          >
            { name as string }
          </button>
        ) ) }
      </div>
    </div>
  );
}
