/* 
This script takes a random tip from a designated Google Sheet and posts them to the broadcast sheet
A zapier event is set up to post a facebook messenger card to chatfuel broadcast when this happens
There is a timer trigger setup for this script, which activates it every day.
This provides automated tip delivery as part of the facebook chatbot
See the readme in github for more info on the other portions of this
Originally I was going to post the text, but it often was too large to fit on a facebook card
Instead I used https://www.branah.com/text-to-image to create the images, uploaded them to the bots photo album on facebook
then I viewed the photos, right-clicked and got their url. 
To use this as is the tip spreadsheet has six columns (no header row):
index, tip description, tip description(duplicate), tip title, tip photo url, tip photo

  -note: the duplicate tip description was there from an attempt to do the photo url generation on the fly with img4me.com, 
  it didn't work but I haven't given up

The broadcast spreadsheet needs to be set up with seven columns and a header row
date	Trip Tip	image link	image	count	Title	index

date-created by the script, indicates date posted
Trip Tip - text of the tip
image link - url of the photo
image - =image('[url of photo]')
count - indicates whether the post was split. Now always 1/1
Title - Title of tip
index - index# from the tip spreadsheet to ensure no duplicates

*/

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i].toString().indexOf(search) > -1 ) return i;

  return -1;
}

function GetTripTip() {

//Parameters set here, 
//OrigGSpreadsheetID is the ID for the spreadsheet with the tips
var OrigGSpreadsheetID='1c-PwNmXAj1KVrc2GW4ChdiH-nc-QqJ0Cv_1C8BVgthk'
//CurrrentGSpreadsheetSheet is the sheet name for the output spreadsheet
var CurrentGSpreadsheetSheet = 'Sheet1'


var css=SpreadsheetApp.getActiveSpreadsheet();
var csheet=css.getActiveSheet();
var crow=csheet.getLastRow()+1;
var triparray=[];

var ss=SpreadsheetApp.openById(OrigGSpreadsheetID);
var sheet=ss.getSheetByName(CurrentGSpreadsheetSheet);
//select a random row and get trip tip
var rownum=sheet.getLastRow();
Logger.log('last row='+rownum);
var NewOne=true;

// make sure we haven't used this trip tip before
while (NewOne) {
  Logger.log('recheck last row numb'+rownum);
  var ranrow=Math.floor(Math.random() * rownum) + 1;
  Logger.log('random row number=%s',ranrow);
  var triptip=sheet.getRange(ranrow, 3).getValue();
  var TipTitle=sheet.getRange(ranrow, 4).getValue();
  var tipIdx=sheet.getRange(ranrow, 1).getValue();
  //check to see if trip tip has been used

  var column=7;
  var columnValues = csheet.getRange(2, column, sheet.getLastRow()).getValues(); //1st is header row
    var searchResult = columnValues.findIndex(tipIdx); //Row Index - 2

    if(searchResult == -1)
    {
        //search result is empty, tip has not be used before
        Logger.log("looking for %s, search result=%s",tipIdx, searchResult);
        NewOne=false;
           
    }
 }
 

csheet.getRange(crow, 2).setValue(triptip);
csheet.getRange(crow, 1).setValue(new Date());
csheet.getRange(crow, 5).setValue("1/1");
csheet.getRange(crow, 6).setValue(TipTitle);
csheet.getRange(crow, 7).setValue(tipIdx);
//triptip += String.fromCharCode(13)+"-"+String.fromCharCode(13)+"-";
Logger.log('modified whole trip tip for image=%s',triptip);
Logger.log('current length of triptip=%s',triptip.length);
//var iurl=UrlFetchApp.fetch('http://api.img4me.com/?text='+triptip+'&font=Arial&size=14&bcolor=FFFFFF&fcolor=000000&type=gif');
var iurl=sheet.getRange(ranrow, 5).getValue();
Logger.log(iurl);
csheet.getRange(crow, 3).setValue(iurl);
var img=UrlFetchApp.fetch(iurl);
csheet.getRange(crow, 4).setValue(sheet.getRange(ranrow, 6).getFormula());

}

