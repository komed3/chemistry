interface JsonDumpProps {
  data: unknown;
}


export function JsonDump ( { data }: JsonDumpProps ) {
  return (
    <pre className= 'p-4 text-sm font-mono bg-white border border-slate-200 rounded'>
      { JSON.stringify( data, null, 2 ) }
    </pre>
  );
}
