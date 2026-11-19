import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const prismTheme = Object.fromEntries( Object.entries( oneLight ).map( ( [ selector, rules ] ) => [
  selector, Object.fromEntries( Object.entries( rules ).filter( ( [ property ] ) =>
    ! property.startsWith( 'background' ) && ! property.startsWith( 'overflow' )
  ) )
] ) );
