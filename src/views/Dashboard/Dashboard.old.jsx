import Icon from "@material-ui/core/Icon";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import AccessTime from "@material-ui/icons/AccessTime";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import DateRange from "@material-ui/icons/DateRange";
import Edit from "@material-ui/icons/Edit";
import Language from "@material-ui/icons/Language";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Refresh from "@material-ui/icons/Refresh";
// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import Update from "@material-ui/icons/Update";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import PropTypes from "prop-types";
import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import {
  completedTasksChart,
  dailySalesChart,
  emailsSubscriptionChart
} from "variables/charts";
import ListingCard from "components/ListingCard/ListingCard.jsx";
import { user } from "firebase/index.js";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

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
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>$34,245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <i className="fab fa-twitter" />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success" icon>
                <CardIcon color="success">
                  <Language />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Global Sales by Top Locations
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="space-between">
                  <GridItem xs={12} sm={12} md={5}>
                    <Table
                      tableData={[
                        [
                          <img src={us_flag} alt="us_flag" />,
                          "USA",
                          "2.920",
                          "53.23%"
                        ],
                        [
                          <img src={de_flag} alt="us_flag" />,
                          "Germany",
                          "1.300",
                          "20.43%"
                        ],
                        [
                          <img src={au_flag} alt="us_flag" />,
                          "Australia",
                          "760",
                          "10.35%"
                        ],
                        [
                          <img src={gb_flag} alt="us_flag" />,
                          "United Kingdom",
                          "690",
                          "7.87%"
                        ],
                        [
                          <img src={ro_flag} alt="us_flag" />,
                          "Romania",
                          "600",
                          "5.94%"
                        ],
                        [
                          <img src={br_flag} alt="us_flag" />,
                          "Brasil",
                          "550",
                          "4.34%"
                        ]
                      ]}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent"
                      zoomOnScroll={false}
                      containerStyle={{
                        width: "100%",
                        height: "280px"
                      }}
                      containerClassName="map"
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0
                        }
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData,
                            scale: ["#AAAAAA", "#444444"],
                            normalizeFunction: "polynomial"
                          }
                        ]
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="info" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="warning" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="danger" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <h3>Manage Listings</h3>
        <br />
        <GridContainer>
          {listings &&
            listings.map((prop, key) => {
              let component = null;
              if (prop.location && prop.location.address) {
                component = (
                  <GridItem xs={12} sm={6} md={6} lg={4} xl={2} key={key}>
                    <ListingCard title={prop.location.address} />
                  </GridItem>
                );
              }
              return component;
            })}
          {/* <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
            <ListingCard />
          </GridItem> */}
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);