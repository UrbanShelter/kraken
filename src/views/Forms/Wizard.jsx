import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";
import Step5 from "./WizardSteps/Step5.jsx";
import Step6 from "./WizardSteps/Step6.jsx";

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} xl={5}>
          <Wizard
            mainsteps
            validate
            color="urbanshelter"
            steps={[
              {
                stepName: "Listing",
                stepComponent: Step4,
                stepId: "listing-address",
                mainstep: true
              },
              {
                stepName: "Details",
                stepComponent: Step5,
                stepId: "listing-detail"
              },
              {
                stepName: "Offerings",
                stepComponent: Step6,
                stepId: "listing-offering"
              },
              {
                stepName: "Media",
                stepComponent: Step4,
                stepId: "media1",
                mainstep: true
              },
              { stepName: "Custom", stepComponent: Step4, stepId: "custom5" }
            ]}
            title="Listing your home!"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
