;(function (exports) {
	"use strict";

	var hotkey = (function () {

		var win = exports,
			doc = win.document,
			qs = function (selector) {
				return doc.querySelector(selector);
			},
			qsa = function (selector) {
				return doc.querySelectorAll(selector);
			},
			body = qs("body"),
			html = qs("html"),
			events = {
		 		"down": "keydown",
		 		"up": "keyup",
		 		"press": "keypress"
		 	},

		 	list = [],

		 	// Shortcut to specials keys
			specialKeys = {
				27: "esc",
				9: "tab",
				32: "space",
				13: "enter",
				8: "backspace",

				145: "scrolllock",
				20: "capslock",
				144: "numlock",
				
				19: "pause",
				
				45: "insert",
				36: "home",
				46: "delete",
				35: "end",
				
				33: "pageup",
				34: "pagedown",


				37: "left",
				38: "up",
				39: "right",
				40: "down",

				112: "f1",
				113: "f2",
				114: "f3",
				115: "f4",
				116: "f5",
				117: "f6",
				118: "f7",
				119: "f8",
				120: "f9",
				121: "f10",
				122: "f11",
				123: "f12",
				
				96: "0",
				97: "1",
				98: "2",
				99: "3",
				100: "4",
				101: "5",
				102: "6",
				103: "7",		
				104: "8",
				105: "9",
				
				106: "*",
				107: "+",
				109: "-",
				110: ".",
				111: "/",
				
				16: "shift",
				17: "ctrl",
				18: "alt",
				0: "altgr",
				224: "meta"
			},
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			shiftKeysBKP = {
				"`": "~",
				"1": "!",
				"2": "@",
				"3": "#",
				"4": "$",
				"5": "%",
				"6": "^",
				"7": "&",
				"8": "*",
				"9": "(",
				"0": ")",
				"-": "_",
				"=": "+",
				";": ":",
				"'": "\"",
				",": "<",
				".": ">",
				"/": "?",
				"\\": "|"
			},
			
			shiftKeys = {
				"`": "~",
				"1": "!",
				"2": "þ",
				"3": "#",
				"4": "$",
				"5": "%",
				"6": "&",
				"7": "¿",
				"8": "(",
				"9": ")",
				"0": "»",
				"-": "½",
				",": "º",
				".": "º"
			},

			getModifiers = function (event) {
				return (event.altKey) ? "alt":
						(event.ctrlKey) ? "ctrl":
							(event.shiftKey) ? "shift":
								(event.metaKey) ? "meta":
									false;
			},

		    knowKey = function (event, key, fn) {
				var event = event || window.event;//Get the event
				var codeKey = event.which || event.keyCode;
				var charKey = String.fromCharCode(codeKey).toLowerCase();
				var specialKey = specialKeys[codeKey];
				var modifierKey = getModifiers(event);
				var currentKey;

				if (key.length >= 2) {

					currentKey = (specialKey && !modifierKey) ? specialKey :
						(event.shiftKey && shiftKeys[charKey]) ? shiftKeys[charKey] :
						(specialKey) ? specialKey :
						charKey;

					if (event[key[0]+"Key"] && (currentKey === shiftKeys[key[1]] || currentKey === key[1])) {
						// Prevent
						event.preventDefault();
						event.stopPropagation();

						// Callback execute
						fn();

					}

				} else {

					currentKey = ( specialKey ) ? specialKey : charKey;

					if (!modifierKey && currentKey === key[0]) {
						// Prevent
						event.preventDefault();
						event.stopPropagation();

						// Callback execute
						fn();
					}
				}

				// View the pressed key
				//console.log( ( modifierKey ) ? modifierKey + "+" + currentKey : currentKey );
			},
			add = function (key, element, fn, type) {
				if (!key || !fn) { 
					throw("Shorcut error.");
				}

				var type = type || "down",
					element = document.querySelectorAll(element)[0],
					pressKey = key.toLowerCase().split("+");


				//Attach the function with the event
				element.addEventListener(events[type], function (event) {
					// Validate
					if ((event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA") && (element.tagName !== "INPUT" || element.tagName !== "TEXTAREA")) {
						return; //Don't enable shortcut keys in Input, Textarea fields
					}

					// Run baby... ehh forest, run!
					knowKey(event, pressKey , fn);
				});

				list.push({
					element: element,
					hotkey: key,
					event: events[type]
				});

				return element;
			},

			core = function (key) {
				core.key = core.prototype.key = key;
				return Object.create(core.prototype);
			};

			core.prototype = {};
			core.version = "0.1";
			core.list = list;
			core.add = core.prototype.add = add;

		return core;

	}());

	exports.hotkey = exports.key = hotkey;

}(window));