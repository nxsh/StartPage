// Global variables

var ip; // store IP

// Lat and Long
var lat;
var lon;

// Month array
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "Oct", "November", "December"];

// Counter for search
var count = 0;

// Search engine array
var commands = [
	{
		command: "",
		label: "Google",
		icon: "fa fa-google",
		url: "https://www.google.com/search?q="
	},
	{
		command: "/a",
		label: "Amazon",
		icon: "fa fa-amazon",
		url: "https://www.amazon.co.uk/s?k="
	},
	{
		command: "/d",
		label: "DuckDuckGo",
		icon: "fa fa-ban",
		url: "https://duckduckgo.com/?q="
	},
	{
		command: "/f",
		label: "Facebook",
		icon: "fa fa-facebook",
		url: "https://www.facebook.com/search/top/?q="
	},
	{
		command: "/t",
		label: "Twitter",
		icon: "fa fa-twitter",
		url: "https://twitter.com/search?q="
	},
	{
		command: "/r",
		label: "Reddit",
		icon: "fa fa-reddit-alien",
		url: "https://www.reddit.com/search?sort=relevance&t=all&q="
	},
	{
		command: "/w",
		label: "Wikipedia",
		icon: "fa fa-wikipedia-w",
		url: "http://en.wikipedia.org/wiki/Special:Search/"
	},
	{
		command: "/y",
		label: "YouTube",
		icon: "fa fa-youtube-play",
		url: "https://www.youtube.com/results?search_query="
	},
];

// Load functions on window load
function start() {
	dateTime();
	weather();
}
window.onload = start;

$("#top").on("click", function() {
	//$("nav").toggleClass("hide");
	$("aside").toggleClass("hide");
});

// IP/VPN functions
$.getJSON("https://am.i.mullvad.net/json", function(data){
	console.log(data);
	lat = data.latitude;
	lon = data.longitude;
	if(data.mullvad_exit_ip) {
    document.getElementById('vpn').textContent="connected";
	}
	else {
    document.getElementById('vpn').textContent="disconnected";
	}
});

// IP location
$.getJSON("https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_87UkRbwACHaX1jMHwhx6OKxUIYNNg&"+ip+"=8.8.8.8", function(data) {
	console.log(data.location.postalCode);
	document.getElementById('loc').textContent = data.location.city;
});

// Google maps
function initMap() {
  // The location of IP, needs doing dynamically using mullvad json object values
  var loc = {lat: 52.3128, lng: -1.5033};
  // The map, centered at loc
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: loc, disableDefaultUI:true});
  // The marker, positioned at loc, hidden with disableDefaultUI
}

// Show/Hide nav and aside
$(document).keydown(function(e){
	if (e.keyCode==78) $("nav").toggleClass("hide")
});

$(document).keydown(function(e){
	if (e.keyCode==65) $("aside").toggleClass("hide")
});

// Function to give correct 'st', 'nd', 'rd', 'th' for month dates
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

// Date
function dateTime() {
  var d=new Date();
    ap="am";
    //Hours, mins, secs
    h=d.getHours();
    m=d.getMinutes();
    s=d.getSeconds();
    // Format output wanted
    if (h>11) { ap = "pm"; }
    if (h>12) { h = h-12; }
    if (h==0) { h = 12; }
    if (m<10) { m = "0" + m; }
    if (s<10) { s = "0" + s; }
    //Day, month, year
    t=d.getDate();
    t=ordinal_suffix_of(t);
    n=monthNames[d.getMonth()];
    y=d.getFullYear();
    document.getElementById('timest').textContent=h + ":" + m + ap;
    document.getElementById('datest').textContent=t + " of " + n;
    t=setTimeout(dateTime, 500);
}

// Load first search icon
window.onload($("#searchEngine").toggleClass(commands[count]["icon"]));

$("#searchEngine").on("click", function() {
  // 'this' refers to the h1 being clicked, not ALL h1s
	//$(this).css("color", "purple");
	
	$("#searchEngine").removeClass(commands[count]["icon"])
	count++;
	if(count == 8) { // reset counter (loop)
		count = 0;
	}
	$("#searchEngine").addClass(commands[count]["icon"])
  console.log("Search button clicked!");
});

$("#productivity").on("click", function() {
	console.log("clicked");
	$("#prodLinks").toggleClass("hide");
});

// Search function
function search(e) {
  if(e.keyCode == 13) { // if enter pressed
		var val = document.getElementById("search-field").value;
		location.href = (commands[count]["url"]+val);
	}
}

// Weather
function weather() {
  var apiKey = "c632ff1ea87a9720027890a394abe1e4";
  var url = "https://api.forecast.io/forecast/";

  latitude = "52.626881";
  longitude = "-1.115510";
  //location.innerHTML = "Latitude is " + latitude + ", Longitude is " + longitude;

    $.getJSON(
      url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
      function(data) {
        temp = data.currently.temperature;

        function fahrenheitCelsius(temp) {  
          var fsc = temp;
          var cfc = ((fsc-32) * (5/9)).toFixed(2);
          return cfc;
        }

        temp = fahrenheitCelsius(temp);
        $("#temp").html(temp +  "&deg;C");
        $("#minutely").html(data.minutely.summary);
       
              //Skycons
			var iconRequest = data.currently.icon;
			
			var icons = new Skycons({'color' : '#268bd2'});
			
			var iconList = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];		
			//console.log(icons);
			for (i = 0; i < iconList.length; i++) {
				if (iconRequest == iconList[i]) {
						icons.set('icon', iconList[i]);
					
				}
			}
			icons.play();
        }
 );
}