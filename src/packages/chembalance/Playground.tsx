import { Tabs } from '@/src/components/ui/Tabs';
import { useState } from 'react';


const TABS = {
  balance: 'balance()', isBalanced: 'isBalanced()',
  validate: 'validate()', parse: 'parse()'
} as const;


export function Playground () {
  const [ tab, setTab ] = useState< keyof typeof TABS >( 'balance' );

  return (
    <div className= 'space-y-8'>
      <Tabs { ...{ tabs: TABS, tab, setTab } } />
    </div>
  );
}
