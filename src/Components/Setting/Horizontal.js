import styled from "styled-components";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

const HorizontalLine = styled.div`
  width: 85%; /* Adjust width as needed */
  height: 0.5px; /* Line thickness */
  background-color: rgba(0, 0, 0, 0.5);
  margin: 110px 0;
  position: absolute;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    position: relative;
    margin-top: 50px;
    margin-bottom: 0;
    margin-left: 20px;
  }
`;

const Horizontal = () => {
  return (
    <div>
      <HorizontalLine />
    </div>
  );
};

export default Horizontal;
