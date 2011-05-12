/** 
  * @autor: guille87paz@gmail.com
  * Original idea by: http://www.openjs.com/scripts/events/keyboard_shortcuts/
  * Form: cloud9ide
  */
;(function($){

var sf = window.sf = {

    version: "0.0.2",

 	events: {
 		"down": "keydown",
 		"up": "keyup",
 		"press": "keypress"
 	},
 	
 	shortcuts: [],

 	// Shortcut to specials keys
	specialKeys: {
		27: "esc",
		9: "tab",
		32: "space",
		13: "return",
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
	shiftKeysBKP: {
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
	
	shiftKeys: {
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
	
	/* Modern Browsers, and old??
		event.altKey=true|false|1|0
		event.shiftKey=true|false|1|0
		event.ctrlKey=true|false|1|0
		event.metaKey=true|false|1|0
	*/
	getModifiers: function(event){
		return ( event.altKey ) ? "alt":
		( event.ctrlKey ) ? "ctrl":
		( event.shiftKey ) ? "shift":
		( event.metaKey ) ? "meta":
		false;
	},
	
    knowKey: function(event, key, callback){
		var event = event || window.event;//Get the event
		var codeKey = event.which || event.keyCode;
		var charKey = String.fromCharCode(codeKey).toLowerCase();
		var specialKey = sf.specialKeys[codeKey];
		var modifierKey = sf.getModifiers(event);
		var currentKey;
		
		if ( key.length >= 2 ) {
						
			currentKey = ( specialKey && !modifierKey ) ? specialKey :
				( event.shiftKey && sf.shiftKeys[charKey] ) ? sf.shiftKeys[charKey] :
				( specialKey ) ? specialKey :
				charKey;
			
			if ( event[key[0]+"Key"] && (currentKey === sf.shiftKeys[key[1]] || currentKey === key[1]) ) {							
				// Prevent
				event.preventDefault();
				event.stopPropagation();
				
				// Callback execute
				callback();
				
			};
			
		} else {
			
			currentKey = ( specialKey ) ? specialKey : charKey;
			
			if ( !modifierKey && currentKey === key[0] ){
				// Prevent
				event.preventDefault();
				event.stopPropagation();
				
				// Callback execute
				callback();
			};
		};
		
		// View the pressed key
		//console.log( ( modifierKey ) ? modifierKey + "+" + currentKey : currentKey );
		
	},

	shortcut: function(key, callback, type) {
		if(!key || !callback){ alert("Shorcut error."); return; };
		
		type = type || "down";
		var pressKey = key.toLowerCase().split("+");			
		
		var element = $(this); //( $(this).length > 0 ) ? $(this) : $(o.element);

		//Attach the function with the event
		element.bind(sf.events[type], function(event){		
			// Validate
			if (event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA") return; //Don't enable shortcut keys in Input, Textarea fields			
			
			// Run baby... ehh forest, run!
			sf.knowKey(event, pressKey , callback);
		});
		
		sf.shortcuts.push({
			element: element[0],
			shortcut: key,
			event: sf.events[type]
		});

		return element;
	},

	removeShortcut: function(events){
		var element = $(this);
		if ( !events ) events = "keyup";
		console.log(events);
		element.unbind( events );

		return element;
	},


	init: function(){
		$.shortcut = $.fn.shortcut = sf.shortcut;
		$.fn.removeShortcut = sf.removeShortcut;	
	}
};


sf.init();

/*//Fuck this if else baby!!!		
(element.addEventListener) ? element.addEventListener(sf.events[type], function(event){ sf.knowKey(event, key, callback) }, false) :	
(element.attachEvent) ? element.attachEvent("on"+sf.events[type], function(event){ sf.knowKey(event, key, callback) }) :
element["on"+sf.events[type]] = function(event){ sf.knowKey(event, key, callback) };*/

})(jQuery);