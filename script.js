var preloader=document.getElementById('pre-loading');
function loader()
{
    preloader.style.display='none';
}

let weather=
{
    apiKey:"29cd62b0b0b5832635f75228e9957583",
    fetchWeather:function(city)
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
        
    },
    displayWeather:function(data)
    {
        const { name } = data;
        const { icon , description } = data.weather[0];
        const { temp , humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText=" Weather In " + name;
        document.querySelector(".icon").innerHTML="<img src='http://openweathermap.org/img/wn/10d.png'>";
        document.querySelector(".description").innerText= description;
        document.querySelector(".temp").innerText= temp +"°C";
        document.querySelector(".humidity").innerText= "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText= "Wind Speed : " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+ name +"')"
    },
    search:function()
    {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document
.querySelector(".search button")
.addEventListener("click" , function()
{
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup" ,function()
{
    if(event.key=="Enter")
    {
        weather.search();
    }
});
weather.fetchWeather("Kolkata");