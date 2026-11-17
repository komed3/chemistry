# ChemBalance

**ChemBalance** is a lightweight TypeScript library for balancing chemical reaction
equations using stoichiometric methods.

It supports chemical formulas, ionic charges, electrons, redox reactions,
and reactions in acidic or basic media. It uses exact rational arithmetic and
searches for the smallest positive integer coefficients.


## Features

- Balances chemical reaction equations using stoichiometric matrices
- Supports all 118 IUPAC element symbols through ChemParse
- Handles ionic compounds and charged species
- Supports electron transfer in redox reactions
- Balances redox reactions in acidic and basic media
- Automatically introduces water, hydrogen ions, hydroxide ions, and electrons when required
- Finds the smallest positive integer coefficients
- Supports multi-dimensional solution spaces
- Provides configurable search profiles for complex equations
- Checks whether a reaction equation is already balanced
- Parses reaction equations into structured data
- Provides TypeScript types and both named and default exports
- Uses exact rational arithmetic for matrix calculations


## Installation

```bash
npm install chembalance
```

ChemBalance uses [ChemParse](https://npmjs.com/package/chemparse) to parse
chemical formulas and particle expressions.


## Usage

### ES Modules

```js
import ChemBalance, { balance, isBalanced, parse, validate } from 'chembalance';

const result = balance( 'H2 + O2 -> H2O' );

console.log( result.equation ); // 2 H2 + O2 -> 2 H2O
console.log( result.coefficients ); // [ 2, 1, 2 ]
console.log( isBalanced( result.equation ) ); // true
console.log( validate( 'H2 + O2 -> H2O' ) ); // true

// All functions are also available as static methods.
console.log( ChemBalance.balance( 'Fe + O2 -> Fe2O3' ).equation );
```

All functions are also available as static methods on the default `ChemBalance` class.

### CommonJS

```js
const ChemBalance = require( 'chembalance' ).default;
const { balance, isBalanced, parse, validate } = require( 'chembalance' );

console.log( balance( 'H2 + O2 -> H2O' ).equation );
console.log( ChemBalance.isBalanced( '2 H2 + O2 -> 2 H2O' ) );
console.log( parse( 'H2 + O2 -> H2O' ) );
```

### Browser

ChemBalance can also be used in browser environments through an ESM CDN import:

```html
<script type="module">
  import ChemBalance, { balance } from 'https://cdn.jsdelivr.net/npm/chembalance@1.0.0/+esm';

  console.log( balance( 'H2 + O2 -> H2O' ).equation );
  console.log( ChemBalance.isBalanced( '2 H2 + O2 -> 2 H2O' ) );
</script>
```

The package provides ESM and CommonJS builds. It does not include a separate UMD build.


## API

All functions are available as named exports and as static methods of the default `ChemBalance` class.

### `balance ( equation: string, options?: BalanceOptions ) : BalanceResult`

Balances a chemical reaction equation and returns the balanced equation together with
its coefficients and individual reaction terms.

Existing stoichiometric coefficients are recalculated.

```js
balance( 'H2 + O2 -> H2O' );
// {
//   equation: '2 H2 + O2 -> 2 H2O',
//   coefficients: [ 2, 1, 2 ],
//   reactants: [
//     { formula: 'H2', coefficient: 2 },
//     { formula: 'O2', coefficient: 1 }
//   ],
//   products: [
//     { formula: 'H2O', coefficient: 2 }
//   ],
//   balanced: true
// }
```

The optional `options` parameter accepts a reaction medium and a search profile.

```js
balance( 'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+', { medium: 'acidic' } );
//  MnO4^- + 5 Fe^2+ + 8 H^+ -> Mn^2+ + 5 Fe^3+ + 4 H2O
```

The reaction medium can be set to `acidic` or `basic`.
ChemBalance introduces the required auxiliary species automatically.

The search profile controls the amount of computational effort used when finding a positive integer solution.
Available profiles are `fast`, `balanced`, and `thorough`. The default is `balanced`.

Throws an error if the equation is invalid, no positive balancing solution exists, or a search limit is exceeded.

### `isBalanced ( equation: string ) : boolean`

Checks whether a chemical reaction equation is balanced.

Existing stoichiometric coefficients are taken into account.
Both elemental composition and total ionic charge are considered.

```js
isBalanced( '2 H2 + O2 -> 2 H2O' ); // true
isBalanced( 'H2 + O2 -> H2O' ); // false
isBalanced( 'Fe^2+ -> Fe^3+' ); // false
isBalanced( '2 Fe^2+ -> 2 Fe^2+' ); // true
```

Throws an error if the equation is syntactically invalid.

### `validate ( equation: string ) : boolean`

Checks whether a chemical reaction equation is syntactically valid and all reaction formulas can be parsed.

```js
validate( 'H2 + O2 -> H2O' ); // true
validate( 'Fe^2+ + e- -> Fe' ); // true
validate( 'H2 + O2' ); // false
validate( 'Xx2 -> H2O' ); // false
```

Returns `false` for invalid input instead of throwing an error.

### `parse ( equation: string ) : ChemicalEquation`

Parses a chemical reaction equation and returns its reactants and products as structured data.

Each reaction term contains its formula, stoichiometric coefficient, and parsed chemical composition.

```js
parse( '2 H2 + O2 -> 2 H2O' );
// {
//   reactants: [
//     { formula: 'H2', coefficient: 2, composition: { elementCounts: { H: 2 } } },
//     { formula: 'O2', coefficient: 1, composition: { elementCounts: { O: 2 } } }
//   ],
//   products: [
//     { formula: 'H2O', coefficient: 2, composition: { elementCounts: { H: 2, O: 1 } } }
//   ]
// }
```

The `composition` property contains the result returned by `ChemParse.parse()`.

Throws a `TypeError` if the input is not a string and an `Error` if the equation or any reaction term is invalid.


## Supported Reaction Syntax

### Basic equations

A reaction equation consists of reactants, a reaction arrow, and products.

```text
H2 + O2 -> H2O
CH4 + O2 -> CO2 + H2O
Fe + O2 -> Fe2O3
Na + Cl2 -> NaCl
```

The reaction arrow can be written as `->` or `→`.

Exactly one reaction arrow is required. Both sides must contain at least one reaction term.

Reaction terms must be separated by a plus sign with whitespace on both sides.

### Stoichiometric coefficients

Positive integer coefficients can be placed before reaction formulas.

```text
2 H2 + O2 -> 2 H2O
4 Fe + 3 O2 -> 2 Fe2O3
2 Na + Cl2 -> 2 NaCl
```

Whitespace between a coefficient and its formula is optional.

Coefficients must be positive safe integers. Existing coefficients are taken into account
by `isBalanced()` and `parse()`, but recalculated by `balance()`.

A coefficient of `1` is omitted from the formatted balanced equation.

### Chemical formulas

ChemBalance delegates chemical formula parsing to [ChemParse](https://npmjs.com/package/chemparse).

All supported ChemParse formula syntax is available, including:

- All 118 IUPAC element symbols
- Parentheses, square brackets, and curly brackets
- Nested groups and multipliers
- Decimal and scientific notation
- Hydrate notation
- Ionic charges in caret and Unicode superscript notation

Examples:

```text
Ca(OH)2 + HCl -> CaCl2 + H2O
Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4
NH4^+ + OH^- -> NH3 + H2O
Fe(CN)6^3- + Fe^3+ -> Fe4[Fe(CN)6]3
```

For further details about supported formula syntax, see the [ChemParse documentation](https://github.com/komed3/chemparse).

### Ionic charges and electrons

Ionic charges are included in the balancing calculations.

```text
Fe^2+ + e- -> Fe
Cu^2+ + Zn -> Cu + Zn^2+
Ag^+ + Cl^- -> AgCl
```

Electrons are supported as standalone reaction terms. Their particle counts and charges are
taken into account when constructing the stoichiometric matrix.

ChemBalance currently supports electrons as the only particle type in reaction equations.
Other particle expressions recognized by ChemParse are not supported as reaction terms.

### Redox reactions

Redox reactions can be balanced by including electrons and ionic charges in the equation.

For reactions in acidic or basic media, the corresponding reaction medium can be supplied through the `medium` option.

Acidic medium:

```js
balance( 'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+', { medium: 'acidic' } );
// MnO4^- + 5 Fe^2+ + 8 H^+ -> Mn^2+ + 5 Fe^3+ + 4 H2O
```

Basic medium:

```js
balance( 'MnO4^- + SO3^2- -> MnO2 + SO4^2-', { medium: 'basic' } );
// 2 MnO4^- + 3 SO3^2- + H2O -> 2 MnO2 + 3 SO4^2- + 2 OH^-
```

The auxiliary species are introduced automatically. ChemBalance determines their placement
on the reactant or product side as part of the balancing process.

The `medium` option accepts:

| Value | Auxiliary species |
|---|---|
| `acidic` | H2O, H+, e- |
| `basic` | H2O, OH-, e- |

When no reaction medium is specified, no auxiliary species are introduced automatically.


## Search Profiles

Balancing equations with a single free variable can be solved directly.
Equations with multi-dimensional solution spaces require a search for a positive integer solution.

The `search` option controls the computational limits of this search.

| Profile | Maximum search nodes | Maximum coefficient sum |
|---|---:|---:|
| `fast` | 2,000 | 1,000 |
| `balanced` | 100,000 | 5,000 |
| `thorough` | 2,000,000 | 10,000 |

The default profile is `balanced`.

```js
balance( 'C + O2 -> CO + CO2', { search: 'fast' } );
balance( 'C + O2 -> CO + CO2', { search: 'balanced' } );
balance( 'C + O2 -> CO + CO2', { search: 'thorough' } );
```

Higher profiles allow more complex searches but may require significantly more computation.

A search limit error indicates that no solution was found within the configured limits.
It does not necessarily mean that no positive integer solution exists.


## Result Format

`balance()` returns a `BalanceResult` object:

```ts
interface BalanceResult {
  equation: string;
  coefficients: number[];
  reactants: BalancedTerm[];
  products: BalancedTerm[];
  balanced: true;
}

interface BalancedTerm {
  formula: string;
  coefficient: number;
}
```

The `equation` property contains the formatted balanced equation.

The `coefficients` property contains all stoichiometric coefficients in reaction order: first reactants, then products.

The `reactants` and `products` properties contain the individual reaction terms and their coefficients.

The `balanced` property is always `true` for a successfully returned result.

For example:

```js
balance( 'H2 + O2 -> H2O' );
// {
//   equation: '2 H2 + O2 -> 2 H2O',
//   coefficients: [ 2, 1, 2 ],
//   reactants: [
//     { formula: 'H2', coefficient: 2 },
//     { formula: 'O2', coefficient: 1 }
//   ],
//   products: [
//     { formula: 'H2O', coefficient: 2 }
//   ],
//   balanced: true
// }
```

`parse()` returns a `ChemicalEquation` object:

```ts
interface ChemicalEquation {
  reactants: EquationTerm[];
  products: EquationTerm[];
}

interface EquationTerm {
  formula: string;
  coefficient: number;
  composition: ChemParseResult;
  auxiliary?: boolean;
}
```

The `composition` property contains the parsed element counts, particle counts,
and optional total ionic charge.

The optional `auxiliary` property is used internally to identify automatically introduced
reaction species. It is not present in ordinary parsed equations.


## Balancing Scope and Limitations

ChemBalance balances chemical reaction equations by solving homogeneous systems of linear equations.

Some limitations of the current implementation:

- Only positive integer stoichiometric coefficients are supported.
- Stoichiometric coefficients must be safe JavaScript integers.
- Electrons are supported as reaction terms; other particles are not.
- Automatically introduced auxiliary species are only available when an acidic or
  basic reaction medium is selected.
- Existing coefficients are recalculated by `balance()`.
- Multi-dimensional solution spaces require a bounded integer search.
  Complex equations may exceed the selected search limits.
- The library balances elemental composition and total ionic charge. It does not
  determine whether a reaction is chemically feasible or physically meaningful.


## Error Handling

`balance()` and `parse()` throw an error when the input equation or its reaction terms are invalid.

Examples include:

- Empty or incomplete equations
- Missing or multiple reaction arrows
- Empty reaction terms
- Invalid chemical formulas
- Invalid or non-positive stoichiometric coefficients
- Unsupported particle types
- Non-integer or unsafe element counts
- Invalid reaction media or search profiles

`balance()` may also throw an error when:

- No positive integer balancing solution exists
- The search limit is exceeded
- A balancing coefficient exceeds the safe integer range

`isBalanced()` throws an error for syntactically invalid equations.

`validate()` can be used when a boolean result is preferred over exception handling.


## TypeScript

ChemBalance includes declaration files and exports its public types:

```ts
import type {
  BalanceOptions, BalanceResult, BalancedTerm, ChemicalEquation,
  EquationTerm, ReactionMedium, SearchProfile
} from 'chembalance';

import ChemBalance, { balance, isBalanced, parse, validate } from 'chembalance';

const options: BalanceOptions = { medium: 'acidic', search: 'balanced' };
const result: BalanceResult = balance( 'MnO4^- + Fe^2+ -> Mn^2+ + Fe^3+', options );

const equation: ChemicalEquation = parse( 'H2 + O2 -> H2O' );
const terms: BalancedTerm[] = result.reactants;
const reactants: EquationTerm[] = equation.reactants;

const medium: ReactionMedium = 'basic';
const profile: SearchProfile = 'thorough';

console.log( ChemBalance.isBalanced( result.equation ) );
console.log( validate( 'H2 + O2 -> H2O' ) );
```


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.  
© Copyright 2026 Paul Köhler (komed3).
