
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { grey } from '@material-ui/core/colors';
import Link from "@material-ui/core/Link";

const root = document.getElementById('root');

class ToggleDarkLightMOde extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
      if(this.state.isToggleOn){
        root.classList.add('ok')
      } else {
          root.classList.remove('ok')
      }
      console.log(root)

    }
  
    render() {
      return (
        <IconButton onClick={this.handleClick}  component="span" variant="contained" className="headerIcon">
            <Link href="#" id="toggleBtn">
                {this.state.isToggleOn ? <Brightness4Icon style={{ color: grey[800] }}/> : <Brightness7Icon style={{ color: grey[800] }}/>}
              </Link>
        </IconButton>
      );
    }
}
  

export default ToggleDarkLightMOde;