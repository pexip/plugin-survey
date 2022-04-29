// Use IIFE (Immediately Invoked Function Expression) to wrap the plugin to not pollute global namespace with whatever is defined inside here
(function() {
  let redirect;

  // Init function called by the PluginService when plugin is loaded
  function load() {

  	window.PEX.actions$.ofType('[Conference] Connect Success').subscribe(action => {
      redirect = window.PEX.conferenceQueryParams['redirect'];
  	 });

  	window.PEX.actions$.ofType('[Conference] Disconnect Success').subscribe(action => {
      if (window.PEX.conferenceQueryParams['redirect']) {
        window.location.href = redirect
      }
    });
  }

  // Unload / cleanup function
  function unload() {
      // clean up any globals or other cruft before being removed before i get killed.
      console.log('unload survey-plugin');
  }

  // Register our plugin with the PluginService - make sure id matches your package.json
  PEX.pluginAPI.registerPlugin({
      id: 'survey-plugin-1.0',
      load: load,
      unload: unload,
  });
})(); // End IIFE
