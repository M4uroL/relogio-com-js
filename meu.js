let ver24H = true;
let mostraSegundos = true;
let intevaloTempo;

const elementoTempo = document.getElementById('time');
const elementoData = document.getElementById('date');
const timezoneElement = document.getElementById('timezone');
const formatoBtn = document.getElementById('format-btn');
const secondosBtn = document.getElementById('seconds-btn');
const formatIndicator = document.getElementById('format-indicator');

const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const semanas = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
];

function atualiza() {
    const agora = new Date();
    
    // Formatação da hora
    let horas = agora.getHours();
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    let tempoStr = '';
    let periodo = '';
    
    if (!ver24H) {
        periodo = horas >= 12 ? ' PM' : ' AM';
        horas = horas % 12;
        horas = horas ? horas : 12; // 0 deve ser 12
    }
    
    const horasStr = horas.toString().padStart(2, '0');
    
    if (mostraSegundos) {
        tempoStr = `${horasStr}:${minutos}:<span class="seconds pulse">${segundos}</span>${periodo}`;
    } else {
        tempoStr = `${horasStr}:${minutos}${periodo}`;
    }
    
    elementoTempo.innerHTML = tempoStr;
    
    // Formatação da data
    const nomeDia = semanas[now.getDay()];
    const dia = agora.getDate();
    const mes = meses[now.getMonth()];
    const ano = agora.getFullYear();
    
    elementoData.textContent = `${nomeDia}, ${dia} de ${mes} de ${ano}`;
    
    // Fuso horário
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset > 0 ? '-' : '+';
    const offsetString = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
    
    timezoneElement.textContent = `${timezone} (UTC${offsetString})`;
}

function alteraFormatoTempo() {
    ver24H = !ver24H;
    formatBtn.textContent = ver24H ? 'Formato 12h' : 'Formato 24h';
    formatIndicator.textContent = ver24H ? 'Formato 24 horas' : 'Formato 12 horas';
    atualiza();
}

function alteraSegundos() {
    mostraSegundos = !mostraSegundos;
    secondsBtn.textContent = mostraSegundos ? 'Ocultar Segundos' : 'Mostrar Segundos';
    atualiza();
}

// Event listeners
formatBtn.addEventListener('click', alteraFormatoTempo);
secondsBtn.addEventListener('click', alteraSegundos);

// Inicializar o relógio
atualiza();
intervaloTempo = setInterval(atualiza, 1000);

// Atualizar quando a página ganha foco (para sincronizar após inatividade)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        intervaloTempo(intervaloTempo);
        atualiza();
        intervaloTempo = setInterval(atualiza, 1000);
    }
});