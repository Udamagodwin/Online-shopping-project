let shop=document.getElementById('shop')

let basket=JSON.parse(localStorage.getItem("data")) || []

getItems=()=>{
return (shop.innerHTML=shopItems.map((x)=>{
    let {img,desc,item,id,price}=x
    let search=basket.find((x)=>x.id===id) || []

    return `
    <div class="item" id= product-id-${id}>
    <img src="${img}" alt="" width="220" >
    <div class="details">
<h3>${item}</h3>
<p>${desc}</p>
<div class="price-quantity">
    <h2>$${price}</h2>
    <div class="button">
        <img src="images/minus.jpeg"  alt="" width="10" onclick="decrement(${id})">
        <div id=${id}>${search.item===undefined? 0:search.item}</div>
        <img src="images/plus.png"alt="" width="10" onclick="increment(${id})">
    </div>
</div>
    </div>

</div>
    `
}
    ).join(""))}

getItems()


increment=(id)=>{
    
    let selectedId=id
  let search=basket.find((x)=>x.id===selectedId.id)
  alert("One item has been added to the cart")
   
  if(search===undefined){
    
    basket.push({id:selectedId.id,
        item:1,}
        )
  }else{
      search.item+=1
  }
update(selectedId.id);
window.localStorage.setItem("data", JSON.stringify(basket));
}
   
  


decrement=(id)=>{
    let selectedId=id
    let search=basket.find((x)=>x.id===selectedId.id)
     if(search === undefined)return

    else if(search.item===0){
    return
    }else{
        search.item-=1
 alert("one item has been removed from the cart")
    }
    update(selectedId.id);  
    //console.log(basket)
    basket= basket.filter((x)=>x.item !==0)
    
 
window.localStorage.setItem("data", JSON.stringify(basket));

    
}




update=(id)=>{
    let search=basket.find((x)=>x.id===id)
    const incrIt=document.getElementById(id)
incrIt.innerHTML=search.item
calculation()
}
calculation=()=>{
 let totalBasket=document.querySelector(".que")
 let search=basket.map((x)=>x.item)
let total=search.reduce((a,b)=>a+b,0)
totalBasket.innerText=total
}
calculation()