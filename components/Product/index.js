import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import ProductForm from "../ProductForm";
import Comments from "../Comments";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
  }
}

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(id ? `/api/products/${id}` : null);

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    sendRequest
  );

  function handleEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    trigger(productData);
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(response.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading || isMutating) {
    return <h1>Loading...</h1>;
  }

  if (!data) return;

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>

      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}

      <div>
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          <span role="img" aria-label="A pencil">
            ✏️
          </span>
        </button>
        <button onClick={handleDelete} disabled={isEditMode}>
          <span role="img" aria-label="A cross indicating deletion">
            ❌
          </span>
        </button>
      </div>
      {isEditMode && (
        <ProductForm
          onSubmit={handleEdit}
          value={data}
          nameValue={data.name}
          descriptionValue={data.description}
          priceValue={data.price}
          currencyValue={data.currency}
          isEditMode={true}
        />
      )}

      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
    </ProductCard>
  );
}
