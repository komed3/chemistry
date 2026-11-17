import { Playground } from '@/src/packages/chemparse/Playground';
import readme from '@/src/packages/chemparse/README.md?raw';
import { PackageDefinition } from '@/src/types/package';
import { FlaskConical } from 'lucide-react';


export default ( {
  id: 'chemparse',
  name: 'ChemParse',
  npmName: 'chemparse',
  version: '1.2.1',
  license: 'MIT',
  tagline: 'Parse, validate, compare, and diff chemical formulas and subatomic particle expressions.',
  icon: FlaskConical,
  githubUrl: 'https://github.com/komed3/chemparse',
  npmUrl: 'https://www.npmjs.com/package/chemparse',
  installCmd: 'npm i chemparse',
  playground: Playground,
  readme,
  highlights: [
    '118 IUPAC elements + 8 particle symbols',
    'Nested brackets, hydrates, scientific notation',
    'Caret & Unicode ionic charge parsing'
  ]
} ) as const satisfies PackageDefinition;
