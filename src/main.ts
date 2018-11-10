import { createUi } from "./create-ui";

try {
    const sbVideoScript = {};
    sbVideoScript.uiPanel = createUi(this);
} catch (e) {
    alert(e.message);
}
