import { Presets } from '@/src/components/ui/Presets';
import { Plus, Trash2 } from 'lucide-react';


type MultiFormulaPreset = { label: string, values: readonly string[] };

type FormulaInputProps = {
  mode: 'single';
  value: string;
  setValue: ( value: string ) => void;
  presets: readonly string[] | readonly { label: string, value: string }[];
  label: string;
  placeholder: string;
} | {
  mode: 'multi';
  values: string[];
  setValues: ( values: string[] ) => void;
  presets: readonly MultiFormulaPreset[];
  label: string;
  baseFirst?: boolean;
};


const INPUT =
  'block min-w-0 w-full px-3.5 py-2 text-base font-mono text-slate-900 bg-white border ' +
  'border-slate-200 rounded focus:outline-none focus:border-teal-600';


export function FormulaInput ( props: FormulaInputProps ) {
  if ( props.mode === 'single' ) {
    return (
      <div className= 'space-y-3'>
        <label htmlFor= 'chemparse-input' className= 'block text-xs font-medium text-slate-700'>
          { props.label }
        </label>

        <input
          id= 'chemparse-input'
          type= 'text'
          value= { props.value }
          onChange= { e => props.setValue( e.target.value ) }
          placeholder= { props.placeholder }
          className= { INPUT }
        />

        <Presets
          presets= { props.presets }
          active= { props.value }
          setActive= { props.setValue }
          label= 'Examples:'
        />
      </div>
    );
  }

  return (
    <div className= 'space-y-3'>
      <div className= 'flex flex-wrap justify-between items-center gap-2'>
        <span className= 'text-xs font-medium text-slate-700'>{ props.label }</span>

        <Presets
          mode= 'multi'
          presets= { props.presets }
          active= { props.values }
          setActive= { props.setValues }
        />
      </div>

      <div className= 'space-y-2'>
        { props.values.map( ( value, idx ) => (
          <div key= { idx } className= 'flex items-center gap-2'>
            <span className= 'shrink-0 w-16 text-xs font-mono text-slate-500'>
              { props.baseFirst && idx === 0 ? 'base' : `#${ idx + 1 }` }
            </span>

            <input
              type= 'text'
              value= { value }
              onChange= { e => {
                const next = [ ...props.values ];
                next[ idx ] = e.target.value;
                props.setValues( next );
              } }
              className= { INPUT }
            />

            { props.values.length > 2 && (
              <button
                type= 'button'
                onClick= { () => props.setValues( props.values.filter( ( _, i ) => i !== idx ) ) }
                aria-label= 'Remove formula'
                className= {
                  'p-3 text-slate-500 bg-white border border-slate-200 ' +
                  'rounded transition-colors hover:text-rose-600'
                }
              >
                <Trash2 className= 'size-4' />
              </button>
            ) }
          </div>
        ) ) }
      </div>

      <div className= 'text-right'>
        <button
          type= 'button'
          onClick= { () => props.setValues( [ ...props.values, '' ] ) }
          className= {
            'inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-white ' +
            'border border-slate-200 rounded transition-colors hover:text-slate-900'
          }
        >
          <Plus className= 'shrink-0 size-3.5' />
          <span>Add formula</span>
        </button>
      </div>
    </div>
  );
}
