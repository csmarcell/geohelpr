function navbar() {
    const placeholder = document.getElementById("navbar-placeholder");

    placeholder.innerHTML = `
        <nav class="navbar">
            <a href="index.html">
                <img src="/source/img/logo.png" alt="Logo" class="logo" id="logo" />
            </a>

            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>

            <ul class="menu">
                <li class="item"><a href="/html/basics.html">Alapok</a></li>
                <li class="item"><a href="/html/bollards.html">Vezetőoszlopok</a></li>
                <li class="item"><a href="/html/cars.html">Google autók</a></li>
                <li class="item"><a href="/html/roadlines.html">Útfestések</a></li>
                <li class="item"><a href="/html/poles.html">Villanyoszlopok</a></li>
                <li class="item"><a href="/html/quiz.html">Quiz</a></li>
                <li class="item"><a href="newmeta.html">Új Meta Beküldése</a></li>

                <li class="item button-item">
                    <a href="https://www.geoguessr.com/" target="_blank">
                        <button type="button">GeoGuessr</button>
                    </a>
                </li>
            </ul>
        </nav>
    `;
}

navbar()


function footer(){
    const placeholder = document.getElementById("footer-placeholder")

    placeholder.innerHTML = `
        <div>
            Készítette: Csécsényi Marcell
        </div>
        <div>
            2025
        </div>
        `
}

footer()

function hamburger() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    });

    document.querySelectorAll(".item a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
    }));

}

hamburger()




function loadData(category) {

    fetch(`../source/json/${category}.json`)
        .then(function (data) { return data.json() })
        .then(function (json) {
            const countries = json
            console.table(countries)
            const container = document.getElementById("cards")
            container.innerHTML = ""
            countries.forEach(country => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <div class = card-title>
                        <p>${country.Country} <br><span class="fi fi-${(country.CountryCode).toLowerCase()}"></span></p>
                    </div>
                    <div class="card-body">
                        <img src="../source/img/${category}/${country.Image}" alt="${country.CountryCode}">
                        <div class="card-text">
                            <p>${country.Notes}</p>
                        </div>
                    </div>
            `;

                container.appendChild(card);
            });
        })

}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes("bollards.html")) {
        loadData("bollards");
    }
    else if (path.includes("cars.html")) {
        loadData("cars");
    }
    else if (path.includes("poles.html")) {
        loadData("poles");
    }
    else if (path.includes("roadlines.html")) {
        loadData("roadlines");
    }
});

const form = document.forms["newMeta"];


function validateForm(){

    let isValid = true

    document.getElementById("metaError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("regionError").innerHTML = "";
    document.getElementById("categoryError").innerHTML = "";
    document.getElementById("fileError").innerHTML = "";
    document.getElementById("descError").innerHTML = "";
    document.getElementById("termsError").innerHTML = "";

    let metaName = document.getElementById("metaName").value
    if(!metaName){
        document.getElementById("metaError").innerHTML = "Töltse ki a mezőt!"
        isValid = false
    }

    let email = document.getElementById("email").value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        document.getElementById("emailError").innerHTML = "Érvénytelen e-mail cím!";
        isValid = false
    }

    let region = document.getElementById("region").value
    if(region == ""){
        document.getElementById("regionError").innerHTML = "Válasszon egyet a listából!"
        isValid = false
    }

    let category = false
    let radio = document.querySelectorAll('input[type ="radio"]')
    for(i=0; i<radio.length; i++){
        if(radio[i].checked == true){
            category = true
            console.log(category)
        }
    }
    if(category == false){
        document.getElementById("categoryError").innerHTML = "Válasszon ki egyet az opciók közül!"
        isValid = false
        }

    let file = document.getElementById("screenshot")
    if(file.files.length ===0){
        document.getElementById("fileError").innerHTML = "Válasszon ki egy fájlt!"
        isValid = false
    }

    let description = document.getElementById("description").value
    if(!description){
        document.getElementById("descError").innerHTML = "Adjon meg leírást!"
        isValid = false
    }

    let terms = document.getElementById("terms")
    if(!terms.checked){
        document.getElementById("termsError").innerHTML = "Fogadja el a feltételeket!"
        isValid = false
    }

    return isValid
}


if(form){
    document.getElementById("newMeta").addEventListener("submit", function(event){
        event.preventDefault()

        const valid = validateForm()

        if(valid){
            event.target.submit()
        }
    })
}
