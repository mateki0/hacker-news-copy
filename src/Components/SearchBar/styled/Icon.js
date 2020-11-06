import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Icon = styled(FontAwesomeIcon)`
  position:absolute;
  white-space: nowrap;
  transform:translateY(-50%);
  right:0;
  top:50%;
  &.fa-search{
  margin-right:20px;
  font-size:20px
}
&:hover{
  cursor:pointer;
}
@media screen and (min-width:768px){
  right:20px;
}
  `
  export default Icon;