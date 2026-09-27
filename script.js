const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let cart = 0;
const count = $("#cartCount");
const toast = $("#toast");

function showToast(message="Added to your NIKASTRA bag ✓"){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}
function addToBag(){
  cart++;
  count.textContent = cart;
  showToast();
}
$$(".add").forEach(btn => btn.addEventListener("click", addToBag));

const modal=$("#modal"), modalName=$("#modalName"), modalPrice=$("#modalPrice");
$$(".quick").forEach(btn=>{
  btn.addEventListener("click", e=>{
    const card=e.currentTarget.closest(".product");
    modalName.textContent=card.dataset.name;
    modalPrice.textContent=card.dataset.price;
    modal.classList.add("open");
  });
});
$("#closeModal").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.remove("open")});
$("#modalAdd").onclick=()=>{addToBag();modal.classList.remove("open")};

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

$("#subscribe").onclick=()=>{
  const email=$("#email").value.trim();
  showToast(email.includes("@") ? "You're on the NIKASTRA list ✓" : "Enter a valid email");
};

$("#menuBtn").onclick=()=>{
  const nav=document.querySelector(".site-header nav");
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  nav.style.position="absolute";
  nav.style.top="65px"; nav.style.left="0"; nav.style.right="0";
  nav.style.padding="25px 6vw"; nav.style.background="#f5f3ef";
  nav.style.flexDirection="column";
};

document.addEventListener("mousemove",e=>{
  const c=$(".cursor"); if(c){c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"}
});
