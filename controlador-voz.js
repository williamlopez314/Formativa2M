// Inicializar el reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  console.error("El navegador no soporta la API de reconocimiento de voz.");
} else {
  const recognition = new SpeechRecognition();
  
  // Configuración
  recognition.lang = 'es-ES'; // Idioma español
  recognition.continuous = true; // Escuchar continuamente
  recognition.interimResults = false; // Solo procesar resultados finales

  // Mapeo de comandos y acciones
  const commands = {
    "reanudar temporizador": () => reanudarTemporizador(),
    "cambiar de fase": () => cambiarFase(),
    "cambiar de sección": () => cambiarSeccion(),
    "siguiente pregunta": () => siguientePregunta(),
    "siguiente problema": () => siguienteProblema()
  };

  // Procesar los resultados de voz
  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
    
    console.log(`Comando detectado: "${transcript}"`);

    // Verificar coincidencia de comandos
    for (const [commandText, action] of Object.entries(commands)) {
      if (transcript.includes(commandText)) {
        action();
        break;
      }
    }
  };

  // Manejo de reinicio automático si la escucha se interrumpe
  recognition.onend = () => {
    recognition.start();
  };

  // Iniciar la escucha
  recognition.start();
}

// --- Funciones de control (sustituye con tu lógica existente) ---

function reanudarTemporizador() {
  console.log("Acción: Temporizador reanudado.");
  // Tu código para reanudar el temporizador
}

function cambiarFase() {
  console.log("Acción: Cambiando de fase.");
  // Tu código para cambiar de fase
}

function cambiarSeccion() {
  console.log("Acción: Cambiando de sección.");
  // Tu código para cambiar de sección
}

function siguientePregunta() {
  console.log("Acción: Avanzando a la siguiente pregunta.");
  // Tu código para ir a la siguiente pregunta
}

function siguienteProblema() {
  console.log("Acción: Avanzando al siguiente problema.");
  // Tu código para ir al siguiente problema
}