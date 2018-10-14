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

    this.props.steps.map((prop, key) => {
      if (this.props.mainsteps && prop.mainstep) {
        mainstepsArray.push(key);
      }
    });

    console.log(mainstepsArray);

    if (this.props.mainsteps) {
      if (mainstepsArray.length === 1) {
        width = "100%";
      } else {
        if (window.innerWidth < 600) {
          if (mainstepsArray.length !== 3) {
            width = "50%";
          } else {
            width = 100 / 3 + "%";
          }
        } else {
          if (mainstepsArray.length === 2) {
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
  }
  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: [
                ...this.state.allStates,
                {
                  [this.props.steps[i].stepId]: this[
                    this.props.steps[i].stepId
                  ].sendState()
                }
              ]
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
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

        if (this.props.mainsteps && this.props.steps[key].mainstep) {
          this.setState({
            mainstep: key
          });
        }
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
          allStates: [
            ...this.state.allStates,
            {
              [this.props.steps[this.state.currentStep].stepId]: this[
                this.props.steps[this.state.currentStep].stepId
              ].sendState()
            }
          ]
        });
      }
      var key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
      if (this.props.mainsteps && this.props.steps[key].mainstep) {
        this.setState({
          mainstep: key
        });
      }
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: [
          ...this.state.allStates,
          {
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        ]
      });
    }
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);

      if (
        this.props.mainsteps &&
        this.state.mainstep > this.state.currentStep
      ) {
        this.setState({
          mainstep: key
        });
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

    if (this.props.mainsteps) {
      total = this.state.mainstepsArray.length;
      total_steps = this.state.mainstepsArray.length;
    } else {
      total = this.props.steps.length;
      total_steps = this.props.steps.length;
    }
    var li_width = 100 / total;
    var move_distance = this.refs.wizard.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    console.log(move_distance);
    console.log(this.refs.wizard.children[0].offsetWidth);

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.refs.wizard.children[0].offsetWidth / 2;
      index_temp = index % 2;
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

    this.props.mainsteps
      ? this.props.steps[index].mainstep
        ? this.setState({ movingTabStyle: movingTabStyle })
        : {}
      : this.setState({ movingTabStyle: movingTabStyle });

      this.setState({ movingTabStyle: movingTabStyle });
  }
  render() {
    const { classes, title, subtitle, color, steps, mainsteps } = this.props;
    return (
      <div className={classes.wizardContainer} ref="wizard">
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
                  ? prop.mainstep
                    ? stepComponent
                    : null
                  : stepComponent;
              })}
            </ul>
            {mainsteps ? (
              steps[this.state.currentStep].mainstep ? (
                <div
                  className={classes.movingTab + " " + classes[color]}
                  style={this.state.movingTabStyle}
                >
                  {steps[this.state.mainstep].stepName}
                </div>
              ) : (
                <div
                  className={classes.movingTab + " " + classes[color]}
                  style={this.state.movingTabStyle}
                >
                  {steps[this.state.mainstep].stepName}
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
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <GridContainer justify="space-evenly">
              <GridItem xs={6} sm={4} md={4}>
                {this.state.previousButton ? (
                  <Button
                    className={this.props.previousButtonClasses}
                    onClick={() => this.previousButtonClick()}
                  >
                    {this.props.previousButtonText}
                  </Button>
                ) : null}
              </GridItem>
              <GridItem xs={6} sm={4} md={4}>
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
            {/* <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
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
            </div> */}
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
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mainsteps: PropTypes.bool,
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
