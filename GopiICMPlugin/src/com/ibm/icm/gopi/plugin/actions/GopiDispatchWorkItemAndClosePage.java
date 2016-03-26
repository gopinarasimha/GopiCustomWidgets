package com.ibm.icm.gopi.plugin.actions;

import java.io.IOException;
import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;
import com.ibm.json.java.JSONObject;

public class GopiDispatchWorkItemAndClosePage extends PluginAction {

	@Override
	public String getActionFunction() {
		// TODO Auto-generated method stub
		return "performaAction";
	}

	@Override
	public String getIcon() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "GopiDispatchWorkItemAndClosePage";
	}

	@Override
	public String getName(Locale arg0) {
		// TODO Auto-generated method stub
		return "Dispatch WorkItem And ClosePage for Gopi Custom Widget";
	}

	@Override
	public String getPrivilege() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String getServerTypes() {
		// TODO Auto-generated method stub
		return "p8";
	}

	@Override
	public boolean isMultiDoc() {
		// TODO Auto-generated method stub
		return false;
	}
	/*
	@Override
	public String getActionModelClass(){
		
		return "icmsample.gopi.actions.wi.DispatchWorkItemAndClosePage";
	}
	*/
	@Override
	public JSONObject getAdditionalConfiguration(Locale locale){
		
		String jsonString = "{\r\n" +
				"	        \"ICM_ACTION_COMPATIBLE\": true,\r\n" +
				"	        \"type\": \"iterator\",\r\n" +
				"	        \"context\": [[\"WorkItemPage\",\"Coordination\"]],\r\n" +
				"            \"name\": \"Dispatch Work item for Gopi Solution\",\r\n" +
				"	    \"description\": \"Dispatches the current work item from Gopi Application. If the next work item is not opened automatically, this action also closes the current Work Details page.\",\r\n" +
				"            \"properties\": [\r\n" +
				"                {\r\n" +
				"                    \"id\": \"label\",\r\n" +
				"                    \"title\": \"Label\",\r\n" +
				"                    \"defaultValue\": \"Complete\",\r\n" +
				"                    \"type\": \"string\",\r\n" +
				"                    \"isLocalized\":false\r\n" +
				"                },\r\n" +
				"                {\r\n" +
				"                    \"id\": \"GetNext\",\r\n" +
				"                    \"title\": \"Automatically get the next work item\",\r\n" +
				"                    \"defaultValue\": false,\r\n" +
				"                    \"type\": \"boolean\"\r\n" +
				"                },\r\n" +
				"                {\r\n" +
				"                    \"id\": \"flat\",\r\n" +
				"                    \"title\": \"flat\",\r\n" +
				"                    \"defaultValue\": true,\r\n" +
				"                    \"type\": \"boolean\"\r\n" +
				"                }\r\n" +
				"            ],\r\n" +
				"            \"events\":[\r\n" +
				"                {\r\n" +
				"                \"id\":\"icm.WorkItemDispatched\",\r\n" +
				"                \"title\":\"Work item dispatched\",\r\n" +
				"                \"direction\":\"published\",\r\n" +
				"                \"type\":\"wiring\",\r\n" +
				"                \"description\":\"Dispatches the current work item.\"\r\n" +
				"                },\r\n" +
				"                {\r\n" +
				"                \"id\":\"icm.ClosePage\",\r\n" +
				"                \"title\":\"Close page\",\r\n" +
				"                \"direction\":\"published\",\r\n" +
				"                \"type\":\"broadcast\",\r\n" +
				"                \"description\":\"Closes the current Work Details page.\"\r\n" +
				"                }\r\n" +
				"            ]\r\n" +
				"	}";
		
		try{
			
			return JSONObject.parse(jsonString);
			
		}catch(IOException e){
			
			e.printStackTrace();
			
		}
		
		return null;
	}

}
