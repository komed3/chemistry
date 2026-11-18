import { ErrorMessage } from '@/src/components/ui/ErrorMessage';
import { FormulaInput } from '@/src/components/ui/FormulaInput';
import { JsonDump } from '@/src/components/ui/JsonDump';
import { OptionGroup } from '@/src/components/ui/OptionGroup';
import { ResultGrid } from '@/src/components/ui/ResultGrid';
import { ResultTable } from '@/src/components/ui/ResultTable';
import { Tabs } from '@/src/components/ui/Tabs';
import { Validation } from '@/src/components/ui/Validation';
import type { BalanceResult, ChemicalEquation } from 'chembalance';
import { balance, isBalanced, parse, validate } from 'chembalance';
import { useMemo, useState } from 'react';


interface Result< T > {
  data?: T;
  error?: string;
}


const TABS = {
  balance: 'balance()', isBalanced: 'isBalanced()',
  validate: 'validate()', parse: 'parse()'
} as const;

const REDOX_MEDIA = { none: 'None', acidic: 'Acidic', basic: 'Basic' } as const;
const SEARCH_PROFILE = { fast: 'Fast', balanced: 'Balanced', thorough: 'Thorough' } as const;

const PRESETS = [
  'H2 + O2 -> H2O', 'Fe + O2 -> Fe2O3', 'CH4 + O2 -> CO2 + H2O',
  'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+', 'MnO4^- + SO3^2- -> MnO2 + SO4^2-'
] as const;

const PRESET_REDOX_MEDIA: Record< string, 'acidic' | 'basic' > = {
  'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+': 'acidic',
  'MnO4^- + SO3^2- -> MnO2 + SO4^2-': 'basic'
};


function Balance () {
  const [ equation, setEquation ] = useState< string >( PRESETS[ 0 ] );
  const [ medium, setMedium ] = useState< keyof typeof REDOX_MEDIA >( 'none' );
  const [ search, setSearch ] = useState< keyof typeof SEARCH_PROFILE >( 'balanced' );

  const updateEquation = ( value: string ) => {
    setEquation( value ), setMedium( PRESET_REDOX_MEDIA[ value ] ?? 'none' );
  };

  const { data, error } = useMemo< Result< BalanceResult > >( () => {
    try { return { data: balance( equation, medium === 'none' ? { search } : { medium, search } ) } }
    catch ( err ) { return { error: err instanceof Error ? err.message : String( err ) } }
  }, [ equation, medium, search ] );


  return (
    <>
      <FormulaInput
        mode= 'single'
        value= { equation }
        setValue= { updateEquation }
        presets= { PRESETS }
        label= 'Chemical Reaction Equation'
        placeholder= 'e.g. H2 + O2 -> H2O'
      />

      <div className= 'grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <OptionGroup
          label= 'Reaction Medium'
          options= { REDOX_MEDIA }
          value= { medium }
          setValue= { setMedium }
        />

        <OptionGroup
          label= 'Search Profile'
          options= { SEARCH_PROFILE }
          value= { search }
          setValue= { setSearch }
        />
      </div>

      { error ? (
        <ErrorMessage error= { error } label= 'Balance Error' />
      ) : data && (
        <>
          <div className= 'p-4 bg-white border border-slate-200 rounded space-y-3'>
            <div className= 'text-xs font-medium text-slate-500'>Balanced Equation</div>
            <div className= 'text-lg font-mono font-medium text-slate-900 wrap-break-words'>
              { data.equation }
            </div>
          </div>

          <ResultGrid data= { [
            [ 'Reaction Terms', data.coefficients.length ],
            [ 'Coefficient Sum', data.coefficients.reduce( ( sum, value ) => sum + value, 0 ) ]
          ] } />

          <ResultTable
            label= 'Reactants'
            header= { [ 'Formula', 'Coefficient' ] }
            data= { Object.fromEntries( data.reactants.map( ( { formula, coefficient }, i ) => [
              `${ i + 1 }. ${ formula }`, coefficient
            ] ) ) }
          />

          <ResultTable
            label= 'Products'
            header= { [ 'Formula', 'Coefficient' ] }
            data= { Object.fromEntries( data.products.map( ( { formula, coefficient }, i ) => [
              `${ i + 1 }. ${ formula }`, coefficient
            ] ) ) }
          />

          <JsonDump data= { data } />
        </>
      ) }
    </>
  );
}


function CheckEquation ( { mode }: { mode: 'isBalanced' | 'validate' } ) {
  const [ equation, setEquation ] = useState< string >( PRESETS[ 0 ] );

  const { data, error } = useMemo< Result< boolean > >( () => {
    try { return { data: mode === 'validate' ? validate( equation ) : isBalanced( equation ) } }
    catch ( err ) { return { error: err instanceof Error ? err.message : String( err ) } }
  }, [ equation, mode ] );


  return (
    <>
      <FormulaInput
        mode= 'single'
        value= { equation }
        setValue= { setEquation }
        presets= { PRESETS }
        label= 'Chemical Reaction Equation'
        placeholder= 'e.g. H2 + O2 -> H2O'
      />

      { error ? (
        <ErrorMessage error= { error } label= 'Equation Error' />
      ) : data !== undefined && (
        <Validation valid= { data } methodName= { `${ mode }()` } />
      ) }
    </>
  );
}


function Parse () {
  const [ equation, setEquation ] = useState< string >( PRESETS[ 0 ] );

  const { data, error } = useMemo< Result< ChemicalEquation > >( () => {
    try { return { data: parse( equation ) } }
    catch ( err ) { return { error: err instanceof Error ? err.message : String( err ) } }
  }, [ equation ] );


  return (
    <>
      <FormulaInput
        mode= 'single'
        value= { equation }
        setValue= { setEquation }
        presets= { PRESETS }
        label= 'Chemical Reaction Equation'
        placeholder= 'e.g. H2 + O2 -> H2O'
      />

      { error ? (
        <ErrorMessage error= { error } label= 'Equation Error' />
      ) : data && (
        <>
          <ResultGrid data= { [
            [ 'Reactants', data.reactants.length ],
            [ 'Products', data.products.length ]
          ] } />

          <JsonDump data= { data } />
        </>
      ) }
    </>
  );
}


export function Playground () {
  const [ tab, setTab ] = useState< keyof typeof TABS >( 'balance' );


  return (
    <div className= 'space-y-8'>
      <Tabs { ...{ tabs: TABS, tab, setTab } } />

      { tab === 'balance' && <Balance /> }
      { ( tab === 'isBalanced' || tab === 'validate' ) && <CheckEquation mode= { tab } /> }
      { tab === 'parse' && <Parse /> }
    </div>
  );
}
