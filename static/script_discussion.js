document.getElementById("submitBtn").addEventListener("click", () => {
  const password = document.getElementById("passwordInput").value;

  // Envoi la requête POST au backend Python
  fetch("/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("response").textContent = data.result;
    })
    .catch(() => {
      document.getElementById("response").textContent = "Erreur serveur.";
    });
});
const pdp = document.getElementById("pdp");
