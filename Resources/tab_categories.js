// create var for the currentWindow  
var currentWin = Ti.UI.currentWindow;  
  
// set the data from the database to the array  
function setData() {  
	var db = Ti.Database.open('contentDB');  
  
	var rows = db.execute('SELECT DISTINCT id, name FROM categories;');
	var dataArray = [];  
  
	while (rows.isValidRow())  
	{  
		dataArray.push({id:'' + rows.fieldByName('id')+'',title:'' + rows.fieldByName('name') + '', hasChild:true, path:'item.js'});  
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
  
        var catId = e.rowData.id;
        win.catId = catId;  
        Ti.UI.currentTab.open(win);  
    }  
});

// add the tableView to the current window  
currentWin.add(tableview);  
  
// call the setData function to attach the database results to the array  
setData();