var currentWin = Ti.UI.currentWindow;


//////////************ Creating textFields ************//////////
var name = Ti.UI.createTextField({
	color: '#336699',
	top: 10,
	width: 300,
	height: 40,
	hintText: 'Nombre',
	keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	touchEnabled: true
});

//////////////********** Button for creating the to do ************//////////
var aceptbtn = Ti.UI.createButton({
	title: 'Aceptar',
	top: 60,
	width: 60,
	height: 35,
	borderRadius: 1,
	font: {fontFamily: 'Arial', fontWeigth: 'bold', fontSize: 14}
});

aceptbtn.addEventListener('click',function(e) {  
    if (name.value != '') {
    	var url = "http://fit.um.edu.mx/byteb/write.php" + "?cat=1";
        request.open("POST", url);  
            var params = {
                name: name.value
            };
            Ti.API.info("name "+ params.name);
            request.send(params); 
    } else {  
        alert("Por favor escriba un nombre de categoria");  
    };  
});

currentWin.add(name);
currentWin.add(aceptbtn);

var request = Ti.Network.createHTTPClient();  
request.onload = function()  
{  
    if (this.responseText == "Insert failed")  
    {  
        aceptbtn.enabled = true;  
        aceptbtn.opacity = 1;  
        alert(this.responseText);  
    }  
    else  
    {
        var alertDialog = Ti.UI.createAlertDialog({
            message: this.responseText,  
            buttonNames: ['OK']  
        });  
        alertDialog.show();  
        alertDialog.addEventListener('click',function(e)  
        {
	       	currentWin.close;
            currentWin.tabGroup.setActiveTab(1);
            currentWin.close;
            currentWin.tabGroup.setActiveTab(1);
        });
    }  
};  
  