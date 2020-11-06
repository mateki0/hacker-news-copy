import styled from 'styled-components'

const SearchBox = styled.input`
  border:1px solid #000;
  border-radius:8px;
  width:93%;
  font-size:22px;
  font-family: 'Pathway Gothic One', sans-serif;
  padding-left:15px;
  @media only screen and(min-width:768px){
    width:100%;
  }
`
export default SearchBox;