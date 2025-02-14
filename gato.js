const gato = Array.from(document.getElementsByClassName("gatos"));

function gatito() {
    gato.forEach((gati) => {
        gati.addEventListener("click", () => {
            if (gati.innerHTML == "") {
                gati.innerHTML = "X";
                setTimeout(() => {
                    gato2();
                }, 300);
                hayGanador()
            }
        });
    });
}

function gato2() {
    const garra = gato.filter((gati) => gati.innerHTML === "");
    if (garra.length > 0) {
        const bigotes = Math.floor(Math.random() * garra.length);
        garra[bigotes].innerHTML = "O";
    }
}

const posiblesGanes = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function hayGanador() {
    for (const posicion of posiblesGanes) {
        const [posA,posB,posC] = posicion
        if (gato[posA].textContent != "" && gato[posA].textContent === gato[posB].textContent && gato[posA].textContent === gato[posC].textContent) {
            alert("HAY UN GANADOR")
        }
    }
}
gatito();










