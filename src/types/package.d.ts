import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';


export interface PackageDefinition {
  id: string;
  name: string;
  npmName: string;
  version: string;
  year: string;
  license: string;
  tagline: string;
  icon: LucideIcon;
  githubUrl: string;
  npmUrl: string;
  installCmd: string;
  playground: () => ReactElement;
  readme: string;
  highlights: string[];
}
