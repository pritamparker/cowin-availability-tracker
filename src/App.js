import React from "react";
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Dashboard from "./screens/dashboard";
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useState } from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';



function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://eloop.dev/" target="blank">
        eloop.dev solutions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>  
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    paddingLeft: 20,
  },
}));

const footers = [
  {
    title: "About Us",
    description: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/p/COZixaBH3UJ/?igshid=7mnbz19bum7v",
      },
    ],
  },
  {
    title: "Code",
    description: [
      {
        name: "Github",
        url: "https://github.com/pritamparker/cowin-availability-tracker",
      },
    ],
  },
  {
    title: "Resources",
    description: [
      {
        name: "Vaccine Registration",
        url: "https://selfregistration.cowin.gov.in/",
      },
    ],
  },
  {
    title: "Legal",
    description: [
      { name: "Privacy policy", url: "#" },
      { name: "Terms & Conditions", url: "#" },
    ],
  },
];

const themeObject = createMuiTheme();

const ChangeThemeMode = ()=>{
  let [theme, setTheme] = useState(themeObject);
  let {palette:{type}} = theme;
  const localTheme = localStorage.getItem('theme');
  
  const toggleThemeBtn = ()=>{
    type = type === 'light' ? 'dark' : 'light';
    const updatedTheme = createMuiTheme({
      palette:{
        type: type
      }
    });
    localStorage.setItem('theme', type);
    setTheme(updatedTheme);
  }
  if(localTheme){
    type = localTheme;
    theme = createMuiTheme({
      palette:{
        type:type
      }
    })
  }
  return [theme, toggleThemeBtn, type];
}

export default function Pricing() {
  const classes = useStyles();
  const [theme, toggleThemeBtn, type]=ChangeThemeMode();
  const themeUpgraded = createMuiTheme(theme);
  return (
    <React.Fragment>
      <ThemeProvider theme={themeUpgraded}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Covid Vaccine Availability
          </Typography>
          <IconButton component="span" variant="contained" className="headerIcon">
            <Link
              href="https://github.com/pritamparker/cowin-availability-tracker"
              variant="subtitle1"
              color="textSecondary"
              target="blank"
            >              
              <GitHubIcon color="primary"/>
            </Link>
          </IconButton> 

          {/* toggle_dark_light_component */}
          <IconButton onClick={toggleThemeBtn}  component="span" variant="contained" className="headerIcon">
            <Link href="#">
                {type==='light'? <Brightness4Icon color="primary"/> : <Brightness7Icon color="primary"/>}
              </Link>
        </IconButton>
          
          
        

        </Toolbar>
      </AppBar>

      {/* Start Dashboard */}
      <Dashboard />
      {/* End Dashboard */}

      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      variant="subtitle1"
                      color="textSecondary"
                      target="blank"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
  );
}
