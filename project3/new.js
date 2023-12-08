if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var microphone = audioContext.createMediaStreamSource(stream);

        // creating an AnalyserNode to analyze the audio data
        var analyser = audioContext.createAnalyser();
        microphone.connect(analyser);

        // setting the FFT size (the size of the Fast Fourier Transform)
        analyser.fftSize = 256;

        // creating a buffer to store frequency data
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        // defining a threshold level
        var threshold = 100;

        // continuously monitoring the audio stream
        function checkVolume() {
          analyser.getByteFrequencyData(dataArray);

          // calculating the average volume level
          var average = dataArray.reduce(function (acc, val) {
            return acc + val;
          }, 0) / bufferLength;

          // check if the average volume exceeds the threshold, sound detected, play the video
          if (average > threshold) {
            console.log('Audio input detected - Volume:', average);
            var video = document.getElementById('myVideo');
            // set playback speed to 0.8x
            video.playbackRate = 0.8;
            // play the video
            video.play();
        } else {
            // no sound, pause the video
            document.getElementById('myVideo').pause();
        }

          // schedule the next check
          requestAnimationFrame(checkVolume);
        }

        // start monitoring the audio stream
        checkVolume();
      })
      .catch(function (err) {
        console.error('Error accessing microphone:', err);
      });
  } else {
    console.error('Web Audio API is not supported in this browser.');
  }

  function startover() {
    var video = document.getElementById("myVideo");

    // reset the current time to 0
    video.pause();
    video.currentTime = 0;

    // start the video
    video.play();
  }