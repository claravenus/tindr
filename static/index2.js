    const profils = [
      { nom: "Alice", age: 24, desc: "PassionnÃ©e de voyages et de cuisine", img: src="{{ url_for('static', filename='images/coeur.png') }}"},
      { nom: "LÃ©o", age: 28, desc: "Photographe et amateur de randonnÃ©e", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7htLhHH2RZFPGscMqAE1GQHaE8%26cb%3Diwc2%26pid%3DApi&f=1&ipt=4110434dde6d5e9a168aa3830c54b9e5e9c0a8b0ddb83a6b342f97fca28250b7&ipo=images" },
      { nom: "Emma", age: 22, desc: "Fan de jeux vidÃ©o et de chats", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7htLhHH2RZFPGscMqAE1GQHaE8%26cb%3Diwc2%26pid%3DApi&f=1&ipt=4110434dde6d5e9a168aa3830c54b9e5e9c0a8b0ddb83a6b342f97fca28250b7&ipo=images" },
      { nom: "Lucas", age: 30, desc: "Sportif et geek dans l'Ã¢me", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7htLhHH2RZFPGscMqAE1GQHaE8%26cb%3Diwc2%26pid%3DApi&f=1&ipt=4110434dde6d5e9a168aa3830c54b9e5e9c0a8b0ddb83a6b342f97fca28250b7&ipo=images" },
      { nom: "Clara", age: 25, desc: "FÃ©rue de mode et dâ€™art", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7htLhHH2RZFPGscMqAE1GQHaE8%26cb%3Diwc2%26pid%3DApi&f=1&ipt=4110434dde6d5e9a168aa3830c54b9e5e9c0a8b0ddb83a6b342f97fca28250b7&ipo=images" },
      { nom: "Nina", age: 27, desc: "Musicienne et grande lectrice", img: "6.jpg" },
      { nom: "Hugo", age: 26, desc: "Toujours prÃªt pour une aventure", img: "7.jpg" },
      { nom: "Jade", age: 23, desc: "Amoureuse de la nature", img: "8.jpg" },
      { nom: "Tom", age: 29, desc: "CinÃ©phile et amateur de vin", img: "9.jpg" },
      { nom: "Sofia", age: 21, desc: "Toujours un sourire en rÃ©serve", img: "10.jpg" },
      { nom: "Axel", age: 31, desc: "Esprit libre et passionnÃ©", img: "11.jpg" },
      { nom: "Lina", age: 24, desc: "Danseuse et rÃªveuse", img: "12.jpg" },
      { nom: "Noah", age: 27, desc: "Entrepreneur dans la tech", img: "13.jpg" },
      { nom: "Eva", age: 26, desc: "Yoga, lecture et chocolat", img: "14.jpg" },
      { nom: "Max", age: 30, desc: "Pilote et explorateur", img: "15.jpg" }
    ];




    const tas = document.getElementById("carte-tas");


    const Son1 = new Audio('assets/sounds/match.mp3');
    const Son2 = new Audio('assets/sounds/pass.mp3');


    let actuelle = 0;


    function creercarte(profile) {
      const carte = document.createElement("div");
      carte.className = "carte";
      carte.innerHTML = `
        <img src="${profile.img}" alt="${profile.nom}">
        <h3>${profile.nom}, ${profile.age}</h3>
        <p>${profile.desc}</p>
      `;
      carte.dataset.nom = profile.nom;
      return carte;
    }


    async function handleMatch(nom) {
      const reponse = await fetch("/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "Moi", liked: nom })
      });
      const result = await reponse.json();
      if (result.match) {
        showNotification();
      }
    }


    function showNotification() {
      const notif = document.getElementById("notification");
      notif.style.display = "block";
      setTimeout(() => {
        notif.style.display = "none";
      }, 5000);
    }


    function showEndMessage() {
      const message = document.createElement("div");
      message.className = "end-message";
      message.textContent = "ðŸŽ‰ Tous les profils ont Ã©tÃ© vus !";
      tas.innerHTML = "";
      tas.appendChild(message);
    }


    function montrerSuivant(direction = null) {
      const cartes = document.querySelectorAll(".carte");
      if (cartes.length > 0) {
        const actuellecarte = cartes[cartes.length - 1];
        const nom = actuellecarte.dataset.nom;


        if (direction === "right") {
          actuellecarte.style.transform = "translateX(150%) rotate(15deg)";
          Son1.play()
          handleMatch(nom);
        } else if (direction === "left") {
          actuellecarte.style.transform = "translateX(-150%) rotate(-15deg)";
          Son2.play()
        }


        actuellecarte.style.opacity = 0;


        setTimeout(() => {
          actuellecarte.remove();
        }, 600);
      }


      if (actuelle < profils.length) {
        const cartesuivante = creercarte(profils[actuelle++]);
        cartesuivante.style.transform = "translateY(0px)";
        tas.prepend(cartesuivante);
        setTimeout(() => {
          cartesuivante.style.transform = "translateY(0px)";
        }, 50);
      } else if (document.querySelectorAll(".carte").length === 1) {
        setTimeout(showEndMessage, 700);
      }
    }


    document.getElementById("match").addEventListener("click", () => {
      montrerSuivant("right");
    });


    document.getElementById("pass").addEventListener("click", () => {
      montrerSuivant("left");
    });


    // Initialiser les 3 premiÃ¨res cartes
    for (let i = 0; i < 3; i++) {
      if (actuelle < profils.length) {
        const carte = creercarte(profils[actuelle++]);
        tas.prepend(carte);
      }
    }
