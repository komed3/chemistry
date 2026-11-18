import { AlertCircle } from 'lucide-react';


interface ErrorMessageProps {
  error: string;
  label?: string;
}


export function ErrorMessage ( { error, label = 'Error' }: ErrorMessageProps ) {
  return (
    <div className= 'flex items-start gap-3 p-4 text-sm text-rose-800 bg-white border border-slate-200 rounded'>
      <AlertCircle className= 'shrink-0 size-4' />

      <div className= 'leading-none'>
        <p className= 'font-medium'>{ label }</p>
        <p className= 'mt-1 text-xs font-mono'>{ error }</p>
      </div>
    </div>
  );
}
