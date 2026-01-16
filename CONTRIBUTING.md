# Contributing to Chess Project

Welcome! This project follows **Spec-Driven Development** methodology using [GitHub Spec Kit](https://github.com/github/spec-kit).

## 🎯 Development Philosophy

**Specifications become executable** - We write comprehensive specs first, then implement. The spec is the source of truth, not an afterthought.

## 📋 Workflow

### 1. Check the Specification

Before starting any work, check:
- [Online Multiplayer Specification](./docs/ONLINE_MULTIPLAYER_SPEC.md) - Core rules (RULE-001 to RULE-007)
- Existing specs in `docs/` folder

### 2. Use Specify Commands

We use Specify CLI for structured development:

```bash
# Establish project principles (if not done)
/speckit.constitution

# Create/update specification
/speckit.specify

# Create implementation plan
/speckit.plan

# Generate actionable tasks
/speckit.tasks

# Optional: Clarify ambiguities before planning
/speckit.clarify

# Optional: Analyze consistency
/speckit.analyze

# Optional: Generate quality checklists
/speckit.checklist

# Execute implementation
/speckit.implement
```

### 3. Reference Rules in Code

When implementing features from specs, reference the rule numbers in:
- **Comments**: `// RULE-001: First joiner = White`
- **Commit messages**: `feat: implement lobby room (RULE-004, RULE-006)`
- **PR descriptions**: `Implements RULE-007 - Player name display`

### 4. Update Specs First

**Never** implement features without updating the spec first:

1. Discuss the feature/change
2. Update relevant spec in `docs/`
3. Run `npm run spec:lint` to validate
4. Get spec review/approval
5. Implement according to spec
6. Reference spec rules in implementation

## 🔍 Spec Validation

### Available Scripts

```bash
# Validate markdown in specs
npm run spec:lint

# Auto-fix markdown issues
npm run spec:lint:fix

# Run all spec checks
npm run spec:check

# Update table of contents
npm run spec:toc
```

### Before Committing

Always run:
```bash
npm run spec:check
```

## 📖 Documentation Standards

### Spec Files Must Include

1. **Clear Rule Numbers** - RULE-001, RULE-002, etc.
2. **Behavior Specifications** - What, not how
3. **Examples** - Code snippets, diagrams, flows
4. **Edge Cases** - Error scenarios, validation rules
5. **API Contracts** - Request/response formats
6. **Component Specs** - Props, state, responsibilities

### Spec File Template

```markdown
## RULE-XXX: Short Title

**What**: Brief description

**Behavior**:
- Specific behavior 1
- Specific behavior 2

**Examples**:
```typescript
// Code example
```

**Edge Cases**:
- Error scenario 1
- Error scenario 2
```

## 🌳 Branch Naming

Follow this convention:
- `feature/rule-xxx-short-description` - New features
- `fix/rule-xxx-bug-description` - Bug fixes
- `spec/describe-spec-change` - Spec updates
- `refactor/what-is-being-refactored` - Code refactoring

Examples:
- `feature/rule-001-player-colors`
- `spec/add-lobby-timeout-rules`
- `fix/rule-006-waiting-animation`

## 📝 Commit Messages

Format: `<type>(<scope>): <description> (RULE-XXX)`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `spec` - Specification change
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build/tooling

**Examples:**
```bash
feat(lobby): add password validation modal (RULE-003)
spec(multiplayer): add reconnection rules (RULE-004)
fix(lobby-room): correct waiting text animation (RULE-006)
refactor(context): consolidate lobby state (RULE-005)
```

## 🧪 Testing

Tests should reference specs:

```typescript
describe('LobbyRoom', () => {
  describe('RULE-001: Player color assignment', () => {
    it('assigns White to first joiner', () => {
      // Test implementation
    });
    
    it('assigns Black to second joiner', () => {
      // Test implementation
    });
  });
});
```

## 🔄 Pull Request Process

1. **Create PR** with descriptive title
2. **Reference spec rules** in description
3. **Link related issues**
4. **Ensure tests pass**
5. **Run `npm run spec:check`**
6. **Request review**

### PR Template

```markdown
## Description
Brief description of changes

## Spec Compliance
- [ ] RULE-XXX: Description of how it's implemented
- [ ] RULE-YYY: Description of how it's implemented

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Spec validation passed (`npm run spec:check`)

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🚫 Anti-Patterns to Avoid

❌ **DON'T**:
- Implement first, document later
- Skip spec validation
- Create specs after the fact
- Ignore existing rules
- Make up behaviors not in spec

✅ **DO**:
- Read specs before coding
- Update specs before implementing
- Reference rule numbers
- Ask questions if spec is unclear
- Propose spec changes via discussion

## 🆘 Getting Help

- **Unclear spec?** - Ask in discussions or issues
- **Missing rule?** - Propose spec addition
- **Conflicting rules?** - Open an issue for clarification
- **Implementation questions?** - Reference the spec, then ask

## 📚 Resources

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Online Multiplayer Spec](./docs/ONLINE_MULTIPLAYER_SPEC.md)
- [Main README](./README.md)

---

**Remember**: The spec is the contract. Code implements the contract. Tests verify the contract.
