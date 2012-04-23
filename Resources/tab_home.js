// These two variables are specific to Tutorial 2
var xhrURL = 'http://www.prairiewest.net/dbtest2/update.php';
var xhrKey = 'gt8DSk44w';

var busy = false;
var d = new Date();
var currentTS = parseInt(((d.getTime()) / 1000),10);
var win = Titanium.UI.currentWindow;
var webview = Ti.UI.createWebView();
var canRedraw = false;

// pull the last item from the database and display it
function composeHomeHTML() {
	var currentSize = Ti.App.Properties.getInt("fontSize");
	var item_name = "Unknown";
	var item_desc = "Unknown";
	
	var db = Titanium.Database.open('contentDB');
	var dbrows = db.execute('select name,description from items order by id desc');
	if (dbrows.isValidRow()) {
    	item_name = dbrows.fieldByName('name');
    	item_desc = dbrows.fieldByName('description');
	}
	dbrows.close();
	db.close();
	
	var retval = '<html><head>';
	retval += '<style>BODY {color: black;font-family: Arial, Helvetica, Sans-Serif;text-align:center;font-size:'+currentSize+'pt}';
	retval += '</style>';
	retval += '</head><body bgcolor="#ffffff"><div style="padding: 26px; background-color: white; border: 1px solid; -webkit-border-radius: 5px;text-align:left">';
	retval += "<h1>"+item_name+"</h1><br/>";
	retval += item_desc;
	retval += '</div>';
	retval += '</body></html>';
	return retval;
}

function showModalWindow() {
	//ventanita con 2 labels que indica que esta cargando las actualizaciones de la base de datos
	updateWin = Titanium.UI.createWindow({
		backgroundColor:'#cccccc',
		borderWidth:4,
		borderColor:'#aaaaaa',
		height:140,
		width:200,
		borderRadius:8,
		opacity:0.92
	});
	var label1 = Ti.UI.createLabel({
		text:'Updating database,',
		top:35,
		width:'auto',
		height:'auto',
		textAlign:'center',
		color:'#ffffff',
		font:{fontWeight:'bold',fontSize:18}
	});
	updateWin.add(label1);
	var label2 = Ti.UI.createLabel({
		text:'please wait...',
		top:60,
		width:'auto',
		height:'auto',
		textAlign:'center',
		color:'#ffffff',
		font:{fontWeight:'bold',fontSize:18}
	});
	updateWin.add(label2);
	
	//Indicador de actividad o ruedita que indica que esta cargando
	var actInd = Titanium.UI.createActivityIndicator({
		top:90, 
		height:16,
		width:16,
		left:92,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});
	actInd.show();
	updateWin.add(actInd);
	updateWin.open();
}


function closeModalWindow() {
	var t2 = Titanium.UI.create2DMatrix();
	t2 = t2.scale(0);
	updateWin.close({transform:t2,duration:300});
}

// When updating, this function is on a scheduled timer, and will 
// only stop firing once the update is complete. Keeps the loading window open
function checkBusy() {
	if (busy) {
		setTimeout(checkBusy, 300);
	} else {
		closeModalWindow();	
		webview.html = composeHomeHTML();
		win.add(webview);
		win.title = "Home";
		canRedraw = true;
	}
};


// determine if database is out of date
function checkNeedsUpdating(nowTS) {
	var retval = false;
	var lastUpdatedTS = Titanium.App.Properties.getInt('lastUpdatedTS');
	var timeDiff = nowTS - lastUpdatedTS;
	// check every 30 seconds
	// only for tutorial, real apps would use much longer time (1 - 24 hours)
	if (timeDiff > 30 || timeDiff < 0) {
		retval = true;
		Ti.API.info("DB needs updating from remote");
	}
	return retval;
};



// load the data from remote and store locally
function updateDatabaseFromRemote(remoteURL,nowTS) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		try {
			var doc = Ti.XML.parseString(this.responseData.text);
			if (doc.getElementsByTagName("status").item(0).text=='OK') {
				Ti.API.info("Updating database...");
				var items = doc.getElementsByTagName("item");
				Ti.API.info("Found "+items.length+" items to update");
				var db = Titanium.Database.open('contentDB');
				for (var c = 0; c < items.length; c++) {
					var item = items.item(c);
					var item_id = item.getElementsByTagName("id").item(0).text;
					var item_cid = item.getElementsByTagName("category_id").item(0).text;
					var item_name = item.getElementsByTagName("name").item(0).text;
					var item_desc = item.getElementsByTagName("description").item(0).text;
					var item_date = item.getElementsByTagName("date").item(0).text;
					db.execute('REPLACE INTO items (id, category_id, name, description, date) VALUES (?,?,?,?,?)',item_id,item_cid,item_name,item_desc,item_date);
					Ti.API.info("Item ["+item_id+"] = "+item_name);
				}
				db.close();
				Ti.API.info("Done.");
				Titanium.App.Properties.setInt('lastUpdatedTS',nowTS);
				Ti.API.info("Set lastUpdatedTS to "+nowTS);
			} else {
				Ti.API.info("Warning: XML did not have status = OK for update");
			}
			busy=false;
		}
		catch(e) {
			busy=false;
		}
	};
	xhr.onerror = function(e) {
		busy=false;
	};
	// open the client and get the data
	var lastUpdatedTS = Titanium.App.Properties.getInt('lastUpdatedTS');
	remoteURL += "?since=" + lastUpdatedTS;
	remoteURL += "&auth=" + xhrKey;		
	xhr.setTimeout(25000);
	Ti.API.info("Open: "+remoteURL);
	xhr.open('GET',remoteURL);
	xhr.setRequestHeader('User-Agent','Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A537a Safari/419.3');
	xhr.send(); 
};

// see if database should be refreshed
if (checkNeedsUpdating(currentTS) && (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)) {
	busy = true;
	showModalWindow();
	updateDatabaseFromRemote(xhrURL,currentTS);
	setTimeout(checkBusy, 300);
} else {
	// no refresh, just display the page
	webview.html = composeHomeHTML();
	win.add(webview);
	win.title = "Home";
	canRedraw = true;
}

// redraw on focus since user may have changed font size
win.addEventListener('focus', function() {
	if (canRedraw) {
		webview.html = composeHomeHTML();
	}
});
