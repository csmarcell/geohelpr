let file = ""
let countries = []

let questioncounter = 0
const maxquestions = 10
let num = 0

let score = 0
let correctAnswer = 0
let canClick = true
let answers = []


const quizTemplate = document.getElementById("quiz-body").innerHTML

const nextbutton = document.getElementById("button-container")

document.getElementById("button-container").addEventListener("click", Quiz)

async function loadData() {


    num = Math.floor(Math.random() * 4)
    switch (num) {
        case (0):
            file = "bollards"
            break
        case (1):
            file = "cars"
            break
        case (2):
            file = "poles"
            break
        case (3):
            file = "roadlines"
            break
    }


    const response = await fetch(`../source/json/${file}.json`);
    const data = await response.json();
    countries = data;

    document.getElementById("button-container").innerHTML = ""

}

async function Quiz() {


    canClick = true

    answers = []

    await loadData()

    // console.log(file)
    // console.log(questioncounter)

    if (questioncounter > maxquestions) {
        nextbutton.style.display = 'none'
        return
    }
    else if (questioncounter >= maxquestions) {
        nextbutton.innerHTML = `<button id="next-button">Játék vége</button>`
        nextbutton.addEventListener("click", function () {
            document.getElementById("quiz-body").innerHTML = `<h1>Pontszám: ${score}</h1>`
        })
    }
    else if (questioncounter == 0) {
        document.getElementById("quiz-body").innerHTML = ""
        nextbutton.innerHTML = `<button id="next-button">Játék kezdése</button>`
        questioncounter++
        return
    }
    else {
        nextbutton.innerHTML = `<button id="next-button">Következő kérdés</button>`
        nextbutton.style.display = "none"
    }

    if (document.getElementById("quiz-body").innerHTML == "") {
        document.getElementById("quiz-body").innerHTML = quizTemplate
    }

    document.getElementById("ans1").innerHTML = ""
    document.getElementById("ans2").innerHTML = ""
    document.getElementById("ans3").innerHTML = ""
    document.getElementById("ans4").innerHTML = ""


    document.getElementById("counter").innerHTML = "10/" + questioncounter


    correctAnswer = Math.floor(Math.random() * countries.length)
    document.getElementById("img-container").innerHTML = `<img src="../source/img/${file}/${countries[correctAnswer].Image}" alt="kep" id="quiz-img">`

    answers.push(correctAnswer)



    for (i = 0; answers.length < 4; i++) {
        let random = Math.floor(Math.random() * countries.length)
        if (!answers.includes(random)) {
            answers.push(random)
        }
    }

    console.log(correctAnswer)

    answers.sort(() => Math.random() - 0.5)


    //console.log(answers)
    for (i = 0; i < 4; i++) {
        if (answers[i] == correctAnswer) {
            document.getElementById(`ans${i + 1}`).innerHTML = countries[answers[i]].Country
            document.getElementById(`ans${i + 1}`).style.backgroundColor = ""
            document.getElementById(`ans${i + 1}`).classList.add("correct")
        }
        else {
            document.getElementById(`ans${i + 1}`).innerHTML = countries[answers[i]].Country
            document.getElementById(`ans${i + 1}`).classList.remove("correct")
            document.getElementById(`ans${i + 1}`).style.backgroundColor = ""
        }
    }

    answers = document.querySelectorAll(".ans-item")


    answers.forEach(function (answer) {
        answer.addEventListener("click", function color(event) {

            if(!canClick){
                return
            }
            canClick = false

            if (event.target.classList.contains('correct')) {
                score++
                console.log(event.target)
                event.target.style.backgroundColor = "rgba(0, 255, 0, 0.5)"
                document.getElementById("button-container").style.display = "flex"

            }
            else {
                event.target.style.backgroundColor = "rgba(255, 0, 0, 0.5)"
                answers.forEach(function (answer) {
                    if (answer.classList.contains("correct")) {
                        answer.style.backgroundColor = "rgba(0, 255, 0, 0.5)"
                    }
                })
                document.getElementById("button-container").style.display = "flex"

                answers = document.querySelectorAll(".ans-item")

                answers.forEach(function(answer){
                    answer.removeEventListener("click", color)
                })

            }
        })
    })




    console.log(canClick)
    console.log(score)

    questioncounter++

}

Quiz()