

/**
 * Solves 4x = 8
 */
function test_one() {
    $A = [[4]];
    $x = [8];
    $result = gauss($A, $x);
    console.log($result);
}

/**
 * Solves this system:
 * x + y = 10
 * 2x + y = 16
 */
function test_two () {
    $A = [[1, 1], [2, 1]];
    $x = [10, 16];
    $result = gauss($A, $x);
    console.log($result);

}

/**
 * Solves this system:
 * x + y + z = 6
 * 2x + y + 2z = 10
 * x + 2y + 3z = 14
 */
function test_three () {
    $A = [[0, 1, 1], [2, 0, 2], [1, 2, 0]];
    $x = [6, 10, 14];
    $result = gauss($A, $x);
    console.log($result);
}

function readJson(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        } else {
            callback("Error");
        }
    }
    xmlhttp.send();
}

function Matrix(jsonObj){
    //get size of square Matrix

        var size = jsonObj.n[0];
        //Create array

        var matrix = new Array();
        for (var i = 0; i < size; i++)
        {
            var line = new Array();
            for (var j = 0; j < size; j++)
            {
                line.push(jsonObj.A[i * size + j]);
            }
            line.push(jsonObj.B[i]);
            matrix.push(line);
        }
        return matrix;
}

function compute() {
    //reset error
    error = "";
    var file = document.getElementById("jsonFile").value.replace("C:\\fakepath\\", "");

    readJson("./json/" + file,
    function (response)
    {
        var result;
        var content = response;
        if (content != "Error") {
            //Get content of JSON file
            var jsonObj = JSON.parse(content);
            //Create object Matrix
            var matrix = Matrix(jsonObj);
            //Calculate with timer

            if (matrix.length > 0) {
                document.getElementById("result").innerHTML ="";
                var t0 = performance.now();
                result = gauss(matrix);

                var t1 = performance.now();
                var timeElapsed = (t1 - t0).toFixed(3);
                document.getElementById("result").innerHTML += result;
                document.getElementById("time").innerHTML = timeElapsed+" ms";

            } else {
                error = "Veuillez insérer une matrice non vide";
            }
        }
    });
}
