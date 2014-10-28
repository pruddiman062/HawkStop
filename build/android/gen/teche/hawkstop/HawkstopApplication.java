/* AUTO-GENERATED FILE.  DO NOT MODIFY.
 *
 * This class was automatically generated by
 * Appcelerator. It should not be modified by hand.
 */
package teche.hawkstop;

import org.appcelerator.kroll.runtime.v8.V8Runtime;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollModuleInfo;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

public final class HawkstopApplication extends TiApplication
{
	private static final String TAG = "HawkstopApplication";

	@Override
	public void onCreate()
	{
		super.onCreate();

		appInfo = new HawkstopAppInfo(this);
		postAppInfo();


	    KrollAssetHelper.AssetCrypt assetCrypt = new AssetCryptImpl();
	    assetCrypt.setIsProduction(DEPLOY_TYPE_PRODUCTION.equals(appInfo.getDeployType()));
	    KrollAssetHelper.setAssetCrypt(assetCrypt);


		V8Runtime runtime = new V8Runtime();


		runtime.addExternalModule("ti.draggable", ti.draggable.DraggableBootstrap.class);
	


		KrollRuntime.init(this, runtime);

		stylesheet = new ApplicationStylesheet();
		postOnCreate();


	

	

	

	

	

	

	

	

	

	

	



		// Custom modules
		KrollModuleInfo moduleInfo;
	
		

		moduleInfo = new KrollModuleInfo(
			"draggable", "ti.draggable", "b548a1e9-dbc1-48e9-ab85-caaa914fc0ea", "2.0.3",
			"Ti.Draggable", "Seth Benjamin", "GPLv3",
			"Copyright (c) 2013 Seth Benjamin");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	

	}

	@Override
	public void verifyCustomModules(TiRootActivity rootActivity)
	{

		org.appcelerator.titanium.TiVerify verify = new org.appcelerator.titanium.TiVerify(rootActivity, this);
		verify.verify();

	}
}
