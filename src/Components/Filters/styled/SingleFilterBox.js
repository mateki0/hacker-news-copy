import styled from 'styled-components';

const SingleFilterBox = styled.button`
  position: relative;
  background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : '#000')};
  font-weight: bold;
  font-size: 20px;
  font-family: 'Space Mono', monospace;
  border: none;
  width: 140px;
  height: 40px;
  z-index: 2;
  transform-style: preserve-3d;
  transition: background 0.2s ease-in 0s;
  margin-bottom: 15px;
  @media only screen and (min-width: 1024px) {
    margin: 0;
    &:hover {
      cursor: pointer;
      background-color: #000;
      color: #fff;
      ::after {
        right: 0;
        top: 0;
      }
    }
    ::after {
      content: '';
      position: absolute;
      top: ${(props) => (props.isActive ? '0' : '15px')};
      right: ${(props) => (props.isActive ? '0' : '15px')};
      z-index: 1;
      width: 100%;
      height: 100%;
      transform: translateZ(-1px);
      background-color: #000;
      pointer-events: none;
      transition: top 0.2s ease-in 0s, right 0.2s ease-in 0s;
    }

    :nth-of-type(4),
    :nth-of-type(5),
    :nth-of-type(6) {
      ::after {
        transition: top 0.2s ease-in 0s, left 0.2s ease-in 0s;
        right: 0;
        left: ${(props) => (props.isActive ? '0' : '15px')};
      }
      &:hover {
        ::after {
          top: 0;
          left: 0;
        }
      }
    }
  }
`;

export default SingleFilterBox;
