let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
(async function  define(){
    let link = `${url}/kwd/inr.json`;
    let response = await fetch(link);
    let data = await response.json();
    console.log();
})();
let dropdown = document.querySelectorAll(".dropdown select")

for(let dp of dropdown){
    for(let code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if(code==="KWD" && dp.name ==="from"){
            option.selected = true;
        }
        else if(code==="INR" && dp.name ==="To"){
            option.selected = true;
        }
        dp.append(option);
    }
    dp.addEventListener("change", (event)=>{
        getflag(event.target);
    });

}
function isNumeric(str) {
    return !/^\d+$/.test(str);
}
function getflag(element){
    let countrycode  = countryList[element.value];
    let flag = element.parentElement.querySelector("img");
    flag.src = `https://flagsapi.com/${countrycode}/flat/32.png`;
}
let btn = document.querySelector(".f2 button");
btn.addEventListener("click", async(eve) =>{
    eve.preventDefault();
    let from = document.querySelector(".from select");
    let currcode = from.value.toLowerCase();
    let to = document.querySelector(".to select");
    let tocode = to.value.toLowerCase();
    let amt = document.querySelector(".amt input");
    console.log(isNumeric(amt.value));
    if(amt.value <=0 ) {
        amt.value = "1";
    }
    let link = `${url}/${currcode}/${tocode}.json`;
    let response = await fetch(link);
    let data = await response.json();
    let rate = data[tocode];
    let answer = document.querySelector(".answer");
    answer.innerHTML =  `${amt.value}${currcode.toUpperCase()} = ${(rate*(amt.value)).toFixed(3)} ${tocode.toUpperCase()} ` ;
    let givenrate = document.querySelector(".rate");
    givenrate.innerHTML = `1${currcode.toUpperCase()} = ${rate.toFixed(3)}${tocode.toUpperCase()}`;
    })

let icon = document.querySelector(".icon");
icon.addEventListener("click", () =>{
    let from = document.querySelector(".from select");
    let currcode = from.value;
    let to = document.querySelector(".to select");
    let tocode = to.value;
    let temp = currcode;
    from.value = tocode;
    to.value = temp;
    getflag(from);
    getflag(to);
});

