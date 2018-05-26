# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

In terms of this script the version number MAJOR.MINOR.PATCH would mean the following:

- MAJOR version when the changes would need a review of the templates that were created in After Effects or the approach of media files being used,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

## [Planned]
- Implement a check after clicking `Set Out Pos` to inform the user when one line from the CSV was stepped over
- Reduce video quality in preview window for composition `Comp for In and Out` to ensure higher performance while stepping through the video
- Add a description to the README how the templates need to be set up to be handled by the script
- Add a logging mechanism. The log file should be saved in the After Effects file folder, so in case of an error problems can be easily reproduced
- Create a UI to search for split texts within the resulting main comps
- Thinking of saving changes made to text layers (e.g. splits at different positions) being saved in the `Comp for In and Out` composition
- Create an option for being able to handle not only left oriented texts for fill ins
- Try adding a Automatic Update functionality where the script is checking the GitHub master branch for a new version and updates the appropriate files accordingly
- When a fill in start at the beginning of a line it doesn't work
- When the In Pos is set, the script shows the duration of a layer when stepping forward or backward with the buttons; it also shows the timecode for the In Pos

## [Work In Progress]

## Unreleased

## [2.4.3] - 2018-05-26
### Fixed
- Fixed minor bug: script tried to load the project settings already while starting. When no project was open yet the script failed to start. Now the project settings are only loaded when you click on the button "Reload CSV & Audio".

## [2.4.2] - 2018-05-11
### Added
- Split configuration in global and user specific configurations (one approach might be to search for configuration settings within the current AE file's directory and the directories up where the subfolder's settings file overwrites the parent folder's settings)
- Handling of separate audio and video files.
- In settings the name of the CSV file is represented as well as the names of the relevant audio files and these files are loaded automatically when starting the script. Thus the script `ui-onclick-functions/choose-csv-file` is being renamed to `load-project-data`.

### Changed
- All solid layers being created in `Comp for In and Out` are being disabled, so that you can now step back in the video and see the video not the solid.

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
