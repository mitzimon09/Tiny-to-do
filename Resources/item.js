// create var for the currentWindow  
var currentWin = Ti.UI.currentWindow;  
  
// set the data from the database to the array  
function setData() {  
	var db = Ti.Database.install('tinytodoDB.sqlite','contentDB');
	var catId = Ti.UI.currentWindow.catId;
  	Titanium.API.info("clicked -> " + catId + " <- ");
	var rows = db.execute('SELECT * FROM items WHERE category_id="' + catId + '";');
	var dataArray = [];  
  
	while (rows.isValidRow())  
	{  
		dataArray.push({id: ''+ rows.fieldByName('id') +'', title:'' + rows.fieldByName('name') + '', hasChild:true, path:'item_desc.js'});
		Titanium.API.info("filling -> " + rows.fieldByName('name') + " <- ");
		rows.next(); 
	};
	tableview.setData(dataArray);
};  

// create table view  
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

// add the tableView to the current window  
currentWin.add(tableview);  
  
// call the setData function to attach the database results to the array  
setData();