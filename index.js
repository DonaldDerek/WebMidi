var WebMidi = function(midiAccess, portID){
    var port = portID || "-1047472486";
    this.access = midiAccess || null;
    this.port = port;

    this.playNote= function(note, decay) {
        var noteOnMessage = [144, note[0], 127];
        var noteOffMessage = [128, note[1], 127];
        var output = midiAccess.outputs.get(port);
        output.send( noteOnMessage );
        console.log("MIDI OUT: " + noteOnMessage);
        output.send( noteOffMessage, window.performance.now() + decay );
        console.log("MIDI OUT: " + noteOffMessage);
    }

    this.listIO = function () {
        for (var entry of midiAccess.inputs) {
            var input = entry[1];
            console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
            "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
            "' version:'" + input.version + "'" );
        }

        for (var entry of midiAccess.outputs) {
            var output = entry[1];
            console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
            "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
            "' version:'" + output.version + "'" );
        }
    }

    this.setPort = function(port){
        this.port = port;
    }
    this.getPort = function(){
        console.log(this.port)
    }
}

navigator.requestMIDIAccess().then( function(midiAccess){
    var midi = new WebMidi(midiAccess);
    init(midi);

}, function(err){
    console.log( "Failed to get MIDI access - " + msg );
});


function init(midi){
    midi.playNote([50,60],1000.00);
    midi.listIO();
    midi.setPort('1509866472');
    midi.getPort();
}
