jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr(document.getElementById('audio1'));
//        var player = new Plyr('#audio1', {
//            controls: [
//                'restart',
//                'play-large',
//                'progress',
//                'current-time',
//                'duration',
//                'mute',
//                'volume',
//                'fullscreen',
//                'captions'
//            ],
//            captions: {active: true, update: true}
//        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
//            mediaPath = 'https://www.gsac.ttu.edu/video/',
            mediaPath = '',
            extension = '.mp4',
            lessons = [
                {
                "track": 1,
                "name" : "One Length Cut",
                "duration" : "10:28",
                "file" : "d1-ch3"
                },
                {
                "track": 2,
                "name" : "The Forward Graduation Cut",
                "duration" : "8:59",
                "file" : "d1-ch5"
                },
                {
                "track": 3,
                "name" : "The Natural Inversion Cut",
                "duration" : "13:13",
                "file" : "d1-ch7"
                },
                {
                "track": 4,
                "name" : "The Square Layers Cut",
                "duration" : "14:56",
                "file" : "d1-ch9"
                },
                {
                "track": 5,
                "name" : "The Graduated Layers Cut",
                "duration" : "13:20",
                "file" : "d1-ch11"
                },
                {
                "track": 6,
                "name" : "The Classic Bob Cut",
                "duration" : "9:04",
                "file" : "d2-ch3"
                },
                {
                "track": 7,
                "name" : "The Graduated Bob Cut",
                "duration" : "15:57",
                "file" : "d2-ch5"
                }
                 ],
            buildPlaylist = $(lessons).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = lessons.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(lessons[id].name);
                index = id;
                audio.src = mediaPath + lessons[id].file + extension;
            },
            playTrack = function (id) {
//                var tracksrc;
//                tracksrc = mediaPath + lessons[id].file + '.vtt';
                loadTrack(id);
//                const track = document.createElement('track');
//                Object.assign(track, {
//                label: 'English',
//                srclang: 'en',
//                default: true,
//                src: tracksrc
//                });
//                audio.appendChild(track);
                audio.play();
            };
//        extension = audio.canPlayType('video/mp4') ? '.mp4' : audio.canPlayType('video/webm') ? '.webm' : '';
        loadTrack(index);
//        player.onloadedmetadata = function() {
//        player.addEventListener("loadedmetadata", function() {
//            track = document.createElement("track");
//            track.kind = "captions";
//            track.label = "English";
//            track.srclang = "en";
//            track.src = mediaPath + lessons[id].file + '.vtt';
//            track.load = function() {
//                this.mode = "showing";
//                player.textTracks[0].mode = "showing"; // thanks Firefox
//            };
//            this.appendChild(track);
//        };
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
