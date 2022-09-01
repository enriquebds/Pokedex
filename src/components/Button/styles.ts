import styled from "styled-components";

interface iStyledButton {
  width: number;
}

const StyledButton = styled.button<iStyledButton>`
  width: ${({ width }) => width}%;
  background: var(--color-red);

  margin: 5px 0;
  padding: 10px 0;

  font-weight: 900;
  font-size: 18px;

  border: 3px solid black;
  border-radius: 8px;
  box-shadow: 1.6px 1.6px;

  :hover {
    background-color: var(--color-red-focus);
    transform: translate(-1px, -1px);
    box-shadow: 2.4px 2.4px;
  }

  :active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px;
  }
`;

export default StyledButton;
