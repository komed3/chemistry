import { FlaskConical } from 'lucide-react';
import readme from './README.md?raw';
import { PackageDefinition } from './types/package';


export const chemparsePackage: PackageDefinition = {
  id: 'chemparse',
  name: 'ChemParse',
  npmName: 'chemparse',
  version: '1.2.1',
  license: 'MIT',
  tagline: 'Parse, validate, compare, and diff chemical formulas and subatomic particle expressions.',
  githubUrl: 'https://github.com/komed3/chemparse',
  npmUrl: 'https://www.npmjs.com/package/chemparse',
  installCmd: 'npm install chemparse',
  icon: FlaskConical,
  highlights: [
    '118 IUPAC elements + 8 particle symbols',
    'Nested brackets, hydrates, scientific notation',
    'Caret & Unicode ionic charge parsing',
  ],
  readme
};
