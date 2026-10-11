# Contributing to Banknote Studio

Thank you for contributing to the Banknote Studio Runway Personal Cashflow Clearance engine!

## Development Guidelines

1. **Strict TypeScript Typing**:
   - Never use `any` or loose type assertions. Define explicit domain interfaces in `src/types/index.ts`.
   - Maintain 100% clean output with `npm run typecheck`.

2. **Deterministic Mathematical Precision**:
   - All cashflow algorithms in `src/utils/calculations.ts` must maintain zero-sum conservation.
   - Run the simulation test suite before submitting:
     ```bash
     npm run test
     ```

3. **Accessibility First (WCAG 2.1 AA)**:
   - Ensure all interactive elements have visible focus rings (`focus-visible:ring-2`).
   - All form controls and sliders must have explicit `<label htmlFor="...">`.
   - Decorative icons must include `aria-hidden="true"`.
   - Modals must support keyboard `Escape` dismissal and maintain focus traps.

4. **Performance & Code Splitting**:
   - New screens or extensive panels must be lazy-loaded using `React.lazy` and wrapped in `Suspense` with an accessible skeleton.

5. **Code Style & Linting**:
   - Format code cleanly and run `npm run lint` prior to committing.
