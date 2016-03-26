/**
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2014
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
        "dojo/_base/declare", 
        "dojo/_base/lang",
    	"icm/util/WorkItemHandler",
        "icm/action/Action"
], function(declare, lang, WorkItemHandler, Action) {

	/**
	 * @name icm.action.workitem.DispatchWorkItemAndClosePage
	 * @class Dispatches the current work item. If the next work item is not opened automatically, this action also 
	 *        closes the current Work Details page. <br>
     * <p>
	 *        Context required by this action: [['WorkItemPage', 'Coordination']] <br>
     * </p>
     * <p>
	 *        The following series of coordination topics will be started in sequence:
	 * <ul>      
	 * <li> 'COMMIT'
	 * <li> 'VALIDATE' 
	 * <li> 'BEFORECOMPLETE'
	 * <li> 'COMPLETE'
	 * <li> 'AFTERCOMPLETE'
	 * </ul>
     * <p>
	 *        The coordination will be started with the following context:
     * </p>
	 * <ul>      
	 * <li> 'FORWORKITEM': true
	 * <li> 'FORRESPONSE': the response id end-users choose for dispatching
	 * </ul>
	 * @augments icm.action.Action
	 */
	return declare("icmsample.gopi.actions.wi.DispatchWorkItemAndClosePage", [Action], {
	/** @lends icm.action.workitem.DispatchWorkItemAndClosePage.prototype */
		
		executing: false,

		isVisible: function()
		{
			return true;
		},
	
		isEnabled: function()
		{
			// keep action disabled during execution
			if (this.executing)
			{
				return false;
			}

			var WorkItemEditable = this.getActionContext("WorkItemPage");
			
			if(WorkItemEditable === null || WorkItemEditable.length == 0) {
			    return false;
			}

			var coordination = this.getActionContext("Coordination");
			if(coordination === null || coordination.length == 0) {
			    return false;
			}

			var uiState = this.getActionContext("UIState");
			
			if( uiState !== null && uiState.length > 0){
			    var readonly = uiState[0].get("workItemReadOnly");
				if(readonly){
				    return false;
				}
			}
			
			var caseObj = null;
			
			caseObj = WorkItemEditable[0].getCase();
			
			var enabled = false;
			if(!caseObj){//if caseEditable object is not associated with an existing case, 
						//it would be for creating case or splitting case, so return true directly
				return true;
			}else{
				if(!caseObj.getCaseFolder()){
					caseObj.retrieveCaseFolder(lang.hitch(this, function(){
						enabled = caseObj.getCaseFolder().hasPrivilege("privEditProperties");
						this.setEnabled(enabled);
					}));
				}else{
					enabled = caseObj.getCaseFolder().hasPrivilege("privEditProperties");
				}
			}
			return enabled;
		},		
		
		
		execute: function()
		{
			this.logInfo("execute", "Processing response '" + this.getArgument('item').title + "' with 'Get Next'=" + this.getArgument('getnext'));
			var context = [];
            context[this.icmBaseConst.WKIM] = true;
			context[this.icmBaseConst.WKITEMRESPONSE] = this.getArgument('item').id; 

            var WorkItemEditable = this.getActionContext("WorkItemPage");
			if(WorkItemEditable === null || WorkItemEditable.length == 0) {
			    return false;
			}

			var coordination = this.getActionContext("Coordination");
			if(coordination === null || coordination.length == 0) {
			    return false;
			}
			
			// disable action during execution
			this.executing = true;
			this.setEnabled(false);

	        coordination[0].step(this.icmBaseConst.COMMIT, 
	        		lang.hitch(this, function(results, next, skip){
	        			this.logInfo("execute", "in commit step callback, results");
	        			this.logInfo("execute", results);
	        			next();
	        		}),
	        		lang.hitch(this, function(errors, next, skip){
	        			this.logInfo("execute", "in commit step errback, errors");
	        			this.logInfo("execute", errors);
						this.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						this.executing = false;
						this.setEnabled(true);
    			        skip();
	        		})
	        	).step(this.icmBaseConst.VALIDATE,
	        		lang.hitch(this, function(results, next, skip){
	        			this.logInfo("execute", "in validate step callback, results");
	        			this.logInfo("execute", results);
	        			next();
	        		}),
	        		lang.hitch(this, function(errors, next, skip){
	        			this.logInfo("execute", "in validate step errback, errors");
	        			this.logInfo("execute", errors);
						this.showErrDialog("actionExecutedFailureVailidate", errors);
						// enable action if failed
						this.executing = false;
						this.setEnabled(true);
    			        skip();
	        		})

	        	).step(this.icmBaseConst.BEFORECOMPLETE,
	        		lang.hitch(this, function(results, next, skip){
	        			this.logInfo("execute", "in beforeSave step callback, results");
	        			this.logInfo("execute", results);
	        			next();
	        		}),
	        		lang.hitch(this, function(errors, next, skip){
	        			this.logInfo("execute", "in beforeSave step errback, errors");
	        			this.logInfo("execute", errors);
						this.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						this.executing = false;
						this.setEnabled(true);
    			        skip();
	        		})

	        	).step(this.icmBaseConst.COMPLETE,
	        	    lang.hitch(this, function(results, next, skip){
					    //TODO:collect the modified properties and attachments from other page widgets to stored as properties for completeStep.
						// Other page widgets should set these modified properties and attachments in somewhere 
		                //now we change to use work item model to save the modification on work item
	        	    	WorkItemEditable[0].setSelectedResponse(this.getArgument('item').id);
				        WorkItemEditable[0].completeStep(
				        	lang.hitch(this, function(response, fieldErrors) {
								this.logInfo("execute", "Launch work item response:'" + this.getArgument('item').title + "'");
								this.publishEvent(
										"icm.WorkItemDispatched",
										{'workItemEditable': WorkItemEditable[0]}
								);
								next();
							}),
							lang.hitch(this, function(response, fieldErrors) {
								// enable action if failed
								this.executing = false;
								this.setEnabled(true);
								skip();
							})
						);
                    }), 
                    lang.hitch(this, function(errors, next, skip){
						this.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						this.executing = false;
						this.setEnabled(true);
    			        skip();
	        		})
	        	).step(this.icmBaseConst.AFTERCOMPLETE,
	        		lang.hitch(this, function(results, next, skip){
	        			this.logInfo("execute", "in afterSave step callback, results");
	        			this.logInfo("execute", results);
						
                        next();
						
						var uiState = this.getActionContext("UIState");
						var handleNext = false;
						var getnext = this.getArgument('item').GetNext || false;
						
						if(getnext){
						    handleNext = getnext;
						}
						
			            if( uiState !== null && uiState.length > 0 && uiState[0].get("GetNextCfg") === true){
						//if Open next work item action is confogured, then use it
			                 handleNext = uiState[0].get("GetNext");
			            }
						this.cleanActionContext("WorkItemPage");//RTC defect 55423 avoiding the dispatched work item still handled by other actions or components. 
						if(handleNext){
						    var handler = new WorkItemHandler(this.getWidget());
			                handler.handleNextWorkItem(WorkItemEditable[0].getWorkItem());	
						}else{		
							delete icmglobal._openItems[WorkItemEditable[0].getCaseTaskId()];
	        			    this.broadcastEvent(
								"icm.ClosePage"
						    );
						}
	        		}),
	        		lang.hitch(this, function(errors, next, skip){
	        			this.logInfo("execute", "in afterSave step errback, errors");
	        			this.logInfo("execute", errors);
						this.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						this.executing = false;
						this.setEnabled(true);
    			        skip();
	        		})

	        	).start(context);
	
		},
		
		getIterator: function()
		{
			var items = [];

            var WorkItemEditable = this.getActionContext("WorkItemPage");
			if(WorkItemEditable === null || WorkItemEditable.length == 0) {
			    return false;
			}

			var coordination = this.getActionContext("Coordination");
			if(coordination === null || coordination.length == 0) {
			    return false;
			}

			var responses = WorkItemEditable[0].getResponses();
	/*		var i;
	
	        var attributes =  this.getWidget().workItem.getWorkClass()._propertyDefinitions;
			for ( i in attributes) {
				if (attributes[i].getId() === "F_Responses") {
					responses = attributes[i].getAllowedValues();
					break;
				}
			}
	*/
			if(responses.length === 0){
			     items.push({"id": "", 
	                         "title": this.getArgument('label')
				 });
			}else{
			     for ( i = 0; i < responses.length; i++) {
	                 items.push({"id": responses[i], 
	                            "title": responses[i]
				     });
	             }
			}
	
			return items;
		},
	
		_eoc_:null
		
	});
	
});
