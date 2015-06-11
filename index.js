(function () {
        navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );

        var portID = '-1047472486';

        function onMIDISuccess( midiAccess ) {
            init(midiAccess);
        }

        function onMIDIFailure(msg) {
            console.log( "Failed to get MIDI access - " + msg );
        }

        function playMidi( midiAccess, note, decay ) {
            var noteOnMessage = [0x90, note[0], 127];
            var output = midiAccess.outputs.get(portID);
            output.send( noteOnMessage );
            //output.send( [0x80, note[1], 127], window.performance.now() + decay );
        }

        function init(midi){
            var nc=0;
            document.getElementById("bang").addEventListener("click", function(e){
                console.log(nc);
                nc++
                playMidi(midi,[50+nc,60],1000.00);

            },false)

        }
}());



//WebMidi.midi;
//WebMidi.foo;
/*
(function(){

    // global MIDIAccess object
    var midi = null;


    navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );

    function onMIDISuccess( midiAccess ) {
        console.log( "MIDI ready!" );
        // store in the global (in real usage, would probably keep in an object instance)
        midi = midiAccess;
        listInputsAndOutputs(midi)
        sendMiddleC(midi, '-1047472486');
    }

    function onMIDIFailure(msg) {
        console.log( "Failed to get MIDI access - " + msg );
    }

    function sendMiddleC( midiAccess, portID ) {
        // note on, middle C, full velocity
        var noteOnMessage = [0x90, 60, 0x7f];
        var output = midiAccess.outputs.get(portID);

        //omitting the timestamp means send immediately.
        output.send( noteOnMessage );

        // Inlined array creation- note off, middle C,
        // release velocity = 64, timestamp = now + 1000ms.
        output.send( [0x80, 70, 100], window.performance.now() + 1000.0 );
    }

    // Print list of the input and output ports
    function listInputsAndOutputs( midiAccess ) {
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


})();
*/
