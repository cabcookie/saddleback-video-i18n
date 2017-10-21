# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Planned]
- find a way to make the fontSize checks faster in `sbVideoScript.checkAndAdjustFontSize` (reduce fontSize to fit text into layer). The call textProp.setValue(textDocument) is very slow.
- keyframes should be adjusted from the middle to the end of the duration instead of within the array of the minduration
- create a configuration UI
- review all layers and search for layers with splitted texts

## [Unreleased]

## [2.4.0] - 2017-10-05
### Fixed
- The adjustment of font sizes didn't properly work for text layers with only one line
- Solved problems in `sbVideoScript.adjustUIForSplittedLayers`: When a text included a `'` character jumping to a text layer with splitted text caused an error
- Minor corrections on README.md
- The speed of the script is improved by not reducing the font size in single steps, but by continuously halving it.
- enable/disable templates for dropdownlist within configuration UI

## [2.3.1] - 2017-09-02
### Added
- Changelog

### Changed
- added `sbVideoScript.settings.splitSettings.seperatorForSplitting`

### Fixed
- Script had problems to handle '…' so replaced it with '...' at several locations; therefore added `sbVideoScript.settings.splitSettings.seperatorForSplitting`
