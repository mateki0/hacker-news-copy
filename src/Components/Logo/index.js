import React, {Component} from 'react';
import LogoText from './styled/LogoText';
import LogoWrapper from './styled/LogoWrapper';

class Logo extends Component{
  render(){
    return(
      <LogoWrapper>
        <LogoText>H</LogoText>
      </LogoWrapper>
    )
  }
}
export default Logo;