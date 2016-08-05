
// const

// vars
	
// classes
	function Player( songs, elem )
	{
		this.playerElement = elem;
		this.audioElement;
		this.songs = new SongIterator( songs );


		// public methods
		this.Play = function()
		{
			this.audioElement.play();
			console.log('Started Playing: ' + this.songs.Current() );
		}
		this.Stop = function()
		{
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

			this.LoadFile();
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
			return elem;
		}
		this.Create_StopButton = function()
		{
			var elem = document.createElement('button');
			elem.innerText = 'Stop';
			return elem;
		}
		this.Create_ProgressBar = function()
		{
			var emptyBar = document.createElement('div');
			emptyBar.classList.add( 'progressBarBackground' );

			return emptyBar;
		}

	}
// functions
	function Test()
	{
		var playerBuilder = new PlayerBuilder();

		var playerElement = document.querySelector('#player');
		var testSongs = ['audio/test1.mp3','audio/test2.mp3','audio/test3.mp3',];
		var audioPlayer = new Player( testSongs, playerElement );

		playerElement.appendChild( playerBuilder.Create_PlayButton() );
		playerElement.appendChild( playerBuilder.Create_StopButton() );
		playerElement.appendChild( playerBuilder.Create_ProgressBar() );
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

