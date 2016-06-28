var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var nextSong = function() {
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentIndex ++;
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    if (currentIndex === currentAlbum.songs.length) {
        currentIndex = 0;    
    }
    
    currentlyPlayingSongNumber = currentIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentIndex];
    
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentIndex--;
    
    if (currentIndex < 0) {
        currentIndex = currentAlbum.songs.length - 1;
    }
    
    currentlyPlayingSongNumber = currentIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentIndex];

    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function(){
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '    <td class="song-item-title">' + songName + '</td>'
    + '    <td class="song-item-title">' + songName + '</td>'
    + '    <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    var $row = $(template);
    
        var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        if (currentlyPlayingSongNumber !== null) {
          var currentlyPlayingElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');	currentlyPlayingElement.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
        } 
        else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        } 
    };

    var onHover = function(event) {
        var songNumberElement = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberElement.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberElement.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberElement = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberElement.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberElement.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var updatePlayerBarSong = function() {
    var $songName = $('.currently-playing .song-name');
    var $artistName = $('.currently-playing .artist-name');
    var $artistSongMobile = $('.currently-playing .artist-song-mobile');
    $songName.text(currentSongFromAlbum.title);
    $artistName.text(currentAlbum.artist);
    $artistSongMobile.text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

