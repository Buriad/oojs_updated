const getAllFood = async () => {
  const data = await fetch("https://dev-api.mstars.mn/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await data.json();
  let food = await res.data;
  return food;
  // .then((e)=>{return e.json()}));
};
//Food class that has properties: category, category_id, image, discount, price, name, stock
//and methods: addProduct, removeProduct

//create an array foods

let foods = [];

//call getAllFoods() then create Food objects and push every Food objects to foods array

// Generate HMTL function

// `<div class = "card">
//     <img
//       src = ${food.image}
//       alt=""
//       class="mainImg"
//     />
//     <div class="badge">${food.percent}%</div>
//     <h2>${food.name}</h2>

//     <div class="price">
//       <p class="activePrice">
//       ${new Intl.NumberFormat().format(
//         food.price - (food.price*food.percent)/100
//       )}
//       ₮${""}
//       </p>
//       <strike class="strike=dark"
//       ${new Intl.NumberFormat().format(food.price)}₮
//       </strike>
//       <p id="${food.name}id">Stock: ${food.stock}</p>
//       <div class="btns">
//       <button id="${food.name}+">+</button>
//       <button id="${food.name}-">-</button>
//     </div>
//   </div>
// `

let div = document.querySelector(".foods");

class Food {
  constructor(category, category_id, image, discount, price, name, stock) {
    this.category = category;
    this.category_id = category_id;
    this.image =
      "https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com" + image;
    this.discount = discount;
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
  addProduct() {
    this.stock = this.stock + 1;
  }
  removeProduct() {
    this.stock = this.stock - 1;
  }
}

document.getElementById("start").addEventListener("click", () => {
  getAllFood().then((e) => {
    let foods = e.map((e) => {
      return new Food(
        e.category,
        e.category_id,
        e.image,
        e.discount,
        e.price,
        e.name,
        e.stock
      );
    });
    // console.log(foods[2].name);
    foods.map((food) => {
      console.log(food.name);
      const p = document.createElement("p");
      if (food.discount > 0) {
        p.innerHTML = `<div class = "card">
          <img
            src = ${food.image}
            alt=""
            class="mainImg"
          />
          <div class="badge">${food.discount}%</div>
          <h2>${food.name}</h2>
      
          <div class="price">
            <p class="activePrice">
            ${new Intl.NumberFormat().format(
              food.price - (food.price * food.discount) / 100
            )}
            ₮${""}
            </p>
            <strike class="strike=dark"
            <p>${new Intl.NumberFormat().format(food.price)}₮</p>
            </strike>
            <p id="${food.name}id">Stock: ${food.stock}</p>
            <div class="btns">
            <button id="${food.name}+">+</button>
            <button id="${food.name}-">-</button>
          </div>
        </div>
      `;
        // div.appendChild(p);
      } else {
        p.innerHTML = `<div class = "card">
          <img
            src = ${food.image}
            alt=""
            class="mainImg"
          />
          <div class="badge">${food.discount}%</div>
          <h2>${food.name}</h2>
      
          <div class="price">
            <p class="activePrice">
            ${new Intl.NumberFormat().format(
              food.price - (food.price * food.discount) / 100
            )}
            ₮${""}
            </p>
            <p id="${food.name}id">Stock: ${food.stock}</p>
            <div class="btns">
            <button id="${food.name}+">+</button>
            <button id="${food.name}-">-</button>
          </div>
        </div>
      `;
        // div.appendChild(p);
      }
      div.appendChild(p);
      document.getElementById(`${food.name}+`).addEventListener("click", () => {
        food.addProduct();
        document.getElementById(
          `${food.name}id`
        ).innerText = `Stock: ${food.stock}`;
      });
      document.getElementById(`${food.name}-`).addEventListener("click", () => {
        food.removeProduct();
        document.getElementById(
          `${food.name}id`
        ).innerText = `Stock: ${food.stock}`;
      });
    });
  });
});
