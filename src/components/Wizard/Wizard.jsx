import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    var width;
    var mainstepsArray = [];
    var conditionalSteps = [];

    // fire callback on each step change
    // this is necessary should the callback require initialization
    this.props.callback && this.props.callback();

    this.props.steps.forEach((prop, key) => {
      if ((this.props.mainsteps && prop.mainstep) || key === 0) {
        mainstepsArray.push(key);
      } else {
        mainstepsArray.push(mainstepsArray[key - 1]);
      }
      // checking for conditional steps
      if (
        (!(this.props.mainsteps && prop.mainstep) || key !== 0) &&
        prop.conditional === true
      ) {
        conditionalSteps.push(key);
      }
    });

    console.log(conditionalSteps);

    const unique = (value, index, self) => {
      return index === 0 ? true : self.indexOf(value) === index;
    };
    const uniqueMainsteps = mainstepsArray.filter(unique);

    if (this.props.mainsteps) {
      if (uniqueMainsteps.length === 1) {
        width = "100%";
      } else {
        if (window.innerWidth < 600) {
          if (uniqueMainsteps.length !== 3) {
            width = "50%";
          } else {
            width = 100 / 3 + "%";
          }
        } else {
          if (uniqueMainsteps.length === 2) {
            width = "50%";
          } else {
            width = 100 / 3 + "%";
          }
        }
      }
    } else {
      if (this.props.steps.length === 1) {
        width = "100%";
      } else {
        if (window.innerWidth < 600) {
          if (this.props.steps.length !== 3) {
            width = "50%";
          } else {
            width = 100 / 3 + "%";
          }
        } else {
          if (this.props.steps.length === 2) {
            width = "50%";
          } else {
            width = 100 / 3 + "%";
          }
        }
      }
    }

    this.state = {
      currentStep: 0,
      mainstep: 0,
      mainstepId: {},
      mainstepIdKey: 0,
      mainstepsArray: mainstepsArray,
      uniqueMainsteps: uniqueMainsteps,
      conditionalSteps: conditionalSteps,
      conditionalPassed: [],
      skip: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {}
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.callbacks = this.callbacks.bind(this);
    this.conditionalSkip = this.conditionalSkip.bind(this);
    this.wizard = React.createRef();
  }
  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    if (this.props.mainsteps) {
      this.refreshAnimation(this.state.mainstepsArray[this.state.currentStep]);
    } else {
      this.refreshAnimation(this.state.currentStep);
    }
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: {
                ...this.state.allStates,
                [this.props.steps[i].stepId]: this[
                  this.props.steps[i].stepId
                ].sendState()
              }
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false &&
            this.props.validate
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
        // fire callback on step change
        this.props.callback &&
          this.state.allStates &&
          this.props.callback(this.state.allStates);
      }
    }
  }
  nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState({
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        });
      }
      // for conditional steps
      let skip = this.state.skip ? this.state.skip : 0;
      var key = this.state.currentStep + skip + 1;
      if (key >= this.props.steps.length) {
        // skip out of bounds correction
        key = this.props.steps.length - skip - 1;
      }
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + skip + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length <= key + skip + 1 ? true : false
      });

      if (this.props.mainsteps) {
        this.refreshAnimation(this.state.mainstepsArray[key]);
        // fire callback on mainstep change
        if (key === this.state.mainstepsArray[key]) {
          this.props.callback &&
            this.state.allStates &&
            this.props.callback(this.state.allStates);
        }
      } else {
        this.refreshAnimation(key);
        // fire callback on each step change
        this.props.callback &&
          this.state.allStates &&
          this.props.callback(this.state.allStates);
      }
      // reset skip after button click
      this.setState({ skip: 0 });
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: {
          ...this.state.allStates,
          [this.props.steps[this.state.currentStep].stepId]: this[
            this.props.steps[this.state.currentStep].stepId
          ].sendState()
        }
      });
    }
    // for conditional steps
    let skip = this.state.skip ? this.state.skip : 0;
    var key = this.state.currentStep - skip - 1;
    if (key < 0) {
      // skip out of bounds correction
      key = 0;
    }
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + skip + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length <= key + skip + 1 ? true : false
      });

      if (this.props.mainsteps) {
        if (this.state.mainstepsArray[key] <= key) {
          this.refreshAnimation(this.state.mainstepsArray[key]);
          // fire callback on mainstep change
          this.state.mainstepsArray[key] === key &&
            this.props.callback &&
            this.state.allStates &&
            this.props.callback(this.state.allStates);
        }
      } else {
        this.refreshAnimation(key);
        // fire callback on each step change
        this.props.callback &&
          this.state.allStates &&
          this.props.callback(this.state.allStates);
      }
    }
  }
  finishButtonClick() {
    if (
      this.props.validate &&
      ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
        undefined &&
        this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
        this[this.props.steps[this.state.currentStep].stepId].isValidated ===
          undefined) &&
      this.props.finishButtonClick !== undefined
    ) {
      this.props.finishButtonClick();
    }
  }
  refreshAnimation(index) {
    var total;
    var total_steps;

    const currentMainstep = this.state.uniqueMainsteps.findIndex(
      step => step === index
    );

    if (this.props.mainsteps) {
      total = this.state.uniqueMainsteps.length;
      total_steps = this.state.uniqueMainsteps.length;
    } else {
      total = this.props.steps.length;
      total_steps = this.props.steps.length;
    }
    var li_width = 100 / total;
    var move_distance = this.wizard.children[0].offsetWidth / total_steps;
    var index_temp;
    this.props.mainsteps
      ? (index_temp = currentMainstep)
      : (index_temp = index);
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.children[0].offsetWidth / 2;
      this.props.mainsteps
        ? (index_temp = currentMainstep % 2)
        : (index_temp = index % 2);
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };

    if (this.props.mainsteps) {
      if (this.props.steps[index].mainstep) {
        this.setState({ movingTabStyle: movingTabStyle });
      }
    } else {
      this.setState({ movingTabStyle: movingTabStyle });
    }
  }
  conditionalSkip(skip) {
    this.setState({ skip: skip }, () => {
      // for conditional steps
      let skip = this.state.skip ? this.state.skip : 0;
      var key = this.state.currentStep + skip + 1;
      if (key >= this.props.steps.length) {
        // skip out of bounds correction
        key = this.props.steps.length - skip - 1;
      }
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + skip + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length <= key + skip + 1 ? true : false
      });
    });
  }
  passCondition(steps) {
    if (Array.isArray(steps) && this.state.conditionalSteps) {
      let passedSteps = this.state.conditionalSteps.filter(
        index => !steps.includes(index)
      );

      let allPassed = this.state.conditionalPassed;

      const unique = (value, index, self) => {
        return index === 0 ? true : self.indexOf(value) === index;
      };
      this.setState({ conditionalPassed: allPassed.filter(unique) }, () =>
        console.log(this.state.conditionalPassed)
      );
    }

    // this.setState({ conditionalPassed: passedSteps }, () => {
    //   // for conditional steps
    //   let skip = this.state.skip ? this.state.skip : 0;
    //   var key = this.state.currentStep + skip + 1;
    //   if (key >= this.props.steps.length) {
    //     // skip out of bounds correction
    //     key = this.props.steps.length - skip - 1;
    //   }
    //   this.setState({
    //     currentStep: key,
    //     nextButton: this.props.steps.length > key + skip + 1 ? true : false,
    //     previousButton: key > 0 ? true : false,
    //     finishButton: this.props.steps.length <= key + skip + 1 ? true : false
    //   });
    // });
  }
  callbacks(data) {
    data && this.passCondition(data);
  }
  render() {
    const {
      classes,
      title,
      subtitle,
      color,
      steps,
      mainsteps,
      data
    } = this.props;
    return (
      <div className={classes.wizardContainer} ref={ref => (this.wizard = ref)}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            {subtitle && <h5 className={classes.subtitle}>{subtitle}</h5>}
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                let stepComponent = (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <a
                      className={classes.stepsAnchor}
                      onClick={() => this.navigationStepChange(key)}
                    >
                      {prop.stepName}
                    </a>
                  </li>
                );
                return mainsteps
                  ? prop.mainstep || key === 0
                    ? stepComponent
                    : null
                  : stepComponent;
              })}
            </ul>
            {mainsteps ? (
              steps[this.state.currentStep].mainstep ||
              this.state.currentStep === 0 ? (
                <div
                  className={classes.movingTab + " " + classes[color]}
                  style={this.state.movingTabStyle}
                >
                  {
                    steps[this.state.mainstepsArray[this.state.currentStep]]
                      .stepName
                  }
                </div>
              ) : (
                <div
                  className={classes.movingTab + " " + classes[color]}
                  style={this.state.movingTabStyle}
                >
                  {
                    steps[this.state.mainstepsArray[this.state.currentStep]]
                      .stepName
                  }
                </div>
              )
            ) : (
              <div
                className={classes.movingTab + " " + classes[color]}
                style={this.state.movingTabStyle}
              >
                {steps[this.state.currentStep].stepName}
              </div>
            )}
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                    callback={this.callbacks}
                    data={data}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <GridContainer justify="space-evenly">
              <GridItem xs={6} sm={4}>
                {this.state.previousButton ? (
                  <Button
                    className={this.props.previousButtonClasses}
                    onClick={() => this.previousButtonClick()}
                  >
                    {this.props.previousButtonText}
                  </Button>
                ) : null}
              </GridItem>
              <GridItem xs={6} md={5}>
                <GridContainer justify="flex-end">
                  <GridItem>
                    {this.state.nextButton ? (
                      <Button
                        color="urbanshelter"
                        className={this.props.nextButtonClasses}
                        onClick={() => this.nextButtonClick()}
                      >
                        {this.props.nextButtonText}
                      </Button>
                    ) : null}
                    {this.state.finishButton ? (
                      <Button
                        color="urbanshelter"
                        className={this.finishButtonClasses}
                        onClick={() => this.finishButtonClick()}
                      >
                        {this.props.finishButtonText}
                      </Button>
                    ) : null}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

Wizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  // subtitle: "And this would be your subtitle",
  mainsteps: false,
  previousButtonText: "Previous",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Next",
  finishButtonClasses: "",
  finishButtonText: "Finish"
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired,
      mainstep: PropTypes.bool
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "urbanshelter"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mainsteps: PropTypes.bool,
  callback: PropTypes.func,
  data: PropTypes.any,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool
};

export default withStyles(wizardStyle)(Wizard);
