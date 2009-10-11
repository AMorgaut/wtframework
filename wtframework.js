/**
 * wtFramework
 *
 * Bookmarklet detecting Ajax Frameworks :
 * YUI, dojo, JQuery, Prototype, Script.aculo.us, ExtJs, Spry, GWT, DWR, 
 * Mootools, Mootools-More, Mochikit, Qooxdoo, Base2, ADSAFE, JSLint,
 * SWF Object, Wakanda, 4D, jmaki, AMPLE SDK, APF, Rialto, DotNetNuke, 
 * SproutCore, Xajax, Bindows, 
 * Open Ajax hub & Open Ajax declared Frameworks
 * 
 * @author Oskar Krawczyk
 * @author Tom Occhino
 * @author Christoph Pojer
 * @author Djamil
 * @author Alexandre Morgaut - 4D/Wakanda
 *
 * @todo Add better support to framesets, detection of rico ?
 * 
 * Variable names are not as explicit as they should for minification purpose
 * JSMin didn't rename them and the code size has to remain shorter as possible
 * to work well as a bookmarklet in most browsers
 * 
 *
 * CHANGELOG
 *
 * 2009-10-08 Alexandre Morgaut : Added Bindows, display & detect in first frame if frameset 
 * 2009-10-05 Alexandre Morgaut : Refactored, Added  4D, jmaki, ADSAFE, JSLint, GWT, DWR, Rialto, DotNetNuke, SproutCore, Xajax 
 * 2009-09-30 Alexandre Morgaut : Refactored, Added Qooxdoo, SWF Object, Wakanda, Ext JS, Spry, APF, AMPLE SDK, Open Ajax
 * 2009-06-25 Djamil : Added jQuery UI
 * 2009-06-24 Djamil : Added MooTools versions prior of 1.2 
 * 2009-04-28 Christoph Pojer : Adding MooTools-More
 * 2008-11-13 Tom Occhino : Publication on Git with PHP script to convert JS Script into Bookmarlet
 *                          http://github.com/tomocchino/wtframework
 * 2008-11-11 Oskar Krawczyk : version 1.3, Added Dojo Toolkit & MochiKit, Prototype, Added version detection
 * 2008-11-10 Oskar Krawczyk : version 1.2, Redesigned, The info-box has the highest possible z-index
 * 2008-11-09 Oskar Krawczyk : version 1.1, Added Base2, Press bookmarklet to toggle show/hide
 * 2008-11-08 Oskar Krawczyk : version 1.0, detection of MooTools, Yahoo User Interface, jQuery, & Scipt.aculo.us
 *                             First publication on its blog: http://blog.olicio.us/2008/11/08/wtframework-bookmarklet/ 
 **/
 
/*jslint onevar: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */

/* use strict is required to validated JavaScript in JSLint with the "Good Parts" option but it doesn't work in bookmarklets */
//"use strict";

(function () {
	var
		n = '__wtframeworks__', // popup id (name)
		w = top.document.body.tagName.toUpperCase() === 'FRAMESET' ? frames[0] : top, // global object or first frame if frameset
		d = w.document, // document
		b = d.body, // document body
		e = d.getElementById(n), // popup
		i, // property name
		u, // tmp var
		a = [],  // Open Ajax declared frameworks
		f = [], // found frameworks
		c, // current detecting framework
		v, // framework version
		l = {  // easy detection framework list
			YAHOO: 'Yahoo UI',
			Spry: 'Adobe SPRY',
			dojo: 'Dojo Toolkit',
			Prototype: 'Prototype',
			Scriptaculous: 'Script.aculo.us',
			ADSAFE: 'ADSafe',
			JSLINT: 'JSLint',
			Ext: 'Ext JS',
			base2: 'Backbase',
			jpf: 'APF - Ajax.org Plateform',
			ample: 'AMPLE SDK',
			WAF: 'Wakanda Ajax Framework',
			dax_bridge: '4D Ajax Framework',
			SproutCore: 'SproutCore',
			rialtoConfig: 'Rialto',
			dnn: 'DotNetNuke',
			jmaki: 'jMaki',
			'_gwt_scriptsLoaded': 'GWT - Google Web Toolkit',
			DWREngine: 'DWR - Direct Web Remoting',
			BiApplication: 'Bindows'
		},
		s = {  // popup style
			background: '#111',
			color: '#eee',
			filter: 'alpha(opacity=90)',
			opacity: 0.9,
			top: '15px',
			right: '15px',
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
		},
		// Framework name style
		p = '<span style="color: #99CCFF; font-weight: bold;">',
		t = '<\/span>',
		// Private function : remove popups
		r = function () {
			b.removeChild(e);
		},
		// Private function : add Framework infos y: name, z: version
		x = function (y, z) {
			f.push(p + y + t + (z ? ': ' + z : '')); 
		};

	// drop existing popups & quit
	if (e) { 
		r(); 
		return; 
	}
	// Open Ajax declared framework list
	c = w.OpenAjax;
	if (c) {
		c = c.hub;
		v = c.implVersion;
		c = c.libraries;
		for (i in c) {
			if (l.hasOwnProperty(i)) {
				u = c[i].version;
				if (u) {
					a[i] = u;
				}
			}
		}
		if (a.OpenAjax) {
			delete a.OpenAjax;
		}
		x('Open Ajax', v);
	}
	// add easily detectable frameworks
	for (i in l) {
		if (l.hasOwnProperty(i)) {
			c = w[i];
			if (c) {
				v = c.version || c.Version || c.VERSION || (c.edition ? 'edition ' + c.edition : c.apiversion);
				if (v) {
					u = c.build || c.BUILD || c.Build;
					if (u) {
						v += ' (' + u + ')';
					}
				}
				x(l[i], v);
				if (a[i]) {
					delete a[i];
				}
			}
		}
	}
	// detect SWF Object/Flash 
	c = w.swfobject || w.SWFObject;
	if (c) {
		v = c.getFlashPlayerVersion && c.getFlashPlayerVersion() || c.ua && c.ua.pv && c.ua.pv.join('.');
		x('SWF Object', v && ' (Flash version ' + v + ')');
		if (a.swfobject) {
			delete a.swfobject;
		}
	}
	// detect MochiKit 
	c = w.MochiKit;
	if (c) {
		x('MochiKit', c.MochiKit && c.MochiKit.VERSION);
		if (a.MochiKit) {
			delete a.MochiKit;
		}
	}
	// detect Qooxdoo 
	c = w.qx;
	if (c) {
		x('Qooxdoo', c.core && c.core.Version);
		if (a.qx) {
			delete a.qx;
		}
	}
	// detect Xajax 
	c = w.xajax;
	if (c) {
		v = c.config && c.config.version;
		x('Xajax', v && v.substr(5));
		if (a.xajax) {
			delete a.xajax;
		}
	}
	// detect JQuery & JQuery UI
	c = w.jQuery;
	if (c) {
		x('JQuery', c.fn && c.fn.jquery);
		c = c.ui;
		if (c) {
			x('JQuery UI', c.version);
		}
		if (a.jQuery) {
			delete a.jQuery;
		}
	}
	// detect Mootools & Mootools-More
	c = w.MooTools;
	if (c) {
		v = c.version;
		if (v > '1.11') {
			x('MooTools-Core', v);
			v = c.More ? v : (w.Tips || w.Drag) && '(< 1.2.2.1)';
			x('MooTools-More', v);
		} else {
			x('MooTools', v);
		}
		if (a.MooTools) {
			delete a.MooTools;
		}
	}
	// add undetected Open Ajax declared frameworks
	for (i in a) {
		if (a.hasOwnProperty(i)) {
			x(i, a[i]);
		}
	}
	// Show results
	e = d.createElement('div');
	e.id = n;
	e.title = 'Detected Frameworks';
	e.onclick = r;
	for (i in s) {
		if (s.hasOwnProperty(i)) {
			e.style[i] = s[i];
		}
	}
	e.innerHTML = f.length ? f.join('<br \/>') : 'No major framework found.';
	b.appendChild(e);

}());