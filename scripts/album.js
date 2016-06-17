var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumPrince = {
     title: 'Prince',
     artist: 'Prince',
     label: 'Warner Bros. Records',
     year: '1979',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'I Wanna Be Your Lover', duration: '5:50' },
         { title: 'Why You Wanna Treat Me So Bad?', duration: '3:49' },
         { title: 'Sexy Dancer', duration: '4:19'},
         { title: 'When We\'re Dancing Close and Slow', duration: '5:23' },
         { title: 'With You', duration: '4:00'},
         { title: 'Bambi', duration: '4:23'},
         { title: 'Still Waiting', duration: '4:15'},
         { title: 'I Feel for You', duration: '3:25'},
         { title: 'It\'s Gonna Be Lonely', duration: '5:28'},
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
      '<tr class="album-view-song-item">'
    + '    <td class="song-item-number">' + songNumber + '</td>'
    + '    <td class="song-item-title">' + songName + '</td>'
    + '    <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    return template;
};

var setCurrentAlbum = function(album) {
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

window.onload = function(){
    setCurrentAlbum(albumPicasso);
};

var albums = [albumPicasso, albumMarconi, albumPrince];
var albumsIndex = 0;
document.getElementsByClassName('album-cover-art')[0].addEventListener("click", function(){
    if(albumsIndex == albums.length - 1) {
        albumsIndex = 0;
    }
    else {
        albumsIndex += 1;
    }
    setCurrentAlbum(albums[albumsIndex]);
});