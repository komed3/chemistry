interface ResultTableProps {
  label: string;
  header: [ string, string ];
  data: Record< string, number >;
}


export function ResultTable ( { label, header: [ left, right ], data }: ResultTableProps ) {
  return (
    <div className= 'bg-white border border-slate-200 rounded overflow-hidden'>
      <div className= 'px-4 py-2.5 text-xs font-medium bg-slate-50 border-b border-slate-200'>
        { label }
      </div>

      <table className= 'w-full text-sm border-collapse'>
        <thead>
          <tr className= 'text-xs text-slate-500 border-b border-slate-200'>
            <th className= 'px-4 py-2 text-left font-medium'>{ left }</th>
            <th className= 'px-4 py-2 text-right font-medium'>{ right }</th>
          </tr>
        </thead>

        <tbody className= 'divide-y divide-slate-200'>
          { Object.entries( data ).map( ( [ key, value ] ) => (
            <tr key= { key }>
              <td className= 'px-4 py-2 font-mono font-medium'>{ key }</td>
              <td className= 'px-4 py-2 text-right font-mono tabular-nums'>{ value }</td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div>
  );
}
