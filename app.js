/* Global Variables */

let apiKey = 'a3da61a09559203e80ecb823d32b2a50&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    // e.preventDefault();

    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    // let temp = document.getElementById('temp').value;

    let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`

    getData(baseURL, zipCode, feelings, apiKey)
    // New Syntax!
    .then(function(data){
      // Add data
    //   console.log(data);
      postData('/add',{data: newDate, temp: data.main.temp, content: feelings});
    })

    .then(
      updateUI()
    )
  }
//   debugger
  const getData = async (url, zip, feeling, key)=>{

    const res = await fetch(url+zip+feeling+key)

    try {
      const data = await res.json();
    //   let temp = data.main.temp;
      console.log(data);

      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  const postData = async (url = '', data = {}) =>{
    debugger
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
      }
  }
debugger
  const updateUI = async () => {
    const req = await fetch('/all');
    try{
      const allData = await req.json();
      const lastIndex = allData[allData.length - 1];
      document.getElementById('date').innerHTML = newDate;
      document.getElementById('temp').innerHTML = lastIndex.temp;
      document.getElementById('content').innerHTML = lastIndex.feelings;

    }catch(error){
      console.log("error", error);
    }
}


