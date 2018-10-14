import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={12} xl={5}>
          <Wizard
            mainsteps
            validate
            steps={[
              {
                stepName: "About",
                stepComponent: Step1,
                stepId: "about",
                mainstep: true
              },
              {
                stepName: "About",
                stepComponent: Step1,
                stepId: "about1"
              },
              { stepName: "Account", stepComponent: Step2, stepId: "account" },
              { stepName: "Address", stepComponent: Step3, stepId: "address" },
              {
                stepName: "Custom",
                stepComponent: Step4,
                stepId: "custom",
                mainstep: true
              },
              { stepName: "Custom", stepComponent: Step4, stepId: "custom1" },
              {
                stepName: "Custom2",
                stepComponent: Step4,
                stepId: "custom2",
                mainstep: true
              },
              { stepName: "Custom", stepComponent: Step4, stepId: "custom3" },
              {
                stepName: "Custom2",
                stepComponent: Step4,
                stepId: "custom2",
                mainstep: true
              },
              { stepName: "Custom", stepComponent: Step4, stepId: "custom3" }
            ]}
            title="Listing your home!"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
