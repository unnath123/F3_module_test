const submitBtn = document.getElementById("submit-Btn");
const ipAddress = document.getElementById("Ip-Address");
let useripAddress;


window.onload = function(){
const pr = fetch("https://api.ipify.org?format=json");

pr
.then((data)=>{
    return data.json();
})
.then((data1)=>{
    //console.log(data1)
    useripAddress = data1.ip;
    ipAddress.innerText = data1.ip;
})
.catch((e)=>{
    alert("error occured "+e)
})
}

submitBtn.addEventListener("click",async function(){
    try{
        let response = await fetch(`https://ipapi.co/${useripAddress}/json/`)
        let result = await response.json();
        localStorage.clear()
        localStorage.setItem("arr",JSON.stringify(result))
        console.log(result);
        location.href="./secondPage.html"
    }
    catch(e){
        alert("error occured "+e)
    }
   
})


