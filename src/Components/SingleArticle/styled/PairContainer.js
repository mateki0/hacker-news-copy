import styled from 'styled-components'

const PairContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin:10px 20px;
  font-family: 'Pathway Gothic One', sans-serif;
  @media only screen and (min-width:768px){
    flex-direction:row;
    align-items:initial;
    justify-content:space-between;
    font-size:20px;
    marign:20px 40px;
  }
  `
export default PairContainer;