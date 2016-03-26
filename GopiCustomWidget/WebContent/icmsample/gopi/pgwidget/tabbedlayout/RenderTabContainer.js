define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"ecm/model/Request",
    "icm/base/BasePageWidget",
    "icm/base/_BaseWidget",	
    "dojo/text!./templates/tabedlayout.html",
	"dojo/json",
	"dojo/text!./templates/UIJSON_Info.json",
	"dojo/dom-construct",
	"dojo/_base/array"],function(declare,lang,on,request,BasePageWidget,BaseWidget,template,JSON,jsonFile,domConstruct,array){
		
	return declare("icmsample.gopi.pgwidget.tabbedlayout.RenderTabContainer",[BasePageWidget,BaseWidget],{
	
    templateString:template,
    
	widgetsInTemplate:true,
	
	_this: null,
	
    postCreate:function(){
    	
		try{
		
		  this.inherited(arguments);
		  
		  _this = this;
  		 
		   console.log("before onm method");
		   
		   var dataJSONFile = dojo.fromJson(jsonFile);
		   
		   console.log("JSON File From Server is ",dataJSONFile);
		   
		   var _this = this;
		   
		   this.mainTab.watch("selectedChildWidget", function(name, oval, nval){
				
				console.log(name,"selected child changed from ", oval, " to ", nval);
				
				if(nval.dojoAttachPoint == "firstTab"){
					
					console.log("Entered into first tab change logic");
					
					_this.rederUIFromJSON(dataJSONFile);
				}
				
				
				
			});
			
		}catch(e){
			
			console.log("error occred in js",e);
		}
	},	
	
	rederUIFromJSON:function(jsonObj){
		
		console.log("Enter Into rederUIFromJSON",jsonObj);
		
		try{
			
			var tableTag = domConstruct.create('table',{border:1});
			
			array.forEach(jsonObj,function(item){
				
				console.log('Item from Array',item);
				
				var trTag = domConstruct.create('tr',null,tableTag);
				
				var labelTag = domConstruct.create('td',{innerHTML:item.label},trTag);
				
				var uiTag = domConstruct.create('td',null,trTag);
				
				console.log("UI Type :"+item.className);
				
				var UIRef = require(item.className);
			
				console.log("UIRef",UIRef);
			
				var uiComponent =  new UIRef();
			
				console.log("UIRef",uiComponent);
			
				uiComponent.startup();
				
				dojo.place(uiComponent.domNode,uiTag);		
				
			});
			
			this.firstTab.containerNode.appendChild(tableTag);
		
		}catch(e){
		
			console.log("Exception Occured in rederUIFromJSON while Doing JSON operations",e);
		}	
	}
});
});
