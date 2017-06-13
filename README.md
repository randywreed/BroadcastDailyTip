# BroadcastDailyTip
This code works with Zapier and Chatfuel to broadcast a daily tip to facebook messenger chatbot

This requires two google spreadsheets:
1) Tip Spreadsheet (this is the source for the tips)
no header row, but the columns are as follows
index, tip description, tip description(duplicate), tip title, tip photo url, tip photo
  -note: the duplicate tip description was there from an attempt to do the photo url generation on the fly with img4me.com, 
  it didn't work but I haven't given up

2) Broadcast Spreadsheet (this is the spreadsheet set up to trigger the Zapier event)
The broadcast spreadsheet needs to be set up with seven columns and a header row
date	Trip Tip	image link	image	count	Title	index

date-created by the script, indicates date posted
Trip Tip - text of the tip
image link - url of the photo
image - =image('[url of photo]')
count - indicates whether the post was split. Now always 1/1
Title - Title of tip
index - index# from the tip spreadsheet to ensure no duplicates

