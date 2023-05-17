
<script>
// Configurações do jogo
const canvasWidth = 400;
const canvasHeight = 400;
const blockSize = 20;
const initialSpeed = 200;
const speedIncrement = 10;

// Elementos do jogo
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variáveis do jogo
let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = { x: 0, y: 0 };
let score = 0;
let speed = initialSpeed;
let gameOver = false;

// Função para desenhar o jogo na tela
function draw() {
  // Limpar o canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Desenhar a cobrinha
  snake.forEach(segment => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
  });

  // Desenhar a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);

  // Desenhar a pontuação
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Função para atualizar o estado do jogo
function update() {
  // Verificar se o jogo acabou
  if (gameOver) {
    alert("Game Over! Pontuação: " + score);
    return;
  }

  // Mover a cobrinha
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= blockSize;
      break;
    case "down":
      head.y += blockSize;
      break;
    case "left":
      head.x -= blockSize;
      break;
    case "right":
      head.x += blockSize;
      break;
  }

  // Verificar colisão com a parede ou consigo mesma
  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    return;
  }

  // Verificar se a cobrinha comeu a comida
  if (head.x === food.x && head.y === food.y) {
    // Aumentar a pontuação e gerar nova comida
    score++;
    generateFood();

    // Aumentar a velocidade
    speed -= speedIncrement;
  } else {
    // Remover o último segmento da cobrinha
    snake.pop();
  }

  // Adicionar a nova cabeça da cobrinha
  snake.unshift(head);

  // Agendar o próximo update
  setTimeout(update, speed);
}

// Função para gerar uma nova comida em uma posição aleatória
function generateFood() {
  const maxX = canvasWidth / blockSize;
  const maxY = canvasHeight / blockSize;

  food.x = Math.floor(Math.random() * maxX) * blockSize;
  food.y = Math.floor(Math.random() * maxY) * blockSize;
}

// Função para lidar com as teclas pressionadas
function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
        }
        break;
        case "ArrowLeft":
        if (direction !== "right") {
        direction = "left";
        }
        break;
        case "ArrowRight":
        if (direction !== "left") {
        direction = "right";
        }
        break;
        }
        }
        
        // Configurar evento de tecla pressionada
        document.addEventListener("keydown", handleKeyPress);
        
        // Iniciar o jogo
        generateFood();
        update();
</script>
