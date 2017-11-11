# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Planned]
- Fix problem with text layer's line counts so that for one line text layers the text isn't cut anymore but is split or font size is being reduced
- Fix problem with keyframe types being changed when a split position of a text layer was changed
- Create a configuration UI
- Create an option so save configuration settings
- Create a UI to search for split texts within the resulting main comps
- Thinking of saving changes made to text layers (e.g. splits at different positions) being saved in the `Comp for In and Out` composition
- Create an option for being able to handle not only left oriented texts for fill ins

## [Work In Progress]

## [Unreleased]

## [2.4.1] - 2017-11-11
### Changed
- We are not storing the resulting comps and layer information in an object anymore. We did that to make it easier to review them later. But the created main compositions store all the relevant information in their layers thus this information is much more accurate and change resistant than storing a static object.
- Renamed package to `saddleback-video-i18n`
- Adding several fill in options: Fill In is shown from the beginning of the slide, Fill In is shown with animation (as it was before), and Fill In text is not shown within the slide

### Fixed
- Fixed problems with the fill in positions if a fill starts in the beginning of a line (line number > 1) or is spread over more than two lines (sbVideoScript.checkFillinLayerAddresses)

## [2.4.0] - 2017-10-05
### Fixed
- The adjustment of font sizes didn't properly work for text layers with only one line
- Solved problems in `sbVideoScript.adjustUIForSplittedLayers`: When a text included a `'` character jumping to a text layer with split text caused an error
- Minor corrections on README.md
- If the text was too large for one text layer, the script always took a long time to make the correct adjustments. The font size was reduced in single steps, which was very slow. Now the script jumps directly to the smallest possible font size. If the text matches, it jumps to a medium size and then halves it until the text matches. As a rule, the script works much faster. If the text doesn't fit, it jumps much faster into the split mode.
- enable/disable templates for `dropdownlist` within configuration UI

## [2.3.1] - 2017-09-02
### Added
- Changelog

### Changed
- added `sbVideoScript.settings.splitSettings.seperatorForSplitting`

### Fixed
- Script had problems to handle '…' so replaced it with '...' at several locations; therefore added `sbVideoScript.settings.splitSettings.seperatorForSplitting`
