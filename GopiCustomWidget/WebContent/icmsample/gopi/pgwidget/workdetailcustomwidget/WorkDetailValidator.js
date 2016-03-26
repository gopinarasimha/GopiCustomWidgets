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
		
	return declare("icmsample.gopi.pgwidget.workdetailcustomwidget.WorkDetailValidator",[BasePageWidget,BaseWidget],{
	
    templateString:template,
    
	widgetsInTemplate:true,
	
	_this: null,
	
    postCreate:function(){
		
		console.log("Entered into postCreate method");
    	
		try{
		
		  this.inherited(arguments);
		  
		  _this = this;
		   
		   var dataJSONFile = dojo.fromJson(jsonFile);
		   
		   console.log("JSON File From Server is ",dataJSONFile);
		   
		   var _this = this;
		   
		   this.propTab.watch("selectedChildWidget", function(name, oval, nval){
				
				console.log(name,"selected child changed from ", oval, " to ", nval);
				
				if(nval.dojoAttachPoint == "readTab"){
					
					console.log("Entered into first tab change logic");
					
					_this.rederUIFromJSON(dataJSONFile);
				}			
			});
			
		}catch(e){
			
			console.log("error occred in js",e);
		}
		
		console.log("Exit From postCreate");
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
			
			this.readTab.containerNode.appendChild(tableTag);
		
		}catch(e){
		
			console.log("Exception Occured in rederUIFromJSON while Doing JSON operations",e);
		}	
	},
	handleICM_SendWorkItemEvent:function(payload){
		
		console.log("Entered into handleICM_SendWorkItemEvent",payload);
		
		var workitemEditableObj = null,coordinationObj = null;
		
		if(payload.workItemEditable && payload.coordination){
		
			workitemEditableObj = payload.workItemEditable;
			
			coordinationObj = payload.coordination;
			
			coordinationObj.participate("VALIDATE", lang.hitch(this,"validateWI"));
			
			
		}
		console.log("Exit From handleICM_SendWorkItemEvent");
	},
	validateWI:function(context, complete, abort){
		
		console.log("Entered into validateWI");
		
		abort({"message": "Just For Test"});
		
		console.log("Exit into validateWI");
		
	}
});
});
