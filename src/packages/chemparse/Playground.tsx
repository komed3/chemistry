import { Tabs } from '@/src/components/Tabs';
import { useState } from 'react';


const TABS = {
  parse: 'parse()', validate: 'validate()', compare: 'compare()',
  diff: 'diff()', symbols: 'Symbols (118 + 8)'
} as const;


export function Playground () {
  const [ tab, setTab ] = useState< keyof typeof TABS >( 'parse' );

  return (
    <div className= 'space-y-8'>
      <Tabs { ...{ tabs: TABS, tab, setTab } } />
    </div>
  );
}
