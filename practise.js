async function renderUIThree(){
    const response1 = await fetch(`https://api.postalpincode.in/pincode/573201`);
    const result1 = await response1.json();
    // result1.then((data2)=>{
       console.log(result1[0].Message) 
    // })
    }
    renderUIThree()