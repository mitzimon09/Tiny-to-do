var currentWin = Ti.UI.currentWindow;  
  
var sendit = Ti.Network.createHTTPClient();  
sendit.open('GET', 'http://fit.um.edu.mx/byteb/cui.php');  
sendit.send();  

sendit.onload = function(){  
    var json = JSON.parse(this.responseText);  
  
    var json = json.items;  
  
    var dataArray = [];  
  
    var pos;  
    for( pos=0; pos < json.length; pos++){  
  
        dataArray.push({title:'' + json[pos].name + ''});  
        // set the array to the tableView  
        tableview.setData(dataArray);  
    };  
  
};  

var tableview = Ti.UI.createTableView({  
});  
  
currentWin.add(tableview);