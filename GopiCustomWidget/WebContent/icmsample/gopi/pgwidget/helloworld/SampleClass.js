define([
	"dojo/_base/declare",
	"ecm/LoggerMixin",
], function(declare,LoggerMixin){
	
	var SampleClassVar = declare("icmsample.gopi.pgwidget.helloworld.SampleClass", null, {
	
		callMethod: function(){
			
			console.log("Entered into callMethod");
			
			
			console.log("Exit From callMethod");
		}
	});
	
	icmsample.gopi.pgwidget.helloworld.SampleClass = new SampleClassVar();
	
    return icmsample.gopi.pgwidget.helloworld.SampleClass;
});
