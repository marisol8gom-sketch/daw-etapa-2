const STORAGE_KEYS = {
  users: "mega_oferta_users",
  session: "mega_oferta_session",
  products: "mega_oferta_products",
  cart: "mega_oferta_cart",
  orders: "mega_oferta_orders"
};

const DEFAULT_PRODUCTS = [
  {id:1,nombre:"Sala moderna",categoria:"Salas",precio:450,stock:5,imagen:"",emoji:"🛋️"},
  {id:2,nombre:"Cama matrimonial",categoria:"Camas",precio:350,stock:3,imagen:"",emoji:"🛏️"},
  {id:3,nombre:"Comedor familiar",categoria:"Comedores",precio:600,stock:4,imagen:"",emoji:"🍽️"},
  {id:4,nombre:"Ropero de 6 puertas",categoria:"Roperos",precio:420,stock:2,imagen:"",emoji:"🚪"},
  {id:5,nombre:"Colchón matrimonial",categoria:"Colchones",precio:280,stock:6,imagen:"",emoji:"🛌"},
  {id:6,nombre:"Sala esquinera",categoria:"Salas",precio:575,stock:2,imagen:"",emoji:"🛋️"},
  {id:7,nombre:"Cama individual",categoria:"Camas",precio:250,stock:4,imagen:"",emoji:"🛏️"},
  {id:8,nombre:"Comedor de 6 sillas",categoria:"Comedores",precio:520,stock:0,imagen:"",emoji:"🍽️"}
];

function getData(key, fallback=[]){
  try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch(e){return fallback}
}
function setData(key,value){localStorage.setItem(key,JSON.stringify(value))}
function seedData(){
  if(!localStorage.getItem(STORAGE_KEYS.users)){
    setData(STORAGE_KEYS.users,[{id:1,nombre:"Administrador",correo:"admin@megaoferta.com",password:"Admin123",rol:"admin"}]);
  }
  if(!localStorage.getItem(STORAGE_KEYS.products)) setData(STORAGE_KEYS.products,DEFAULT_PRODUCTS);
  if(!localStorage.getItem(STORAGE_KEYS.orders)) setData(STORAGE_KEYS.orders,[]);
  if(!localStorage.getItem(STORAGE_KEYS.cart)) setData(STORAGE_KEYS.cart,[]);
}
function currentUser(){return getData(STORAGE_KEYS.session,null)}
function logout(){localStorage.removeItem(STORAGE_KEYS.session); location.href="../index.html"}
function requireAdmin(){
  const user=currentUser();
  if(!user || user.rol!=="admin"){location.href="../login.html";return false}
  return true
}
function money(value){return new Intl.NumberFormat("es-SV",{style:"currency",currency:"USD"}).format(value)}
function showAlert(id,message,type="danger"){
  const el=document.getElementById(id); if(el) el.innerHTML=`<div class="alert alert-${type}" role="alert">${message}</div>`;
}
function updateNavbar(){
  const user=currentUser();
  const loginLink=document.getElementById("loginLink");
  const sessionNav=document.getElementById("sessionNav");
  const sessionUser=document.getElementById("sessionUser");
  const adminNav=document.getElementById("adminNav");
  const logoutNav=document.getElementById("logoutNav");
  if(user){
    if(loginLink) loginLink.classList.add("d-none");
    if(sessionNav) sessionNav.classList.remove("d-none");
    if(sessionUser) sessionUser.textContent=`Hola, ${user.nombre}`;
    if(logoutNav) logoutNav.classList.remove("d-none");
    if(adminNav && user.rol==="admin") adminNav.classList.remove("d-none");
  }
  const cart=getData(STORAGE_KEYS.cart,[]);
  const count=cart.reduce((sum,i)=>sum+i.cantidad,0);
  const badge=document.getElementById("cartCount"); if(badge) badge.textContent=count;
}
document.addEventListener("DOMContentLoaded",()=>{seedData();updateNavbar()});
