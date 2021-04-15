const apiId = 'kko';
const productsList = document.querySelector(".card");
const selectDom = document.querySelector(".selectCar") ;
let productsData = [];
//https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/kko/products
function init() {
    axios.get(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${apiId}/products`)
        .then(function (response) {
    // handle success
         console.log(response);
        productsData = response.data.products;
        console.log(productsData);
        cardPut();
  })
};
function cardPut() {
    let cardHtml = '';
    productsData.forEach(function (item ) {
        let cardData = ` <li  data-id = ${item.id}>
                            <div class="cardImg" >       
                                    <img  src="${item.images}" alt=""/>  
                                <div class="CardNew">新品</div>
                            </div>
                            <div class="cardText"> <a href="#">加入購物車</a></div>
                            <div class="Pname">${item.title}</div>
                            <div class="Pname" style="text-decoration:line-through;">${item.origin_price}</div>
                            <div class="price">${item.price}</div>
                        </li>`;
        cardHtml+=cardData;
    });
    productsList.innerHTML =  cardHtml;
};
selectDom.addEventListener("change",function (e) {
    let selectData = productsData;
    console.log(selectData );
    if (selectDom.value == "全部"){
        cardPut();
        return;
    }else {
       let searchData= selectData.filter(search =>search.category ==selectDom.value );
       let cardHtml = '';
       searchData.forEach(function (item) {
        let cardData = ` <li  data-id = ${item.id}>
                        <div class="cardImg" >       
                                <img  src="${item.images}" alt=""/>  
                            <div class="CardNew">新品</div>
                        </div>
                        <div class="cardText"> <a href="#">加入購物車</a></div>
                        <div class="Pname">${item.title}</div>
                        <div class="Pname" style="text-decoration:line-through;">${item.origin_price}</div>
                        <div class="price">${item.price}</div>
                        </li>`;
             cardHtml+=cardData;
       })
       productsList.innerHTML =  cardHtml;
    };
});
init();