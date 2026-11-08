const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.querySelector(".visually-hidden").textContent = isExpanded ? "Ouvrir le menu" : "Fermer le menu";
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".visually-hidden").textContent = "Ouvrir le menu";
    navigation.classList.remove("is-open");
  }
});

const audioPlayer = document.querySelector("#audio-player");
const currentTrack = document.querySelector("#current-track");
const trackStatus = document.querySelector("#track-status");
const trackButtons = document.querySelectorAll(".track-button");

trackButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const source = button.dataset.src;
    const title = button.dataset.title;

    if (!source || !title) {
      trackStatus.textContent = "Ce morceau n'est pas disponible.";
      return;
    }

    if (audioPlayer.src !== new URL(source, document.baseURI).href) {
      audioPlayer.src = source;
    }

    currentTrack.textContent = title;
    trackButtons.forEach((trackButton) => {
      const isActive = trackButton === button;
      trackButton.classList.toggle("is-active", isActive);
      trackButton.setAttribute("aria-pressed", String(isActive));
    });

    try {
      await audioPlayer.play();
      trackStatus.textContent = "";
    } catch (error) {
      trackStatus.textContent = "Lecture impossible. Vérifie que le fichier audio est bien présent.";
    }
  });
});

audioPlayer.addEventListener("error", () => {
  trackStatus.textContent = "Fichier audio introuvable. Ajoute le morceau correspondant dans le dossier audio/.";
});
