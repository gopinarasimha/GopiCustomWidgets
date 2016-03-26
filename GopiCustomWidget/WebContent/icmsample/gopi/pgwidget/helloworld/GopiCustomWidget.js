define([
	"dojo/_base/declare",
	"icm/base/BasePageWidget",
	"icm/base/_BaseWidget",
	"dojo/text!./templates/GopiCustomWidget.html",
	"dojo/dom-construct",
	"icmsample/gopi/pgwidget/helloworld/SampleClass"
], function(declare, BasePageWidget, _BaseWidget, template,domConstruct,SampleClass){
	return declare("icmsample.gopi.pgwidget.helloworld.GopiCustomWidget", [_BaseWidget, BasePageWidget], {
		templateString: template,
		
		_this: null,

		postCreate: function(){
			
			_this = this;
			
			console.log("Entered into Hellow World program");
			
			this.inherited(arguments);
			
			var ptag = domConstruct.create('p',{innerHTML:'Hello, Welcome to the New Widget program'},_this.messageNode,'after');
			
			SampleClass.callMethod();
			
			console.log("ptag Created",ptag);
		}
	});
});
