window.addEventListener("load", () => {
  const htmlProducts = [];
  const { name, products } = JSON.parse(localStorage.getItem("custumer"));
  document.querySelector(
    ".email-main-custumer--name"
  ).innerHTML = `Olá ${name}`;

  products.forEach((product) => {
    htmlProducts.push(`
    <li class="email-main__product-card">
    <img class="email-main__product-image" src=${product.image} alt=Imagem de ${product.name} />
    <div class="email-main__product-info">
    <h5 class="email-main__product-name">${product.name}</h5>
    <p class="email-main__product-description">
        ${product.description}
    </p>
    <span class="email-main__product-old--price">De: R$${product.oldPrice}</span>
    <span class="email-main__product-current--price"
        >Por: R$${product.price}</span
    >
    <span class="email-main__product-installment"
        >ou ${product.installments.count}x de R$${product.installments.value}</span
    >
    <button class="email-main__product-button">Comprar</button>
    </div>
</li>
    
    
    `);
  });
  document.querySelector(
    ".email-main__product-list"
  ).innerHTML = htmlProducts.join(" ");
});
