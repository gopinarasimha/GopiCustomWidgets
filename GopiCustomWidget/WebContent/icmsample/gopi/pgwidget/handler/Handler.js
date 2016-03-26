define(["dojo/_base/declare",
	"icm/base/BasePageWidget",
	"icm/base/_BaseWidget",
	"dojo/text!./templates/handler.html"], 
function(declare,BasePageWidget,BaseWidget,template){
	
    return declare("icmsample.gopi.pgwidget.handler.Handler",[BasePageWidget,BaseWidget],{
    	
     templateString:template,

   	 widgetsInTemplate: true,
     
   	 postCreate:function(){
   		 
		 this.inherited(arguments);
   		 
		 console.log("entered into handler js ");
	
	 },
	 handleICM_SearchCasesEvent:function(payload){
		 
		 console.log("entered into the handler widget ",payload);
				 
		 this.hName.set('value',payload.value1);
		 
		 this.hNumber.set('value',payload.value2);
		 
	 }
    
	 });
});


