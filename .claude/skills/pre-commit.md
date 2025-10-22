# Pre-Commit Checks

Run comprehensive checks before committing code to jacobreed.dev.

## Instructions

Before creating a commit, run these checks to ensure code quality:

1. **Type checking**:
   ```bash
   npx tsc --noEmit
   ```
   - Ensures TypeScript has no type errors
   - Uses the project's tsconfig.json settings
   - Must pass with zero errors

2. **Linting**:
   ```bash
   npm run lint
   ```
   - Runs ESLint with Next.js configuration
   - Checks for code quality issues
   - Must pass with zero errors

3. **Tests**:
   ```bash
   npm test
   ```
   - Runs Vitest test suite
   - Ensures all tests pass
   - Verifies no regressions

4. **Build verification** (for significant changes):
   ```bash
   npm run build
   ```
   - Ensures the project builds successfully
   - Catches build-time errors
   - Verifies all routes and pages compile
   - Only run for major changes or before merging

## Automated Pre-Commit Script

Run all checks in sequence:

```bash
#!/bin/bash
set -e

echo "Running pre-commit checks..."

echo "→ Type checking..."
npx tsc --noEmit

echo "→ Linting..."
npm run lint

echo "→ Testing..."
npm test

echo "✓ All checks passed!"
```

## When to Run

**Always run before**:
- Creating commits
- Pushing to remote
- Creating pull requests
- Merging branches

**Optional for**:
- Small typo fixes
- Documentation changes
- MDX content updates (unless code blocks)

## Handling Failures

### TypeScript Errors
- Fix type errors in the reported files
- Check for missing type definitions
- Verify imports are correct
- Ensure strict null checks are satisfied

### ESLint Errors
- Follow ESLint's suggestions to fix issues
- Some errors can be auto-fixed with: `npm run lint -- --fix`
- Check for unused variables, imports
- Verify code follows Next.js best practices

### Test Failures
- Review failed test output
- Update tests if behavior intentionally changed
- Fix bugs if tests caught regressions
- Ensure test data is valid

### Build Failures
- Check for import errors
- Verify all environment variables are set
- Look for server component/client component conflicts
- Ensure all pages and routes are valid

## Quick Check (Minimal)

For small changes, run this minimal check:

```bash
npx tsc --noEmit && npm run lint
```

## Full Check (Comprehensive)

For major changes or before merging:

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
```

## CI/CD Integration

These checks should mirror what runs in CI/CD:
- GitHub Actions runs these on pull requests
- Vercel runs build check on deployment
- Running locally catches issues earlier

## Tips

- Fix issues in order: types → lint → tests → build
- Type errors often cause lint and build errors
- Use `--fix` flags where available for auto-fixes
- Keep checks fast by fixing issues incrementally
- Consider using git hooks to automate these checks

## Common Issues

**TypeScript: "Cannot find module"**
- Run `npm install` to ensure dependencies are installed
- Check import paths are correct
- Verify the module exists in node_modules

**ESLint: "Parsing error"**
- Ensure TypeScript is installed
- Check tsconfig.json is valid
- Verify ESLint config is correct

**Tests: "No tests found"**
- Ensure test files end in `.test.ts` or `.test.tsx`
- Check vitest.config.ts is properly configured
- Verify test files are not ignored

**Build: "Module not found"**
- Check all imports use correct paths
- Verify dynamic imports are valid
- Ensure environment variables are set for build
