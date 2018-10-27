import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// import Step1 from "./WizardSteps/Step1.jsx";
// import Step2 from "./WizardSteps/Step2.jsx";
// import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";
import Step5 from "./WizardSteps/Step5.jsx";
import Step6 from "./WizardSteps/Step6.jsx";
import Step7 from "./WizardSteps/Step7.jsx";
import Step8 from "./WizardSteps/Step8.jsx";
import Step9 from "./WizardSteps/Step9.jsx";
import Step10 from "./WizardSteps/Step10.jsx";
import Step11 from "./WizardSteps/Step11.jsx";

// firebase
import { user } from "firebase/index.js";

class WizardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: null
    };

    this.saveDraft = this.saveDraft.bind(this);
  }

  saveDraft(data) {
    this.state.reference === null
      ? this.setState(
          { reference: user.generatePropertyDoc() },
          () => data && user.uploadData(data, this.state.reference)
        )
      : data && user.uploadData(data, this.state.reference);
  }

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} lg={10} xl={5}>
          <Wizard
            mainsteps
            validate
            data={{ reference: this.state.reference }}
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
                stepName: "Amenities",
                stepComponent: Step7,
                stepId: "listing-amenities"
              },
              {
                stepName: "Precautions",
                stepComponent: Step8,
                stepId: "listing-precautions"
              },
              {
                stepName: "Media",
                stepComponent: Step9,
                stepId: "media1",
                mainstep: true
              },
              {
                stepName: "Description",
                stepComponent: Step10,
                stepId: "media2"
              },
              {
                stepName: "Address",
                stepComponent: Step11,
                stepId: "address-info",
                mainstep: true
              }
            ]}
            title="Listing your home!"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
