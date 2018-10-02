// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import listingCardStyle from "assets/jss/material-dashboard-pro-react/components/listingCardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import PropTypes from "prop-types";
import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SectionCarousel from "../Carousel/SectionCarousel";
import Truncate from "react-truncate";

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
    const { classes, title } = this.props;
    return (
      <Card listing>
        <CardHeader image carousel>
          <SectionCarousel />
        </CardHeader>
        <CardBody>
          <CardBody listing>
            <GridContainer direction="column" style={{ paddingRight: 8 }}>
              <GridItem xs={12}>
                <h3 className={classes.cardProductTitle}>
                  <Truncate lines={1} ellipsis={<span>...</span>}>
                    {title || "1 Victoria St S"}
                  </Truncate>
                </h3>
              </GridItem>
              <GridItem xs={12}>
                <p className={classes.cardProductDesciprion}>
                  <Truncate lines={1} ellipsis={<span>...</span>}>
                    Kitchener, ON
                  </Truncate>
                </p>
              </GridItem>
            </GridContainer>
            <Button
              color="urbanshelter"
              style={{
                marginRight: "0px",
                fontSize: "16px",
                minWidth: "30px",
                minHeight: "30px"
              }}
            >
              $1200/m
            </Button>
          </CardBody>
          <div style={{ marginTop: "-20px" }}>
            <p className={classes.cardProductDesciprion}>
              <Truncate lines={1} ellipsis={<span>...</span>}>
                Available from Oct 1st | Unfurnished | 1 Bedroom Available
              </Truncate>
            </p>
          </div>
        </CardBody>
        <CardFooter plain listing>
          <p className={classes.cardProductDesciprion}>★★★★★ (86)</p>
          <p className={classes.cardProductDesciprion}>5 Beds</p>
          <p className={classes.cardProductDesciprion}>2 Baths</p>
          <p className={classes.cardProductDesciprion}>1200 Sqft</p>
        </CardFooter>
      </Card>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(listingCardStyle)(ListingCard);
