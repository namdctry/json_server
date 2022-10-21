window.onload = () => {
  const images = document.querySelectorAll('.gallery-product-detail .swiper-slide img');
  const name = document.getElementsByClassName('box-product-name')[0].innerText;
  const price = parseInt(
    document
      .getElementsByClassName('product__price--through')[0]
      .innerText.replace(/₫|\.|[^\d]/g, ''),
    10
  );
  const salePrice = parseInt(
    document.getElementsByClassName('product__price--show')[0].innerText.replace(/₫|\.|[^\d]/g, ''),
    10
  );

  const productImages = [];
  images.forEach((it) => {
    productImages.push(it.src);
  });

  const item = {
    name,
    price,
    salePrice,
    images: productImages,
    categoryId: 7,
  };

  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.top = 0;
  input.style.left = 0;
  input.style.width = '300px';
  input.style.zIndex = 1000000000;
  input.classList.add('my-input-add');

  input.value = JSON.stringify(item);

  document.body.appendChild(input);
};
