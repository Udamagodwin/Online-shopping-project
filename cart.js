let basket=JSON.parse(localStorage.getItem("data")) || []
let label=document.querySelector(".label")
const shoppingCard=document.querySelector(".shoppingCard")
const bill=document.querySelector(".bill")
const clearAll=document.querySelector(".clear")


generateCartItem=()=>{
    if(basket.length !==0){
         return (shoppingCard.innerHTML=basket.map((x)=>{
             let {id,item}=x
            let search=shopItems.find((y)=>y.id==id)

            return `
            <div class="cardItem">
        <img src="${search.img}"alt="" width="100"/>
        <div class="detail">
        <h4 class="price-name">
        <p>${search.item}</p>
        <p class="price">$ ${search.price}</p>
        <img src="images/exit.png" width="18" onclick="removedItem(${id})" class="img"/>
          </h4>
          </div>
          <div class="button">
          <img src="images/minus.jpeg"  alt="" width="15" onclick="decrement(${id})">
          <div id=${id}>${item}</div>
          <img src="images/plus.png"alt="" width="15" onclick="increment(${id})">
      </div>
      
      <h3>$ ${item *search.price}</h3>
          </div>
          
    
            
          
            `
         }).join(""))
        
        
    }
    else{

        bill.style.display="none"
        shoppingCard.innerHTML=``;
        return label.innerHTML= `
       
        <h3> Cart is Empty</h3>
        <a href="index.html">
        <button>Back to Home </button>
        </a>
        `
    }
}

generateCartItem()




calculation=()=>{
let totalBasket=document.querySelector(".que")
    let search=basket.map((x)=>x.item)
   let total=search.reduce((a,b)=>a+b,0)
   totalBasket.innerText=total
   }
   calculation()


   

increment=(id)=>{
    let selectedId=id
  let search=basket.find((x)=>x.id===selectedId.id)
   
  if(search===undefined){
    basket.push({id:selectedId.id,
        item:1,})
  }else{
      search.item+=1
  }
  generateCartItem()
update(selectedId.id);
billing()
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
    }
    
    update(selectedId.id); 
    billing() 
    //console.log(basket)
    basket= basket.filter((x)=>x.item !==0)
    generateCartItem()
    
 
window.localStorage.setItem("data", JSON.stringify(basket));

    
}




update=(id)=>{
    let search=basket.find((x)=>x.id===id)
    const incrIt=document.getElementById(id)
incrIt.innerHTML=search.item
calculation()

}
removedItem=(id)=>{
    let selectedId=id
    basket=basket.filter((x)=>x.id !==selectedId.id)
    generateCartItem()
    window.localStorage.setItem("data", JSON.stringify(basket));

    
}
billing=()=>{
    if(basket.length !==0){
    let totalAmount=basket.map((x)=>{
    let {item,id}=x
    let search=shopItems.find((y)=>y.id===id) || []
     return search.price*item
    })
    .reduce((x,y)=>x+y,0)
    
    
    bill.innerHTML= `
    
    <h3>Total Bill:<span>$ ${totalAmount}</span></h3>
    <button class="clear" onclick="clearI()">Clear All</button>
    <button id="pay">Proceed to Pay</button>
    `
}
else return


}




clearI=()=>{
  
    basket=[]
generateCartItem()
localStorage.setItem("data", JSON.stringify(basket));
bill.style.display="none"
}
billing()
