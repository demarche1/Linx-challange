// Variables

let url =
  "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1";
const productList = [];
const fakeEmailProductsList = [];

// Functions

const fetchProducts = async () => {
  const response = await fetch(url);
  ({ nextPage, products } = await response.json());

  [product1, product2] = products;

  if (fakeEmailProductsList.length < 2) {
    fakeEmailProductsList.push(product1, product2);
  }

  products.forEach((product) => {
    productList.push(
      `<li class="index-main__card">
              <img class="index-main__image" src=${
                product.image
              } alt=imagem de ${product.name} />
              <div class="index-main__product-info">
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
              </div>
            </li>`
    );
  });

  document.querySelector(
    ".index-main__products-list"
  ).innerHTML = productList.join(" ");

  url = "https://" + nextPage;
};

const sendEmail = (event) => {
  event.preventDefault();

  if (event.target.classList.contains("index-footer__form")) {
    const name = document.querySelector("#footer-newsletter-name").value;

    const stringfyCutumer = JSON.stringify({
      name,
      products: fakeEmailProductsList,
    });

    localStorage.setItem("custumer", stringfyCutumer);

    window.location.href = "/email.html";
  } else if (event.target.classList.contains("index-main__form")) {
    const name = document.querySelector("#main-form__name").value;

    const stringfyCutumer = JSON.stringify({
      name,
      products: ([product1, product2] = fakeEmailProductsList),
    });

    localStorage.setItem("custumer", stringfyCutumer);

    window.location.href = "/email.html";
  }
};

// Events

window.addEventListener("load", fetchProducts);

document
  .querySelector(".index-main__more-products")
  .addEventListener("click", fetchProducts);

document
  .querySelector(".index-footer__form")
  .addEventListener("submit", sendEmail);
document
  .querySelector(".index-main__form")
  .addEventListener("submit", sendEmail);
