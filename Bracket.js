//AIzaSyB9344Ql6zocDKI9rUmPisMbu8lV2GorH4
var resultDic = [];
var shuffled = [];

async function retrieve()
{
    var pId = document.getElementById("playlist").value;
    
    var response = await fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=' + pId + '&key=AIzaSyB9344Ql6zocDKI9rUmPisMbu8lV2GorH4');
    var jason = await response.json();

    jason.items.forEach(video => {
        resultDic.push([video.snippet.title, video.snippet.thumbnails.maxres.url]);
    });
    while(jason.nextPageToken !== undefined){
        var response = await fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=' + pId + '&pageToken=' + jason.nextPageToken + '&key=AIzaSyB9344Ql6zocDKI9rUmPisMbu8lV2GorH4');
        var jason = await response.json();

        jason.items.forEach(video => {
            resultDic.push([video.snippet.title, video.snippet.thumbnails.maxres.url]);
        });
    }
}

function display1()
{
    if(shuffled.length > 0){
        document.getElementById("img1").src = shuffled[0][1];
        document.getElementById("title1").innerHTML = shuffled[0][0];
        shuffled.splice(0, 1);
    }
    else{
        document.getElementById("left").style.display = "none";
        document.getElementById("right").style.width = "100%";
    }
}

function display2()
{
    if(shuffled.length > 0){
        document.getElementById("img2").src = shuffled[0][1];
        document.getElementById("title2").innerHTML = shuffled[0][0];
        shuffled.splice(0, 1);
    }
    else{
        document.getElementById("right").style.display = "none";
        document.getElementById("left").style.width = "100%";
    }
}

async function main()
{
    if (document.getElementById("playlist").value == '')
    {
        alert("Please enter a playlist id");
        return;
    }

    document.getElementById("inputPlaylist").style.display = "none";
    document.getElementById("whole").style.display = "flex";

    await retrieve();

    while(resultDic.length > 0)
    {
        var index = Math.floor(Math.random() * resultDic.length)
        shuffled.push(resultDic[index]);
        resultDic.splice(index, 1);
    }

    display1();
    display2();
}