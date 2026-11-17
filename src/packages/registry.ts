import chembalancePackage from '@/src/packages/chembalance';
import chemparsePackage from '@/src/packages/chemparse';
import type { PackageDefinition } from '@/src/types/package';


export const PACKAGES: PackageDefinition[] = [
  chemparsePackage, chembalancePackage
] as const;


export function getPackageById ( id: string | undefined ) : PackageDefinition | undefined {
  return id ? PACKAGES.find( pkg => pkg.id === id ) : undefined;
}
