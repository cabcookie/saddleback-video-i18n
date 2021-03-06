// TODO: add tab for scripts settings +enhancement id:65 gh:13

{
  try {
    importScript("errors/runtime-error");
    importScript("ui-elements/set-template-list");
    importScript("ui-elements/set-content-list");
    importScript("ui-onclick-functions/change-find-in-out-buttons-state");
    importScript("ui-onclick-functions/on-click-function-wrapper");
  } catch (e) {
    throw new sbVideoScript.RuntimeError({
      func: "importScript's for createUI",
      title: "Error loading neccesary functions",
      message: e.message
    });
  }

  sbVideoScript.createUI = function(thisObj) {
    try {
      var pan =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Saddleback Video Translation", undefined, {
              resizeable: true
            });

      if (pan != null) {
        var tabbedpanel =
          "tabbedpanel { \
                    alignChildren:['fill','fill'], alignment:['fill','fill'], spacing:5, margins:[0,0,0,0], \
                }";

        var tabPreparation =
          "tab { \
                    text: 'Prepare Video', \
                    alignment:['fill','fill'], \
                    alignChildren:['fill','top'], \
                    spacing:5, \
                    margins:5, \
                    btnLoadProjectData: Button { text:'Reload CSV & Audio' }, \
                    titleTimeControls: StaticText { text:'Find In/Out positions'}, \
                    grpTimeControls: Group { \
                        alignChildren:['fill','top'], \
                        spacing:1, \
                        minimumSize:[215,-1], \
                        rewSecs10: IconButton { \
                            image:'./media_controls/rewSecs10.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        }, \
                        rewSecs1: IconButton { \
                            image:'./media_controls/rewSecs1.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        }, \
                        rewFrm1: IconButton { \
                            image:'./media_controls/rewFrm1.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        }, \
                        forwFrm1: IconButton { \
                            image:'./media_controls/forwFrm1.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        }, \
                        forwSecs1: IconButton { \
                            image:'./media_controls/forwSecs1.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        }, \
                        forwSecs10: IconButton { \
                            image:'./media_controls/forwSecs10.png', \
                            minimumSize:[35,22], \
                            preferredSize: [-1,22] \
                        } \
                    }, \
                    titleSetInOut: StaticText { text:'Set In/Out Times' }, \
                    grpTemplate: Group { \
                        label: StaticText { \
                            text:'Select template:', \
                            minimumSize:[90,-1], \
                            maximumSize:[90,30], \
                            alignment:['left','center'] \
                        }, \
                        dropdown: DropDownList { \
                            minimumSize:[95,-1], \
                            alignment:['fill','center'] \
                        } \
                    }, \
                    labelForContent: StaticText { text:'Select content:' }, \
                    grpContentList: Group { alignChildren:['fill','fill'] }, \
                    grpInOut: Group { \
                        alignChildren:['fill','top'], \
                        spacing:3, \
                        inButton: Button { text:'Set In Pos' }, \
                        outButton: Button { text:'Set Out Pos' } \
                    }, \
                    btnCreateSlides: Button { text:'Create slides...' } \
                }";

        var tabAlignText =
          "tab { \
                    text:'Review layers', \
                    alignment:['fill','fill'], alignChildren:['fill','top'], spacing:5, margins:5, minimumSize:[215,-1], \
                    titleSearch: StaticText { text:'Jump to layer middle points:' }, \
                    grpSearchLayers: Group { \
                        alignChildren:['fill','top'], spacing:3, \
                        btnSearchBack: Button { text:'<'}, \
                        btnSearchForw: Button { text:'>'} \
                    }, \
                    grpTextLayers: Group { alignChildren:['fill','fill'] } \
                }";

        var ressource =
          "group { \
                    orientation:'column', \
                }";
      } else {
        throw new Error("Not able to assign panel");
      }

      pan.margins = 1;
      pan.grp = pan.add(tabbedpanel);
      pan.grp.tabPreparation = pan.grp.add(tabPreparation);
      pan.grp.tabAlignText = pan.grp.add(tabAlignText);
      sbVideoScript.createSlidesButton = pan.grp.tabPreparation.btnCreateSlides;
      sbVideoScript.groupInOutButtons = pan.grp.tabPreparation.grpInOut;

      sbVideoScript.uiTemplateListDropDown =
        pan.grp.tabPreparation.grpTemplate.dropdown;
      sbVideoScript.setTemplateList(sbVideoScript.uiTemplateListDropDown);
      sbVideoScript.setContentList(pan.grp.tabPreparation.grpContentList);
      sbVideoScript.adjustUIForSplittedLayers(
        null,
        pan.grp.tabAlignText.grpTextLayers
      );
      sbVideoScript.groupInOutButtons.outButton.enabled = false;
      sbVideoScript.createSlidesButton.enabled = false;
      sbVideoScript.changeFindInOutButtonsState(
        false,
        pan.grp.tabPreparation.grpTimeControls
      );

      pan.grp.tabPreparation.btnLoadProjectData.onClick = sbVideoScript.onClickFunctionWrapper(
        "loadProjectData",
        []
      );
      sbVideoScript.groupInOutButtons.inButton.onClick = sbVideoScript.onClickFunctionWrapper(
        "setInOutLayer",
        ["inButton", "outButton"]
      );
      sbVideoScript.groupInOutButtons.outButton.onClick = sbVideoScript.onClickFunctionWrapper(
        "setInOutLayer",
        ["outButton", "inButton"]
      );
      sbVideoScript.createSlidesButton.onClick = sbVideoScript.onClickFunctionWrapper(
        "createSlides",
        []
      ); // createSlides(panel, statusObj, statusColors);

      pan.grp.tabPreparation.grpTimeControls.rewSecs10.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [-10, "seconds"]
      );
      pan.grp.tabPreparation.grpTimeControls.rewSecs1.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [-1, "seconds"]
      );
      pan.grp.tabPreparation.grpTimeControls.rewFrm1.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [-1, "frames"]
      );
      pan.grp.tabPreparation.grpTimeControls.forwFrm1.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [1, "frames"]
      );
      pan.grp.tabPreparation.grpTimeControls.forwSecs1.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [1, "seconds"]
      );
      pan.grp.tabPreparation.grpTimeControls.forwSecs10.onClick = sbVideoScript.onClickFunctionWrapper(
        "setActiveTimeInTimeline",
        [10, "seconds"]
      );

      pan.grp.tabAlignText.grpSearchLayers.btnSearchBack.onClick = sbVideoScript.onClickFunctionWrapper(
        "searchItemInTimeline",
        [-1]
      );
      pan.grp.tabAlignText.grpSearchLayers.btnSearchForw.onClick = sbVideoScript.onClickFunctionWrapper(
        "searchItemInTimeline",
        [1]
      );

      pan.onResizing = pan.onResize = function() {
        this.layout.resize();
      };

      if (pan instanceof Window) {
        pan.center();
        pan.show();
      } else {
        pan.layout.layout(true);
        pan.layout.resize();
      }

      return pan;
    } catch (e) {
      throw new sbVideoScript.RuntimeError({
        func: "createUI",
        title: "Error creating the main user interface",
        message: e.message
      });
    }
  };
}
