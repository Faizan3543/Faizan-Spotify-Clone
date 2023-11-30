console.log("Faizan welcomes you In his Spotify app");
let songIndex = 0;
let audioElem = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName'); //it is the default song name which will be displayed initially in the bottom song bar
let songItems = Array.from(document.getElementsByClassName('songItem'));  //as there are more than one elements with the same class name so we use Array.from

let songs =[
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "ek mulaqaat", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Ruaan tiger3", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "hua main", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "leke prabhu ka naam", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "kali kali zulfoon ", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"}
            ];

//for displaying the img and song name in main body
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElem.paused||audioElem.currentTime<=0){
        audioElem.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElem.pause();
        masterPlay.classList.remove('fa-pause-cicle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//for the progress bar
audioElem.addEventListener('timeupdate',()=>
{
    //update seek bar as the music plays
    progress = parseInt((audioElem.currentTime/audioElem.duration)*100);
    myProgressBar.value = progress; //for this u must set value in html file as value ="0"
})

//whenever we will on the progress bar from that duration it will start to play:
myProgressBar.addEventListener('change',()=>{
    audioElem.currentTime = myProgressBar.value*audioElem.duration/100;
})

//to initially make all the button of the list as play
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//for playing the songs from the list and changing the play pause button the list itself 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);  //here we r using target to select the song among the list in order to perfrm function
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElem.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName; // this will change the name of the song in the bottom bar
        audioElem.currentTime = 0;
        audioElem.play();
        gif.opacity = 1; //this opacity is for the songs played from the list 

    })
});

//for playing the next song using next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex =0;
    }
    else{
        songIndex +=1;
    }
    //now paste the logic of above i.e playing song using index
    audioElem.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElem.currentTime = 0;
    audioElem.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


//this is fro playing the previous song using the pevious button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex =9;
    }
    else{
        songIndex -=1;
    }
    //now paste the logic of above i.e playing song using index
    audioElem.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElem.currentTime = 0;
    audioElem.play();
    gif.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
