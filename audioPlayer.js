
// const
	
// vars
	
// enums
	var playModes = {
		'normal' : 'normal',
		'repeat' : 'repeat',
		'shuffle' : 'shuffle',
	};
// classes
	function Player( songs, elem, playModes )
	{
		this.progressCallback;
		this.progressIndicator;
		this.playerElement = elem;
		this.audioElement;
		this.songs = new SongIterator( songs );
		this.playMode;

		// public methods
		this.Play = function()
		{
			this.audioElement.play();
			this.progressCallback = window.setInterval(this.UpdateProgressIndicator.bind( this ), 125 );

			console.log('Started Playing: ' + this.songs.Current() );
		}
		this.Stop = function()
		{
			this.audioElement.pause();
			window.clearInterval( this.progressCallback );
			
			console.log('Stopped Playing: ' + this.songs.Current() );
		}
		this.Next = function()
		{
			this.songs.Next();
			this.LoadFile();
		}
		this.Previous = function()
		{
			this.songs.Last();
			this.LoadFile();
		}
		

		// private methods
		this.LoadFile = function()
		{
			this.audioElement.setAttribute('src', this.songs.Current() );
			this.audioElement.load();
		}
		this.Init = function()
		{
			this.audioElement = document.createElement('audio');
			this.audioElement.setAttribute('type','audio/mpeg');

			this.playerElement.appendChild(this.audioElement);
			
			//this.progressIndicator = document.getElementById('progressBarIndicator');

			this.LoadFile();
		}
		this.UpdateProgressIndicator = function()
		{
			var currentTime = this.audioElement.currentTime;
			var maxTime = this.audioElement.duration;
			var difference = currentTime / maxTime * 100;
			this.progressIndicator.style.left = difference + '%';
			console.log('progress!');
		}

		this.Init();

	}
	function SongIterator( songs )
	{
		this.current = 0;
		this.songs = songs;

		this.Next = function()
		{
			this.current ++;
		}
		this.Last = function()
		{
			this.current --;
		}
		this.Current = function()
		{
			if ( this.IsValid() === true )
			{
				return this.songs[this.current];
			}
			else
			{
				return undefined;
			}
		}
		this.Start = function()
		{
			this.current = 0;
		}
		this.IsValid = function()
		{
			if ( this.songs.length >= this.current )
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}

	function PlayerBuilder()
	{
		this.Create_PlayButton = function()
		{
			var elem = document.createElement('button');
			elem.innerText = 'Play';
			elem.setAttribute('id','button_play');
			return elem;
		}
		this.Create_StopButton = function()
		{
			var elem = document.createElement('button');
			elem.innerText = 'Stop';
			elem.setAttribute('id','button_stop');
			return elem;
		}
		this.Create_NextButton = function()
		{
			var elem = document.createElement('button');
			elem.innerText = '->';
			elem.setAttribute('id','button_next');
			return elem;
		}
		this.Create_PreviousButton = function()
		{
			var elem = document.createElement('button');
			elem.innerText = '<-';
			elem.setAttribute('id','button_prev');
			return elem;
		}
		this.Create_ProgressBar = function()
		{
			var emptyBar = document.createElement('div');
			emptyBar.classList.add( 'progressBarBackground' );

			var locationIndicator = document.createElement('div');
			locationIndicator.classList.add('progressBarIndicator');
			locationIndicator.setAttribute('id','progressBarIndicator');

			var progressBar = document.createElement('div');
			progressBar.classList.add('progressBarWrapper');
			progressBar.appendChild(emptyBar);
			progressBar.appendChild(locationIndicator);

			return progressBar;
		}

	}
// functions
	function Test()
	{
		var playerBuilder = new PlayerBuilder();

		var playerElement = document.querySelector('#player');
		var testSongs = ['audio/test1.mp3','audio/test2.mp3','audio/test3.mp3',];
		var audioPlayer = new Player( testSongs, playerElement, playModes );

		playerElement.appendChild( playerBuilder.Create_PlayButton() );
		playerElement.appendChild( playerBuilder.Create_StopButton() );
		playerElement.appendChild( playerBuilder.Create_NextButton() );
		playerElement.appendChild( playerBuilder.Create_PreviousButton() );
		playerElement.appendChild( playerBuilder.Create_ProgressBar() );
		audioPlayer.progressIndicator = document.getElementById('progressBarIndicator');

		// temporarily assign play and stop functionality here until the html builder is finished
		var playButton = document.querySelector('#button_play');
		playButton.addEventListener('click', audioPlayer.Play.bind(audioPlayer) );
		var stopButton = document.querySelector('#button_stop');
		stopButton.addEventListener('click', audioPlayer.Stop.bind(audioPlayer) );
		var nextButton = document.querySelector('#button_next');
		nextButton.addEventListener('click', audioPlayer.Next.bind(audioPlayer) );
		var prevButton = document.querySelector('#button_prev');
		prevButton.addEventListener('click', audioPlayer.Previous.bind(audioPlayer) );

//audioPlayer.Play();
		/*
		audioPlayer.Next();
		audioPlayer.Play();
		/*
		audioPlayer.Stop();

		audioPlayer.Next();
		audioPlayer.Next();
		audioPlayer.Play();
		audioPlayer.Stop();

		audioPlayer.Previous();
		audioPlayer.Play();
		audioPlayer.Stop();
		*/

	}
// run
	
// test

