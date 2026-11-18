interface ResultGridProps {
  data: Array< [ string, string | number ] >
}


export function ResultGrid ( { data }: ResultGridProps ) {
  return data.length > 0 && (
    <div
      className= 'grid gap-4'
      style= { { gridTemplateColumns: `repeat( ${ data.length }, 1fr )` } }
    >
      { data.map( ( [ label, value ] ) => (
        <div key= { label } className= 'py-3 px-4 bg-white border border-slate-200 rounded'>
          <div className= 'mb-1.5 text-xs text-slate-500'>
            { label }
          </div>
    
          <div className= 'text-2xl font-semibold font-mono tabular-nums'>
            { value }
          </div>
        </div>
      ) ) }
    </div>
  );
}
