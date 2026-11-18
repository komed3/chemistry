import { Playground } from '@/src/packages/chembalance/Playground';
import readme from '@/src/packages/chembalance/README.md?raw';
import { PackageDefinition } from '@/src/types/package';
import { Scale } from 'lucide-react';


export default ( {
  id: 'chembalance',
  name: 'ChemBalance',
  npmName: 'chembalance',
  version: '1.0.0',
  year: '2026',
  license: 'MIT',
  tagline: 'Balance chemical reaction equations, redox reactions, and ionic systems using exact rational arithmetic.',
  icon: Scale,
  githubUrl: 'https://github.com/komed3/chembalance',
  npmUrl: 'https://www.npmjs.com/package/chembalance',
  installCmd: 'npm i chembalance',
  playground: Playground,
  readme,
  highlights: [
    'Exact rational stoichiometric solver',
    'Acidic & basic redox auxiliary species',
    'Configurable multi-dimensional search profiles'
  ]
} ) as const satisfies PackageDefinition;
