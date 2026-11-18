import { Tabs } from '@/src/components/Tabs';
import { ELEMENT_SYMBOLS, PARTICLE_SYMBOLS } from 'chemparse';
import { useState } from 'react';


const TABS = {
  parse: 'parse()', validate: 'validate()', compare: 'compare()',
  diff: 'diff()', symbols: 'Symbols (118 + 8)'
} as const;


const INPUT =
  'block w-full px-3.5 py-2.5 text-base font-mono text-slate-900 bg-white border ' +
  'border-slate-300 rounded-sm focus:outline-none focus:border-teal-600';


function Parse () {
  const [ formula, setFormula ] = useState( 'CuSO4·5H2O' );

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
          onChange={ e => setFormula( e.target.value ) }
          placeholder= 'e.g. CuSO4·5H2O, K4[Fe(CN)6], SO4^2-, 3α'
          className= { INPUT }
        />
      </div>
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
              className= 'px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-sm'
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
              className= 'w-18 px-2 pt-1.5 pb-1 bg-white border border-slate-200 rounded-sm'
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

      { ( tab === 'parse' || tab === 'validate' ) && <Parse /> }
      { tab === 'symbols' && <Symbols /> }
    </div>
  );
}
