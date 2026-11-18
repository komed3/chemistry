import { AlertCircle, Check } from 'lucide-react';


interface ValidationMessageProps {
  valid: boolean;
  methodName: string;
}


export function ValidationMessage ( { valid, methodName }: ValidationMessageProps ) {
  return (
    <div
      className= {
        'flex items-center gap-3 p-4 text-sm bg-white border border-slate-200 rounded ' +
        ( valid ? 'text-teal-800' : 'text-rose-800' )
      }
    >
      { valid ? <Check className= 'shrink-0 size-4' /> : <AlertCircle className= 'shrink-0 size-4' /> }

      <code className= 'font-mono font-medium'>{ methodName }</code>
      <span>returned</span>
      <strong className= 'font-mono'>{ String( valid ) }</strong>
    </div>
  );
}
