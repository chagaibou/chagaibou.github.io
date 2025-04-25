// Initialisation d'EmailJS
async function fetchEnvVars() {
  const response = await fetch("/.netlify/functions/get-env-vars");
  const data = await response.json();
  console.log(data.myApiKey); // Accédez à vos variables ici
}

fetchEnvVars();

(function () {
  emailjs.init({
    publicKey: process.env.publicKey,
  });
})();

// Fonction d'envoi d'email
function sendEmail(event) {
  event.preventDefault();

  emailjs
    .send(process.env.serviceID, process.env.templateID, {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    })
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Votre message a été envoyé avec succès!");
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    );
}

// Si vous utilisez ce code dans un module, vous devrez peut-être exposer la fonction
// à la portée globale si elle est appelée depuis HTML
window.sendEmail = sendEmail;
