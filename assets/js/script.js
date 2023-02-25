"use strict"

//LOCAL STORAGE


// localStorage.setItem("name","Cavid");
// //localStorage.setItem local strage-e data elave etmek uchun istifade olunur. key value mentiqi kimi. key-name, value-cavid
// localStorage.setItem("surname", "Ismayilzade")

// // console.log(localStorage.getItem("name"));
// // //getItem elave etdiyimiz datalari goturmek uchun keyini yaziriq valueni gosterir



// // localStorage.removeItem();
// //datalari silmedikce localstoragede qalacaq. silme isteyirikse elimizle remova methodunu yaza bilerik


// let names = ["Pervin","Elekber","Aqshin"]

// // localStorage.setItem("name", names);
// //bu halda arrayi string kimi elave edir storageye.


// localStorage.setItem("name", JSON.stringify(names));
// //bir arrayi local storageye array formatinda qoymaq isteyirikse, JSON.stringfy ile arrayi array formatinda local storageye qoya bilirsen


// console.log(JSON.parse(localStorage.getItem("names")));
// //locala goyulmush arrayi goturende JSON.parse edib goture bilerik

// document.querySelector("button").onclick = function(){
//     // localStorage.removeItem("name");
//     // bu halda keyine gore elementi silirik

//     // localStorage.clear();
//     // local storagede olan herweyi silir


//     let datas = JSON.parse(localStorage.getItem("names")); 
//     //parse edib goturduyumuz arrayi variable a beraber edirik

//     for (const item of datas) {
//         console.log(item);
//     }  
//     //arrayin ichindeki datalari birbir gosteririk

// }


//  SESSION STORAGE

// sessionStorage.setItem("email","test@gmail.com")

// console.log(sessionStorage.getItem("email"));



//  BASKET



let cardBtns = document.querySelectorAll("#shop a")

let products = [];   //ilk once bow array teyin edirikki sonradan bir-bir productlari elave edek bunun icherisine

if(localStorage.getItem("basket") != null){                   //  local storagede mehsul varsa yeni null deyilse 
    products = JSON.parse(localStorage.getItem("basket"))     //elave edtiyimiz yeni mehsullari (yeni bow olan arrayin ichine elave etdiklerimizi) elave et local storagede olanlarin uzerine
    //datani array kimi goturmek uchun JSON.parse edib gotururuk

}

cardBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {              //burada buttona click edende bir-bir cardlari goture bilmek uchun

        e.preventDefault();                                    //cardin, buttonun defaultunu silmek uchun

        let productImg = this.parentNode.previousElementSibling.getAttribute("src");  //buttona click edende img i goturmek uchun. buttonun parent divinin ust siblingi deyib gotururuk
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.previousElementSibling.innerText;
        let productPrice = this.previousElementSibling.innerText;
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

        let exitProduct = products.find(m => m.id == productId)
        //click edende, yeni eleave etdiyimiz productun idsi ile eyni olan idli product varsa onu yoxlayiriq
       
        if(exitProduct != undefined){
            exitProduct.count +=1;
        }else{
            products.push({
                // buttona her click edende elave et productsun ichine click etdiyimiz her bir productu.
                
                id:productId,
                name: productName,        // anonim obejct yaradic propertilerini elave edirik ichine
                img: productImg,
                description: productDesc,
                price:productPrice,
                count: 1
            })
        }

        getBasketCount(products);

        //JSON FRONTDAN BACKA DATA OTURMEK UCHUNDUR. frontla back arasinda data transferi uchun istifade edir
        //stringify --string formatini array formatina chevirib yaratmaq uchun
        //parse --  datani array (obyekt) kimi goturmek isteyirikse parse edirik. 

        localStorage.setItem("basket", JSON.stringify(products));
        //local storageye productslarini array kimi elave etmek uchun(yeni set elemek), JSON.stringFy edib elave edirik
        
    })
});



function getBasketCount(arr){
    let sum = 0;
    for (const item of arr) {
        sum+=item.count
    }
    //document.querySelector("sup").innerText = arr.length;   //baskete atdomiz mehsulun sayini gostermek uchun. yeni bir basketde neche nov m,ehsul var. her mehsuldan neche dene oldugunu gostermesin.

    document.querySelector("sup").innerText = sum;  //basketde butun mehsullarin sayi gostersin
}

getBasketCount(products);