// create var for the currentWindow  
var currentWin = Ti.UI.currentWindow;  
var db = Ti.Database.install('tinytodoDB.sqlite','contentDB'); 
  
var itemId = Ti.UI.currentWindow.itemId;  
  
var rows = db.execute('SELECT * FROM items WHERE id="' + itemId + '";');  
var data = [  
{title:'' + rows.fieldByName('name') + '', header:'Nombre'},  
{title:'' + rows.fieldByName('date') + '', header:'Fecha'},  
{title:'' + rows.fieldByName('category_id') + '', header:'Categoria'},  
{title:'' + rows.fieldByName('description') + '', header:'descripcion'}  
];  
  
var tableview = Ti.UI.createTableView({  
    data:data  
});  
  
currentWin.add(tableview); 