// VARIABLES
let input = document.getElementById('input');
let userInput = "";
const h1 = document.getElementById('title');
const apiKey = 'e5a7eb3a1f4c5ff33db9941d5b14304e';

//CURRENT WEATHER VARIABLES 
const form = document.getElementById('form');
const btn = document.getElementById('btn');
let card = document.querySelector('.card');
const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country');
const temp = document.querySelector('.temp');
const symbol = document.querySelector('.f-c');
const celGPS2 = document.getElementById('cel2');
let symbolFGPS = document.getElementById('fah2');
const icon = document.querySelector('.icon');
const desc = document.querySelector('.desc');

//5 DAY FORECAST VARIABLES
const fiveDayBtn = document.querySelector('.fiveDayBtn');
const fiveDayBtnGPS = document.querySelector('#fiveDayBtnGPS');
let fiveDayBtnGPS2 = document.getElementById('fiveDayBtnGPS2');
const backBtn = document.getElementById('backBtn');
let fiveDayCard = document.querySelectorAll('.five-day-card');
const dayOne = document.querySelector('.dayOne');
const dayTwo = document.querySelector('.dayTwo');
const dayThree = document.querySelector('.dayThree');
const dayFour = document.querySelector('.dayFour');
const dayFive = document.querySelector('.dayFive');
const cityNameFive = document.querySelectorAll('.city-name-five');
const countryNameFive = document.querySelectorAll('.country-five');
const tempFive1 = document.querySelector('.temp-five-one');
const tempFive2 = document.querySelector('.temp-five-two');
const tempFive3 = document.querySelector('.temp-five-three');
const tempFive4 = document.querySelector('.temp-five-four');
const tempFive5 = document.querySelector('.temp-five-five');
const icon1 = document.querySelector('.icon-five-one');
const icon2 = document.querySelector('.icon-five-two');
const icon3 = document.querySelector('.icon-five-three');
const icon4 = document.querySelector('.icon-five-four');
const icon5 = document.querySelector('.icon-five-five');
const desc1 = document.querySelector('.desc-five-one');
const desc2 = document.querySelector('.desc-five-two');
const desc3 = document.querySelector('.desc-five-three');
const desc4 = document.querySelector('.desc-five-four');
const desc5 = document.querySelector('.desc-five-five');



// EVENTS
btn.addEventListener('click', getCurrentWeather);
fiveDayBtn.addEventListener('click', getFiveDayForecast);
backBtn.addEventListener('click', toggleDisplay);


// FUNCTIONS
/*FETCH THE CURRENT WEATHER DATA*/
function getCurrentWeather(e) {
    e.preventDefault();
    const message = document.querySelector('.msg');
    userInput = input.value
    /*Check the input, if empty..display msg, if not..fetch data*/
    if(userInput === '') {
        message.style.display = 'block';
        message.innerHTML = 'Please enter a valid city';
        setTimeout(() => {
            message.style.display = 'none';
        }, 1500);
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=` + apiKey)
        .then(response => { return response.json() })
        .then(data => { 
            console.log(data);
            displayCurrentWeather(data);
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(lat, lon);
        })
        .catch(error => { console.log(error) })    
    }
    //Card animation
    $(document).ready(() => {
        $(".card").hide().fadeIn(1500);
    });

    //5day button fix if city name is greater than 10 characters
    if(userInput.length > 10) {
        fiveDayBtn.style.height = '32px';
        fiveDayBtn.style.width = '75px';
        fiveDayBtn.style.top = '3px';
        fiveDayBtn.style.right = '1px';
        fiveDayBtnTwo.style.height = '32px';
        fiveDayBtnTwo.style.width = '75px';
        fiveDayBtnTwo.style.top = '3px';
        fiveDayBtnTwo.style.right = '1px';
        fiveDayBtnGPS.style.height = '32px';
        fiveDayBtnGPS.style.width = '75px';
        fiveDayBtnGPS.style.top = '3px';
        fiveDayBtnGPS.style.right = '1px';
        fiveDayBtnGPS2.style.height = '32px';
        fiveDayBtnGPS2.style.width = '75px';
        fiveDayBtnGPS2.style.top = '3px';
        fiveDayBtnGPS2.style.right = '1px';
    }
};

/*DISPLAY THE CURRENT WEATHER DATA*/
function displayCurrentWeather(d) {
    card.style.display = 'block';
    fiveDayBtn.style.display = 'block';
    fiveDayBtnGPS.style.display = 'none';
    fiveDayBtnGPS2.style.display = 'none';
    symbolFGPS.style.display = 'none';
    celGPS2.style.display = 'none';
    symbolF.style.display = 'block';
    symbolF.style.color = 'black';
    symbolC.style.display = 'block';
    var iconUrl = d.weather[0].icon;
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    
    cityName.innerHTML = d.name;
    countryName.innerHTML = d.sys.country; 
    temp.innerHTML = fahrenheit;
    symbol.innerHTML = `&deg;F <span style="color:lightgrey">|</span>`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl}@2x.png"></img>`;
    desc.innerHTML = d.weather[0].description.toUpperCase(); 
    input.value = ''; 
};


/*FETCH 5-DAY FORECAST DATA*/
function getFiveDayForecast() {

    /*Fetch the data*/
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=` + apiKey)
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);               
        fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${data[0].lat}&lon=${data[0].lon}&exclude=current,minutely,hourly&appid=` + apiKey)
        .then(response => { return response.json() })
        .then(dataB => {
            console.log(dataB);
            displayFiveDayForecast(data, dataB);
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

    /*Loop thru and display all 5 cards*/
    for(let i = 0; i < fiveDayCard.length; i++) {
        fiveDayCard[i].style.display = 'block';
    }

    /*Switch from current weather to forecast screen*/
    card.style.display = 'none';
    h1.innerHTML = '5 Day Forecast';
    form.style.display = 'none';

    //Cards animation
    $(document).ready(() => {
        $(".five-day-card").hide().fadeIn(1500);
        $("#backBtn").fadeIn(1500);
    });
};


/*DISPLAY 5-DAY FORECAST DATA*/
function displayFiveDayForecast(data, dataB) {

    /*Min Temp Variables*/
    let fahrenheitMin1 = Math.round(((parseFloat(dataB.daily[0].temp.min)-273.15)*1.8)+32); 
    let fahrenheitMin2 = Math.round(((parseFloat(dataB.daily[1].temp.min)-273.15)*1.8)+32); 
    let fahrenheitMin3 = Math.round(((parseFloat(dataB.daily[2].temp.min)-273.15)*1.8)+32); 
    let fahrenheitMin4 = Math.round(((parseFloat(dataB.daily[3].temp.min)-273.15)*1.8)+32); 
    let fahrenheitMin5 = Math.round(((parseFloat(dataB.daily[4].temp.min)-273.15)*1.8)+32); 
    
    /*Max Temp Variables*/
    let fahrenheitMax1 = Math.round(((parseFloat(dataB.daily[0].temp.max)-273.15)*1.8)+32); 
    let fahrenheitMax2 = Math.round(((parseFloat(dataB.daily[1].temp.max)-273.15)*1.8)+32); 
    let fahrenheitMax3 = Math.round(((parseFloat(dataB.daily[2].temp.max)-273.15)*1.8)+32); 
    let fahrenheitMax4 = Math.round(((parseFloat(dataB.daily[3].temp.max)-273.15)*1.8)+32); 
    let fahrenheitMax5 = Math.round(((parseFloat(dataB.daily[4].temp.max)-273.15)*1.8)+32); 
    
    /*Icon Variables*/
    let iconUrl1 = dataB.daily[0].weather[0].icon;
    let iconUrl2 = dataB.daily[1].weather[0].icon;
    let iconUrl3 = dataB.daily[2].weather[0].icon;
    let iconUrl4 = dataB.daily[3].weather[0].icon;
    let iconUrl5 = dataB.daily[4].weather[0].icon;

    /*Days*/
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const t = new Date(dataB.daily[0].dt * 1000);
    const t2 = new Date(dataB.daily[1].dt * 1000);
    const t3 = new Date(dataB.daily[2].dt * 1000);
    const t4 = new Date(dataB.daily[3].dt * 1000);
    const t5 = new Date(dataB.daily[4].dt * 1000);
    const weekday = days[t.getDay()];
    const weekday2 = days[t2.getDay()];
    const weekday3 = days[t3.getDay()];
    const weekday4 = days[t4.getDay()];
    const weekday5 = days[t5.getDay()];
    dayOne.innerHTML = weekday;
    dayTwo.innerHTML = weekday2;
    dayThree.innerHTML = weekday3;
    dayFour.innerHTML = weekday4;
    dayFive.innerHTML = weekday5;

    /*Loop thru the data and display city/country on all 5 cards*/
    for(let j = 0; j < fiveDayCard.length; j++) {
        cityNameFive[j].innerHTML = data[0].name;
        countryNameFive[j].innerHTML = data[0].country;

    }
    /*Display data on each card*/
    tempFive1.innerHTML = `${fahrenheitMax1}<br>${fahrenheitMin1}`;
    tempFive2.innerHTML = `${fahrenheitMax2}<br>${fahrenheitMin2}`;
    tempFive3.innerHTML = `${fahrenheitMax3}<br>${fahrenheitMin3}`;
    tempFive4.innerHTML = `${fahrenheitMax4}<br>${fahrenheitMin4}`;
    tempFive5.innerHTML = `${fahrenheitMax5}<br>${fahrenheitMin5}`;
    icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl1}@2x.png"></img>`;
    icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl2}@2x.png"></img>`;
    icon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl3}@2x.png"></img>`;
    icon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl4}@2x.png"></img>`;
    icon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl5}@2x.png"></img>`;
    desc1.innerHTML = dataB.daily[0].weather[0].description.toUpperCase();
    desc2.innerHTML = dataB.daily[1].weather[0].description.toUpperCase();
    desc3.innerHTML = dataB.daily[2].weather[0].description.toUpperCase();
    desc4.innerHTML = dataB.daily[3].weather[0].description.toUpperCase();
    desc5.innerHTML = dataB.daily[4].weather[0].description.toUpperCase();

    /*Clear input bar*/
    input.value = '';
};

/*GPS LOCATION CURRENT WEATHER*/
const currentBtn = document.querySelector('#gpsBtn');
currentBtn.addEventListener('click', getLocation);
fiveDayBtnGPS.addEventListener('click', getFiveDayForecastGPS);


function getLocation() {
    /* Get user location & current weather data */
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let gpsLat  = position.coords.latitude;
            let gpsLon = position.coords.longitude; 
            console.log(gpsLat, gpsLon);

            /*Fetch Current Weather Data*/
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${gpsLat}&lon=${gpsLon}&appid=` + apiKey)
            .then(response => {
                return response.json();
            })
            .then(dataC => {
                console.log(dataC);
                displayCurrentWeatherGPS(dataC);
            })
        })
    }
    //Cards animation
    $(document).ready(() => {
        $(".card").hide().fadeIn(1500);
    });   
};

function displayCurrentWeatherGPS(dataC) {

    /*Display current weather card*/
    card.style.display = 'block';
    /*Hide regular 5-day button*/
    fiveDayBtn.style.display = 'none';
    /*Display GPS 5-day button*/
    fiveDayBtnGPS.style.display = 'block';
    
    let gpsName = document.querySelector('.city-name');
    let gpsCountry = document.querySelector('.country');
    let gpsTemp = document.querySelector('.temp');
    let gpsTempF = Math.round(((parseFloat(dataC.main.temp)-273.15)*1.8)+32); 
    let gpsSymbol = document.querySelector('.f-c');
    let gpsIcon = document.querySelector('.icon');
    let gpsIconUrl = dataC.weather[0].icon
    let gpsDesc = document.querySelector('.desc');

    gpsName.innerHTML = dataC.name;
    gpsCountry.innerHTML = dataC.sys.country;
    gpsTemp.innerHTML = gpsTempF;
    gpsSymbol.innerHTML = `&deg; F <span style="color:lightgrey;">|</span `;
    document.querySelector('.cel').style.display = 'none';
    celGPS2.style.display = 'block';
    gpsIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${gpsIconUrl}@2x.png"></img>`;
    gpsDesc.innerHTML = dataC.weather[0].description.toUpperCase();
};

function getFiveDayForecastGPS() {
    /*Loop thru and display all 5 cards*/
    for(let i = 0; i < fiveDayCard.length; i++) {
        fiveDayCard[i].style.display = 'block';
    }

    /*Switch from current weather to forecast screen*/
    card.style.display = 'none';
    h1.innerHTML = '5 Day Forecast';
    form.style.display = 'none';

                
    /*Get current location coordinates and fetch data*/
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let gpsLatitude  = position.coords.latitude;
            let gpsLongitude = position.coords.longitude; 
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${gpsLatitude}&lon=${gpsLongitude}&appid=` + apiKey)
            .then(response => {
                return response.json();
            }) 
            .then(dataD => {
                console.log(dataD);
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${gpsLatitude}&lon=${gpsLongitude}&appid=` + apiKey)
                .then(response => {
                    return response.json();
                })
                .then(dataE => {
                    console.log(dataE);
                    displayFiveDayForecastGPS(dataD, dataE)
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
    }
    //Cards animation
    $(document).ready(() => {
        $(".five-day-card").hide().fadeIn(1500);
        $("#backBtn").fadeIn(1500);
    });   
};

function displayFiveDayForecastGPS(dataD, dataE) {

        
        let fahrenheitMin1GPS = Math.round(((parseFloat(dataE.daily[0].temp.min)-273.15)*1.8)+32); 
        let fahrenheitMin2GPS = Math.round(((parseFloat(dataE.daily[1].temp.min)-273.15)*1.8)+32); 
        let fahrenheitMin3GPS = Math.round(((parseFloat(dataE.daily[2].temp.min)-273.15)*1.8)+32); 
        let fahrenheitMin4GPS = Math.round(((parseFloat(dataE.daily[3].temp.min)-273.15)*1.8)+32); 
        let fahrenheitMin5GPS = Math.round(((parseFloat(dataE.daily[4].temp.min)-273.15)*1.8)+32); 
        
        let fahrenheitMax1GPS = Math.round(((parseFloat(dataE.daily[0].temp.max)-273.15)*1.8)+32); 
        let fahrenheitMax2GPS = Math.round(((parseFloat(dataE.daily[1].temp.max)-273.15)*1.8)+32); 
        let fahrenheitMax3GPS = Math.round(((parseFloat(dataE.daily[2].temp.max)-273.15)*1.8)+32); 
        let fahrenheitMax4GPS = Math.round(((parseFloat(dataE.daily[3].temp.max)-273.15)*1.8)+32); 
        let fahrenheitMax5GPS = Math.round(((parseFloat(dataE.daily[4].temp.max)-273.15)*1.8)+32); 
        
        let iconUrl1GPS = dataE.daily[0].weather[0].icon;
        let iconUrl2GPS = dataE.daily[1].weather[0].icon;
        let iconUrl3GPS = dataE.daily[2].weather[0].icon;
        let iconUrl4GPS = dataE.daily[3].weather[0].icon;
        let iconUrl5GPS = dataE.daily[4].weather[0].icon;
    
        let daysGPS = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
    
        const tGPS = new Date(dataE.daily[0].dt * 1000);
        const t2GPS = new Date(dataE.daily[1].dt * 1000);
        const t3GPS = new Date(dataE.daily[2].dt * 1000);
        const t4GPS = new Date(dataE.daily[3].dt * 1000);
        const t5GPS = new Date(dataE.daily[4].dt * 1000);
        const weekdayGPS = daysGPS[tGPS.getDay()];
        const weekday2GPS = daysGPS[t2GPS.getDay()];
        const weekday3GPS = daysGPS[t3GPS.getDay()];
        const weekday4GPS = daysGPS[t4GPS.getDay()];
        const weekday5GPS = daysGPS[t5GPS.getDay()];
        dayOne.innerHTML = weekdayGPS;
        dayTwo.innerHTML = weekday2GPS;
        dayThree.innerHTML = weekday3GPS;
        dayFour.innerHTML = weekday4GPS;
        dayFive.innerHTML = weekday5GPS;
    
        for(let q = 0; q < fiveDayCard.length; q++) {
            cityNameFive[q].innerHTML = dataD[0].name;
            countryNameFive[q].innerHTML = dataD[0].country;
    
        }
        tempFive1.innerHTML = `${fahrenheitMax1GPS}<br>${fahrenheitMin1GPS}`;
        tempFive2.innerHTML = `${fahrenheitMax2GPS}<br>${fahrenheitMin2GPS}`;
        tempFive3.innerHTML = `${fahrenheitMax3GPS}<br>${fahrenheitMin3GPS}`;
        tempFive4.innerHTML = `${fahrenheitMax4GPS}<br>${fahrenheitMin4GPS}`;
        tempFive5.innerHTML = `${fahrenheitMax5GPS}<br>${fahrenheitMin5GPS}`;
        icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl1GPS}@2x.png"></img>`;
        icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl2GPS}@2x.png"></img>`;
        icon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl3GPS}@2x.png"></img>`;
        icon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl4GPS}@2x.png"></img>`;
        icon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrl5GPS}@2x.png"></img>`;
        desc1.innerHTML = dataE.daily[0].weather[0].description.toUpperCase();
        desc2.innerHTML = dataE.daily[1].weather[0].description.toUpperCase();
        desc3.innerHTML = dataE.daily[2].weather[0].description.toUpperCase();
        desc4.innerHTML = dataE.daily[3].weather[0].description.toUpperCase();
        desc5.innerHTML = dataE.daily[4].weather[0].description.toUpperCase();
}

/*SWITCH FROM FORECAST BACK TO CURRENT WEATHER SCREEN*/
function toggleDisplay() {

    for(let a = 0; a < fiveDayCard.length; a++) {
        fiveDayCard[a].style.display = 'none';
    }

    card.style.display = 'block';
    h1.innerHTML = "Current Weather";
    form.style.display = 'block';
    backBtn.style.display = 'none';

    //Card animation
    $(document).ready(() => {
        $(".card").hide().fadeIn(1500);
    });
};

/*TOGGLE FROM F TO C*/
let symbolF = document.querySelector('.fah');
let symbolC = document.querySelector('.cel');
const fiveDayBtnTwo = document.getElementById('fiveDayBtn2');
fiveDayBtnTwo.addEventListener('click', getFiveDayForecastC);

//Switch to Celcius
symbolC.addEventListener('click', _=> {
    
    if(symbolC) {
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=` + apiKey)
        .then(response => {
            return response.json();
        })
        .then(dataF => {
            console.log(dataF)
            //Change current weather card F to C
            let celc = Math.round(parseFloat(dataF.main.temp)-273.15);
            temp.innerHTML = celc;
            fiveDayBtn.style.display = 'none';
            fiveDayBtnTwo.style.display = 'block';
        })
        .catch(error => console.log(error));
        
        symbolC.style.color = 'black';
        symbolF.style.color = 'lightgrey';

        //Temp animation
        $(document).ready(() => {
            $(".temp").hide().fadeIn(800)
        })
    } 
});

function getFiveDayForecastC() {

    /*Fetch the data*/
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=` + apiKey)
    .then(response => {return response.json()})
    .then(dataJ => {
        console.log(dataJ);               
        fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${dataJ[0].lat}&lon=${dataJ[0].lon}&exclude=current,minutely,hourly&appid=` + apiKey)
        .then(response => { return response.json() })
        .then(dataK => {
            console.log(dataK);
            displayFiveDayForecastC(dataJ, dataK);
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

    /*Loop thru and display all 5 cards*/
    for(let i = 0; i < fiveDayCard.length; i++) {
        fiveDayCard[i].style.display = 'block';
    }

    /*Switch from current weather to forecast screen*/
    card.style.display = 'none';
    h1.innerHTML = '5 Day Forecast';
    form.style.display = 'none';

    //Cards animation
    $(document).ready(() => {
        $(".five-day-card").hide().fadeIn(1500);
        $("#backBtn").fadeIn(1500);
    });    
}


function displayFiveDayForecastC(dataJ, dataK) {

    let celMin1 = Math.round(((parseFloat(dataK.daily[0].temp.min)-273.15))); 
    let celMin2 = Math.round(((parseFloat(dataK.daily[1].temp.min)-273.15))); 
    let celMin3 = Math.round(((parseFloat(dataK.daily[2].temp.min)-273.15))); 
    let celMin4 = Math.round(((parseFloat(dataK.daily[3].temp.min)-273.15))); 
    let celMin5 = Math.round(((parseFloat(dataK.daily[4].temp.min)-273.15))); 
    
    let celMax1 = Math.round(((parseFloat(dataK.daily[0].temp.max)-273.15))); 
    let celMax2 = Math.round(((parseFloat(dataK.daily[1].temp.max)-273.15))); 
    let celMax3 = Math.round(((parseFloat(dataK.daily[2].temp.max)-273.15))); 
    let celMax4 = Math.round(((parseFloat(dataK.daily[3].temp.max)-273.15))); 
    let celMax5 = Math.round(((parseFloat(dataK.daily[4].temp.max)-273.15))); 
        /*Icon Variables*/
        let iconUrlOne = dataK.daily[0].weather[0].icon;
        let iconUrlTwo = dataK.daily[1].weather[0].icon;
        let iconUrlThree = dataK.daily[2].weather[0].icon;
        let iconUrlFour = dataK.daily[3].weather[0].icon;
        let iconUrlFive = dataK.daily[4].weather[0].icon;
    
        /*Days*/
        let daysC = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
    
        const tC = new Date(dataK.daily[0].dt * 1000);
        const t2C = new Date(dataK.daily[1].dt * 1000);
        const t3C = new Date(dataK.daily[2].dt * 1000);
        const t4C = new Date(dataK.daily[3].dt * 1000);
        const t5C = new Date(dataK.daily[4].dt * 1000);
        const weekdayC = daysC[tC.getDay()];
        const weekday2C = daysC[t2C.getDay()];
        const weekday3C = daysC[t3C.getDay()];
        const weekday4C = daysC[t4C.getDay()];
        const weekday5C = daysC[t5C.getDay()];
        dayOne.innerHTML = weekdayC;
        dayTwo.innerHTML = weekday2C;
        dayThree.innerHTML = weekday3C;
        dayFour.innerHTML = weekday4C;
        dayFive.innerHTML = weekday5C;
    
        /*Loop thru the data and display city/country on all 5 cards*/
        for(let j = 0; j < fiveDayCard.length; j++) {
            cityNameFive[j].innerHTML = dataJ[0].name;
            countryNameFive[j].innerHTML = dataJ[0].country;
        }

        /*Display data on each card*/
        tempFive1.innerHTML = `${celMax1}<br>${celMin1}`;
        tempFive2.innerHTML = `${celMax2}<br>${celMin2}`;
        tempFive3.innerHTML = `${celMax3}<br>${celMin3}`;
        tempFive4.innerHTML = `${celMax4}<br>${celMin4}`;
        tempFive5.innerHTML = `${celMax5}<br>${celMin5}`;
        icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlOne}@2x.png"></img>`;
        icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlTwo}@2x.png"></img>`;
        icon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlThree}@2x.png"></img>`;
        icon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlFour}@2x.png"></img>`;
        icon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlFive}@2x.png"></img>`;
        desc1.innerHTML = dataK.daily[0].weather[0].description.toUpperCase();
        desc2.innerHTML = dataK.daily[1].weather[0].description.toUpperCase();
        desc3.innerHTML = dataK.daily[2].weather[0].description.toUpperCase();
        desc4.innerHTML = dataK.daily[3].weather[0].description.toUpperCase();
        desc5.innerHTML = dataK.daily[4].weather[0].description.toUpperCase();

        /*Clear input bar*/
        input.value = '';
}

//Switch back to fahreinheit
symbolF.addEventListener('click', _=> {

    if(symbolF) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=` + apiKey)
        .then(response => {
            return response.json();
        })
        .then(dataG => {
            console.log(dataG)
            let fah = Math.round(((parseFloat(dataG.main.temp)-273.15)*1.8)+32); ;
            temp.innerHTML = fah;
            fiveDayBtn.style.display = 'block';
            fiveDayBtnTwo.style.display = 'none';

        })
        .catch(error => console.log(error));
    
        symbolC.style.color = 'lightgrey';
        symbolF.style.color = 'black';

        //Temp animation
        $(document).ready(() => {
            $(".temp").hide().fadeIn(800);
        });   
    } 
});





//GPS -- Switch F to C
fiveDayBtnGPS2.addEventListener('click', getFiveDayForecastGPSC2);

celGPS2.addEventListener('click', _=> {

    if(celGPS2) {
        //Temp animation
        $(document).ready(() => {
            $(".temp").hide().fadeIn(800)
        })
        
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let gpsLat  = position.coords.latitude;
                let gpsLon = position.coords.longitude; 
                console.log(gpsLat, gpsLon);
    
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${gpsLat}&lon=${gpsLon}&appid=` + apiKey)
                .then(response => {
                    return response.json();
                })
                .then(dataX => {
                    console.log(dataX)
                    //Change current weather card F to C
                    let celc = Math.round(parseFloat(dataX.main.temp)-273.15);
                    temp.innerHTML = celc;
                    fiveDayBtn.style.display = 'none';
                    fiveDayBtnTwo.style.display = 'none';
                    celGPS2.style.color = 'black';
                    symbolF.style.display = 'none';
                    symbolF.style.color = 'lightgrey';
                    symbolFGPS.style.display = 'block';
                    symbolFGPS.innerHTML = `&deg;F <span style="color:lightgrey;">|</span>`;
                    symbolFGPS.style.color = 'lightgrey';
                    fiveDayBtnGPS.style.display = 'none';
                    fiveDayBtnGPS2.style.display = 'block';
                })
                .catch(error => console.log(error));           
            })
        }
    }
});


function getFiveDayForecastGPSC2() {
        
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        let gpsLat  = position.coords.latitude;
        let gpsLon = position.coords.longitude; 
        console.log(gpsLat, gpsLon);

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${gpsLat}&lon=${gpsLon}&appid=` + apiKey)
        .then(response => {return response.json()})
        .then(data1 => {
            console.log(data1);               
            fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${gpsLat}&lon=${gpsLon}&exclude=current,minutely,hourly&appid=` + apiKey)
            .then(response => { return response.json() })
            .then(data2 => {
                console.log(data2);
                
                displayFiveDayForecastCGPS(data1, data2);
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    
        /*Loop thru and display all 5 cards*/
        for(let i = 0; i < fiveDayCard.length; i++) {
            fiveDayCard[i].style.display = 'block';
        }
    
        /*Switch from current weather to forecast screen*/
        card.style.display = 'none';
        h1.innerHTML = '5 Day Forecast';
        form.style.display = 'none';
        })
    }
    //Cards animation
    $(document).ready(() => {
        $(".five-day-card").hide().fadeIn(1500);
        $("#backBtn").fadeIn(1500);
    });    
};
    
function displayFiveDayForecastCGPS(data1, data2) {

    let celMin1 = Math.round(((parseFloat(data2.daily[0].temp.min)-273.15))); 
    let celMin2 = Math.round(((parseFloat(data2.daily[1].temp.min)-273.15))); 
    let celMin3 = Math.round(((parseFloat(data2.daily[2].temp.min)-273.15))); 
    let celMin4 = Math.round(((parseFloat(data2.daily[3].temp.min)-273.15))); 
    let celMin5 = Math.round(((parseFloat(data2.daily[4].temp.min)-273.15))); 
    
    let celMax1 = Math.round(((parseFloat(data2.daily[0].temp.max)-273.15))); 
    let celMax2 = Math.round(((parseFloat(data2.daily[1].temp.max)-273.15))); 
    let celMax3 = Math.round(((parseFloat(data2.daily[2].temp.max)-273.15))); 
    let celMax4 = Math.round(((parseFloat(data2.daily[3].temp.max)-273.15))); 
    let celMax5 = Math.round(((parseFloat(data2.daily[4].temp.max)-273.15))); 
        /*Icon Variables*/
        let iconUrlOne = data2.daily[0].weather[0].icon;
        let iconUrlTwo = data2.daily[1].weather[0].icon;
        let iconUrlThree = data2.daily[2].weather[0].icon;
        let iconUrlFour = data2.daily[3].weather[0].icon;
        let iconUrlFive = data2.daily[4].weather[0].icon;
    
        /*Days*/
        let daysC = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
    
        const tC = new Date(data2.daily[0].dt * 1000);
        const t2C = new Date(data2.daily[1].dt * 1000);
        const t3C = new Date(data2.daily[2].dt * 1000);
        const t4C = new Date(data2.daily[3].dt * 1000);
        const t5C = new Date(data2.daily[4].dt * 1000);
        const weekdayC = daysC[tC.getDay()];
        const weekday2C = daysC[t2C.getDay()];
        const weekday3C = daysC[t3C.getDay()];
        const weekday4C = daysC[t4C.getDay()];
        const weekday5C = daysC[t5C.getDay()];
        dayOne.innerHTML = weekdayC;
        dayTwo.innerHTML = weekday2C;
        dayThree.innerHTML = weekday3C;
        dayFour.innerHTML = weekday4C;
        dayFive.innerHTML = weekday5C;
    
        /*Loop thru the data and display city/country on all 5 cards*/
        for(let j = 0; j < fiveDayCard.length; j++) {
            cityNameFive[j].innerHTML = data1.name;
            countryNameFive[j].innerHTML = data1.sys.country;
        }

        /*Display data on each card*/
        tempFive1.innerHTML = `${celMax1}<br>${celMin1}`;
        tempFive2.innerHTML = `${celMax2}<br>${celMin2}`;
        tempFive3.innerHTML = `${celMax3}<br>${celMin3}`;
        tempFive4.innerHTML = `${celMax4}<br>${celMin4}`;
        tempFive5.innerHTML = `${celMax5}<br>${celMin5}`;
        icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlOne}@2x.png"></img>`;
        icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlTwo}@2x.png"></img>`;
        icon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlThree}@2x.png"></img>`;
        icon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlFour}@2x.png"></img>`;
        icon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconUrlFive}@2x.png"></img>`;
        desc1.innerHTML = data2.daily[0].weather[0].description.toUpperCase();
        desc2.innerHTML = data2.daily[1].weather[0].description.toUpperCase();
        desc3.innerHTML = data2.daily[2].weather[0].description.toUpperCase();
        desc4.innerHTML = data2.daily[3].weather[0].description.toUpperCase();
        desc5.innerHTML = data2.daily[4].weather[0].description.toUpperCase();

        /*Clear input bar*/
        input.value = '';
}

//Switch back to fahreinheit GPS
symbolFGPS.addEventListener('click', _=> {

    if(symbolFGPS) {
        //Temp animation
        $(document).ready(() => {
            $(".temp").hide().fadeIn(800);
        });

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
            let gpsLat  = position.coords.latitude;
            let gpsLon = position.coords.longitude; 
            console.log(gpsLat, gpsLon);

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${gpsLat}&lon=${gpsLon}&appid=` + apiKey)
            .then(response => {
                return response.json();
            })
            .then(data3=> {
                console.log(data3)
                let fah = Math.round(((parseFloat(data3.main.temp)-273.15)*1.8)+32); ;
                temp.innerHTML = fah;
                fiveDayBtnGPS.style.display = 'block';
                fiveDayBtnGPS2.style.display = 'none';
                symbolFGPS.style.color = 'black';
                celGPS2.style.color = 'lightgrey';      
            })
            .catch(error => console.log(error));
            })
        }
    }        
});













