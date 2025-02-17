document.addEventListener("DOMContentLoaded", () => {
    const casillas = document.querySelectorAll(".gatos");
    const turnoActual = document.getElementById("turno-actual");
    const btnReiniciar = document.getElementById("reiniciar");
    const marcadorVictorias = document.getElementById("ganador");
    const marcadorEmpates = document.getElementById("empate");
    const marcadorDerrotas = document.getElementById("perdedor");
    const modoJuegoRadios = document.querySelectorAll("input[name='modo']");
    
    let tablero = Array(9).fill(null);
    let turno = "X";
    let juegoActivo = true;
    let modoJuego = "cpu";

    let victorias = localStorage.getItem("victorias") || 0;
    let empates = localStorage.getItem("empates") || 0;
    let derrotas = localStorage.getItem("derrotas") || 0;

    marcadorVictorias.textContent = `Victorias: ${victorias}`;
    marcadorEmpates.textContent = `Empates: ${empates}`;
    marcadorDerrotas.textContent = `Derrotas: ${derrotas}`;

    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    casillas.forEach(casilla => {
        casilla.addEventListener("click", () => realizarMovimiento(casilla));
    });

    btnReiniciar.addEventListener("click", reiniciarJuego);

    modoJuegoRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            modoJuego = document.querySelector("input[name='modo']:checked").value;
            reiniciarJuego();
        });
    });

    function realizarMovimiento(casilla) {
        const index = casilla.dataset.index;
        if (!juegoActivo || tablero[index] !== null) return;

        tablero[index] = turno;
        casilla.textContent = turno;
        casilla.classList.add(turno);
        verificarEstado();

        if (juegoActivo && modoJuego === "cpu" && turno === "O") {
            setTimeout(movimientoIA, 500);
        }
    }

    function verificarEstado() {
        for (let combinacion of combinacionesGanadoras) {
            const [a, b, c] = combinacion;
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                resaltarCasillas(combinacion);
                actualizarMarcador(tablero[a] === "X" ? "victoria" : "derrota");
                return;
            }
        }

        if (!tablero.includes(null)) {
            actualizarMarcador("empate");
        } else {
            cambiarTurno();
        }
    }

    function cambiarTurno() {
        turno = turno === "X" ? "O" : "X";
        turnoActual.textContent = turno;
    }

    function actualizarMarcador(resultado) {
        juegoActivo = false;
        if (resultado === "victoria") {
            victorias++;
            marcadorVictorias.textContent = `Victorias: ${victorias}`;
        } else if (resultado === "empate") {
            empates++;
            marcadorEmpates.textContent = `Empates: ${empates}`;
        } else {
            derrotas++;
            marcadorDerrotas.textContent = `Derrotas: ${derrotas}`;
        }
        guardarMarcadores();
    }

    function guardarMarcadores() {
        localStorage.setItem("victorias", victorias);
        localStorage.setItem("empates", empates);
        localStorage.setItem("derrotas", derrotas);
    }

    function reiniciarJuego() {
        tablero.fill(null);
        casillas.forEach(casilla => {
            casilla.textContent = "";
            casilla.classList.remove("X", "O", "ganador");
        });
        juegoActivo = true;
        turno = "X";
        turnoActual.textContent = turno;
    }

    function movimientoIA() {
        let movimientosDisponibles = tablero.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (movimientosDisponibles.length === 0) return;
        let movimientoAleatorio = movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)];
        tablero[movimientoAleatorio] = "O";
        casillas[movimientoAleatorio].textContent = "O";
        casillas[movimientoAleatorio].classList.add("O");
        verificarEstado();
    }

    function resaltarCasillas(combinacion) {
        combinacion.forEach(index => {
            casillas[index].classList.add("ganador");
        });
    }
});











