import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({ options, value, ...props }) {
  return (
    // spreading of props in the attrib field only works in react
    //not in normal javascript
    //About value attribute in Select:
    //The html select has no value attrib
    //The javascript select object has the value property
    //The jsx Select has the value attrib
    <StyledSelect value={value} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
export default Select;
