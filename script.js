// 1. Importar los módulos de Firebase (desde CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. LA CONFIGURACIÓN DE TU APP (Pega aquí lo que copiaste de Firebase)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-id",
    appId: "tu-app-id"
};

// 3. Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Lógica para guardar la calificación
const form = document.getElementById('ratingForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const vet = document.getElementById('veterinario').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const comment = document.getElementById('comentario').value;

    try {
        // Guardar en la colección "calificaciones"
        await addDoc(collection(db, "calificaciones"), {
            veterinario: vet,
            estrellas: parseInt(rating),
            comentario: comment,
            fecha: new Date().toLocaleString()
        });

        // Feedback visual
        form.style.display = 'none';
        document.getElementById('mensajeExito').style.display = 'block';
        document.getElementById('mensajeExito').innerText = "¡Gracias! Tu opinión ha sido guardada.";

    } catch (error) {
        console.error("Error al guardar: ", error);
        alert("Hubo un error al enviar tu calificación. Inténtalo de nuevo.");
    }
});