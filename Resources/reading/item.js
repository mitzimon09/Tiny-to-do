var currentWin = Ti.UI.currentWindow;  
  
var sendit = Ti.Network.createHTTPClient();
var catId = Ti.UI.currentWindow.catId;
Ti.API.info("category clicked " + catId);
var url = 'http://fit.um.edu.mx/byteb/tinytodo/getCategories.php?cat='+ catId;
sendit.open('GET', url);
sendit.send();  

sendit.onload = function(){
    var json = JSON.parse(this.responseText);
    var json = json.items;
  
    var dataArray = [];
  
    var pos;  
    for( pos=0; pos < json.length; pos++){
  		dataArray.push({title:'' + json[pos].name + '', id:'' + json[pos].id+'', hasChild:true, path:'item_desc.js'});  
		
    };
    tableview.setData(dataArray);  
  
};  

var tableview = Ti.UI.createTableView({  
});  

tableview.addEventListener('click', function(e)  
{  
    if (e.rowData.path)  
    {  
        var win = Ti.UI.createWindow({  
            url:e.rowData.path,  
            title:e.rowData.title  
        });  
  
        var itemId = e.rowData.id;
        win.itemId = itemId;  
        Ti.UI.currentTab.open(win);  
    }  
});
//
// NAVBAR
// 
var newcategoriebtn = Titanium.UI.createButtonBar({
	labels:['Nueva tarea']
});

newcategoriebtn.addEventListener('click', function(e)
{
	var itemwritewin = Ti.UI.createWindow({
		url: "../rwrite.js",
		title: "Nueva tarea"
	});
	var catId = Ti.UI.currentWindow.catId;
    itemwritewin.catId = catId;
	Ti.UI.currentTab.open(itemwritewin);
});
currentWin.setRightNavButton(newcategoriebtn);

currentWin.add(tableview);