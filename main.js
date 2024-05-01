let inputMoney = document.getElementById("money");

let spanMoney = document.querySelector("span");

let nameInput = document.getElementById("name");

let priceInput = document.getElementById("price");

let tbody = document.querySelector("table tbody");

let mortagInput = document.getElementById("mor");

let cous = document.getElementById("cous");

let datapro;

let total;

let totalAfterPrice;

let mortag;

let globalTprcie;

let mood = "create";
let tmp;

const date = new Date();

const months = [...Array(11).keys()].map((key) =>
  new Date(0, key).toLocaleString("ar", { month: "long" })
);

const month = date.getMonth();
const day = date.getDate();

let currentMonth = months[month];

if (!(localStorage.product == undefined)) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

if (localStorage.total !== undefined) {
  total = localStorage.total;

  spanMoney.innerHTML = localStorage.total;
} else {
  total = "";
}

// console.log(localStorage.tprice);

// console.log(globalTprcie);

if (!(localStorage.tprice == "0")) {
  globalTprcie = localStorage.tprice;

  document.getElementById("tprice").innerHTML = localStorage.tprice;
} else {
  globalTprcie = "";
}

function savemoney() {
  let valueInputMoneyNumber = parseFloat(inputMoney.value);
  if (isNaN(valueInputMoneyNumber)) {
    showError("please type a Number");
  } else {
    total = valueInputMoneyNumber;

    getTotal();

    localStorage.setItem("total", totalAfterPrice);

    spanMoney.innerHTML = localStorage.getItem("total");
  }
  inputMoney.value = "";
}

function generatenamesandprice() {
  let newpro = {
    name: nameInput.value.toLowerCase(),
    price: parseFloat(priceInput.value),
    becouse: cous.value.toLowerCase(),
    time: `${currentMonth} / ${day}`,
  };
  if (nameInput.value !== "" && priceInput.value !== "" && cous.value !== "") {
    if (mood === "create") {
      // console.log("created");
      datapro.push(newpro);

      localStorage.setItem("product", JSON.stringify(datapro));
    } else {
      // console.log("updated");
      mood = "create";
      datapro[tmp] = newpro;
    }

    getTotal();

    clearInputs();
  } else {
    showError("Cannot Read empty Inputs");
  }
  localStorage.setItem("total", totalAfterPrice);
  showData();
}

function showData() {
  let table = ``;

  spanMoney.innerHTML = localStorage.getItem("total");
  document.getElementById("tprice").innerHTML = localStorage.tprice;

  for (let i = 0; i < datapro.length; i++) {
    table += ` <tr>
        <td>${datapro[i].name}</td>
        <td>${datapro[i].becouse}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].time}</td>
        <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
        <td><button onclick="deleteData(${i})" id="delete">مسح</button></td>
      </tr>`;
  }

  tbody.innerHTML = table;
}

showData();

function updateData(i) {
  nameInput.value = datapro[i].name;
  priceInput.value = datapro[i].price;
  cous.value = datapro[i].becouse;

  mood = "update";

  tmp = i;

  getTotal();

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function deleteData(i) {
  // console.log(datapro[i].price);

  // console.log(parseFloat(localStorage.total));

  let totalAfterdel = parseFloat(localStorage.total) + datapro[i].price;

  // console.log(totalAfterdel);

  localStorage.total = totalAfterdel;

  // console.log(localStorage.total);

  console.log(i);

  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();

  footer();
}

// console.log(datapro);

// console.log(total);
function getTotal() {
  let totalPrice = 0;

  for (let index = 0; index < datapro.length; index++) {
    let element = datapro[index];

    totalPrice += parseInt(element.price);
  }
  // console.log(total);
  totalAfterPrice = parseFloat(total) - totalPrice;

  footer();
}

function getmortag() {
  if (mortagInput.value !== "") {
    totalAfterPrice =
      parseFloat(localStorage.total) + parseFloat(mortagInput.value);

    // console.log(totalAfterPrice);

    localStorage.total = totalAfterPrice;

    let totalNum = parseFloat(total);

    totalNum = localStorage.total;

    total = localStorage.total;
  } else {
    showError("please type a nubmer");
  }

  getTotal();

  showData();

  clearInputs();
}

function detletAll() {
  datapro.splice(0);

  clearInputs();

  localStorage.clear();
  showData();
}

function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  cous.value = "";
  mortagInput.value = "";
}

function showError(msg) {
  const divError = document.createElement("div");
  divError.classList.add("error");
  divError.onclick = () => {
    divError.style.display = "none";
  };
  const divtext = document.createElement("h2");
  divtext.classList.add("text-error");
  divtext.innerHTML = `Error: ${msg}`;

  divError.appendChild(divtext);

  document.body.append(divError);
}

function footer() {
  let totalPrice = 0;
  for (let index = 0; index < datapro.length; index++) {
    let element = datapro[index];

    totalPrice += parseInt(element.price);
  }

  globalTprcie = totalPrice;

  localStorage.setItem("tprice", globalTprcie);

  showData();
}

footer();
