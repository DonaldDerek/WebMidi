var WebMidi = function(midiAccess, portID){
    var port = portID || "-1047472486";
    var output = midiAccess.outputs.get(port);
    this.access = midiAccess || null;
    this.port = port;

    this.playNote= function(note, decay) {
        var noteOnMessage = [144, note[0], 127];
        var noteOffMessage = [128, note[1], 127];
        output.send( noteOnMessage );
        console.log("MIDI OUT: " + noteOnMessage);
        output.send( noteOffMessage, window.performance.now() + decay );
        console.log("MIDI OUT: " + noteOffMessage);
    }

    this.send= function(midiMessage, time) {
        time = time || 0.00;
        output.send( midiMessage , window.performance.now() + time);
        console.log("MIDI OUT: " + midiMessage + ' T:' + time);
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
    //midi.playNote([50,60],1000.00);
    midi.listIO();
    midi.setPort('1509866472');
    midi.getPort();
    //midi.send([144,62,127])
    //midi.send([128,62,127],1000.00)
    //midi.send([144,62,127],2000.00)
    //midi.send([128,62,127],3000.00)
    // $("#bang").on('click', function(){
    //     var hit = (Math.floor(Math.random()*3)+5)*10
    //     var duration = (Math.floor(Math.random()*10)+1)*10
    //     console.log(hit);
    //     for (var i=0; i < duration; i++){
    //         var note =  Math.floor(Math.random()*12)+hit;
    //         var velocity =  Math.floor(Math.random()*77)+30;
    //         midi.send([144,note,velocity],i*1000.00);
    //         midi.send([128,note,velocity],(i+1)*1000.00);
    //     }
    // })
}
