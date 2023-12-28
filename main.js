var products=[];
if(localStorage.getItem("ourProducts") != null){
    products = JSON.parse(localStorage.getItem('ourProducts'));
    displayProduct()
}
var productNameInput=document.getElementById('productName');
var productPriceInput=document.getElementById('productPrice');
var productCategoryInput=document.getElementById('productCategory');
var productDescInput=document.getElementById('productDesc');
var btn=document.getElementById('btn');
var inputs=document.getElementsByClassName('form-control');
var del = document.getElementById('btn-danger');



btn.addEventListener('click',() => {
    addProduct()
    displayProduct()
    clearForm()
})


function addProduct(){
    if(validateProductName()==true){
       
            var product={
                name:productNameInput.value,
                price:productPriceInput.value,
                category:productCategoryInput.value,
                description:productDescInput.value
               } 
               products.push(product);
               localStorage.setItem("ourProducts",JSON.stringify(products))
        
        
    }
      
}

function displayProduct(){
    var trs=''
   for(var i=0;i<products.length;i++){
   
        trs+=`<tr>
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>

        </tr>`
        
   }
   document.getElementById('tableBody').innerHTML=trs;
}

function clearForm(){
    // productNameInput.value=""
    // productPriceInput.value=""
    // productCategoryInput.value=""
    // productDescInput.value=""
   for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
   }
}

function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem("ourProducts",JSON.stringify(products))
    displayProduct();
}


function searchProduct(term){
    var trs=''
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(term.toLowerCase())==true){
            
        trs+=`<tr>
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>

        </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=trs;
}


function updateProduct(index){
    productNameInput.value=products[index].name;
    productPriceInput.value=products[index].price;
    productCategoryInput.value=products[index].category;
    productDescInput.value=products[index].description;
    btn.innerHTML="Update";
    deleteProduct(index)
    displayProduct()
   
}



function validateProductName(){
    var regax1=/^[A-Z][a-z]{2,7}$/;
    var regax2=/^10[0-9]{3}$/;
    var regax3=/lap|tv|mobile/;
  
    if( regax1.test(productNameInput.value) ){
        return true ;
    }
    else{
        if(regax1.test(productNameInput.value)==false){
            alert("The name must start with uppercase and contain 3 to 8 letters");
        }else if(regax2.test(productPriceInput.value)==false){
            alert("please enter a valid price");
        }else if(regax3.test(productCategoryInput.value)==false){
            alert("Please use 'laptop', 'TV' or 'Mobile' for the category")
        }
    
}
}



