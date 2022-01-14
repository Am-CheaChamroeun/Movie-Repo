//Display data 
    fetch("http://localhost:3000/movies").then(
    res => {
        res.json().then(
            data => {
                console.log(data)
                if (data.length > 0) {
                    var temp = "";
                    data.forEach((movie_data) => {
                        temp += "<tr>";
                        temp += "<td>" + movie_data.movieid + "</td>";
                        temp += "<td>" + movie_data.moviename + "</td>";
                        temp += "<td>" + movie_data.releasedate + "</td>";
                        temp += "<td>" + movie_data.movierating + "</td>";
                        temp += "<td>" + movie_data.filmindustry + "</td></tr>";;
                    })

                    document.getElementById("tablerows").innerHTML = temp;
                }
            }
        )
    }
)

function onInsertRecord() {
    let movieID = document.getElementById("movieid").value;
    let movieName = document.getElementById("moviename").value;
    let releaseDate = document.getElementById("releasedate").value;
    let movieRating = document.getElementById("movierating").value;
    let filmIndustry = document.getElementById("filmindustry").value;
    fetch(" http://localhost:3000/movies").then(
        res => {
            res.json().then(data => {
                data.forEach((d) => {
                    if (d.movieID == movieID) {
                        alert("This record is already in the repository.");
                    }
                })
            })
        }
    )
    let movies = {
        "movieid": movieID,
        "moviename": movieName,
        "releasedate": releaseDate,
        "movierating": movieRating,
        "filmindustry": filmIndustry
    }
    if (movieID.length !=0 && movieName.length != 0 && releaseDate.length != 0 && movieRating.length != 0 && filmIndustry.length != 0) {
        fetch("http://localhost:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movies)
        })
    } else {
        System.out.println("Fields cannot be empty!")
    }
}


function onDeleteRecord() {

    let movieID = document.getElementById("movieid").value;

    if (movieID.length != 0) {

        fetch("http://localhost:3000/movies/" + movieID, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
    } else {
        let result = confirm("Are you sure you want to delete all the records?")
        if (result) {
            fetch("http://localhost:3000/movies").then(
                res => {
                    res.json().then(
                        data => {
                            for (let i = 0; i < data.length; i++) {
                                fetch("http://localhost:3000/movies/" + data[i]["movieid"], {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(data)
                                })
                            }
                        }
                    )
                }
            )
        }
    }
}


function onEditRecord(){
    let id = document.getElementById("movieid").value
    if (id.length != 0){
        fetch("http://localhost:3000/movies/" + id).then((res) => {
            res.json().then((data) => {
                let newName = document.getElementById("moviename").value;
                let newDate = document.getElementById("releasedate").value;
                let newRate = document.getElementById("movierating").value;
                let newFilm = document.getElementById("filmindustry").value;
                if (newName.length != 0 && newDate.length != 0 && newRate.length != 0 && newFilm.length != 0){
                    let movies = {
                        "movieid": id,
                        "moviename": newName,
                        "releasedate": newDate,
                        "movierating": newRate,
                        "filmindustry": newFilm,
                    
                    }
                    fetch("http://localhost:3000/movies/"+id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify(movies),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                
            })
        })
    }
}


function onFindRecord(){
    let findId = document.getElementById("movieid").value
    if (findId != 0){
        fetch("http://localhost:3000/movies/" + findId).then((data) => {
            data.json().then((d) => {
                temp = "";
                if (d.movieid != undefined) {
                    temp += "<tr>";
                    temp += "<td>" + d.movieid + "</td>";
                    temp += "<td>" + d.moviename + "</td>";
                    temp += "<td>" + d.releasedate + "</td>";
                    temp += "<td>" + d.releasedate + "</td>";
                    temp += "<td>" + d.filmindustry + "</td></tr>"
                    document.getElementById("tablerows").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
}