define(["dojo/_base/declare",
	"icm/base/BasePageWidget",
	"icm/base/_BaseWidget",
	"dojo/text!./templates/publisher.html"], 
function(declare,BasePageWidget,BaseWidget,template){
    
	return declare("icmsample.gopi.pgwidget.publisher.Publisher",[BasePageWidget,BaseWidget],{
    	
     templateString:template,

   	 widgetsInTemplate: true,
     
   	 postCreate:function(){
   	 
   		 this.inherited(arguments);
	
	 },
	 
	 afterSubmit:function(){
		 
		 console.log("Thanku for Submision");
		 
		 //get the value from Html 
		 var name= this.pName.get('value');
		 
		 console.log("the publisher name:",name);
		 
		 // get the vaule from widget
		 var number=this.pNumber.get('value');
		 
		 console.log("the publisher number:",number);
		
		 //payload object is created 
		 var payload=new Object();
		 
		 // assign the value to payload.value1
		 payload.value1=this.pName.get('value');
		 
		 // assin the  value to payload 2
		 payload.value2=this.pNumber.get('value');
		 
		 // payload object is passed to handler  method
		 this.onBroadcastEvent("icm.SearchCases", payload);
	 }
	 });
});


