// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import Refresh from "@material-ui/icons/Refresh";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import React from "react";
import SectionCarousel from "./SectionCarousel.jsx";

class ListingCard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card product className={classes.cardHover}>
        <CardHeader image carousel>
          <SectionCarousel />
        </CardHeader>
        <CardBody>
          <div className={classes.cardHoverUnder}>
            <Tooltip
              id="tooltip-top"
              title="View"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button color="transparent" simple justIcon>
                <ArtTrack className={classes.underChartIcons} />
              </Button>
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Edit"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button color="success" simple justIcon>
                <Refresh className={classes.underChartIcons} />
              </Button>
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Remove"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button color="danger" simple justIcon>
                <Edit className={classes.underChartIcons} />
              </Button>
            </Tooltip>
          </div>
          <h4 className={classes.cardProductTitle}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              Cozy 5 Stars Apartment
            </a>
          </h4>
          <p className={classes.cardProductDesciprion}>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to "Naviglio" where you can enjoy the main night life
            in Barcelona.
          </p>
        </CardBody>
        <CardFooter product>
          <div className={classes.price}>
            <h4>$899/night</h4>
          </div>
          <div className={`${classes.stats} ${classes.productStats}`}>
            <Place /> Barcelona, Spain
          </div>
        </CardFooter>
      </Card>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ListingCard);
