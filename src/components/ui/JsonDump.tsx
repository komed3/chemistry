import { prismTheme } from '@/src/lib/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';


SyntaxHighlighter.registerLanguage( 'json', json );


interface JsonDumpProps {
  data: unknown;
}


export function JsonDump ( { data }: JsonDumpProps ) {
  const formatted = JSON.stringify( data, null, 2 ) ?? '';

  return (
    <div className= 'p-4 text-sm font-mono bg-white border border-slate-200 rounded'>
      <SyntaxHighlighter
        language= 'json'
        style= { prismTheme }
        customStyle= { { margin: 0, padding: 0 } }
      >
        { formatted }
      </SyntaxHighlighter>
    </div>
  );
}
