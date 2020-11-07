import styled from 'styled-components'

const PageListItem = styled.li`
  border:none;
  border-radius:5px;
  background-color:${(props) => props.isActive ? '#000' : '#fff'};
  color:${(props) => props.isActive ? '#fff' : '#000'};
  margin:0 4px;
  padding:5px 15px;
  transition:all 0.3s;
  &:hover{
    cursor: pointer;
    color:#fff;
    background-color:#000;
  }
`

export default PageListItem;
