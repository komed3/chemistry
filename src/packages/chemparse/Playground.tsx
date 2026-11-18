import { Tabs } from '@/src/components/Tabs';
import type { ChemParseResult } from 'chemparse';
import { ELEMENT_SYMBOLS, PARTICLE_SYMBOLS, parse } from 'chemparse';
import { AlertCircle, Check } from 'lucide-react';
import { useMemo, useState } from 'react';


const TABS = {
  parse: 'parse()', validate: 'validate()', compare: 'compare()',
  diff: 'diff()', symbols: 'Symbols (118 + 8)'
} as const;

const SINGLE_PRESETS = [
  'CuSO4·5H2O', 'K4[Fe(CN)6]', '2SO4^2-', 'Al2(S,O4)3', 'H2e-1O1e-1',
  'SO4²⁻', '3α', 'ν̄',
] as const;

const INPUT =
  'block w-full px-3.5 py-2.5 text-base font-mono text-slate-900 bg-white border ' +
  'border-slate-300 rounded focus:outline-none focus:border-teal-600';


function Parse ( { mode }: { mode: 'parse' | 'validate' } ) {
  const [ formula, setFormula ] = useState( 'CuSO4·5H2O' );

  const { data, valid, error } = useMemo< { data?: ChemParseResult; valid: boolean; error?: string } >( () => {
    try { return { data: parse( formula ), valid: true } }
    catch ( err ) { return { valid: false, error: err instanceof Error ? err.message : String( err ) } }
  }, [ formula, mode ] );


  return (
    <>
      <div className= 'space-y-3'>
        <label htmlFor= 'chemparse-input' className= 'block text-xs font-medium text-slate-700'>
          Chemical Formula or Particle Expression
        </label>

        <input
          id= 'chemparse-input'
          type= 'text'
          value= { formula }
          onChange= { e => setFormula( e.target.value ) }
          placeholder= 'e.g. CuSO4·5H2O, K4[Fe(CN)6], SO4^2-, 3α'
          className= { INPUT }
        />

        <div className= 'flex flex-wrap items-center gap-1.5'>
          <span className= 'mr-2 text-xs text-slate-500'>Examples:</span>

          { SINGLE_PRESETS.map( preset => (
            <button
              key={ preset }
              type= 'button'
              onClick= { () => setFormula( preset ) }
              className= {
                'px-2 py-1 text-xs font-mono bg-white border rounded transition-colors ' +
                ( formula === preset ? 'border-slate-900' : 'text-slate-600 border-slate-200' )
              }
            >
              { preset }
            </button>
          ) ) }
        </div>
      </div>

      { mode === 'validate' ? (
        <div
          className= {
            'flex items-center gap-3 p-4 text-sm bg-white border border-slate-200 rounded ' +
            ( valid ? 'text-teal-800' : 'text-rose-800' )
          }
        >
          { valid ? <Check className= 'shrink-0 size-4' /> : <AlertCircle className= 'shrink-0 size-4' /> }
          <code className= 'font-mono font-medium'>validate()</code>
          <span>returned</span>
          <strong className= 'font-mono'>{ String( valid ) }</strong>
        </div>
      ) : error ? (
        <div className= 'flex items-start gap-3 p-4 text-sm text-rose-800 bg-white border border-slate-200 rounded'>
          <AlertCircle className= 'shrink-0 size-4 text-rose-800' />

          <div className= 'leading-none'>
            <p className= 'font-medium'>Parse Error</p>
            <p className= 'mt-1 text-xs font-mono text-rose-800'>{ error }</p>
          </div>
        </div>
      ) : data && (
        <>
          <div className= 'grid grid-cols-3 gap-4'>
            { [
              [ 'Elements', Object.keys( data.elementCounts ).length ],
              [ 'Particles', Object.keys( data.particleCounts ?? {} ).length ],
              [ 'Total Charge', ( '+' + ( data.charge ?? 0 ) ).replace( '+-', '-' ) ]
            ].map( ( [ label, value ] ) => (
              <div key= { label } className= 'py-3 px-4 bg-white border border-slate-200 rounded'>
                <div className= 'mb-1.5 text-xs text-slate-500'>
                  { label }
                </div>

                <div className= 'text-2xl font-semibold font-mono tabular-nums'>
                  { value }
                </div>
              </div>
            ) ) }
          </div>
        </>
      ) }
    </>
  );
}


function Symbols () {
  return (
    <>
      <div className= 'space-y-3'>
        <h2 className= 'text-sm font-semibold'>
          Supported Particle Symbols ({ PARTICLE_SYMBOLS.length })
        </h2>

        <div className= 'flex flex-wrap gap-2'>
          { PARTICLE_SYMBOLS.map( symbol => (
            <div
              key= { symbol }
              className= 'px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded'
            >
              { symbol }
            </div>
          ) ) }
        </div>
      </div>

      <div className= 'space-y-3'>
        <h2 className= 'text-sm font-semibold'>
          Supported IUPAC Elements ({ ELEMENT_SYMBOLS.length })
        </h2>

        <div className= 'flex flex-wrap gap-2'>
          { ELEMENT_SYMBOLS.map( ( el, i ) => (
            <div
              key= { el }
              className= 'w-18 px-2 pt-1.5 pb-1 bg-white border border-slate-200 rounded'
            >
              <div className= 'text-[11px] font-mono tabular-nums text-slate-400'>{ i + 1 }</div>
              <div className= 'text-right font-mono font-medium'>{ el }</div>
            </div>
          ) ) }
        </div>
      </div>
    </>
  );
}


export function Playground () {
  const [ tab, setTab ] = useState< keyof typeof TABS >( 'parse' );


  return (
    <div className= 'space-y-8'>
      <Tabs { ...{ tabs: TABS, tab, setTab } } />

      { ( tab === 'parse' || tab === 'validate' ) && <Parse mode= { tab } /> }
      { tab === 'symbols' && <Symbols /> }
    </div>
  );
}
