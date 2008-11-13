(function(){

	var frameworks = {
		'Base2': function(){
			if (window.base2) return base2.version;
		},

		'Dojo': function(){
			if (window.dojo) return dojo.version;
		},

		'jQuery': function(){
			if (window.jQuery) return jQuery.fn.jquery;
		},

		'MochiKit': function(){
			if (window.MochiKit) return MochiKit.MochiKit.VERSION;
		},

		'MooTools': function(){
			if (window.MooTools) return MooTools.version;
		},

		'Prototype': function(){
			if (window.Prototype) return Prototype.Version;
		},

		'Script.aculo.us': function(){
			if (window.Scriptaculous) return Scriptaculous.Version;
		},

		'Yahoo UI': function(){
			if (window.YAHOO) return YAHOO.VERSION;
		},

		'Ext JS': function(){
			if (window.Ext) return Ext.version;
		}
	};

	var id = '__wtframework_bar__';
	var bar = document.getElementById(id);
	var remove = function(){ document.body.removeChild(bar); };
	if (bar){ remove(); return; }

	var found = [];
	for (framework in frameworks){
		var version = frameworks[framework]();
		if (version != undefined) found.push('<span style="color:#9cf; font-weight:bold;">' + framework + '</span>: ' + version);
	}

	if (!found.length) found.push('No major framework found.');

	var props = {
		id: id,
		onclick: remove,
		innerHTML: found.join('<br />')
	};

	var styles = {
		background: '#111',
		color: "#eee",
		filter: "alpha(opacity=90)",
		opacity: 0.9,
		top: "15px",
		right: "15px",
		position: "fixed",
		padding: "7px 15px",
		border: "solid 3px #eee",
		textAlign: "left",
		font: "12px Lucida Grande, Helvetica, Tahoma",
		WebkitBoxShadow: "0px 1px 8px rgba(0,0,0,0.8)",
		MozBoxShadow: "0px 5px 10px #000",
		textShadow: '2px 2px 0px #000',
		cursor: 'pointer',
		zIndex: 32767
	};

	bar = document.createElement('div');
	for (var prop in props) bar[prop] = props[prop];
	for (var style in styles) bar.style[style] = styles[style];
	document.body.appendChild(bar);

})();
