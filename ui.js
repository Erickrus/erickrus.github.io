var chordOffset = [0,0,0,0];
var currChord = "NONE";
var currMode = "major";



function setChord(chordName) {
	if (chordName == "NONE") {
		chordOffset = [0,0,0,0];
	} else {
		currChord = chordName;
		for (var i=0;i<4;i++) {
			chordOffset[i] = ukulele.chord.chordTable[currMode][currChord][i];
		}
	}
	var chordIds = ["C","D","E","F","G","A","B","CS","DS","FS","GS","AS","NONE"];
	var updatedChordName = chordName;
	if (updatedChordName.length > 1 && updatedChordName!="NONE") {
		updatedChordName = updatedChordName[0] +"S";
	}
	for (var i=0;i<chordIds.length;i++) {
		if (updatedChordName!= chordIds[i]) {
			document.getElementById(chordIds[i]).style["font-weight"] = "normal";
			document.getElementById(chordIds[i]).style["color"] = "#000000";
		} else {
			document.getElementById(chordIds[i]).style["font-weight"] = "bolder";
			document.getElementById(chordIds[i]).style["color"] = "#ae632e";
		}
	}
	document.getElementById(chordIds[i])
}

function setMode(modeName) {
	currMode = modeName;
	if (currChord == "NONE") {
		chordOffset[i] = [0,0,0,0];
	} else {
		for (var i=0;i<4;i++) {
		chordOffset[i] = ukulele.chord.chordTable[currMode][currChord][i];
	}
	}
	
	
	var modeIds = ["major","minor","7","7m","7maj"];
	for (var i=0;i<modeIds.length;i++) {
		if (modeName!= modeIds[i]) {
			document.getElementById(modeIds[i]).style["font-weight"] = "normal";
			document.getElementById(modeIds[i]).style["color"] = "#000000";
		} else {
			document.getElementById(modeIds[i]).style["font-weight"] = "bolder";
			document.getElementById(modeIds[i]).style["color"] = "#ae632e";
		}
	}
}


var stringSprites = [];
for (var i=0;i<4;i++) {
	stringSprites.push({
		"string_static" : new Sprite(10, 250, "string_static",  "string"+i, 5, 250),
		"string_viberating": new Sprite(10, 250, "string_viberating", "string"+i, 5, 250)
	  });
    stringSprites[i]["string_static"].visible = true;
	stringSprites[i]["string_static"].x = 50+i*25;
	stringSprites[i]["string_static"].y = 0;
	
    stringSprites[i]["string_static"].onMouseMove = function(e){
	    if (e.buttons == 0) return;
		console.log(this.spriteName + " static clicked");
		var stringPos = this.spriteName.substring(this.spriteName.length-1);
		ukulele.strings[stringPos].play(12 + chordOffset[stringPos]);
	  }
	  
    stringSprites[i]["string_viberating"].onMouseMove = function(e){
	    if (e.buttons == 0) return;
		console.log(this.spriteName + " static clicked");
		var stringPos = this.spriteName.substring(this.spriteName.length-1);
		ukulele.strings[stringPos].play(12+ chordOffset[stringPos]);
	  }
	  
	ukulele.strings[i].onStringStart = function() {
		setTimeout('spriteManager.update(stringSprites['+this.pos+']["string_viberating"], "string"+'+this.pos+')', 0);
	}
	
	ukulele.strings[i].onStringStop = function() {
		setTimeout('spriteManager.update(stringSprites['+this.pos+']["string_static"], "string"+'+this.pos+');',0);
	}
}

	  
		function initSprites() {
		  spriteManager.register("string0", stringSprites[0]["string_static"]);
		  spriteManager.register("string1", stringSprites[1]["string_static"]);
		  spriteManager.register("string2", stringSprites[2]["string_static"]);
		  spriteManager.register("string3", stringSprites[3]["string_static"]);
		  //spriteManager.register("block", block);
		  
		}