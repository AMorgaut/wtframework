(function(){
	// refactored
	// added SPRY, Flash, qooxdoo, Open Ajax, Wakanda, jmaki, ample sdk, APF
	// this source is optimised to help minification for bookmarklet

	var
	n = '__wtframework_am__', // popup id (name)
	d = document, // document
	b = d.body, // document body
	w = window, // global object
	e = d.getElementById(n), // popup
	l, // framework list
	f = [], // found frameworks
	o, // Open Ajax
	a = [],  // Open Ajax subscribed frameworks
	m, // Mootools
	r = function() {
		b.removeChild(e)
	},
	s, // styles
	i; // index

	if (e) { 
		r(); 
		return; 
	}

	o = w.OpenAjax;
	if (o) {
		o = o.hub;
		v = o.implVersion;
		o = o.libraries;
		for (i in o) {
			if (o[i].version) 
				a[i]=o[i].version
		}
		if (a.OpenAjax) delete a.OpenAjax;
		f.push('Open Ajax ('+v+')')
	}

	l = {
		YAHOO: 'Yahoo UI',
		Spry: 'Adobe SPRY',
		dojo: 'Dojo Toolkit',
		Ext: 'Ext JS',
		Prototype: 'Prototype',
		Scriptaculous: 'Script.aculo.us',
		MooTools: 'MooTools',
		base2: 'Base2',
		jpf: 'APF',
		ample: 'AMPLE SDK',
		WAF: 'Wakanda Ajax Framework',
		jmaki: 'jMaki'
	};

	for (i in l) {
		if (w[i]) { 
			if (a[i]) delete a[i];
			f.push(
				l[i] +
				(w[i].version ?
					' (' + w[i].version + ')'
				: (w[i].Version ?
					' (' + w[i].Version + ')'
				: (w[i].VERSION ?
					' (' + w[i].VERSION + ')'
				:
					''
				)))
			);
		}
	}

	// Flash, Mochikit, & Qooxdoo
	if (w.swfobject) f.push('SWF Object (Flash version '+swfobject.ua.pv.join('.')+')');
	if (w.MochiKit) f.push('MochiKit ('+MochiKit.MochiKit.VERSION+')');
	if (w.qx) f.push('Qooxdoo ('+qx.core.Version+')');
	if (a.swfobject) delete a.swfobject;
	if (a.MochiKit) delete a.MochiKit;
	if (a.qx) delete a.qx;

	if (w.jQuery) {
		if (a.jQuery) delete a.jQuery;
		f.push('JQuery ('+jQuery.fn.jquery+')');
		if($.ui) {
			f.push('JQuery UI ('+$.ui.version+')')
		}
	}

	if (w.MooTools) {
		if (a.MooTools) delete a.MooTools;
		m = MooTools;
		if (m.version > '1.11') {
			f.push( 'MooTools-Core ('+m.version+')');
			f.push( 
				'MooTools-More' +
				(m.More) ?
					' ('+m.version+')'
				: (w.Tips || w.Drag) ?
					' (< 1.2.2.1)'
				: 
					''
			)
		} else {
			f.push( 'MooTools ('+m.version+')')
		}
	}
	
	// add undetected Open Ajax subscribed frameworks
	for (i in a) {
		f.push(i+' ('+a[i]+')');
	}
	// Show results

	e = d.createElement('div');
	e.id = n;
	e.onclick = r;

	s = {
		background: '#111',
		color: '#eee',
		filter: 'alpha(opacity=90)',
		opacity: 0.9,
		top: '20px',
		right: '20px',
		position: 'fixed',
		padding: '7px 15px',
		border: 'solid 3px #eee',
		textAlign: 'left',
		font: '12px Lucida Grande, Helvetica, Tahoma',
		WebkitBoxShadow: '0px 1px 8px rgba(0, 0, 0, 0.8)',
		MozBoxShadow: '0px 5px 10px #000',
		BoxShadow: '0px 5px 10px #000',
		textShadow: '2px 2px 0px #111',
		cursor: 'pointer',
		zIndex: 32767
	};

	for (i in s) e.style[i] = s[i];

	e.innerHTML = unescape(f.length ? f.join('<br/>') : 'No major framework found.');

	b.appendChild(e);

})();