const apiId = 'kko';
const productsList = document.querySelector(".card");
const selectDom = document.querySelector(".selectCar") ;
const cartList = document.querySelector(".cartsTbody")
const cartTotal = document.querySelector(".cartTotal")
let productsData = [];
let cartsData =[];
//https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/kko/products
//https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/kko/carts



//初始化產品資料
function init() {
    axios.get(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${apiId}/products`)
        .then(function (response) {
    // handle success
         console.log(response);
        productsData = response.data.products;
        console.log(productsData);
        cardPut();
  });
};

//初始化購物車資料
function initcart() {
    axios.get(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${apiId}/carts`)
    .then(function (response) {
     console.log(response);
     cartsData = response.data.carts;
     console.log(cartsData);
     cartput();
    });
};



//-----------------產品列表-------------------------
function cardPut() {
    let cardHtml = '';
    productsData.forEach(function (item ) {
        let cardData = ` <li  >
                            <div class="cardImg" >       
                                    <img  src="${item.images}" alt=""/>  
                                <div class="CardNew">新品</div>
                            </div>
                            <div class="cardText"> <a href="#" class ="addCar" data-id = ${item.id}>加入購物車</a></div>
                            <div class="Pname">${item.title}</div>
                            <div class="Pname" style="text-decoration:line-through;">${item.origin_price}</div>
                            <div class="price">${item.price}</div>
                        </li>`;
        cardHtml+=cardData;
    });
    productsList.innerHTML =  cardHtml;
    const list =  document.querySelector(".addCar") ;
    console.log(list);
};



//-----------------購物車-------------------------
function cartput() {
    let cartHtml = '';
    let cartPrice = '';
    cartsData.forEach(function (item ) {
        let cartData = `<td>
        <img src="${item.product.images}">
        ${item.product.title}</td>
        <td>${item.product.title}</td> 
        <td>1</td> 
        <td>NT$${item.product.price}</td>
        <td><a href="#" data-id =${item.product.id} ><img style="width: 30px; height: 30px;" src="https://i.imgur.com/FvkjACF.png"></a></td>  
    </tr>`;
        cartHtml += cartData;
        let carttotalprice = Number(item.product.price);
        cartPrice += carttotalprice ;
    });
    cartList.innerHTML = cartHtml;
    cartTotal.innerHTML = `NT$${cartPrice}`;
};

//---------------搜選-------------------------
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
        let cardData = ` <li  >
                        <div class="cardImg" >       
                                <img  src="${item.images}" alt=""/>  
                            <div class="CardNew">新品</div>
                        </div>
                        <div class="cardText"> <a href="#"   class ="addCar" data-id = ${item.id}>加入購物車</a></div>
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
initcart();