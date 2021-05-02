import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./style.css";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import moment from "moment";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      search_type: 1,
      pin_code: "",
      age: "",
      states: [],
      districts: [],
      selectedState: "",
      selectedDistrict: "",
      availableCenters: [],
      is_loading: false,
    };

    this.dateArray = [];
  }
  componentDidMount() {
    this.createDate();
  }
  createDate = () => {
    let start_date = moment(new Date());
    this.dateArray.push(start_date.format("DD-MM-YYYY"));
    for (let i = 0; i < 31; i++) {
      let d = start_date.add(1, "days").format("DD-MM-YYYY");
      this.dateArray.push(d);
    }
  };
  _chooseSearchType = (value) => {
    this.setState({ search_type: value }, () => {
      if (this.state.search_type === 2) {
        this._getStates();
      }
    });
  };
  _createData = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _chooseState = (e) => {
    this.setState({ selectedState: e.target.value }, () => {
      this._getDistricts();
    });
  };
  _chooseDistrict = (e) => {
    this.setState({ selectedDistrict: e.target.value }, () => {});
  };
  _getData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const response = res.data;
      console.log("res", response);
    });
  };
  _getStates = () => {
    axios
      .get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
      .then((res) => {
        const response = res.data;
        console.log("res", response);
        this.setState({ states: response.states });
      });
  };
  _getDistricts = () => {
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
          this.state.selectedState
      )
      .then((res) => {
        const response = res.data;
        console.log("res", response);
        this.setState({ districts: response.districts });
      });
  };
  _getDataByPinLoader = () => {
    if (
      this.state.pin_code == "" ||
      this.state.pin_code == undefined ||
      this.state.pin_code == null
    ) {
      alert("Please Enter Valid Pin Code ");
    } else if (
      this.state.age == "" ||
      this.state.age == undefined ||
      this.state.age == null
    ) {
      alert("Please Enter Valid Age");
    } else {
      this.setState({ is_loading: true, availableCenters: [] }, () => {
        this._getDataByPin();
      });
    }
  };
  _getDataByDistrictLoader = () => {
    if (
      this.state.selectedState == "" ||
      this.state.selectedState == undefined ||
      this.state.selectedState == null
    ) {
      alert("Please Choose State");
    } else if (
      this.state.selectedDistrict == "" ||
      this.state.selectedDistrict == undefined ||
      this.state.selectedDistrict == null
    ) {
      alert("Please Choose District");
    } else if (
      this.state.age == "" ||
      this.state.age == undefined ||
      this.state.age == null
    ) {
      alert("Please Enter Valid Age");
    } else {
      this.setState({ is_loading: true, availableCenters: [] }, () => {
        this._getDataByDistrict();
      });
    }
  };
  _getDataByPin = async () => {
    let _data = [];
    for (let date_item of this.dateArray) {
      await axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${this.state.pin_code}&date=${date_item}`
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data && res.data.centers && res.data.centers.length > 0) {
              for (let center of res.data.centers) {
                for (let session of center["sessions"]) {
                  if (session["min_age_limit"] <= this.state.age) {
                    if (session["available_capacity"] > 0) {
                      let availableCenter = {
                        date: date_item,
                        name: center["name"],
                        district_name: center["district_name"],
                        pincode: center["pincode"],
                        fee_type: center["fee_type"],
                        available_capacity: session["available_capacity"],
                        vaccine:
                          session["vaccine"] != "" ? session["vaccine"] : "",
                      };
                      _data.push(availableCenter);
                    }
                  }
                }
              }
            }
          }
        });
    }
    this.setState({ availableCenters: _data, is_loading: false });
  };
  _getDataByDistrict = async () => {
    let _data = [];
    for (let date_item of this.dateArray) {
      await axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${this.state.selectedDistrict}&date=${date_item}`
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data && res.data.centers && res.data.centers.length > 0) {
              for (let center of res.data.centers) {
                for (let session of center["sessions"]) {
                  if (session["min_age_limit"] <= this.state.age) {
                    if (session["available_capacity"] > 0) {
                      let availableCenter = {
                        date: date_item,
                        name: center["name"],
                        district_name: center["district_name"],
                        pincode: center["pincode"],
                        fee_type: center["fee_type"],
                        available_capacity: session["available_capacity"],
                        vaccine:
                          session["vaccine"] != "" ? session["vaccine"] : "",
                      };
                      _data.push(availableCenter);
                    }
                  }
                }
              }
            }
          }
        });
    }
    this.setState({ availableCenters: _data, is_loading: false });
  };
  render() {
    const {
      search_type,
      pin_code,
      age,
      selectedState,
      selectedDistrict,
      states,
      districts,
      availableCenters,
      is_loading,
    } = this.state;
    console.log("state", this.state);
    return (
      <React.Fragment>
        <Container maxWidth="md" component="main" className="heroContent">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <span style={{ color: "green" }}>
              Search for Vaccine Availiblity
            </span>
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Serach By Pin Code / District
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container justify="center">
            <span
              className={search_type === 1 ? "active" : "toggle"}
              onClick={() => this._chooseSearchType(1)}
            >
              Search By Pin
            </span>
            <span
              className={search_type === 2 ? "active" : "toggle"}
              onClick={() => this._chooseSearchType(2)}
            >
              Search By District
            </span>
          </Grid>
        </Container>
        {search_type === 1 ? (
          <Container maxWidth="md" component="main" style={{ marginTop: 50 }}>
            <Grid container className="root">
              <Grid item xs={12} md={4}>
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <TextField
                      id="outlined-basic"
                      label="Enter your PIN"
                      variant="outlined"
                      size="small"
                      name="pin_code"
                      value={pin_code}
                      type="number"
                      onChange={this._createData}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} className="mt">
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <TextField
                      id="outlined-basic"
                      label="Enter your Age"
                      variant="outlined"
                      size="small"
                      name="age"
                      value={age}
                      type="number"
                      onChange={this._createData}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} className="mt">
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this._getDataByPinLoader}
                    >
                      Search
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container maxWidth="md" component="main" style={{ marginTop: 50 }}>
            <Grid container className="root">
              <Grid item xs={12} md={3}>
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedState}
                      onChange={this._chooseState}
                    >
                      {states &&
                        states.length > 0 &&
                        states.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.state_id}>
                              {item.state_name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedDistrict}
                      onChange={this._chooseDistrict}
                    >
                      {districts &&
                        districts.length > 0 &&
                        districts.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.district_id}>
                              {item.district_name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid container justify="center">
                  <FormControl className="formInput" fullWidth={true}>
                    <TextField
                      id="outlined-basic"
                      label="Enter your Age"
                      size="small"
                      name="age"
                      value={age}
                      type="number"
                      onChange={this._createData}
                      style={{ marginTop: 4 }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} className="mt">
                <Grid container justify="center">
                  <FormControl className="buttonControl">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this._getDataByDistrictLoader}
                      size="large"
                    >
                      Search
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )}
        <Container maxWidth="md" component="main" style={{ marginTop: 50 }}>
          <Grid container className="root">
            <Grid item xs={12} md={12}>
              <Grid container justify="center">
                {availableCenters && availableCenters.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table
                      className="tableContianer"
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">District Name</TableCell>
                          <TableCell align="center">Pin Code</TableCell>
                          <TableCell align="center">
                            Available Capacity
                          </TableCell>
                          <TableCell align="center">Fee Type</TableCell>
                          <TableCell align="center">Vaccine</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {availableCenters &&
                          availableCenters.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">{row.date}</TableCell>

                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                {row.district_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.pincode}
                              </TableCell>
                              <TableCell align="center">
                                {row.available_capacity}
                              </TableCell>
                              <TableCell align="center">
                                {row.fee_type}
                              </TableCell>
                              <TableCell align="center">
                                {row.vaccine}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
                {is_loading ? <CircularProgress disableShrink /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
