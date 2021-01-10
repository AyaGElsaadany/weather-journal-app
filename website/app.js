// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Global Variables */
const BaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const ApiKey = '&APPID=6b782d8ab838971b06126a777aeca2a0';

document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    getWeather(BaseURL, zip, ApiKey)
      .then(function(data){
        console.log(data);
        postData('/allData', {temp: data.main.temp, date: d, content: data.main.feels_like});
        UI();
      })
}


//callbAack function of API
const getWeather = async (baseURL, zip, key)=>{
    
    const res = await fetch(baseURL+zip+key)
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
      
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }  


//POST request
const postData = async ( url = '', data = {})=>{
  //console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),  // turn our json "data" into string data
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch(error) {
      console.log("error", error);
    }
}


//change UI
const UI = async ()=>{
    const response = await fetch('/allData');

    try {
      const allData = await response.json();
      console.log(allData);
      document.getElementById('date').innerHTML = "Date :" + allData[0].date;
      document.getElementById('temp').innerHTML = "Temprature :" + allData[0].temp;
      document.getElementById('content').innerHTML = "Feeling :" + allData[0].content;

    }catch(error) {
    console.log("error", error);
    }
}