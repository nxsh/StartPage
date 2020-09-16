// Load functions on window load
function start() {
  dateTime();
}
window.onload = start;

// Month array
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "Oct", "November", "December"];

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
		url: "https://www.amazon.com/s/field-keywords="
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

$("#searchEngine").on("click", function() {
  // 'this' refers to the h1 being clicked, not ALL h1s
  //$(this).css("color", "purple");
  console.log("Search button clicked!");
	$("aside").toggleClass("hide");
  $("nav").toggleClass("hide");
  //$("#browsing").toggleClass("hide");
});

function search(e) {
	// if input equals /t etc
  if(e.keyCode == 13) {
		var val = document.getElementById("search-field").value;
		var engine = "https://google.com/search?q=";
		location.href = (engine + val);
  }
}


