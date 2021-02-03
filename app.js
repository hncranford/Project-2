var tableData = data;

d3.csv("newcensus.csv", function(tableData){

    var cityPop = [tableData[0].Pop2010,tableData[0].Pop2011,tableData[0].Pop2012,tableData[0].Pop2013,tableData[0].Pop2014,tableData[0].Pop2015,
    tableData[0].Pop2016, tableData[0].Pop2017, tableData[0].Pop2018, tableData[0].Pop2019]
    var trace1 = {
        x: ["2010","2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
        y: cityPop,
        type: "line"
      };
      
      var data = [trace1];
      
      var layout = {
        title: tableData[0].citystate + " City Growth",
      };
      
      Plotly.newPlot("linegraph", data, layout);
})


var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 3
  });


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var myFeatureGroup = L.featureGroup().addTo(myMap).on("click", markerClick);
  //myMap.addLayer(myFeatureGroup);

d3.csv("final.csv", function(tableData){
    for (var i = 0; i < tableData.length; i++) {
        var location = tableData[i];
        var coordinates = [location.lat, location.lng];
        var marker = L.marker(coordinates)
          .bindPopup(location.Company_Name)
          .addTo(myMap)

        marker.coordinates = coordinates;
    }
});

d3.csv("newcensus.csv", function(tableData){
    //console.log(tableData);
    for (var i=0; i<tableData.length; i++) {
        var location = tableData[i];
        var growth = ((tableData[i].Pop2019 - tableData[i].Pop2010)/tableData[i].Pop2010)*10;
        L.circle([location.lat, location.lng],{
            fillOpacity: 0.8,
            color: "black",
            weight: 1,
            fillColor: "blue",
            radius: growth * 25000
        }).addTo(myMap);
      }
    
});

//myFeatureGroup.on("click", markerClick);

d3.csv("final.csv", function(tableData) {


    //console.log(tableData);

    var table = d3.select("table");
    var tbody = d3.select("tbody");
    

    for(var i = 0; i<tableData.length; i++){
        var arr = [];

        var title = tableData[i].Job_Title;
        var desc = tableData[i].Job_Description.substring(0,95) + "...";
        var location = tableData[i].city_state;
        var salary = tableData[i].Salary_Estimate;
        var rating = tableData[i].Rating;
        var company = tableData[i].Company_Name;
        var industry = tableData[i].Industry;

        arr.push(title);
        arr.push(desc);
        arr.push(location);
        arr.push(salary);
        arr.push(rating);
        arr.push(company);
        arr.push(industry);

        var row = tbody.append("tr");
        

        for (var j = 0; j<arr.length; j++) {
            var cell = row.append("td");
            cell.text(arr[j]);
            //console.log(arr[j]);
        }
    }
    
});


var button = d3.select('#filter-btn');

button.on("click", runenter);

//marker.on("click", markerClick);

function markerClick(event){
    console.log("click!");
} 


function runenter() {
    
    d3.event.preventDefault();
    d3.select(".summary").html("");
    
        var input = d3.select('#citystate');
        var inputValue = input.property('value');
        var filteredData = [];
        //console.log(tableData[0].length);

        for (var i=0; i<1510; i++) {
            //var loc = tableData[i].city_state;
            //console.log(tableData[0][i].city_state);
            if (tableData[0][i].city_state == inputValue) {
                filteredData.push(tableData[0][i]);
                //console.log(tableData[i]);
            }
        }

        console.log(filteredData);
        var tbody = d3.select("tbody");
        tbody.text("")
        for(var i = 0; i<filteredData.length; i++){
            var arr = [];
    
            var title = filteredData[i].Job_Title;
            var desc = filteredData[i].Job_Description.substring(0,95) + "...";
            var location = filteredData[i].city_state;
            var salary = filteredData[i].Salary_Estimate;
            var rating = filteredData[i].Rating;
            var company = filteredData[i].Company_Name;
            var industry = filteredData[i].Industry;
    
            arr.push(title);
            arr.push(desc);
            arr.push(location);
            arr.push(salary);
            arr.push(rating);
            arr.push(company);
            arr.push(industry);
    
            var row = tbody.append("tr");
            d3.event.preventDefault();
    
            for (var j = 0; j<arr.length; j++) {
                d3.event.preventDefault();
                var cell = row.append("td");
                cell.text(arr[j]);
                //console.log(arr[j]);
            }

            
        }

        

    
};