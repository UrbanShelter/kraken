// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";
import { user } from "firebase/index.js";
import avatar from "assets/img/faces/marc.jpg";



class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      listings: null
    };

    // required to bind the callback function here
    // see: https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined
    this.callback = this.callback.bind(this);
  }
  // this callback is used to enable realtime updates
  callback(map) {
    map && this.setState({ listings: map });
  }
  componentDidMount() {
    // user.doTestRead().then(map => {
    //   this.setState({ listings: map });
    // });
    user.doRealtimeTestRead(this.callback);
    // for mobile touch lock
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.preventTouch, { passive: false });
  }
  componentWillUnmount() {
    // for mobile touch lock
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.preventTouch, {
      passive: false
    });
  }
  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const { listings } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={6} lg={4} xl={2}>
            <h3>Applicants</h3>
            <br />
            <GridContainer>
              {listings &&
                listings.map((prop, key) => {
                  let component = null;
                  if (prop.location && prop.location.address) {
                    component = (
                      <GridItem xs={12} sm={6} md={10} key={key}>
                        <Card profile>
                          <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img src={avatar} alt="..." />
                            </a>
                          </CardAvatar>
                          <CardBody profile>
                            <h6 className={classes.cardCategory}>
                              CEO / CO-FOUNDER
                            </h6>
                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                            <p className={classes.description}>
                              Don't be scared of the truth because we need to
                              restart the human foundation in truth And I love
                              you like Kanye loves Kanye I love Rick Owens’ bed
                              design but the back is...
                            </p>
                            <Button color="urbanshelter" round>
                              Details
                            </Button>
                          </CardBody>
                        </Card>
                        <div style={{ marginTop: -20, marginBottom: 50 }}>
                          <GridContainer>
                            <GridItem xs={6}>
                              <Button
                                variant="outlined"
                                color="transparent"
                                style={{ width: "100%" }}
                              >
                                Decline
                              </Button>
                            </GridItem>
                            <GridItem xs={6}>
                              <Button
                                color="urbanshelter"
                                style={{ width: "100%" }}
                              >
                                Accept
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </GridItem>
                    );
                  }
                  return component;
                })}
            </GridContainer>
          </GridItem>

          <GridItem xs={12} md={6} lg={4} xl={2}>
            <h3>Pending</h3>
            <br />
            <GridContainer>
              {listings &&
                listings.map((prop, key) => {
                  let component = null;
                  if (prop.location && prop.location.address) {
                    component = (
                      <GridItem xs={12} sm={6} md={10} key={key}>
                        <Card profile>
                          <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img src={avatar} alt="..." />
                            </a>
                          </CardAvatar>
                          <CardBody profile>
                            <h6 className={classes.cardCategory}>
                              CEO / CO-FOUNDER
                            </h6>
                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                            <p className={classes.description}>
                              Don't be scared of the truth because we need to
                              restart the human foundation in truth And I love
                              you like Kanye loves Kanye I love Rick Owens’ bed
                              design but the back is...
                            </p>
                            <Button color="urbanshelter" round>
                              Details
                            </Button>
                          </CardBody>
                        </Card>
                        <div style={{ marginTop: -20, marginBottom: 50 }}>
                          <GridContainer>
                            <GridItem xs={6}>
                              <Button
                                variant="outlined"
                                color="transparent"
                                style={{ width: "100%" }}
                              >
                                Decline
                              </Button>
                            </GridItem>
                            <GridItem xs={6}>
                              <Button
                                color="urbanshelter"
                                style={{ width: "100%" }}
                              >
                                Accept
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </GridItem>
                    );
                  }
                  return component;
                })}
            </GridContainer>
          </GridItem>

          <GridItem xs={12} md={6} lg={4} xl={2}>
            <h3>Approved</h3>
            <br />
            <GridContainer>
              {listings &&
                listings.map((prop, key) => {
                  let component = null;
                  if (prop.location && prop.location.address) {
                    component = (
                      <GridItem xs={12} sm={6} md={10} key={key}>
                        <Card profile>
                          <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img src={avatar} alt="..." />
                            </a>
                          </CardAvatar>
                          <CardBody profile>
                            <h6 className={classes.cardCategory}>
                              CEO / CO-FOUNDER
                            </h6>
                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                            <p className={classes.description}>
                              Don't be scared of the truth because we need to
                              restart the human foundation in truth And I love
                              you like Kanye loves Kanye I love Rick Owens’ bed
                              design but the back is...
                            </p>
                            <Button color="urbanshelter" round>
                              Details
                            </Button>
                          </CardBody>
                        </Card>
                        <div style={{ marginTop: -20, marginBottom: 50 }}>
                          <GridContainer>
                            <GridItem xs={6}>
                              <Button
                                variant="outlined"
                                color="transparent"
                                style={{ width: "100%" }}
                              >
                                Decline
                              </Button>
                            </GridItem>
                            <GridItem xs={6}>
                              <Button
                                color="urbanshelter"
                                style={{ width: "100%" }}
                              >
                                Accept
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </GridItem>
                    );
                  }
                  return component;
                })}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
