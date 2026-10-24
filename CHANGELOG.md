# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [0.1.0] - 2026-10-23

### Added
- Initial release of Advisor Mode for Zcode by Gianluca Iannotta.
- Bivalent session roles: the session model is classified at SessionStart as executor (fast tier) or advisor (frontier tier), failing closed to executor for unknown models.
- Two subagents: `advisor-reviewer` (frontier model pinned on one frontmatter line with an explicit `$max` reasoning level, read-only tools, three gates with APPROVED and CHANGES_REQUIRED verdicts) and `flash-executor` (`model: inherit`, follows the session model, surgical execution rules with a two-strike limit).
- Hard lifecycle gates enforced through six ZCode hook events: SessionStart role injection with craft standards, UserPromptSubmit breaker warnings, PreToolUse denials for the circuit breaker and the multi-file plan gate, PostToolUse failure signatures plus SHA-256 file hash tracking plus advisor verdict capture, PostToolUseFailure command failure counting, and a Stop gate that forces the session back to work until the advisor approves the current file hashes, capped at two forced continuations.
- Persistent per-session state under the plugin data directory with normalized failure signatures that ignore timestamps, hashes, and counts.
- Built-in craft standards: minimalist engineering with the 7-rung simplicity ladder, clean prose with zero em dashes, action-first cognitive ergonomics, and UI direction rules.
- Configuration file `advisor-config.json` for roles, model patterns, gate thresholds, and defaults, with a configuration skill documented in `skills/advisor-mode/SKILL.md`.
- Automated Node.js test suite covering roles, gates, failure signatures, the circuit breaker, the plan gate, the final review gate with hash verification, and standalone CLI execution.
- Apache 2.0 open-source license and notice.
