"use strict"


let tableBody = document.querySelector("tbody");  //table bodysini goturmek uchun

let products = JSON.parse(localStorage.getItem("basket"));  // localda olan productlari goturmek uchun


if (products != null) {

    for (const product of products) {
        tableBody.innerHTML += `<tr>
        <td>
        <img src="${product.img}" alt="">
        </td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td><span class="minus">- </span><span>${product.count}</span><span class="plus"> +</span></td>
        <td class="d-none">${product.id}</td>    
        <td><i class="fa-solid fa-trash-can"></i></td>
        </tr>`
    }
    getBasketCount(products); //basketdeki mehsullarin sayini gostermek uchun hemin metodun ichine products arrayini gonderirik
    totalPrice(products);

} else {
    document.querySelector("table").classList.add("d-none");
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector("#basket .total").classList.add("d-none");
    document.querySelector(".clear-btn").classList.add("d-none")
}



function getBasketCount(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }
    //document.querySelector("sup").innerText = arr.length;   //baskete atdomiz mehsulun sayini gostermek uchun

    document.querySelector("sup").innerText = sum;
}




//DELETE DATA FROM BASKET

let deleteIcons = document.querySelectorAll("tbody tr td i");


for (const deleteIcon of deleteIcons) {
    deleteIcon.addEventListener("click", function () {
        let newList = products.filter(m => m.id != deleteIcon.parentNode.previousElementSibling.innerText)  //yeni array yaradiram hansiki ichinde silmek istediyim id-ye aid olan productdan bawqa  productlar olsun
        //burada m => m.id localda olan id nezerde tutulur. (deleteIcon.parentNode.previousElementSibling.innerText)----- bu ise silmek uchun olan iconun yaninda olan mehsulun idsidi. yeni visualda gorsenen id
        //yeni icona basanda silmek istediyimiz  productun id-sine beraber olan id li product varsa localda, sil ve o id-li product olmadan yeni product listi yarat ve locala yeniden elave et. 
        //silmek istediyimiz productun iconuna  basdigimizda hemin productdan bawqa digerlerini gostersin.

        products = newList;   // evvelki products listinin adini yeni yaratdigimiz arrayin adina beraber ediremki. arrayin ichindekiler silinenden bawqa digerleri olsun.

        localStorage.setItem("basket", JSON.stringify(products))   //local storageni yeniden set edirik ki, sildiyimiz product hemin listde olmasin. local storagede yeni list olsun.

        window.location.reload();    //refresh ediremki silinen datalar UI da qalmasin. bele etmesek silmek istediyimiz silinecek amma ekranda helede gorsenecek

        if (products.length == 0) {    //eger storagede data yoxdursa, yeni localimizda productumuzun(basketimizin) length sifirdirsa localdan productumuzun keyini oradan sil.
            localStorage.clear();
        }
    })
}

// let newList = products.splice(i,1)   //indexe gore productlari silmek uchun istifade edirik. hansina click edirikse onu silmesi uchun



//total price
function totalPrice(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += parseInt(item.price) * parseInt(item.count);         //mehsulun qiymetini vur sayina her defe topla.
    }
    document.querySelector("#basket .total h3").innerHTML = `<span>Total: ${sum} AZN </span>`;   //umumi neticeni h3 - yeni total olan divin innerHTMLsine  beraber et
}



//clear all products 
let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click",function(){
    localStorage.clear();
    window.location.reload();
})



let minusIcons = document.querySelectorAll("tbody tr td .minus")

for (const minusIcon of minusIcons) {
    minusIcon.addEventListener("click", function () {
        for (const product of products) {

            if (product.id == minusIcon.parentNode.nextElementSibling.innerText) {
                if (minusIcon.nextElementSibling.innerText == 0) {
                    return;
                }
                minusIcon.nextElementSibling.innerText--;
                product.count--;
                totalPrice(products)
                window.location.reload();
            }
        }
        localStorage.setItem("basket", JSON.stringify(products))
    })
}



let plusIcons = document.querySelectorAll("tbody tr td .plus")

for (const plusIcon of plusIcons) {
    plusIcon.addEventListener("click", function () {
        for (const product of products) {
            if (product.id == plusIcon.parentNode.nextElementSibling.innerText) {  //icon olan hissede olan (ve gorsenmeyen) idni tapiriq.
                plusIcon.previousElementSibling.innerText++;                       //iconun ust elementi yeni count un inner textini ++ et yeni nechedirse artir
                product.count++;                                                  //productun countunu artir    
                totalPrice(products)                                               //total a productun son qiymetini gonder
                window.location.reload();
            }
        }
        localStorage.setItem("basket", JSON.stringify(products))                   //butun bu deyishiklikleri locala elave et

    })
}




