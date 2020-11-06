import styled from "styled-components";

const ArticlesContainer = styled.div`
  display: grid;
  gap:20px;
  justify-items:center;
  align-items: center;
  
  @media screen and (min-width:1024px){
  grid-template-columns: 1fr 1fr;
  gap:30px;
  }
`;

export default ArticlesContainer;
