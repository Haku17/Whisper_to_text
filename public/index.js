// Request access to user's microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (stream) {
    // Create audio context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Low latency mode
    audioCtx.latencyHint = "playback";

    // Set a lower buffer size (e.g. 256)
    const bufferSize = 256;

    // Create a script processor with the specified buffer size
    const scriptProcessor = audioCtx.createScriptProcessor(bufferSize, 1, 1);

    // Connect the script processor to the output destination
    scriptProcessor.connect(audioCtx.destination);

    // Create input source from microphone stream
    const source = audioCtx.createMediaStreamSource(stream);

    // Create output destination to speakers
    const destination = audioCtx.destination;

    // Connect input to output
    let isOutputEnabled = true;
    source.connect(destination);

    // Create button to toggle output
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Output';
    toggleBtn.addEventListener('click', function () {
      if (isOutputEnabled) {
        // Disconnect output
        source.disconnect(destination);
        isOutputEnabled = false;
        toggleBtn.textContent = 'Enable Output';
      } else {
        // Reconnect output
        source.connect(destination);
        isOutputEnabled = true;
        toggleBtn.textContent = 'Disable Output';
      }
    });
    document.body.appendChild(toggleBtn);
  })
  .catch(function (err) {
    console.error('Error accessing microphone:', err);
  });

