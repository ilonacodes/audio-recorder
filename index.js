let recordedAudio = document.getElementById('recordedAudio');
let startRecord = document.getElementById('startRecord');
let stopRecord = document.getElementById('stopRecord');
let record;
let audioChunks;

// returns a MediaDevices object, which provides access to connected media input devices
// getUserMedia() prompts the user for permission to use a media input which produces a MediaStream
navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
        record = new MediaRecorder(stream);
        record.ondataavailable = e => {
            audioChunks.push(e.data);
            if (record.state === "inactive") {
                // A Blob object represents a file-like object of immutable, raw data,
                // that isn't necessarily in a JavaScript-native format
                let blob = new Blob(audioChunks, {type: 'audio/x-mpeg-3'});
                recordedAudio.src = URL.createObjectURL(blob);
                recordedAudio.controls = true;
                recordedAudio.autoplay = true;
            }
        }
    })
    .catch(e => console.log(e));

startRecord.onclick = e => {
    startRecord.disabled = true;
    stopRecord.disabled = false;
    audioChunks = [];
    record.start();
};

stopRecord.onclick = e => {
    startRecord.disabled = false;
    stopRecord.disabled = true;
    record.stop();
};

