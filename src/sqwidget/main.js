define(['lib/bonzo/bonzo', 'lib/qwery/qwery',
        'lib/EventEmitter/EventEmitter', 'domReady!'],
function(bonzo, qwery, Emitter) {

  var SqwidgetCore = (function() {

    function SqwidgetCore() {}

    for (var key in Emitter.prototype) {
      SqwidgetCore.prototype[key] = Emitter.prototype[key];
    }

    SqwidgetCore.prototype.registered = [];
    SqwidgetCore.prototype.packages = {};

    //convert data-sqwidget to dictionary
    SqwidgetCore.prototype.getWidgetParams = function($el) {
      var data, key, val, _ref;
      data = {};
      _ref = $el.data();

      for (key in _ref) {
        val = _ref[key];
        if (!(key.match("sqwidget"))) {
          continue;
        }
        key = key.replace("sqwidget", "").toLowerCase();
        data[key || "url"] = val;
      }
      return data;
    };

    SqwidgetCore.prototype.guid = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    };

    SqwidgetCore.prototype.register = function(el) {
      var opts, pkg, _this = this, id = this.guid();

      pkg = new Emitter();
      var $el = bonzo(el).addClass('sqwidget');
      pkg.opts = opts = this.getWidgetParams($el);
      opts.el = pkg.el = $el;

      this.registered[id] = pkg;

      if (!opts.url) {
        throw new Error("No widget source defined (set data-sqwidget-url)");
      }

      this.packages[id] = {
        location: opts.url,
        main: 'main',
        config: opts
      };

      return pkg;
    };

    SqwidgetCore.prototype.initialize = function() {
      var names = [], pkg, _this = this;

      for(var k in this.packages) names.push(k);

      curl({
        packages: this.packages,
      }, names, function() {
        var loaded = Array.prototype.slice.call(arguments);
        for (var i = 0; i < loaded.length; i++) {
          var module = loaded[i];
          //add the existing event emitter to the loaded module
          console.log(module);

          if(module.Controller) {
            var widget = new module.Controller({
              sqwidget: _this
            });

            //pkg.instance = widget;
            //pkg.trigger("rendered");
            //_this.trigger("rendered:" + (widget.id || module.location));
          } else {
            console.log("controller not found for " + module.location);
          }
        }
      });
    };

    return SqwidgetCore;

  })();

  sqwidget = new SqwidgetCore();

  bonzo(qwery('div[data-sqwidget]')).each(function(el) {
    sqwidget.register(el);
  });

  sqwidget.initialize();

  return sqwidget;
});
