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
import Step12 from "./WizardSteps/Step12.jsx";
import Step13 from "./WizardSteps/Step13.jsx";
import Step14 from "./WizardSteps/Step14.jsx";
import Step15 from "./WizardSteps/Step15.jsx";
import Step16 from "./WizardSteps/Step16.jsx";
import Step17 from "./WizardSteps/Step17.jsx";
import Step18 from "./WizardSteps/Step18.jsx";
import Step19 from "./WizardSteps/Step19.jsx";
import Step20 from "./WizardSteps/Step20.jsx";
import Step21 from "./WizardSteps/Step21.jsx";

// firebase
import { user } from "firebase/index.js";

class WizardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: null
    };

    this.saveDraft = this.saveDraft.bind(this);
    this.saveDocs = this.saveDocs.bind(this);
    this.callbacks = this.callbacks.bind(this);
  }

  saveDraft(data) {
    this.state.reference === null
      ? this.setState(
          { reference: user.generatePropertyDoc() },
          () => data && user.uploadData(data, this.state.reference)
        )
      : data && user.uploadData(data, this.state.reference);
  }

  saveDocs() {
    this.state.reference === null &&
      this.setState({ reference: user.generatePropertyDoc() });
  }

  callbacks(data) {
    // this.saveDraft(data);
  }

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} lg={10} xl={5}>
          <Wizard
            mainsteps
            validate
            callback={this.callbacks}
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
              },
              {
                stepName: "Legal",
                stepComponent: Step12,
                stepId: "address-legal"
              },
              {
                stepName: "Additional Docs",
                stepComponent: Step13,
                stepId: "address-additional"
              },
              {
                stepName: "Renting Process",
                stepComponent: Step14,
                stepId: "address-process"
              },
              {
                stepName: "Agreement",
                stepComponent: Step15,
                stepId: "address-agreement"
              },
              {
                stepName: "Start Date",
                stepComponent: Step16,
                stepId: "address-start"
              },
              {
                stepName: "End Date",
                stepComponent: Step17,
                stepId: "address-end"
              },
              {
                stepName: "Notice",
                stepComponent: Step18,
                stepId: "address-notice",
                conditional: true
              },
              {
                stepName: "Notice",
                stepComponent: Step19,
                stepId: "address-pricing"
              },
              {
                stepName: "Specials",
                stepComponent: Step20,
                stepId: "address-specials"
              },
              {
                stepName: "Discounts",
                stepComponent: Step21,
                stepId: "address-discounts"
              }
            ]}
            title="Let's get your home ready"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
