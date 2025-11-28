// Food list
const foods = [
    "Nasi Lemak", "Chicken Rice", "Fried Rice", "Ramen", "Burger",
    "Pizza", "Sushi", "Salad"
  ];
  
  // Runner images (you can replace URLs with your own images)
  const runnerImages = [
    "img.png/edward.png",
    "img.png/evan.png",
    "img.png/Jason.png",
    "https://i.pravatar.cc/50?img=4",
    "https://i.pravatar.cc/50?img=5"
  ];
  
  const numRunners = runnerImages.length;
  const raceTrack = document.getElementById("raceTrack");
  const startBtn = document.getElementById("startBtn");
  const winnerP = document.getElementById("winner");
  
  function startRace() {
    winnerP.innerText = "Race is running...";
    raceTrack.innerHTML = "";
  
    const runners = [];
  
    for (let i = 0; i < numRunners; i++) {
      const food = foods[Math.floor(Math.random() * foods.length)];
      const runnerDiv = document.createElement("div");
      runnerDiv.classList.add("runner");
      runnerDiv.style.top = `${i * 60}px`;
  
      const img = document.createElement("img");
      img.src = runnerImages[i];
      runnerDiv.appendChild(img);
  
      const span = document.createElement("span");
      span.innerText = food;
      runnerDiv.appendChild(span);
  
      raceTrack.appendChild(runnerDiv);
  
      runners.push({
        el: runnerDiv,
        food,
        position: 0,
        speed: Math.random() * 3 + 2
      });
    }
  
    // Animate race
    let raceInterval = setInterval(() => {
      let finished = false;
      runners.forEach(r => {
        r.position += r.speed;
        r.el.style.left = r.position + "px";
  
        if (r.position >= raceTrack.offsetWidth - 80) finished = true;
      });
  
      if (finished) {
        clearInterval(raceInterval);
  
        // Determine winner
        let maxPos = Math.max(...runners.map(r => r.position));
        let winners = runners.filter(r => r.position === maxPos);
        let finalWinner = winners[Math.floor(Math.random() * winners.length)];
  
        winnerP.innerText = `Winner Food: ${finalWinner.food} 🍽️`;
      }
    }, 30);
  }
  
  startBtn.addEventListener("click", startRace);
  