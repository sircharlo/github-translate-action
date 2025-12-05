# GitHub Translate Action

![Logo](./assets/logo.svg)

> **Note:** This is a fork of [lizheming/github-translate-action](https://github.com/lizheming/github-translate-action) with improvements and additional features. All credit for the original code goes to the original author.

A GitHub Action to automatically translate non-English GitHub issues, discussions, and comments into English.

## Improvements Over Original

This fork includes several enhancements:

- **Skip Actors**: Ability to exclude specific users/bots from translation
- **Quote Stripping**: Automatically removes quoted text to avoid re-translating previous comments
- **Improved Bot Messages**: More user-friendly default translation notices
- **Code Refactoring**: Cleaner, more maintainable codebase
- **Updated Dependencies**: Uses Node 20 and latest packages

## Input variables

See [action.yml](./action.yml) for more details.

- `IS_MODIFY_TITLE`: whether to translate the title, the default is no. The default is to directly modify the title. When `APPEND_TRANSLATION` is true, the translation result will be appended to the original title.
- `APPEND_TRANSLATION`: whether to append translation content, the default is no. By default, this Action will append the translated content as a new reply to the issue/discussion. When this item is true, the original content is modified and the translation result is appended, so that no notification is generated and the user is not disturbed.
- `CUSTOM_BOT_NOTE`: When `APPEND_TRANSLATION` is false, a machine translation description tag will be added to the translated content, and you can customize this description.
- `SKIP_ACTORS`: A comma-separated list of GitHub usernames to skip translation for. Useful for excluding bots like `dependabot[bot]` or `mergify[bot]` from translation. Example: `'dependabot[bot],renovate[bot]'`

## Usage

````yml
name: 'translator'
on:
  issues:
    types: [opened, edited]
  issue_comment:
    types: [created, edited]
  discussion:
    types: [created, edited]
  discussion_comment:
    types: [created, edited]
  pull_request_target:
    types: [opened, edited]
  pull_request_review_comment:
    types: [created, edited]

jobs:
  translate:
    permissions:
      issues: write
      discussions: write
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: sircharlo/github-translate-action
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          IS_MODIFY_TITLE: true
          APPEND_TRANSLATION: true
          SKIP_ACTORS: 'dependabot[bot],mergify[bot]'
````

## Credits

This project is a fork of [lizheming/github-translate-action](https://github.com/lizheming/github-translate-action). All credit for the original implementation goes to [@lizheming](https://github.com/lizheming).

The original project was itself forked from [dromara/issues-translate-action](https://github.com/dromara/issues-translate-action).
