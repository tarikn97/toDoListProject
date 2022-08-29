const form = document.querySelector("#itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const validation = document.querySelector(".validation");
const clearButton = document.getElementById("clear-list");
 
// napraviti praznu listu todoItems (lista stringova)
let todoItems = [];
 
// handleItem f-ja
const handleItem = function (itemName) {
   const items = itemList.querySelectorAll(".item");
    items.forEach(function (item) {
       if (item.querySelector(".item-name").textContent === itemName) {
           // complete event listener
           item.querySelector(".complete-item").addEventListener("click", function () {
               // dodaj if else za klasu
               item.querySelector(".item-name").classList.toggle("completed");
               this.classList.toggle("visibility");
            })
           // edit event listener
           item.querySelector(".edit-item").addEventListener("click", function () {
               // if (itemInput.value.length !== 0 ) { .... }
               itemInput.value = itemName;
                itemList.removeChild(item);
               todoItems = todoItems.filter(function (item) {
                   return item !== itemName;
               });
               setLocalStorage(todoItems);
           })
           // delete event listener
           item.querySelector(".delete-item").addEventListener("click", function () {
               itemList.removeChild(item);
               // filter kada se koristi i za sta?
               todoItems = todoItems.filter(function (item) {
                   return item !== itemName;
               });
               setLocalStorage(todoItems);
           })
       }
   })
 }
 
// getLocalStorage f-ja
const getLocalStorage = function () {
   // pogledati sta prima funckija getItem, setItem na nivou localStorage
   const todoStorageItems = localStorage.getItem("todoListItems");
   if (todoStorageItems === 'undefined' || todoStorageItems === null) {
       todoItems = [];
   } else {
       // JSON.parse, stringify itd
       todoItems = JSON.parse(todoStorageItems);
       addItemsToList(todoItems);
   }
}
 
getLocalStorage();
 
// setLocalStorage f-ja
const setLocalStorage = function (todoItems) {
   localStorage.setItem('todoListItems', JSON.stringify(todoItems));
}
 
 
// addItemsToList f-ja dodaje nove iteme na HTML
function addItemsToList(todoItems) {
   itemList.innerHTML = ""; // ocistiti HTML listu
 
   // ponovo ispisati cijelu listu - rendamo novi HTML sa svim elementima niza
   todoItems.forEach(function (item) {
       itemList.insertAdjacentHTML(
           "beforeend",
           `<div class="item my-3">
         <h5 class="item-name text-capitalize">${item}</h5>
         <div class="item-icons">
          <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
          <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
          <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
         </div>
        </div>`
       );
       handleItem(item);
   });
}
 
 
// dodati na form element addEventListener za submit
form.addEventListener("submit", function () {
   const inputValue = itemInput.value;
 
   // validacija ako je input prazan prikazati validacijsku poruku
   if (inputValue.length === 0) {
       validation.classList.add("showItem");
 
       // nakon 3 sec ili 3000 mili sec se odradi ovaj blok koda
       setTimeout(function () {
           validation.classList.remove("showItem");
       }, 3000);
   } else {
       // push metoda za dodavanje u js niz
       todoItems.push(inputValue);
       // localStorage dodamo listu
       setLocalStorage(todoItems);
       // metoda zaduzena za iscrtanje na HTMLu
       addItemsToList(todoItems);
   }
   // nakon sto smo dodali item ili prikazali validacijsku poruku ako nije bilo vrijednosti u input polju
   // dodjelimo prazan string nasem input polju i na taj nacin ocistimo formu (trenutno je to jedno input polje)
   itemInput.value = '';
});
 
 
// clearButton addEventListener za click
clearButton.addEventListener("click", function () {
    todoItems = [];
    addItemsToList(todoItems);
    localStorage.clear();
    // localStorage.removeItem("todoListItems");
 })
  
 
 