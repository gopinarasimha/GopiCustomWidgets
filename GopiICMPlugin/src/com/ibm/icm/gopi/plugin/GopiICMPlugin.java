package com.ibm.icm.gopi.plugin;
import java.util.Locale;
import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.icm.gopi.plugin.actions.GopiDispatchWorkItemAndClosePage;

public class GopiICMPlugin extends Plugin {

	@Override
	public String getId() {
		return "GopiICMPlugin";
	}

	@Override
	public String getName(Locale arg0) {
		return "IBM Case Manager Gopi Custom plug-in";
	}

	@Override
	public String getVersion() {
		return "1.0.0";
	}

	@Override
	public String getScript() {
		return "GopiICMPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return null;
	}

	@Override
	public String getCSSFileName() {
		return "GopiICMPlugin.css";
	}
	@Override
	public PluginAction[] getActions(){
		return new PluginAction[] {new GopiDispatchWorkItemAndClosePage()};
	}


}
