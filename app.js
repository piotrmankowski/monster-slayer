new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.addFightLog(true, 'Player hits Monster for ', damage)
       if (this.checkWin()){
         return;
       }
       this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.addFightLog(true, 'Player hits Mosnter with special attack for ', damage);
       if (this.checkWin()){
         return;
       }

       this.monsterAttacks();
    },
    monsterAttacks: function(){
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.addFightLog(false, 'Monster hits Player for ', damage);
      this.checkWin();
    },
    heal: function() {
      if(this.playerHealth <= 90)
      {
        this.playerHealth += 10;
      }else {
        this.playerHealth = 100;
      }
      this.addFightLog(true, 'Player heals for ', 10);
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        this.endGame('You win! New Game?');
        return true;
      } else if (this.playerHealth <= 0){
        this.endGame('You Lose! New Game?');
        return true;
      }
      return false;
    },
    endGame: function(message) {
      if (confirm(message)) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    },
    addFightLog: function(isPlayer, message, damage) {
      this.turns.unshift({
        isPlayer: isPlayer,
        text: message + damage
      });
    }
  }
});
