# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2025-12-05

### Added

- Title tag preservation and formatting
  - Tags like `[Bug]`, `[Feature]`, etc. are now extracted and preserved in translations
  - Translated titles include original title reference: `[TAG] TRANSLATED (Original title: ORIGINAL)`
  - Only the title content (without tags) is sent for translation
- Improved formatting
  - Translation divider comment now includes line breaks for better readability
  - Bot message split across multiple lines for improved clarity

### Fixed

- Fixed quoted lines being removed from original content in output
  - Quoted lines (e.g., `> ...`) are now preserved in the original content display
  - Only the unquoted portion is sent for translation to avoid re-translating old comments
  - Translation output no longer includes quoted content
- Removed `actions/checkout@v3` from the workflows, as it is not required

## [1.0.1] - 2025-12-05

### Fixed

- Fixed `(0 , franc_min_1.default) is not a function` error in GitHub Actions runtime
  - Changed `franc-min` import from default import to named import `{ franc }`
  - Updated TypeScript type declaration to use named export instead of CommonJS-style `export =`
  - This resolves the module compatibility issue with `franc-min` version 6.2.0

## [1.0.0] - Initial Release

### Added

- Automatic translation of non-English GitHub issues, discussions, and comments into English
- Support for multiple event types: issues, issue comments, discussions, discussion comments, pull requests, and pull request review comments
- Language detection using `franc-min` library
- Translation using Google Translate API
- Two translation modes:
  - Append translation to original content
  - Post translation as a separate bot comment
- Optional title modification
- Custom bot message support
- Skip translation for specific users (useful for excluding bots)
