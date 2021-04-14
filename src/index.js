const fetchProducts = async () => {
  const response = await fetch(url);
  ({ nextPage, products } = await response.json());
  products.forEach((product) => {
    productList.push(
      `<li class="index-main__card">
              <img class="index-main__image" src=${
                product.image
              } alt=imagem de ${product.name} />
              <h5 class="index-main__product-name">${product.name}</h5>
              <p class="index-main__product-description">
                 ${product.description}
              </p>
              <span class="index-main__product--last-price">De: R$${
                product.oldPrice
              }</span>
              <span class="index-main__product--current-price"
                  >Por: R$ ${product.price}</span
              >
              <span class="index-main__product-installment"
                  >Ou ${
                    product.installments.count
                  }x de R$${product.installments.value.toFixed(2)}</span
              >
              <button class="index-main__product-button">Comprar</button>
            </li>`
    );
  });
  document.querySelector(
    ".index-main__products-list"
  ).innerHTML = productList.join(" ");
  url = "https://" + nextPage;
};

let url =
  "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1";
const productList = [];
window.addEventListener("load", fetchProducts);

document
  .querySelector(".index-main__more-products")
  .addEventListener("click", fetchProducts);
