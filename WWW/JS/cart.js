function loadBody() {
    var phone = localStorage.getItem("AUTH");
    if(phone === null) {
        window.location.href="/login";
    }
    else {
        loadCart(phone);
    }
}
function loadCart(phone) {
    var totalP = 0;
    phone = phone.slice(0, 10);
    phone = phone.split("");
    phone = phone.reverse();
    phone = phone.join("");
    fetch("http://127.0.0.1/loadCart:"+phone)
    .then(response => response.json())
    .then(data => {
      var len = data.length;
      for(var i = 0; i < len; i++) {
        var Each = data[i];
        var name = Each['productName'];
        if(screen.width< 440) {
        name = name.slice(0, 56);
        }
        else {
          name = name.slice(0, 96);
        }
        name = name+"....";
        var id = Each['productId'];
        var Url = Each['imgUrl1'];
        var price = Each['price'];
        var price2 = price.replace(",", "");
        price2 = parseInt(price2);
        totalP = totalP + price2;
        var category = Each['keywords'];
        category = category.split(",");
        var l = category.length;
        category = category[l-1];
        assign(name, id, Url, price, category);
      }
      var container = document.getElementById("number-div");
      container.innerHTML = `
      <h2 class="text-xl font-bold">Shoping Cart</h2>
            <h3 class="text-xl font-bold">${len} Items</h3>
      `;
      var container2 = document.getElementById("div-3");
      container2.innerHTML = `<span class="uppercase">Total cost</span>
      <span>${totalP}</span>`;
      var container3 = document.getElementById("div-4");
      container3.innerHTML = `
      <span class="text-sm font-medium text-gray-400 mr-1"
                  >Subtotal:</span
                >
                <span class="text-lg font-bold text-gray-800"> ${totalP}</span>
      `;
      var container4 = document.getElementById("div-5");
      container4.innerHTML = `
      <span>Items ${len}</span>
              <span>${totalP}</span>
      `;
    });
}


function assign(name, id, Url, price, category) {
  var element = `<div id="product${id}" onclick="enLarge(this)" class="flex justify-between items-center mt-6 pt-6">
    <div class="flex items-center">
      <img
        src="${Url}"
        width="60"
        class="square-full"
      />
      <div class="flex flex-col ml-3">
        <span class="md:text-md font-medium">${name}</span>
        <span class="text-xs font-light text-gray-400">${id}</span>
        <span class="text-sm font-light text-orange-400"
          >${category}</span
        >
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div class="pr-8 flex">
      </div>
      <div class="pr-8">
        <span class="text-xs font-medium"><big>${price}</big></span>
      </div>
      <div><button id="p${id}" onclick="removeItem(this)" class="fa fa-close text-xs font-medium"></button></div>
    </div>
    </div>`;
    var container = document.getElementById("main-div");
    var inn = document.getElementById("main-div").innerHTML;
    container.innerHTML = element + inn;
}

function removeItem(a) {
    var id = a.id;
    var idC = id;
    idC = idC.replace("p", "");
    id = id.replace("p", "product");
    document.getElementById(id).setAttribute("style", "display:none;");
    console.log(idC);
    var AUTH = localStorage.getItem("AUTH");
    var phone = AUTH.slice(0,10);
    phone = phone.split("");
    phone = phone.reverse();
    phone = phone.join("");
    console.log(phone);
    fetch("http://127.0.0.1/remove:"+phone+""+idC)
    .then(response => response.text())
    .then(data => location.reload());
}

function enLarge(a) {
  var id = a.id;
  id = id.replace("product", "");
  window.location.href="/product:"+id;
}