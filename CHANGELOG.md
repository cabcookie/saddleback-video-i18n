# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Planned]
- keyframes should be adjusted from the middle to the end of the duration instead of within the array of the minduration
- create a configuration UI
- enable/disable templates for dropdownlist within configuration UI
- review all layers and search for layers with splitted texts

## [Unreleased]

## [2.3.1] - 2017-09-02
### Added
- Changelog

### Changed
- added `sbVideoScript.settings.splitSettings.seperatorForSplitting`

### Fixed
- Script had problems to handle '…' so replaced it with '...' at several locations; therefore added `sbVideoScript.settings.splitSettings.seperatorForSplitting`
