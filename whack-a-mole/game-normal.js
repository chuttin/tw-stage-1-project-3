window.onload = function () {
    const scoreBoard = document.querySelector('.score');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;


    startBtn.addEventListener('click', function () {
      timeUp = false;
      score = 0;
      scoreBoard.innerHTML = score;
      showBtnAnimation();
      titleH1.innerHTML = 'WHACK-A-MOLE!';
      startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }

    function rand(max, min) {
      return Math.random() * (max - min + 1) + min;
    }

    function showUp() {
      if (!timeUp) {
        lastHole = Math.floor(rand(6, 1));
        let showDuration = rand (200, 100);
        var whichHole = document.getElementsByClassName('hole' + lastHole);
        var upmole = whichHole.item(0).firstElementChild;
        whichHole.item(0).classList.add('up');
        upmole.addEventListener('click', scoreCal, {once: true});
        return setTimeout(showDown, showDuration + 400);
      }
    }

    function showDown() {
      console.log(1);
      var whichHole = document.getElementsByClassName('hole' + lastHole);
      whichHole.item(0).classList.remove('up');
      
      if (!timeUp) {
        return setTimeout(showUp, 400);
      }
    }

    function timeOver(time) { 
      var remainTime = setInterval(function() {
        time = time - 1000;
        if (time === 0) {
          clearInterval(remainTime);
          startBtn.style.display = 'inline-block';
          startBtn.innerHTML = 'Replay';
          titleH1.innerHTML = 'TIME UP!';
          return timeUp = true;
        }
      }, 1000);
    }

    function scoreCal() {
        score = score+ 1;
        scoreBoard.innerHTML = score;
      }

    function startGame() {
      timeOver(gameTime);
      showUp();
    }
};