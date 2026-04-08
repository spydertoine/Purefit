// --- PARTIE 1 : MENU BURGER (Garde ce que tu as déjà) ---
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- PARTIE 2 : CALCULATEUR (À ajouter ici) ---
    const calcForm = document.getElementById('calorie-form');

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Récupération des valeurs
            const gender = document.getElementById('gender').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const age = parseInt(document.getElementById('age').value);
            const activity = parseFloat(document.getElementById('activity').value);

            // 2. Calcul du Métabolisme de Base (Formule Mifflin-St Jeor)
            let bmr;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            // 3. Calcul du maintien calorique
            const maintien = Math.round(bmr * activity);

            // 4. Calcul des Macros (Prot: 2g/kg | Lip: 1g/kg | Glu: Reste)
            const prot = Math.round(weight * 2);
            const lip = Math.round(weight * 1);
            const calProtLip = (prot * 4) + (lip * 9);
            const glu = Math.round((maintien - calProtLip) / 4);

            // 5. Affichage des Calories dans les cases HTML
            document.getElementById('res-maintien').innerText = maintien;
            document.getElementById('res-loss').innerText = maintien - 400;
            document.getElementById('res-gain').innerText = maintien + 300;

            // 6. Affichage des Macros dans les cases HTML
            document.getElementById('res-prot').innerText = prot;
            document.getElementById('res-lip').innerText = lip;
            document.getElementById('res-glu').innerText = glu;

            // 7. Afficher la zone de résultats
            document.getElementById('results').style.display = 'block';

            // Petit scroll automatique fluide vers les résultats
            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
/**
 * SYSTÈME DE MODALE POUR EXERCICES
 */

function openModal(imgSrc, title, desc) {
    const modal = document.getElementById("exerciseModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");

    // On injecte les infos dans la modale
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;

    // On affiche la modale
    modal.style.display = "block";

    // Bloquer le scroll du corps de page
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("exerciseModal");
    modal.style.display = "none";

    // Réactiver le scroll du corps de page
    document.body.style.overflow = "auto";
}

// Fermeture au clic sur la croix ou à l'extérieur de la modale
window.onclick = function (event) {
    const modal = document.getElementById("exerciseModal");
    // On vérifie si on clique sur le fond (modal) OU sur la croix (close-modal)
    if (event.target == modal || event.target.classList.contains('close-modal')) {
        closeModal();
    }
}

// Bonus : Fermeture avec la touche "Echap"
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
