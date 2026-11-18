import { Tabs } from '@/src/components/Tabs';
import { ELEMENT_SYMBOLS, PARTICLE_SYMBOLS } from 'chemparse';
import { useState } from 'react';


const TABS = {
  parse: 'parse()', validate: 'validate()', compare: 'compare()',
  diff: 'diff()', symbols: 'Symbols (118 + 8)'
} as const;


function Symbols () {
  return (
    <>
      <div className= 'space-y-3'>
        <h2 className= 'text-sm font-semibold'>
          Supported Particle Symbols ({ PARTICLE_SYMBOLS.length })
        </h2>
      </div>

      <div className= 'space-y-3'>
        <h2 className= 'text-sm font-semibold'>
          Supported IUPAC Elements ({ ELEMENT_SYMBOLS.length })
        </h2>
      </div>
    </>
  );
}


export function Playground () {
  const [ tab, setTab ] = useState< keyof typeof TABS >( 'parse' );

  return (
    <div className= 'space-y-8'>
      <Tabs { ...{ tabs: TABS, tab, setTab } } />

      { tab === 'symbols' && <Symbols /> }
    </div>
  );
}
