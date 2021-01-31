var tableData = data;

d3.csv("final.csv", function(tableData) {
    console.log(tableData);

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

function runenter() {
    d3.event.preventDefault();
    d3.select(".summary").html("");
    
        var input = d3.select('#citystate');
        var inputValue = input.property('value');
        var filteredData = [];
        console.log(tableData[0].length);

        for (var i=0; i<1510; i++) {
            //var loc = tableData[i].city_state;
            console.log(tableData[0][i].city_state);
            if (tableData[0][i].city_state == inputValue) {
                filteredData.push(tableData[0][i]);
                //console.log(tableData[i]);
            }
        }

        console.log(filteredData);
        var tbody = d3.select("tbody");
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