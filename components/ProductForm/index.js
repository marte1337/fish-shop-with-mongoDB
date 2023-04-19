import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";
import { useRouter } from "next/router";

export default function ProductForm({
  nameValue,
  descriptionValue,
  priceValue,
  currencyValue,
  onSubmit,
  isEditMode,
}) {
  const router = useRouter();
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>
        {isEditMode ? "Edit the Fish" : "Add a new Fish"}
      </StyledHeading>
      <StyledLabel htmlFor="name">
        {isEditMode ? "Edit Name:" : "Enter Name:"}
        <input type="text" id="name" name="name" defaultValue={nameValue} />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        {isEditMode ? "Edit Description:" : "Enter Description:"}
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={descriptionValue}
        />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        {isEditMode ? "Edit Price:" : "Enter Price:"}
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          defaultValue={priceValue}
        />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        {isEditMode ? "Edit Currency:" : "Enter Currency:"}
        <select id="currency" name="currency" defaultValue={currencyValue}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      {isEditMode ? (
        <StyledButton type="submit" onClick={() => router.push("/")}>
          Edit
        </StyledButton>
      ) : (
        <StyledButton type="submit">Submit</StyledButton>
      )}
    </StyledForm>
  );
}
