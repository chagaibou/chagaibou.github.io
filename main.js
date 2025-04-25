// Initialisation d'EmailJS
let emailjsInitialized = false;

async function fetchEnvVars() {
  try {
    const response = await fetch("/.netlify/functions/get-env-vars");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching env vars:", error);
    throw error;
  }
}

async function initializeEmailJS() {
  try {
    const envVars = await fetchEnvVars();
    emailjs.init({
      publicKey: envVars.publicKey,
    });
    emailjsInitialized = true;
    return envVars;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    throw error;
  }
}

// Fonction d'envoi d'email
async function sendEmail(event) {
  event.preventDefault();

  try {
    if (!emailjsInitialized) {
      const envVars = await initializeEmailJS();
    }

    const envVars = await fetchEnvVars();

    await emailjs.send(envVars.serviceID, envVars.templateID, {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    });

    console.log("SUCCESS!");
    alert("Votre message a été envoyé avec succès!");
  } catch (error) {
    console.log("FAILED...", error);
    alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
  }
}

// Initialisation au chargement de la page
initializeEmailJS().catch((error) => {
  console.error("Initialization error:", error);
});

// Exposition de la fonction à la portée globale
window.sendEmail = sendEmail;
