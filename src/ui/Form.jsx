import styled, { css } from "styled-components";

const Form = styled.form.attrs((props) => ({ type: "regular", ...props }))`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;
// Form.attrs((props) => ({ type: "regular", ...props }));
//defaultProps(react feature) is deprecated. use attrs(styled component feature)
//and spread props,to overwrite type if specified.

export default Form;
