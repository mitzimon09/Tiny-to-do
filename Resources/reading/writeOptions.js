var currentWin = Ti.UI.currentWindow;  

var newcategorybtn = Titanium.UI.createButton({
	title: 'Nueva Categoria',
	top: 60,
	width: 130,
	height: 35,
	borderRadius: 1,
	font: {fontFamily: 'Arial', fontWeigth: 'bold', fontSize: 14}
});

newcategorybtn.addEventListener('click', function(e)
{
	//currentWin.tabGroup.setActiveTab(2);
	var catwritewin = Ti.UI.createWindow({
		url: "../rwrite_cat.js",
		title: "Nueva categoria",
		backgroundColor: '#fff'
	});
	Ti.UI.currentTab.open(catwritewin);
});

var newitembtn = Titanium.UI.createButton({
	title: 'Nueva Tarea',
	top: 100,
	width: 130,
	height: 35,
	borderRadius: 1,
	font: {fontFamily: 'Arial', fontWeigth: 'bold', fontSize: 14}
});

newitembtn.addEventListener('click', function(e)
{
	var itemwritewin = Ti.UI.createWindow({
		url: "../rwrite.js",
		title: "Nueva categoria",
		backgroundColor: '#fff'
	});
	Titanium.UI.currentTab.open(itemwritewin);
});
currentWin.add(newcategorybtn);
currentWin.add(newitembtn);