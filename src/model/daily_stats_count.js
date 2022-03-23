const Item = require('./item.js');
const Field = require('../field');

class DailyStatsCount extends Item {

    constructor() {
        this.uve = new Field({
            name: "UVEs",
            description: "Cantidad de cervezas consumindas. Un combinado vale por dos.",
            type: "numeric",
            min: 0,
        });
        this.smoke = new Field({
            name: "Smoke",
            description: "Cantidad de cigarrillos fumados.",
            type: "numeric",
            min: 0,
        });
        this.sex = new Field({
            name: "Sex",
            description: "Cantidad de veces que se ha practicado el acto sexual.",
            type: "numeric",
            min: 0,
        });
        this.masturbation = new Field({
            name: "Masturbation",
            type: "numeric",
            min: 0,
        });
        this.shit = new Field({
            name: "Shit",
            type: "numeric",
            min: 0,
        });
        this.projects_min = new Field({
            name: "Projects min",
            type: "numeric",
            min: 0,
        });
        this.mental_gym_min = new Field({
            name: "Mental gym min",
            type: "numeric",
            min: 0,
        });
        this.money_expenses = new Field({
            name: "Money expenses",
            type: "numeric",
            min: 0,
        });
        this.walk_min = new Field({
            name: "Walk min",
            type: "numeric",
            min: 0,
        });
        this.exercice_min = new Field({
            name: "Exercice min",
            type: "numeric",
            min: 0,
        });
    }
}

module.exports = DailyStatsCount;