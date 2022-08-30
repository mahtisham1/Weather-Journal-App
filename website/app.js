/* Global Variables */

const apiKey = 'a3da61a09559203e80ecb823d32b2a50&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    e.preventDefault();

    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`

    getData(baseURL, zipCode, feelings, apiKey)
    .then(async function(data){
      data = await postData('/add',{date: newDate, temp: data.main.temp, city: data.name, content: feelings});
      updateUI(data)
    })
  }

  const getData = async (url, zip, feeling, key)=>{
    const res = await fetch(url+zip+feeling+key)

    try {
      const data = await res.json();
      console.log(data);

      return data;
    } catch(error) {
      console.log("error", error);
    }
  }

  const postData = async (url = '', data = {}) =>{
    console.log(data)
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return res.json()
  }

  const updateUI = (data) => {
      document.getElementById('date').innerHTML = `Date: ${data.date}`;
      const tempConvert = (data.temp - 273.15).toFixed();
      document.getElementById('temp').innerHTML = `Temperature: ${tempConvert} °C`;
      document.getElementById('city').innerHTML = `City: ${data.city}`;
      document.getElementById('content').innerHTML = `I'm feeling: ${data.feelings}`;
}
