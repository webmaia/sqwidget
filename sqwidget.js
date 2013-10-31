(function () {
  curl.config({
    //this needs to be configurable.
    baseUrl: './sqwidget',
    //Optional dependencies which aren't anonymous. AMD is crazy.
    //preloads: ['curl/plugin/css','curl/plugin/i18n', 'curl/plugin/domReady'],
    paths: {
      qwery: { location: '//cdnjs.cloudflare.com/ajax/libs/qwery/3.4.1/qwery.js' },
      underscore: { location: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.underscore.min.js' },
      backbone: { location: './app/lib/backbone-amd/backbone' },
      bean: { location: '//cdnjs.cloudflare.com/ajax/libs/bean/1.0.3/bean.min.js' },
      jquery: { location: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js' },
      moment: { location: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js' },
    },
    preloads: ['i18n'],
    packages: {
      i18n: { location: './app/plugins', main: 'i18n' },
      curl: { location: './app/lib/curl/src/curl/' },
      sqwidget: { location: './app', main: 'main' }
    }
  });

  curl(['sqwidget']).then(
    //success
    function(main) { },
    function(err) { console.log("Sqwidget failed to start: " + err); }
  );
}());
