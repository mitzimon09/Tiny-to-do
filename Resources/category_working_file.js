/*// create var for the currentWindow  
var currentWin = Ti.UI.currentWindow;  
      
// set the data from the database to the array  
function setData() {  
         
};  
      
// create table view  
var tableview = Ti.UI.createTableView({  
});  
      
tableview.addEventListener('click', function(e)  
{  
         
});  
      
// add the tableView to the current window  
currentWin.add(tableview);  
      
// call the setData function to attach the database results to the array  
setData();
var db = Ti.Database.install('../products.sqlite','products');
var rows = db.execute('SELECT DISTINCT category FROM products');



*/


var categoryArray = [];
var categoryRows = [];

// populate category array from database
// only called on first rendering of the tab, after that the array is filled
//if (categoryArray.length == 0) {
	var db = Titanium.Database.install('tinytododb.sqlite', 'contenDB');  
	var dbrows = db.execute('select id, name from categories order by name asc');
	while (dbrows.isValidRow()) {
	    categoryArray.push({
	    	categoryId:dbrows.fieldByName('id'),
	    	title:dbrows.fieldByName('name')
	    }); 
	    Ti.API.info("Found category: "+dbrows.fieldByName('name')+" ["+dbrows.fieldByName('id')+"]");
	    dbrows.next();
	}
	dbrows.close();
	db.close();
//}

// category table view
for (var c = 0; c < categoryArray.length; c++) {//for each category
	var row = Ti.UI.createTableViewRow({
		height:40,
		backgroundColor:'#ffffff',
		selectedBackgroundColor:'#eeeeee',
		hasChild:true
	}); 
	var item = categoryArray[c];//what category
	
	row.categoryName = item.title;
	row.categoryId = item.categoryId;
						
	var categoryName = Ti.UI.createLabel({
		text: item.title,
		color: '#334499',
		textAlign:'left',
		left:4,
		top:8,
		height:'auto',
		font:{
			fontWeight:'bold',
			fontSize:20
		}
	});
	row.add(categoryName);	
	categoryRows[c] = row;
}
var categoryTableView = Titanium.UI.createTableView({data:categoryRows});

// a helper function to make the code cleaner below
function composeItemHTML(id, desc) {
	var currentSize = Ti.App.Properties.getInt("fontSize");
	
	var retval = '<html><head>';
	retval += '<style>BODY {color: black;font-family: Arial, Helvetica, Sans-Serif;text-align:center;font-size:'+currentSize+'pt}';
	retval += '</style>';
	//retval += '</head><body bgcolor="#00ffff"><div style="padding: 26px; background-color: white; border: 1px solid; -webkit-border-radius: 5px;text-align:left">';
	retval += desc;
	retval += '</div>';
	retval += '</body></html>';
	return retval;
}

function showItemsInCategory(cid,cname) {
		var itemArray = [];
		Ti.API.info("-> "+cname+" <- clicked");
		
		// populate item array from database
		// called every time a category row is clicked
		var db = Titanium.Database.open('contentDB');
		var dbrows = db.execute('select id,name,description,date from items where category_id=? order by date asc',cid);
		while (dbrows.isValidRow()) {
		    itemArray.push({
		    	item_id:dbrows.fieldByName('id'),
		    	title:dbrows.fieldByName('name'),
		    	item_description:dbrows.fieldByName('description'),
		    	item_date:dbrows.fieldByName('date'),
		    }); 
		    Ti.API.info("Found item: "+dbrows.fieldByName('name')+" ["+dbrows.fieldByName('id')+"]");
		    dbrows.next();
		}
		dbrows.close();
		db.close();
				
		// create item table view
		itemRows = [];
		for (var c=0;c<itemArray.length;c++)
		{
			var row2 = Ti.UI.createTableViewRow({height:'40',backgroundColor:'#ffffff',selectedBackgroundColor:'#eeeeee',hasChild:true});
			var item = itemArray[c];
		
			// assign custom row values
			row2.item_id = item.item_id;
			row2.heading = item.title;
			row2.item_description = item.item_description;
			row2.item_date = item.item_date;

			// the label for the item name in tableview row
			var itemTitle = Ti.UI.createLabel({
				text: item.title,
				color: '#334499',
				textAlign:'left',
				left:4,
				top:8,
				height:'auto',
				font:{fontWeight:'bold',fontSize:20}
			});
			row2.add(itemTitle);
			
			itemRows[c] = row2;
		}
		var itemTableView = Titanium.UI.createTableView({data:itemRows});
		var subWindow = Titanium.UI.createWindow({  
		    title:cname,
		    backgroundColor:'#000000'
		});
		subWindow.add(itemTableView);
		Titanium.UI.currentTab.open(subWindow,{animated:true});
		
		// called when user clicks on an item to view the element
		itemTableView.addEventListener('click',function(e)
		{			
			var window3 = Ti.UI.createWindow({title:e.row.heading});
			/*
			var wb3 = Ti.UI.createWebView();
			wb3.html = composeItemHTML(e.row.item_id,e.row.item_description);
			window3.add(wb3);
			*/
			var item_data = [
				{title: '' + e.row.item_date, header:'Fecha'},
				{title: '' + e.row.item_description, header: 'Descripcion'}
			];
			var tableview = Ti.UI.createTableView({
				data:item_data
			});
			window3.add(tableview);
			var b3 = Titanium.UI.createButton({
				title:'Close',
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			window3.setLeftNavButton(b3);
			b3.addEventListener('click',function()
			{
				window3.close();
			});			
			window3.open({modal:true});
		});
};

// called when use clicks on a category to see items in that category
function handleCategoryClick(e) {				
	showItemsInCategory(e.row.categoryId,e.row.categoryName);
}

// category view event listener
categoryTableView.addEventListener('click', handleCategoryClick);


// add category table view to the window
Titanium.UI.currentWindow.add(categoryTableView);
