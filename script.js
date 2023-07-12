let turnos;
let nomesTimes = [];
let pontosTimes = [];

function exibirTable() {
    var div = document.getElementById("idtable");
    div.style.display = "block";
}

function iniciarTorneio() {
  turnos = parseInt(document.getElementById("turnosSelect").value);
  
  nomesTimes = [
    document.getElementById("nomeTime1Input").value,
    document.getElementById("nomeTime2Input").value,
    document.getElementById("nomeTime3Input").value
  ];
  
  pontosTimes = [0, 0, 0];
  
  atualizarTabelaPontuacao();
  gerarRodadas();
}

function atualizarTabelaPontuacao() {
  document.getElementById("nomeTime1").innerText = nomesTimes[0];
  document.getElementById("nomeTime2").innerText = nomesTimes[1];
  document.getElementById("nomeTime3").innerText = nomesTimes[2];
  
  document.getElementById("pontosTime1").innerText = pontosTimes[0];
  document.getElementById("pontosTime2").innerText = pontosTimes[1];
  document.getElementById("pontosTime3").innerText = pontosTimes[2];
}

function gerarRodadas() {
  const partidasPorTurno = 3;
  
  let rodadasHtml = "";
  
  const combinacoesTimes = [
    [0, 1],
    [1, 2],
    [2, 0]
  ];
  
  for (let turno = 1; turno <= turnos; turno++) {
    rodadasHtml += `<h3>Turno ${turno}</h3>`;
    
    for (let partida = 1; partida <= partidasPorTurno; partida++) {
      const combinacao = combinacoesTimes[(partida - 1 + turno - 1) % 3];
      
      const time1 = nomesTimes[combinacao[0]];
      const time2 = nomesTimes[combinacao[1]];
      
      rodadasHtml += `<p>${time1} x ${time2}: <br> <input type="number" id="placarTime_${turno}_${partida}_1" min="0"> X <input type="number" id="placarTime_${turno}_${partida}_2" min="0"> <button onclick="atualizarPontuacao(${turno}, ${partida})">Atualizar</button></p>`;
    }
  }
  
  document.getElementById("rodadasContainer").innerHTML = rodadasHtml;
}

function atualizarPontuacao(turno, partida) {
  const placarTime1 = parseInt(document.getElementById(`placarTime_${turno}_${partida}_1`).value);
  const placarTime2 = parseInt(document.getElementById(`placarTime_${turno}_${partida}_2`).value);
  
  if (placarTime1 > placarTime2) {
    pontosTimes[(partida - 1 + turno - 1) % 3] += 3;
  } else if (placarTime1 === placarTime2) {
    pontosTimes[(partida - 1 + turno - 1) % 3] += 1;
    pontosTimes[(partida - 1 + turno) % 3] += 1;
  } else {
    pontosTimes[(partida - 1 + turno) % 3] += 3;
  }
  
  atualizarTabelaPontuacao();
}