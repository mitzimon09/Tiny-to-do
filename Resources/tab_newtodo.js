var currentWin = Ti.UI.currentWindow;

function insertRows() {
	//var db = Titanium.Database.install('tinytododb.sqlite', 'contentDB');
	var db = Titanium.Database.open('contentDB');
	//Ti.API.info(db.toString); 
	var totala = db.execute('SELECT * from items;');
	var total = totala.getRowCount();
	Ti.API.info("total>>" + total);
	total=total+3;
	Ti.API.info("total una linea arriba");
	var theData = db.execute('INSERT INTO items (name, date, category_id, description,id) VALUES("'+name.value+'","'+date.value+'", '+category.value+', "'+description.value+'",'+total+');');
	total++;
	db.close();
	
	alert(theData+"");
};

//////////************ Creating textFields ************//////////
var name = Ti.UI.createTextField({
	color: '#336699',
	top: 10,
	width: 300,
	height: 40,
	hintText: 'Nombre',
	keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
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
	keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
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
    	insertRows();
    } else {  
        alert("Please fill in all fields");  
    };  
});

///////////********** Date Picker **********////////////
date.addEventListener('click', function() {
	picker_view.animate(slide_in);
	name.blur();
	category.blur();
	description.blur();	
});

var picker_view = Titanium.UI.createView({
	height:251,
	bottom:-251
});

//CREATE SELECTOR BUTTONS
var cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var done =  Titanium.UI.createButton({
	title:'Done',
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
var slide_in =  Titanium.UI.createAnimation({bottom:0});
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
	
currentWin.add(name);
currentWin.add(date);
currentWin.add(category);
currentWin.add(description);
currentWin.add(aceptbtn);
currentWin.add(picker_view);
