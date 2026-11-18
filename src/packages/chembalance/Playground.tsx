import { ErrorMessage } from '@/src/components/ui/ErrorMessage';
import { FormulaInput } from '@/src/components/ui/FormulaInput';
import { JsonDump } from '@/src/components/ui/JsonDump';
import { ResultGrid } from '@/src/components/ui/ResultGrid';
import { Tabs } from '@/src/components/ui/Tabs';
import type { ChemicalEquation } from 'chembalance';
import { parse } from 'chembalance';
import { useMemo, useState } from 'react';


interface Result< T > {
  data?: T;
  error?: string;
}


const TABS = {
  balance: 'balance()', isBalanced: 'isBalanced()',
  validate: 'validate()', parse: 'parse()'
} as const;

const PRESETS = [
  'H2 + O2 -> H2O', 'Fe + O2 -> Fe2O3', 'CH4 + O2 -> CO2 + H2O',
  'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+', 'MnO4^- + SO3^2- -> MnO2 + SO4^2-'
] as const;

const REDOX_MEDIA: Record< string, 'acidic' | 'basic' > = {
  'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+': 'acidic',
  'MnO4^- + SO3^2- -> MnO2 + SO4^2-': 'basic'
};


function Balance () {
  return (
    <></>
  );
}


function CheckEquation ( { mode }: { mode: 'isBalanced' | 'validate' } ) {
  return (
    <></>
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
