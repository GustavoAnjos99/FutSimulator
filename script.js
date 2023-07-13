let turnos;
let nomesTimes = [];
let pontosTimes = [];
let combinacoesTimes = [];

function exibirTable() {
  var div = document.getElementById("idtable");
  div.style.display = "block";
}


function iniciarTorneio() {
  turnos = parseInt(document.getElementById("turnosSelect").value);
  const quantidadeTimes = parseInt(document.getElementById("quantidadeTimesSelect").value);

  nomesTimes = [];
  for (let i = 1; i <= quantidadeTimes; i++) {
    nomesTimes.push(document.getElementById(`nomeTime${i}Input`).value);
  }

  pontosTimes = Array(quantidadeTimes).fill(0);

  atualizarTabelaPontuacao();
  gerarRodadas();
}

function atualizarTorneio() {
  const quantidadeTimes = parseInt(document.getElementById("quantidadeTimesSelect").value);
  var divTime4 = document.getElementById("nomeTime4Input2");

  if (quantidadeTimesSelect.value === "4") {
    divTime4.style.display = "block";
  } else {
    divTime4.style.display = "none";
    nomeTime4Input.value = "";
  }

  if (quantidadeTimes === 3) {
    document.getElementById("time4InputContainer").style.display = "none";
    document.getElementById("time4Row").style.display = "none";
  } else if (quantidadeTimes === 4) {
    document.getElementById("time4InputContainer").style.display = "block";
    document.getElementById("time4Row").style.display = "table-row";
  }
}

function atualizarTabelaPontuacao() {
  for (let i = 0; i < nomesTimes.length; i++) {
    document.getElementById(`nomeTime${i + 1}`).innerText = nomesTimes[i];
    document.getElementById(`pontosTime${i + 1}`).innerText = pontosTimes[i];
  }
}

function gerarRodadas() {
  if (nomesTimes.length === 3) {
    combinacoesTimes = [
      [0, 1],
      [1, 2],
      [2, 0]
    ];
  } else if (nomesTimes.length === 4) {
    combinacoesTimes = [
      [0, 1],
      [2, 3],
      [1, 2],
      [3, 0],
      [1, 3],
      [0, 2]
    ];
  }

  const partidasPorTurno = combinacoesTimes.length;
  const totalPartidas = turnos * partidasPorTurno;

  let rodadasHtml = "";

  for (let partida = 1; partida <= totalPartidas; partida++) {
    const turno = Math.ceil(partida / partidasPorTurno);
    const combinacao = combinacoesTimes[(partida - 1) % combinacoesTimes.length];

    const time1 = nomesTimes[combinacao[0]];
    const time2 = nomesTimes[combinacao[1]];

    if (partida % partidasPorTurno === 1) {
      rodadasHtml += `<h3>Turno ${turno}</h3>`;
    }

    rodadasHtml += `<p>${time1} x ${time2}: <br> <input type="number" id="placarTime_${turno}_${partida}_1" min="0"> X <input type="number" id="placarTime_${turno}_${partida}_2" min="0"> <button onclick="atualizarPontuacao(${turno}, ${partida})">Atualizar</button></p>`;
  }

  document.getElementById("rodadasContainer").innerHTML = rodadasHtml;
}

function atualizarPontuacao(turno, partida) {
  const placarTime1 = parseInt(document.getElementById(`placarTime_${turno}_${partida}_1`).value);
  const placarTime2 = parseInt(document.getElementById(`placarTime_${turno}_${partida}_2`).value);

  const indice = (partida - 1) % combinacoesTimes.length;
  const resultado = combinacoesTimes[indice];

  if (placarTime1 > placarTime2) {
    pontosTimes[resultado[0]] += 3;
   } else if (placarTime1 === placarTime2) {
      pontosTimes[resultado[0]] += 1;
      pontosTimes[resultado[1]] += 1;
    } else {
      pontosTimes[resultado[1]] += 3;
    }
  
    atualizarTabelaPontuacao();
  }