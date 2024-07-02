const formConfig = document.getElementById('form_config')
const qtd_times = document.getElementById('qtd_times')
const qtd_turnos = document.getElementById('qtd_turnos')
const btn_inicio = document.getElementById('btn_inicio')
const partidas = document.getElementById('partidas')
const tabela = document.getElementById('tabela')
const tabelainfo = document.getElementById('info_tabela')
const tabelapai = document.getElementById('tabela_pai')
times = {}
campeonatoAtivo = false


qtd_times.addEventListener('change', () => {
  const divtimesnomes = document.getElementById('nometimes')
  while (divtimesnomes.firstChild) {
    divtimesnomes.removeChild(divtimesnomes.firstChild)
  }
  for (i = 0; i < qtd_times.value; i++) {

    const label = document.createElement('label')
    const input = document.createElement('input')

    label.innerText = `Nome do time ${i + 1}: `
    label.for = `nome_time_${i + 1}`
    label.name = `nome_time_${i + 1}`
    label.style.marginTop = '30px'

    input.id = `nome_time_${i + 1}`
    input.name = `nome_time_${i + 1}`


    divtimesnomes.appendChild(label)
    divtimesnomes.appendChild(input)
    divtimesnomes.appendChild(document.createElement('br'))
  }
  formConfig.appendChild(divtimesnomes)

})

const verificacaoNome = (item) => item == '';

btn_inicio.addEventListener('click', () => {
  if(campeonatoAtivo){
    Swal.fire({
      title: "Começar outro campeonato?",
      text: "O campeonato ativo será perdido.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, começar campeonato!",
      color: '#F5F5F5',
      background: '#212121',
      confirmButtonColor: '#424242'
    }).then((result) => {
      if (result.isConfirmed) {
        iniciarCampeonato()
      }
    });
  } else {
    iniciarCampeonato()
  }
})

function iniciarCampeonato(){
  times = {}
  let arraynomeverificacao = []
  for (i = 0; i < qtd_times.value; i++) {
    arraynomeverificacao.push(document.getElementById(`nome_time_${i + 1}`).value)
  }
  
  if (qtd_times.value == 0 || qtd_turnos.value == 0 || arraynomeverificacao.some(verificacaoNome)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos os campos devem ser preenchidos!",
      color: '#F5F5F5',
      background: '#212121',
      confirmButtonColor: '#424242'
    });
    return
  }
  verificarTimesExistentes()
  criarTimes()
  criarTabela()
  addDivPartidas()
  campeonatoAtivo = true
}

function criarTabela() {
  let size = screen.width;
  if(size < 1000){
    tabelapai.style.minWidth = "auto";
  } else {
    tabelapai.style.minWidth = '500px'
  }
  tabelainfo.innerText = ''
  tabelainfo.innerHTML = '<h2>Posição</h2><h2>Time</h2><h2>Pontos</h2>'
  tabelainfo.style.borderBottom = '4px solid whitesmoke'
  tabelainfo.style.display = 'flex'
  tabelainfo.style.justifyContent = 'space-between'


  for (let i = 0; i < qtd_times.value; i++) {
    console.log(times)
    const eachteam = document.createElement('div')
    textNode = `<h2>${Object.keys(times).indexOf(Object.keys(times)[i]) + 1} |</h2><h2>${Object.keys(times)[i]}</h2><h2>| ${times[Object.keys(times)[i]]}</h2>`
    eachteam.innerHTML = textNode
    eachteam.style.display = 'flex'
    eachteam.style.justifyContent = 'space-between'
    eachteam.id = `time_tabela_${i + 1}`

    tabela.append(eachteam)
  }
}
function atualizarTabela() {
  while (tabela.firstChild) {
    tabela.removeChild(tabela.firstChild)
  }
  tabelaTitle = document.createElement('h2')
  tabelaTitle.innerText = 'TABELA'
  tabela.append(tabelaTitle)
  tabela.appendChild(tabelainfo)
  tabelainfo.innerText = ''
  tabelainfo.innerHTML = '<h2>Posição</h2><h2>Time</h2><h2>Pontos</h2>'
  tabelainfo.style.borderBottom = '4px solid whitesmoke'
  tabelainfo.style.display = 'flex'
  tabelainfo.style.justifyContent = 'space-between'

  for (let i = 0; i < qtd_times.value; i++) {
    const eachteam = document.createElement('div')
    textNode = `<h2>${Object.keys(ordenarTabela(times)).indexOf(Object.keys(ordenarTabela(times))[i]) + 1} |</h2><h2>${Object.keys(ordenarTabela(times))[i]}</h2><h2>| ${times[Object.keys(ordenarTabela(times))[i]]}</h2>`
    eachteam.innerHTML = textNode
    eachteam.style.display = 'flex'
    eachteam.style.justifyContent = 'space-between'
    eachteam.id = `time_tabela_${i + 1}`

    tabela.append(eachteam)
  }
}

function verificarTimesExistentes() {
  for (let j = 0; j < qtdtimesglobal; j++) {
    if (document.getElementById(`time_tabela_${j + 1}`)) {
      document.getElementById(`time_tabela_${j + 1}`).remove()
    }
  }
}
let qtdtimesglobal = 0
let nometimesglobal = []
function criarTimes() {
  qtdtimesglobal = qtd_times.value
  nometimesglobal = []
  for (i = 0; i < qtd_times.value; i++) {
    nometimesglobal.push(document.getElementById(`nome_time_${i + 1}`).value)
    times[document.getElementById(`nome_time_${i + 1}`).value] = 0
  }
}

function gerarPartidas() {
  let equipes = Object.keys(times)
  let jogos = []
  for (let i = 0; i < qtd_turnos.value; i++) {

    for (let j = 0; j < equipes.length; j++) {
      for (let k = j + 1; k < equipes.length; k++) {
        jogos.push([equipes[j], equipes[k]])
      }
    }
  }
  function randOrd() {
    return (Math.round(Math.random())-0.5);
  }
  jogos.sort(randOrd)
  return jogos
}

function addDivPartidas() {
  while (partidas.firstChild) {
    partidas.removeChild(partidas.firstChild)
  }

  nmPartidas = 0
  arrayJogos = gerarPartidas()
  arrayJogos.forEach(element => {
    const p = document.createElement('p')
    nmPartidas += 1
    p.id = nmPartidas
    textNode = `<label>${element[0]}</label><input type='number' id=${element[0]}_${p.id} min=0> X <input type='number' id=${element[1]}_${nmPartidas} min=0><label>${element[1]}</label>`
    p.innerHTML = textNode
    partidas.appendChild(p)

    p.setAttribute('t1g', 'false')
    p.setAttribute('t2g', 'false')
    p.setAttribute('emp', 'false')
    p.style.width = '100%'
    p.style.display = 'flex'
    p.style.justifyContent = 'center'
    p.addEventListener('change', () => {
      const time1pts = parseInt(document.getElementById(`${element[0]}_${p.id}`).value)
      const time2pts = parseInt(document.getElementById(`${element[1]}_${p.id}`).value)

      if (p.getAttribute('t1g') == 'false' && p.getAttribute('t2g') == 'false' && p.getAttribute('emp') == 'false') {
        addPontos(element[0], time1pts, element[1], time2pts, p)
      }

      if (p.getAttribute('t1g') == 'true' && !(time1pts > time2pts)) {
        tirarPontos(element[0], 3)
        addPontos(element[0], time1pts, element[1], time2pts, p)
      }
      if (p.getAttribute('t2g') == 'true' && !(time1pts < time2pts)) {
        tirarPontos(element[1], 3)
        addPontos(element[0], time1pts, element[1], time2pts, p)
      }
      if (p.getAttribute('emp') == 'true' && !(time1pts == time2pts)) {
        tirarPontos(element[0], 1)
        tirarPontos(element[1], 1)
        addPontos(element[0], time1pts, element[1], time2pts, p)
      }
      atualizarTabela()
    })
  });
}

function addPontos(time1, pts1, time2, pts2, p) {
  if (pts1 > pts2) times[time1] += 3
  if (pts1 < pts2) times[time2] += 3
  if (pts1 == pts2) {
    times[time1] += 1
    times[time2] += 1
  }

  p.setAttribute('t1g', 'false')
  p.setAttribute('t2g', 'false')
  p.setAttribute('emp', 'false')
  if (pts1 > pts2) p.setAttribute('t1g', 'true')
  if (pts1 < pts2) p.setAttribute('t2g', 'true')
  if (pts1 == pts2) p.setAttribute('emp', 'true')
}

function tirarPontos(time, pts) {
  times[time] -= pts
}

function ordenarTabela(timesObj){
  timesOdernados = {}
  let equipes = Object.entries(timesObj)
  equipes.sort((a,b) => b[1] - a[1])
  equipes.forEach(element => {
    timesOdernados[element[0]] = element[1]
  })

  return timesOdernados
}