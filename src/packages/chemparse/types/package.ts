import type { LucideIcon } from 'lucide-react';


export interface PackageDefinition {
  id: string;
  name: string;
  npmName: string;
  version: string;
  license: string;
  tagline: string;
  githubUrl: string;
  npmUrl: string;
  installCmd: string;
  icon: LucideIcon;
  highlights: string[];
  readme: string;
}
