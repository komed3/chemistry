import { ErrorMessage } from '@/src/components/ui/ErrorMessage';
import { FormulaInput } from '@/src/components/ui/FormulaInput';
import { JsonDump } from '@/src/components/ui/JsonDump';
import { ResultGrid } from '@/src/components/ui/ResultGrid';
import { ResultTable } from '@/src/components/ui/ResultTable';
import { Tabs } from '@/src/components/ui/Tabs';
import { Validation } from '@/src/components/ui/Validation';
import { formatCharge } from '@/src/lib/formatter';
import type { ChemParseResult } from 'chemparse';
import { ELEMENT_SYMBOLS, PARTICLE_SYMBOLS, compareMany, diffMany, parse } from 'chemparse';
import { useEffect, useMemo, useState } from 'react';


interface SingleResult {
  data?: ChemParseResult;
  valid: boolean;
  error?: string;
}

interface MultiResult {
  equal?: boolean;
  diffs?: ( ChemParseResult & { formula: string } )[];
  error?: string;
}


const TABS = {
  parse: 'parse()', validate: 'validate()', compare: 'compare()',
  diff: 'diff()', symbols: 'Symbols (118 + 8)'
} as const;

const SINGLE_PRESETS = [
  'CuSO4·5H2O', 'K4[Fe(CN)6]', '2SO4^2-', 'Al2(S,O4)3',
  'H2e-1O1e-1', 'SO4²⁻', '3α', 'ν̄'
] as const;

const MULTI_PRESETS = {
  compare: [
    { label: 'H2O vs OH2', values: [ 'H2O', 'OH2' ] },
    { label: 'Ca(OH)2 = CaO2H2', values: [ 'Ca(OH)2', 'CaO2H2', 'H2CaO2' ] },
    { label: 'NH4^+ vs NH4^-', values: [ 'NH4^+', 'NH4^-' ] }
  ],
  diff: [
    { label: 'C6H12O6 - C1.5O3', values: [ 'C6H12O6', 'C1.5O3' ] },
    { label: 'H2O - H2, O2', values: [ 'H2O', 'H2', 'O2' ] },
    { label: '3α - α', values: [ '3α', 'α' ] }
  ]
} as const;


function Single ( { mode }: { mode: 'parse' | 'validate' } ) {
  const [ formula, setFormula ] = useState< string >( SINGLE_PRESETS[ 0 ] );

  const { data, valid, error } = useMemo< SingleResult >( () => {
    try { return { data: parse( formula ), valid: true } }
    catch ( err ) { return { valid: false, error: err instanceof Error ? err.message : String( err ) } }
  }, [ formula ] );


  return (
    <>
      <FormulaInput
        mode= 'single'
        value= { formula }
        setValue= { setFormula }
        presets= { SINGLE_PRESETS }
        label= 'Chemical Formula or Particle Expression'
        placeholder= 'e.g. CuSO4·5H2O, K4[Fe(CN)6], SO4^2-, 3α'
      />

      { mode === 'validate' ? (
        <Validation valid= { valid } methodName= 'validate()' />
      ) : error ? (
        <ErrorMessage error= { error } label= 'Parse Error' />
      ) : data && (
        <>
          <ResultGrid data= { [
            [ 'Elements', Object.keys( data.elementCounts ).length ],
            [ 'Atoms', Object.values( data.elementCounts ).reduce( ( sum, v ) => sum + v, 0 ).toFixed( 0 ) ],
            [ 'Particles', Object.keys( data.particleCounts ?? {} ).length ],
            [ 'Total Charge', formatCharge( data.charge ) ]
          ] } />

          { Object.keys( data.elementCounts ).length > 0 && (
            <ResultTable
              label= 'Element Counts'
              header= { [ 'Element', 'Count' ] }
              data= { data.elementCounts }
            />
          ) }

          { Object.keys( data.particleCounts ?? {} ).length > 0 && (
            <ResultTable
              label= 'Particle Counts'
              header= { [ 'Particle', 'Count' ] }
              data= { data.particleCounts ?? {} }
            />
          ) }

          <JsonDump data= { data } />
        </>
      ) }
    </>
  );
}


function Multi ( { mode }: { mode: 'compare' | 'diff' } ) {
  const [ formulas, setFormulas ] = useState< string[] >( [] );
  useEffect( () => setFormulas( mode === 'diff' ? [ 'C6H12O6', 'C1.5O3' ] : [ 'H2O', 'OH2' ] ), [ mode ] );

  const { equal, diffs, error } = useMemo< MultiResult >( () => {
    try { return mode === 'diff' ? { diffs: diffMany( ...formulas ) } : { equal: compareMany( ...formulas ) } }
    catch ( err ) { return { error: err instanceof Error ? err.message : String( err ) } }
  }, [ formulas, mode ] );


  return (
    <>
      <FormulaInput
        mode= 'multi'
        values= { formulas }
        setValues= { setFormulas }
        presets= { MULTI_PRESETS[ mode ] }
        label= { mode === 'diff' ? 'Base formula (first) minus subsequent formulas' : 'Formulas to compare' }
        baseFirst= { mode === 'diff' }
      />

      { error ? (
        <ErrorMessage error= { error } label= 'Parse Error' />
      ) : mode === 'compare' ? (
        <Validation
          valid= { equal ?? false }
          methodName= { formulas.length > 2 ? 'compareMany()' : 'compare()' }
        />
      ) : diffs && (
        <JsonDump data= { diffs } />
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

      { ( tab === 'parse' || tab === 'validate' ) && <Single mode= { tab } /> }
      { ( tab === 'compare' || tab === 'diff' ) && <Multi mode= { tab } /> }
      { tab === 'symbols' && <Symbols /> }
    </div>
  );
}
