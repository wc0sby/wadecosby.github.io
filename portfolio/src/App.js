import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Nav.js';
import InfoCard from './Components/Card.js';
import GridList from './Components/grid'
import Welcome from './Components/Welcome'
import tilesData from './Data/projects.js'

import Slide from 'react-reveal/Slide';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


// import AppBarExampleIcon from './Components/AppBar';

class App extends Component {
  constructor(props){
  super(props)
    this.state = {
      open: false,
      navTag: 'welcome',
    }
    /*
    To add icons, input the material icon name and object key in an array below
      the first value is the material icon name
      the second value is the object id used to extract information from
        the infoObj
    */
    this.iconsForNav = [
      ['home', 'welcome', ['']],
      ['info', 'about', ['Resume']],
      ['code', 'projects', ['GitHub','Resume']],
      ['email', 'contact', ['Email','GitHub','LinkedIn']]
    ]
    this.wordsForScroll = [
      "Front-End ",
      "JavaScript ",
      "React and React-Native ",
      "VBA "
    ]
  }
  
  handleDrawerToggle = () => this.setState({open: !this.state.open});

  handleDrawerClose = () => {
    this.setState({open: false});
  }

  handleIconClicked = (id) => {
    this.setState({navTag: id})
  }

  rendorGridList = () => {
    return this.state.navTag === 'projects'
      ? <GridList/>
      : ''
  }

  linkPicker = () => {
    return(this.iconsForNav.map((item)=>{
      return item[1]===this.state.navTag
      ? item[2]
      : ''
      })
    )
  } 
  
  
  renderCard = () => {
    return (
      this.state.navTag === 'welcome'
      ? <Welcome children = {this.wordsForScroll}/>
      : (<Slide delay={3000}>
          <InfoCard
              navClicked = {this.state.navTag}
              linkToDisplay = {this.linkPicker()}
          />
        </Slide>
      )
    )
  }

  renderDrawerProjects = () => {
   return tilesData.map((tile, key) => {
      return (
        <a key={key} href={tile.img}>
          <MenuItem onClick={this.handleDrawerClose}>
              {tile.title}
          </MenuItem>
        </a>
      )   
    })
  }

  renderNavigation = () => {
   return(
      <Navigation 
      drawerFlag={this.state.drawerOpen}
      drawerToggle = {this.handleDrawerToggle}
      navIcons = {this.iconsForNav}
      getNavIconName = {this.handleIconClicked}
      name = 'Wade'
      />
    )
  }

  renderProjectDrawer = () =>{
    return (
      <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        {/* Render Menu items */}
        {<h2>Projects</h2>}
        {this.renderDrawerProjects()}
      </Drawer>
    )
  }

  render() {
    return (
      <div className='container'>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
          {/* Renders the page navigation */}
            {this.renderNavigation()}
          {/* Render the menu drawer */}
            {this.renderProjectDrawer()}
          {/* Render the information cards */}
            {this.renderCard()}
          {/* Render the grid list only when on skills tab */}
            {this.rendorGridList()}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
