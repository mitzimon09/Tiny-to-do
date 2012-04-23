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

var date = Ti.UI.createTextField({
	color: '#336699',
	top: 60,
	width: 300,
	height: 40,
	hintText: 'Fecha',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	enabled: false
});

var category = Ti.UI.createTextField({
	color: '#336699',
	top: 110,
	width: 300,
	height: 40,
	hintText: 'Categoria',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	enabled: false,
	value: Ti.UI.currentWindow.catId
});

var description = Ti.UI.createTextField({
	color: '#336699',
	top: 160,
	width: 300,
	height: 100,
	hintText: 'Descripcion',
	keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

//////////////********** Button for creating the to do ************//////////
var aceptbtn = Ti.UI.createButton({
	title: 'Aceptar',
	top: 310,
	width: 60,
	height: 35,
	borderRadius: 1,
	font: {fontFamily: 'Arial', fontWeigth: 'bold', fontSize: 14}
});

aceptbtn.addEventListener('click',function(e) {  
    if (name.value != '' && date.value != '' && category.value != '' && description.value != '') {
    	
        request.open("POST","http://fit.um.edu.mx/byteb/write.php");  
            var params = {  
                name: name.value,
                category: category.value,
                description: description.value,
                fecha: date.value
            };
            Ti.API.info("name "+ params.name);
            request.send(params); 
    } else {  
        alert("Por favor llene todos los campos");  
    };  
});

///////////********** Date Picker **********////////////
date.addEventListener('click', function() {
	picker_view.animate(slide_in);
	name.blur();
	category.blur();
	description.blur();
	picker_view2.animate(slide_out);
	Ti.API.info("Date field clicked");
});

name.addEventListener('click', function() {
	Ti.API.info("name box clicked");
	picker_view.animate(slide_out);
	picker_view2.animate(slide_out);
	Ti.API.info("name box clicked 2");
});
name.addEventListener('focus', function() {
	Ti.API.info("name box clicked 3");
	picker_view.animate(slide_out);
	picker_view2.animate(slide_out);
	Ti.API.info("name box clicked 4");
});

description.addEventListener('click', function() {
	Ti.API.info("name box clicked");
	picker_view.animate(slide_out);
	picker_view2.animate(slide_out);
	Ti.API.info("name box clicked 2");
});
description.addEventListener('focus', function() {
	Ti.API.info("name box clicked 3");
	picker_view.animate(slide_out);
	picker_view2.animate(slide_out);
	Ti.API.info("name box clicked 4");
});

var picker_view = Titanium.UI.createView({
	height:251,
	bottom:-251
});

//CREATE SELECTOR BUTTONS
var cancel =  Titanium.UI.createButton({
	title:'Cancelar',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var done =  Titanium.UI.createButton({
	title:'Ok',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar =  Titanium.UI.createToolbar({
	top:0,
	items:[cancel,spacer,done]
});

//Set initial value to today’s date.
var dateValue = new Date();
var minDate = new Date();
minDate.setFullYear(1900);
minDate.setMonth(0);
minDate.setDate(1);

//maxDate cannot be greater than today’s date.
var maxDate = dateValue;
var picker = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_DATE,
	minDate:minDate,
	maxDate:maxDate,
	value:dateValue,
	selectionIndicator:true // turn on the selection indicator (off by default)
});
picker_view.add(picker);
picker_view.add(toolbar);

//animation slides in and out
var slide_in =  Titanium.UI.createAnimation({bottom:-20});
var slide_out =  Titanium.UI.createAnimation({bottom:-251});

//CANCEL BUTTON
cancel.addEventListener('click', function() {
	picker_view.animate(slide_out);
});

//UPDATE VALUE IF CHANGED
picker.addEventListener('change', function() {
	var y = picker.value.getFullYear();
	var m = picker.value.getMonth();
	var d = picker.value.getDay();
	if (m < 10){
		m = "0"+m;
	}
	if (d < 10){
		d = "0"+d;
	}
	var datetext = y + '-' + m + '-'+ d;
	date.value = datetext;
});

//SET TEXTFIELD VALUE AND CLOSE PICKER
done.addEventListener('click', function() {
	var y = picker.value.getFullYear();
	var m = picker.value.getMonth();
	var d = picker.value.getDay();
	if (m < 10){
		m = "0"+m;
	}
	if (d < 10){
		d = "0"+d;
	}
	var datetext = y + '-' + m + '-'+ d;
	date.value = datetext;
	picker_view.animate(slide_out);
});

///////////********** Category Picker **********////////////
category.addEventListener('click', function() {
	picker_view2.animate(slide_in);
	name.blur();
	description.blur();
	picker_view.animate(slide_out);
	//date.blur();
});

category.addEventListener('blur', function() {
	picker_view2.animate(slide_out);
});

var picker_view2 = Titanium.UI.createView({
	height:251,
	bottom:-251
});

//CREATE SELECTOR BUTTONS
var cancel2 =  Titanium.UI.createButton({
	title:'Cancelar',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var done2 =  Titanium.UI.createButton({
	title:'Ok',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var spacer2 =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar2 =  Titanium.UI.createToolbar({
	top:0,
	items:[cancel2,spacer2,done2]
});

var picker2 = Ti.UI.createPicker();
picker_view2.add(picker2);
picker_view2.add(toolbar2);

//CANCEL BUTTON
cancel2.addEventListener('click', function() {
	picker_view2.animate(slide_out);
});

//UPDATE VALUE IF CHANGED
picker2.addEventListener('change', function(e) {
	var datetext = e.row.catid;
	category.value = datetext;
});

//SET TEXTFIELD VALUE AND CLOSE PICKER
done2.addEventListener('click', function() {
	picker_view2.animate(slide_out);
});
// turn on the selection indicator (off by default)
picker2.selectionIndicator = true;



var sendit = Ti.Network.createHTTPClient();
sendit.open('GET', 'http://fit.um.edu.mx/byteb/tinytodo/getCategories.php');
sendit.send();  
var dataArray = [];
var catid = Ti.UI.currentWindow.catId;
sendit.onload = function(){
    var json = JSON.parse(this.responseText);
    var json = json.categories;  
  
    var pos;  
    for( pos=0; pos < json.length; pos++){
		dataArray[pos] = Ti.UI.createPickerRow({title: '' + json[pos].name + '', catid: '' + json[pos].id + ''})
    };
    picker2.add(dataArray);
};

currentWin.add(name);
currentWin.add(date);
currentWin.add(category);
currentWin.add(description);
currentWin.add(aceptbtn);  
currentWin.add(picker_view);
currentWin.add(picker_view2);

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
        	name.value = '';
        	date.value = '';
        	description.value = '';
        	
        	var sendit = Ti.Network.createHTTPClient();
			var catId = Ti.UI.currentWindow.catId;
			var url = 'http://fit.um.edu.mx/byteb/tinytodo/getCategories.php?id='+ catId + '&title=1';
			sendit.open('GET', url);
			sendit.send();
			  
		    var pos = this.responseText;
        	Ti.API.info("line 218 " + pos);	
        	var win = Ti.UI.createWindow({  
            	url:'item.js',
            	title: pos
        	});  
  
	        var catId = category.value;
	        win.catId = catId;
	        category.value ='';
	        Ti.UI.currentTab.open(win);
	          
	        	
	       	currentWin.close;
            currentWin.tabGroup.setActiveTab(2);
            currentWin.close;
            currentWin.tabGroup.setActiveTab(2);
        });
    }  
};  
  