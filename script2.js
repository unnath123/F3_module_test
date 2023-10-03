const arr = JSON.parse(localStorage.getItem("arr"));
// localStorage.clear()
//console.log(arr);
let PostofficeArray;
var numberofPo;

function renderUIone() {
  const UserIpAddress = document.getElementById("Ip-Address");
  UserIpAddress.innerText = arr.ip;
  const pageTwoHEad = document.getElementById("SecondpageHead");
  const HeadContainer = document.createElement("div");
  HeadContainer.className = "h-block";
  HeadContainer.innerHTML = `
  <div class="block1">
                <p>lat: ${arr.latitude}</p>
                <p>long: ${arr.longitude}</p>
            </div>
            <div class="block1">
                <p>City: ${arr.city}</p>
                <p>Region: ${arr.region}</p>
            </div>
            <div class="block1">
                <p>Organization: ${arr.org}</p>
                <p>Hostname:</p>
            </div>`;
  pageTwoHEad.append(HeadContainer);
}
renderUIone();

function renderMap(){
    const MapDiv = document.getElementById("gMap");
    const MapCont = document.createElement("div");
    MapCont.className = "Map_Cont";
    MapCont.id = "map_container";
    MapCont.innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${arr.latitude}, ${arr.longitude}&z=15&output=embed" width="100%" height="600" frameborder="0" style="border:0"></iframe> `
    MapDiv.append(MapCont)
}
renderMap();

function getDateTime(){
let User_datetime_str = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(",")[1];

//console.log(User_datetime_str);
return User_datetime_str;
}

async function renderUITwo(){
    const MainBlock = document.getElementById("Container-one");
    const block2 = document.createElement("div");
    const dateTime = getDateTime();
    // let numPO = await renderUIThree();

    console.log(numberofPo)
    block2.className = "myInfo" ;
    block2.innerHTML = `
                <p>Time Zone: ${arr.timezone} </p>
                <p>Date and Time: ${dateTime} </p>
                <p>Pincode: ${arr.postal}</p>
                <p>${numberofPo}</p>`
    MainBlock.append(block2);
}
// renderUITwo();

async function renderUIThree(){
    // const response = await fetch(`https://api.postalpincode.in/pincode/${arr.postal}`)
    // const result = await response.json();
    // console.log(result)
    // PostofficeArray = result[0].PostOffice
    // console.log(PostofficeArray)

    // getPostOfficeArray();
    
    PostofficeArray.forEach(element => {
        const Mainblock = document.getElementById("Postoffices")
        const items = document.createElement("div")
        items.className = "item";
        items.innerHTML=`
        <div class="OfficeInfo">
                        <h2>Name: ${element.Name}</h2>
                        <h2>Branch Type: ${element.BranchType}</h2>
                        <h2>Delivery Status: ${element.DeliveryStatus}</h2>
                        <h2>District: ${element.District}</h2>
                        <h2>Division: ${element.Division}</h2>
                       </div>`

                       Mainblock.append(items)
    });
}
// renderUIThree()


async function getPostOfficeArray(){
    const response = await fetch(`https://api.postalpincode.in/pincode/${arr.postal}`)
    const result = await response.json();
    console.log(result)
    PostofficeArray = result[0].PostOffice
    // console.log(PostofficeArray)
    numberofPo = result[0].Message

    renderUITwo();

    renderUIThree()
}
getPostOfficeArray();




const SearchPostOffice = document.getElementById("SearchPostOffice");
SearchPostOffice.addEventListener("input",()=>{
    document.getElementById("Postoffices").innerHTML = ""
    const searchValue = SearchPostOffice.value.toLowerCase()
    

    PostofficeArray.forEach(element => {
        const POname = element.Name.toLowerCase();
        const branchType = element.BranchType.toLowerCase()

        if(POname.includes(searchValue) || branchType.includes(searchValue)){
            const Mainblock = document.getElementById("Postoffices")
            const items = document.createElement("div")
            items.className = "item";
            items.innerHTML=`
            <div class="OfficeInfo">
                            <h2>Name: ${element.Name}</h2>
                            <h2>Branch Type: ${element.BranchType}</h2>
                            <h2>Delivery Status: ${element.DeliveryStatus}</h2>
                            <h2>District: ${element.District}</h2>
                            <h2>Division: ${element.Division}</h2>
                           </div>`
    
                           Mainblock.append(items)
        }
    });
})