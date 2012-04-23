// create var for the currentWindow  
var currentWin = Ti.UI.currentWindow;
var tableview = Ti.UI.createTableView({  
});
var itemId = Ti.UI.currentWindow.itemId;
var sendit = Ti.Network.createHTTPClient();
var url = 'http://fit.um.edu.mx/byteb/tinytodo/getItem.php?id='+ itemId;
sendit.open('GET', url);
sendit.send();
 
var data = [];
sendit.onload = function(){
	//Ti.API.info(this.responseText);
	var json = JSON.parse(this.responseText);
	var json = json.item;

	data = [];
	data.push({title:'' + json[0].name + '', 		header:'Nombre'});
	data.push({title:'' + json[0].date + '', 		header:'Fecha'});
	data.push({title:'' + json[0].category_id + '', header:'Categoria'});  
	data.push({title:'' + json[0].description + '', header:'descripcion'});
	
	/*Ti.API.info("line 21 from reading/item_desc.js");
	Ti.API.info(data[0].title);
	Ti.API.info(data[1].title);
	Ti.API.info(data[2].title);
	Ti.API.info(data[3].title);
	*/
	tableview.setData(data);
}

var newcategoriebtn = Titanium.UI.createButtonBar({
	labels:['Nueva tarea']
});

newcategoriebtn.addEventListener('click', function(e)
{
	currentWin.tabGroup.setActiveTab(2);
	var itemwritewin = Ti.UI.createWindow({
		url: "../rwrite.js",
		title: "Nueva tarea"
	});
	Ti.UI.currentTab.open(itemwritewin);
});
currentWin.setRightNavButton(newcategoriebtn);

currentWin.add(tableview);