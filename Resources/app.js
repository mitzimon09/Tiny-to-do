var db = Titanium.Database.install('tinytododb.sqlite','contentDB');

var lastUpdatedTS = Titanium.App.Properties.getInt('lastUpdatedTS');
if (lastUpdatedTS == null || lastUpdatedTS < 1330967919) {
	lastUpdatedTS = 1330967919;
	Ti.App.Properties.setInt('lastUpdatedTS', 1330967919 );
}

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//

// Tab for main screen
/*
var win0 = Titanium.UI.createWindow({
    url:'tab_home.js',
    title:'Home',
    backgroundColor: '#fff'
});
var tab0 = Titanium.UI.createTab({
    icon:'nav_home.png',
    title:'Home',
    window:win0
});
*/
var win1 = Titanium.UI.createWindow({ 
	url: 'tab_categories.js',
    title:'Categorias',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Categorias',
    window:win1
});

/*var win2 = Titanium.UI.createWindow({
	url: 'tab_config.js',
	title: 'Configuracion',
	backgroundColor: '#fff',
});
var tab2 = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title: 'Configuracion',
	window: win2
});*/

var win3 = Titanium.UI.createWindow({
	url: 'tab_newtodo.js',
	title: 'Nuevo',
	backgroundColor: '#fff',
});
var tab3 = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title: 'Nuevo',
	window: win3
});

var win4 = Titanium.UI.createWindow({
	url: 'rread.js',
	title: 'rread',
	backgroundColor: '#fff',
});
var tab4 = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title: 'rread',
	window: win4
});

var win5 = Titanium.UI.createWindow({
	url: 'reading/writeOptions.js',
	title: 'Nueva',
	backgroundColor: '#fff',
});
var tab5 = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title: 'Nueva',
	window: win5
});

var win6 = Titanium.UI.createWindow({
	url: 'reading/tiny.js',
	title: 'Categorias',
	backgroundColor: '#fff',
});
var tab6 = Titanium.UI.createTab({
	icon:'KS_nav_ui.png',
	title: 'Categorias',
	window: win6
});

var win7 = Titanium.UI.createWindow({
	url: 'reading/calendar.js',
	title: 'Calendario',
	backgroundColor: '#fff',
});
var tab7 = Titanium.UI.createTab({
	icon:'KS_nav_ui.png',
	title: 'Calendario',
	window: win7
});

///////
//  add tabs
//  
//tabGroup.addTab(tab0); 	//home, db updating
//tabGroup.addTab(tab1); 		//local categories
//tabGroup.addTab(tab2); 	//configuracion
//tabGroup.addTab(tab3);		//new todo local
//tabGroup.addTab(tab4);		//remote read all todos
tabGroup.addTab(tab6);		//remote categories
tabGroup.addTab(tab5);		//remote todo write
tabGroup.addTab(tab7);

// open tab group
tabGroup.open();
