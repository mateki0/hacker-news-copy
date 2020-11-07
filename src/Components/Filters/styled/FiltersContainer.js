import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  margin-bottom: 20px;
  @media only screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 50px;
  }
`;
export default FiltersContainer;
