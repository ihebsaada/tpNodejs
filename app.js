const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());




// Tableau de voitures
let voitures = [
    { id: 1, name: "Clio" },
    { id: 2, name: "Megane" },
    { id: 3, name: "range" },
];

// endpoint pou récupérer tous les voiture
app.get('/TTvoiture', (req, res) => {
  res.send(voitures)
});

// Endpoint pour ajouter une nouvelle voiture
app.post('/voitures', (req, res) => {
    const nouvelleVoiture = req.body;
    voitures.push(nouvelleVoiture);
    res.json({ message: 'Voiture ajoutée avec succès', nouvelleVoiture });
});
// Endpoint pour récupérer une voiture par son ID
app.get('/voitures/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const voiture = voitures.find(v => v.id === voitureId);
    if (voiture) {
        res.json(voiture);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

// Endpoint pour modifier une voiture par son ID
app.put('/voitures/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === voitureId);
    if (index !== -1) {
        voitures[index] = { ...voitures[index], ...req.body };
        res.json({ message: "Voiture modifiée avec succès", voiture: voitures[index] });
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});







// Endpoint pour supprimer une voiture par son ID
app.delete('/voitures/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === voitureId);
    if (index !== -1) {
        const voitureSupprimee = voitures.splice(index, 1);
        res.json({ message: "Voiture supprimée avec succès", voiture: voitureSupprimee });
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});