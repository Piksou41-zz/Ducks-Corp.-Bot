const { ActivityType } = require("discord.js");
const activities = [
    "Salut !", 
    "Le temps c'est de l'argent", 
    "Obtenir la liste des commandes : /help", 
    "Un bug ? Mp Picsou#7080 !", 
    "Une suggestion ? /suggestion <votre suggestion> !"
];

module.exports = client => {
    console.log("Connecté !");

    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: ActivityType.Playing }), 7000);
};