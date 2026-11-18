import { Tabs } from '@/src/components/ui/Tabs';
import { useState } from 'react';


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
  return (
    <></>
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
