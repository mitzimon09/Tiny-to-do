var currentWin = Ti.UI.currentWindow;
  
var sendit = Ti.Network.createHTTPClient();
sendit.open('GET', 'http://fit.um.edu.mx/byteb/tinytodo/getCategories.php');
sendit.send();  

sendit.onload = function(){
    var json = JSON.parse(this.responseText);
    var json = json.categories;  
  
    var dataArray = [];
  
    var pos;  
    for( pos=0; pos < json.length; pos++){	
  		dataArray.push({title:'' + json[pos].name + '', id:'' + json[pos].id+'', hasChild:true, path:'item.js'});  
		
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
  
        var catId = e.rowData.id;
        win.catId = catId;
        Ti.UI.currentTab.open(win);  
    }  
});
//
// NAVBAR
// 
var newcategoriebtn = Titanium.UI.createButtonBar({
	labels:['Nueva']
});

newcategoriebtn.addEventListener('click', function(e)
{
	var catwritewin = Ti.UI.createWindow({
		url: "../rwrite.js",
		title: "Nueva categoria",
		backgroundColor: '#fff'
	});
	Ti.UI.currentTab.open(catwritewin);
});

var deletecategoriebtn = Titanium.UI.createButtonBar({
	
	labels:['Eliminar']
});

deletecategoriebtn.addEventListener('click', function(e)
{
	var catwritewin = Ti.UI.createWindow({
		url: "../rwrite.js",
		title: "Nueva categoria",
		backgroundColor: '#fff'
	});
	Ti.UI.currentTab.open(catwritewin);
});

currentWin.setRightNavButton(newcategoriebtn);
currentWin.setLeftNavButton(deletecategoriebtn);

currentWin.add(tableview);