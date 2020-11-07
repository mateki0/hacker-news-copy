import styled from 'styled-components'

const SearchBox = styled.input`
  border:none;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.1);
  border-radius:8px;
  width:93%;
  font-size:18px;
  font-family: 'Pathway Gothic One', sans-serif;
  padding-left:15px;
  @media only screen and(min-width:768px){
    width:100%;
  }
`
export default SearchBox;