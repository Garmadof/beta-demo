//global var
var chances = [];
var taken = false;
var hit = false;
var level = {
    card: document.getElementById('level'),
    cardsAmount: []
};
var dmg = {
    card: document.getElementById('damage'),
    cardsAmount: []
}
var minus = {
    slot: document.getElementById('minus'),
    amount: [],
    choosen: false
};
var plus = {
    slot: document.getElementById('plus'),
    amount: [],
    choosen: false
};
var prmpts = {
    prompts: document.getElementById('prompts'),
    texts: document.getElementById('promptText'),
    input: document.getElementById('pInput'),
    sendBtn: document.getElementById('sendRes')
}
var prmpts1 = {
    prompts: document.getElementById('prompts1'),
    texts: document.getElementById('promptText1'),
    input: document.getElementById('pInput1'),
    sendBtn: document.getElementById('sendRes1')
}
//character var 
var hero = {
    hp: 100,
    maxHp: 100,
    baseWeapon: 'none',
    level: 2,
    skill: 'none',
    status: [],
    damage: 0,
    equipment1: '',
    equipment2: ''
};
var equip = document.getElementById('st');
var equip2 = document.getElementById('nd');
var empty1 = true;
var empty2 = true;
var full = false;
var twohanded = false;
var hand;
var firstWeapon = true;

//weapons var
var weapon1 = document.getElementById('weap_lvl1');
var weapon2 = document.getElementById('weap_lvl2');
var weapon3 = document.getElementById('weap_lvl3');
var slot1;
var slot2;
var slot3;

//monsters var
var wave = document.getElementById('wave');
var container = document.getElementById('monster');
var enemy1 = {
    baseHp: '',
    status: [],
    died: false,
    obj: {},
    field: '',
    menu: ''
};
var enemy2 = {
    baseHp: '',
    status: [],
    died: false,
    obj: {},
    field: '',
    menu: ''
};
var enemy3 = {
    baseHp: '',
    status: [],
    died: false,
    obj: {},
    field: '',
    menu: ''
};
var number;
var numberMonst;

//objects
//battle
var battlefield= {
    field: document.getElementById('battle'),
    maxMonsters: 3,
    maxWeapons: 3,
    character: 1,
    boss: 1,
    waves: 10,
    waveNow: 0,
    moves: 0
};        

//weapons
var weapons = [ [ claws = new Weapon("Claws", "claws", "onehanded", 10, "none", 1),
                rustyStick = new Weapon("Rusty stick", "rustyStick", "twohanded", 20, "none", 1),
                swordPart = new Weapon("Sword part", "swordPart", "onehanded", 20, "none", 1)],
        
                //2* weapon
                [sword = new Weapon("Sword", "sword", "onehanded", 25, "none", 4),
                bow = new Weapon("Bow", "bow", "onehanded", 35, "none", 4),
                twohandedSword = new Weapon("Twohanded sword", "twohandedSword", "twohanded",  40, "none", 4),
                fiveToothedSpear = new Weapon("5-toothed spear", "fiveToothedSpear", "twohanded", 40, "none", 4) ],
        
                //3* weapon
                [axe = new Weapon("Axe", "axe", "twohanded", 40, "none", 11),
                mace = new Weapon("Mace", "mace", "onehanded", 30, "none", 11),
                sacredCatana = new Weapon("Sacred katana", "sacredKatana", "onehanded", 40, 'splash/2', 11) ],
                
                //4* weapon
                [ swordOfEarth = new Weapon("Sword of earth",  "swordOfEarth", "onehanded", 50, 'splash(30)', 15),
                chainFangs = new Weapon("Chain fangs", "chainFangs", "onehanded", 50, "mass(2)", 15),
                darkScimitar = new Weapon("Dark scimitar", "darkScimitar", "onehanded", 40,"splash", 15) ],

                //5* weapon
                [ goddnessBlade = new Weapon("Goddness blade", "goddnessBlade", "twohanded", 70, 'splash+vamp10%', 20),
                odinsSpear = new Weapon("Odins spear", "odinsSpear", "twohanded", 40, "splash+contratt", 20),
                cleavingSky = new Weapon("Cleaving sky", "cleawingSky", "twohanded", 80, "splash x2", 20),
                heroSword = new Weapon("Hero's sword", "heroSword", "onehanded", 60, "coil", 20) 
              ] ];            
//monsters 
var monsters = [ [ slime = new Monster("Slime", "slime", 15, 1, "none", "none"), 
                cobold = new Monster("Cobold", "cobold", 15, 2, "stun - " + chances[15] + "%", "none"),
                gnoll = new Monster("Gnoll", "gnoll", 15, 2, "none", "none"),
                wolfDemon = new Monster("Wolf-Demon", "wolfDemon", 10, 3, "Crit chance - " + chances[10] + "%", "none"),
                troll = new Monster("Troll", "troll", 10, 2,"contrattack - " + chances[10] + "%", "none"),
                rat = new Monster('Rat', 'rat', 5, 2, 'none', 'none') ],
                
                [rascal = new Monster("Rascal", "rascal", 25, 3, "none", "none"),
                desertire = new Monster("Desertire", "desertire", 30, 2, "stun - " + chances[17] + "%",  "none"),
                demonNewbie = new Monster("Demon newbie", "demonNewbie", 20, 3, "none", "none"),
                goblin = new Monster("Goblin", "goblin", 25, 2, "paralasys - " + chances[20] + "%", "none"),
                bear = new Monster("Bear", "bear", 30, 1, "stun - " + chances[25] + "%", 'none'),
                wolf = new Monster('Wolf', 'wolf', 20, 5, 'Crit chance - ' + chances[15] + '%', 'none') ],
                
                [trollWarlord = new Monster("Troll warlord", "trollWarlord", 40, 5, "contrattack - " + chances[17] + "%", "none"),
                demon = new Monster("Demon", "demon", 35, 3, "burn", "none"),
                wolfLeader = new Monster("Wolf Leader", "wolfLeader", 30, 4, "Crit chance - " + chances[25] + "%", 'none'),
                orc = new Monster("Orc", "orc", 35, 4, "none", "none"),
                magicSlime = new Monster("Magic slime", "magicSlime", 20, 4, "absorb damage - " + chances[10] + "%", "none") ],
                
                [darkKnight = new Monster("Dark knight", "darkKnight", 45, 5, "Strengthen: +2 to damage", "none"),
                rascalsLeader = new Monster("Rascals leader", "rascalsLeader", 50, 4, "stun - " + chances[20] + "%", 'none'),
                wolfRider = new Monster("Wolf rider", "wolfRider", 40, 4, "Crit chance - " + chances[30] + "%", "Bleeding: -10% of your hp during 2 moves"), ],
                
                [demonGeneral = new Monster("Demon general", "demonGeneral", 55, 5, "burn - 3 moves with 2 dmg each", "x2 dmg on burned") ],
                
                [orcLeader = new Monster("Orc Leader", "orcLeader", 65, 6, "Crit chance - " + chances[40] + "%", "Lightning strike") 
               ] ];
    
//constructor 
function Weapon(name, id, type, damage, specialAbility, minLevel) {
    this.name = name;
    this.id = id;
    this.type = type;
    this.damage = damage;
    this.specialAbility = specialAbility;
    this.minLevel = minLevel;
}

function Monster(name, id, hp, dmg, specialAbility1, specialAbility2) {
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.dmg = dmg;
    this.specialAbility1 = specialAbility1;
    this.specialAbility2 = specialAbility2; 
}

//alerts 
function alerts(text) {
    var alert = document.getElementById('no');
    var head = document.getElementById('head');
    head.innerHTML = text;
    var ok = document.getElementById('okBtn');
    alert.style.display = 'block';
    ok.onclick = function () {
        alert.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === alert) {
          alert.style.display = 'none';
        };
    };   
    return false; 
}

//confirms
function confirms(text, yes, no, onYes, onNo) {
    var modal = document.getElementById('change');
    var texts = document.getElementById('text');
    texts.innerText = text;
    var yesBtn = document.getElementById('yesBtn');
    yesBtn.innerText = yes;
    var noBtn = document.getElementById('noBtn');
    noBtn.innerHTML = no;
    modal.style.display = 'block';
        
    yesBtn.onclick = () => {
        modal.style.display = 'none';
        onYes();
    }
    noBtn.onclick = () => {
        modal.style.display = 'none';
        onNo();
    }

    window.onclick = function(event) {   
        if (event.target === modal) {
            modal.style.display = 'none';
        }   
        return false;
    }
}

//prompts 

//random weapon_id generator
function random_weap (weap, num) {
    var rnd = Math.floor(Math.random() * 100 + 1);
    var weapon;

    if (rnd >= 90) {
        weapon = weapons[Math.floor(Math.random() * 5)];
        var l = weapon.length;
        weapon = weapon[Math.floor(Math.random() * l)];
        if (num === 1) {
            slot1 = weapon;
        } 
        else if (num === 2) {
            slot2 = weapon;
        } else {
            slot3 = weapon;
        }
    }
    else if (rnd >= 70 && rnd < 90 ) {
        weapon = weapons[Math.floor(Math.random() * 4)];
        var l = weapon.length;
        weapon = weapon[Math.floor(Math.random() * l)];
        if (num === 1) {
            slot1 = weapon;
        } 
        else if (num === 2) {
            slot2 = weapon;
        } else {
            slot3 = weapon;
        }
    }
    else {
        weapon = weapons[Math.floor(Math.random() * 3)];
        var l = weapon.length;
        weapon = weapon[Math.floor(Math.random() * l)]; 
        
        if (num === 1) {
            slot1 = weapon;
        } 
        else if (num === 2) {
            slot2 = weapon;
        } else {
            slot3 = weapon;
        }
        
    }

    weap.className -= " ";
    
    if (weap.classList.contains(NaN)) {
        weap.classList.toggle(NaN);
        weap.className += "menu"
    }
    
    weap.className +=" " + weapon.id;
    weapon = " ";
    return weapon;
}

//endTurn
function endTurn() {
    taken = false;
    hit = false;
    monstHit();
    newCards();
    weapon1.innerHTML = random_weap(weapon1, 1);
    weapon2.innerHTML = random_weap(weapon2, 2);
    weapon3.innerHTML = random_weap(weapon3, 3);
}
//endRound
function endRound () {
    battlefield.waveNow ++;
    if (battlefield.waveNow > battlefield.waves) {
        alert ("You completed beta-demo in " + battlefield.moves + " moves!");
        location.reload();
    }
    if (number === 1) {
        enemy1.died = false;
        
    } 
    else if (number === 2) {
        enemy1.died = false;
        enemy2.died = false;
        battlefield.field.classList.toggle("battlefield-2");
        battlefield.field.classList.add("battlefield");
    } else {;
        
        enemy1.died = false;
        enemy2.died = false;
        enemy3.died = false;
        battlefield.field.classList.toggle("battlefield-3");
        battlefield.field.classList.add("battlefield");
    };
    wave.innerHTML = "Waves: " + battlefield.waveNow + "/" + battlefield.waves;
    weapon1.innerHTML = random_weap(weapon1, 1);
    weapon2.innerHTML = random_weap(weapon2, 2);
    weapon3.innerHTML = random_weap(weapon3, 3);
    taken = false;
    prmpts.prompts.style.display = 'none';
    hit = false;
    newCards();
    creating();
}
function killMonst(monst) {
    if (monst.died) {
        monst.menu.remove();
        monst.field.remove();
        numberMonst--;
    }
}
function checkField () {
    if (numberMonst <= 0) {        
        endRound();
    }
}

//create info about weapon
var t = function(eventObj) {
        //get event object setting
        var char = eventObj.target;
        if (char.id === "weap_lvl1") {
            var clas = 1;
            var inf = "info1";
            var stat = slot1;
        } 
        else if (char.id === "weap_lvl2") {
            var clas = 2;
            var inf = "info2";
            var stat = slot2;
        } else {
            var clas = 3;
            var inf = "info3";
            var stat = slot3;
        };
        //check on crated elements
        var check = document. getElementById(inf);
        if (check == null) {
            check = 0;
        } else {
            return false;
        };
        var cont = document.getElementById("slot" + clas);
        info = document.createElement("div");
        info.className = inf;
        info.id = inf;
        info.innerHTML = "Weapon: " + stat.name + ";" + "<br>" + "Type: " + stat.type + ";" + "<br>" + "Damage: " + stat.damage + ";" + "<br>" + "Ability: " + stat.specialAbility + ";";
        cont.append(info);
}

function equipmentInfo (eventObj) {
    var char = eventObj.target;
    if (char.id === "st") {
        if (empty1) {
            return false;
        } else {
            info = document.createElement("div");
            info.className = "equip";
            info.id = "equip";
            info.innerHTML = "Weapon: " + hero.equipment1.name + ";" + "<br>" + "Type: " + hero.equipment1.type + ";" + "<br>" + "Damage: " + hero.equipment1.damage + ";" + "<br>" + "Ability: " + hero.equipment1.specialAbility + ";";
            char.appendChild(info); 
        }; 
    } else {
        if (empty2) { 
            return false;
        } else {
            info = document.createElement("div");    
            info.className = "equip2";
            info.id = "equip2";
            info.innerHTML = "Weapon: " + hero.equipment2.name + ";" + "<br>" + "Type: " + hero.equipment2.type + ";" + "<br>" + "Damage: " + hero.equipment2.damage + ";" + "<br>" + "Ability: " + hero.equipment2.specialAbility + ";";
            char.appendChild(info); 
        };
    };
      
}

function removeInfo (eventObj) {
    var char = eventObj.target;
    if (char.id === "weap_lvl1") {
        var inf = "info1";
    } 
    else if (char.id === "weap_lvl2") {
          var inf = "info2";
    } else {   
        var inf = "info3";
    };
    var elem = document.getElementById(inf);
    elem.remove();
}

function removeEquipInfo (eventObj) {
    var char = eventObj.target;
    if (char.id === "st") {
        var inf = "equip";
    } else {
        var inf = "equip2";
    };
    var elem = document.getElementById(inf);
    if (elem === null) {
        return false;
    }
    elem.remove();
}

//creating monster and weapons
function creating () {
    number = Math.floor(Math.random() * 3) + 1;
    numberMonst = number;

    if (number === 1) {
        var monster = monsters[Math.floor(Math.random() * 5)];
        enemy1.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy1.baseHp = enemy1.obj.hp;
    
        enemy1.menu = document.createElement('div');
        enemy1.menu.className = 'col' + ' menuMonst';
        enemy1.menu.id ='monster_1';
        container.append(enemy1.menu);
        document.getElementById(enemy1.menu.id).innerHTML = enemy1.obj.name;    
        enemy1.field = document.createElement("div");
        enemy1.field.className = "monster";
        battlefield.field.append(enemy1.field);   
        enemy1.field.innerHTML = enemy1.obj.name;

    } else if (number === 2) {
       
        var monster = monsters[Math.floor(Math.random() * 5)];
        enemy1.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy1.baseHp = enemy1.obj.hp;
      
        monster = monsters[Math.floor(Math.random() * 5)];
        enemy2.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy2.baseHp = enemy2.obj.hp;
        battlefield.field.className += '-2';
       
        enemy1.menu = document.createElement('div');
        enemy1.menu.className = 'col' + ' g-0' + ' menuMonst';
        enemy1.menu.id = 'monster_1';
        container.append(enemy1.menu);
        document.getElementById(enemy1.menu.id).innerHTML = enemy1.obj.name;    
        enemy1.field = document.createElement('div');
        enemy1.field.className = 'monster';
        battlefield.field.append(enemy1.field);   
        enemy1.field.innerHTML = enemy1.obj.name;
        
        enemy2.menu = document.createElement('div');
        enemy2.menu.className = 'col' + ' g-0' + ' menuMonst';
        enemy2.menu.id = 'monster_2';
        container.append(enemy2.menu);
        document.getElementById(enemy2.menu.id).innerHTML = enemy2.obj.name;
        enemy2.field = document.createElement('div');
        enemy2.field.className = 'monster';
        battlefield.field.append(enemy2.field);   
        enemy2.field.innerHTML = enemy2.obj.name;

    } else {
        
        var monster = monsters[Math.floor(Math.random() * 5)];
        enemy1.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy1.baseHp = enemy1.obj.hp;
      
        monster = monsters[Math.floor(Math.random() * 5)];
        enemy2.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy2.baseHp = enemy2.obj.hp;
      
        monster = monsters[Math.floor(Math.random() * 5)];
        enemy3.obj = monster[Math.floor(Math.random() * monster.length)];
        enemy3.baseHp = enemy3.obj.hp;
        battlefield.field.className += "-3";
      
        enemy1.menu = document.createElement('div');
        enemy1.menu.className = 'col' + ' g-0' + ' menuMonst';
        enemy1.menu.id = 'monster_1';
        container.append(enemy1.menu);
        document.getElementById(enemy1.menu.id).innerHTML = enemy1.obj.name;    
        enemy1.field = document.createElement('div');
        enemy1.field.className = 'monster';
        battlefield.field.append(enemy1.field);   
        enemy1.field.innerHTML = enemy1.obj.name;

        enemy2.menu = document.createElement('div');
        enemy2.menu.className = 'col' + ' g-0' + ' menuMonst';
        enemy2.menu.id = 'monster_2';
        container.append(enemy2.menu);
        document.getElementById(enemy2.menu.id).innerHTML = enemy2.obj.name;
        enemy2.field = document.createElement('div');
        enemy2.field.className = 'monster';
        battlefield.field.append(enemy2.field);   
        enemy2.field.innerHTML = enemy2.obj.name;
        
        enemy3.menu = document.createElement('div');
        enemy3.menu.className = 'col' + ' g-0' + ' menuMonst';
        enemy3.menu.id = 'monster_3';
        container.append(enemy3.menu);
        document.getElementById(enemy3.menu.id).innerHTML = enemy3.obj.name;
        enemy3.field = document.createElement('div');
        enemy3.field.className = 'monster';
        battlefield.field.append(enemy3.field);   
        enemy3.field.innerHTML = enemy3.obj.name;

    } 

    weapon1.innerHTML = random_weap(weapon1, 1);
    weapon2.innerHTML = random_weap(weapon2, 2);
    weapon3.innerHTML = random_weap(weapon3, 3);
    weaponHit();

}

//hit
function weaponHit () {
    enemy1.field.onclick = function() {
        if (hit) {
            alerts('You already hit monster in this turn!');
            return false;
        } else {
            checkHit(enemy1);
        } 
    };
    enemy2.field.onclick = function() {
        if (hit) {
            alerts('You already hit monster in this turn!');
            return false;
        } else {
            checkHit(enemy2);
        }
    }
    enemy3.field.onclick = function() {
        if (hit) {
            alerts('You already hit monster in this turn!');
            return false;
        } else {
            checkHit(enemy3);
        }
    }
}
//weapon abilities
//fin
function splash2 (weap) {

    if (number === 1) {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage/2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }    
    } else if (number === 2) {

        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage/2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage/2;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

    } else {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage/2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage/2;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

        if (!enemy3.died) {

            enemy3.baseHp -= weap.damage/2;

            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }
    }
    hit = true; 
    battlefield.moves ++;  
    checkField();
}

//fin
function splashX2(weap) {

    if (number === 1) {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage * 2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }  
    } else if (number === 2) {

        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage * 2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage * 2;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

    } else {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage * 2;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage * 2;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

        if (!enemy3.died) {

            enemy3.baseHp -= weap.damage * 2;

            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }
    }
    hit = true; 
    battlefield.moves ++;  
    checkField();       

}

//fin
function splash(weap) {

    if (number === 1) {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }  
    } else if (number === 2) {

        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

    } else {
        if (!enemy1.died) {

            enemy1.baseHp -= weap.damage;            
    
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
        if (!enemy2.died) {

            enemy2.baseHp -= weap.damage;

            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

        if (!enemy3.died) {

            enemy3.baseHp -= weap.damage;

            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }
    }
    hit = true; 
    battlefield.moves ++;  
    checkField();       

}

//fin
function splashFix(damage) {
   
    if (number === 1){
    
        if (!enemy1.died) {

            enemy1.baseHp = enemy1.baseHp - damage;            
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    
    } else if (number === 2) {
    
        if (!enemy1.died) {

            enemy1.baseHp = enemy1.baseHp - damage;
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
        
        if (!enemy2.died) {

            enemy2.baseHp = enemy2.baseHp - damage;
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }
    
    } else {
    
        if (!enemy1.died) {

            enemy1.baseHp = enemy1.baseHp - damage;
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
        
        if (!enemy2.died) {

            enemy2.baseHp = enemy2.baseHp - damage;
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

        if (!enemy3.died) {
          
            enemy3.baseHp = enemy3.baseHp - damage;
            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }
    
    }

    hit = true;
    battlefield.moves ++;
    checkField();
}

function mass1(monst) {

    if (numberMonst === 1){
        if (!monst.died) {
            monst.baseHp -= 2 * hero.damage;            
            if (monst.baseHp <= 0) {
                monst.died = true;
                killMonst(monst);
            }
        }
        hit = true;
        checkField();
    } 
    else if (numberMonst === 2) {
        if (number === 3) {
            
            if (!enemy1.died) {
                enemy1.baseHp -= hero.damage;            
                if (enemy1.baseHp <= 0) {
                    enemy1.died = true;
                    killMonst(enemy1);
                }
            }

            if (!enemy2.died) {
                enemy2.baseHp -= hero.damage;            
                if (enemy2.baseHp <= 0) {
                    enemy2.died = true;
                    killMonst(enemy2);
                }
            }

            if (!enemy3.died) {
                enemy3.baseHp -= hero.damage;            
                if (enemy3.baseHp <= 0) {
                    enemy3.died = true;
                    killMonst(enemy3);
                }
            
            }
        } else {

            if (!enemy1.died) {
                enemy1.baseHp -= hero.damage;            
                if (enemy1.baseHp <= 0) {
                    enemy1.died = true;
                    killMonst(enemy1);
                }
            }
            
            if (!enemy2.died) {
                enemy2.baseHp -= hero.damage;            
                if (enemy2.baseHp <= 0) {
                    enemy2.died = true;
                    killMonst(enemy2);
                }
            }

        }
        hit = true;
        checkField();

    } else {
        prmpts.prompts.style.display = 'block';
        prmpts.prompts.style.zIndex = '998';
        
        prmpts.texts.innerText = 'Choose first monster.';
        
        prmpts.input.value = "";

        var btn = prmpts.sendBtn;
        btn.innerText = 'Ok';
        btn.addEventListener("click", function(event) {
            
            var monst1 = prmpts.input.value;
            prmpts.prompts.style.display = 'none';
            if (monst1 < 1 || monst1 > 3) {
                alerts('Enter correct number(1-3)!');
                return;
            } else if (monst1 == 1) {
                if (enemy1.died) {
                    alerts('This monster already dead, choose another.');
                    return;
                } 
            } else if(monst == undefined) {
                alerts('Enter correct number (1-3)!');
                return;
            } else if (monst1 == 2) {
                if (enemy2.died) {
                    alerts('This monster already dead, choose another.');
                    return;
                } 
            } else if (monst1 == 3) {
                if (enemy3.died) {
                    alerts('This monster already dead, choose another.');
                    return;
                }  
            }
           mass2(monst1, 3);
        }); 
    }
}

function mass2(monst1, max) {
    prmpts1.prompts.style.display = 'block';
    prmpts1.prompts.style.zIndex = '999';
    
    prmpts1.texts.innerText = 'Choose second monster.';
    
    prmpts1.input.value = "";
    
    var btn = prmpts1.sendBtn;
    btn.innerText = 'Ok';
    btn.addEventListener ('click', function(event) {
        
        var monst2 = prmpts1.input.value;
        
        prmpts1.prompts.style.display = 'none';
        if (numberMonst < 2) {
            massHit(monst1);
        }
        if (monst2 < 1 || monst2 > max) {
            alerts('Enter correct number(1-' + max + ')!');
            return;
        } else if(monst2 == undefined) {
            alerts('Enter correct number (1-3)!');
            return;
        } else if (monst2 == monst1) {
            alerts('You already choose this monster, select another.');
            mass2(monst1, max);
            return;
        } else if (monst2 == 1) {
            if (enemy1.died) {
                alerts('This monster already dead, choose another.');
                mass2(monst1, max);
                return;
            }
        } else if (monst2 == 2) {
            if (enemy2.died) {
                alerts('This monster already dead, choose another.');
                mass2(monst1, max);
                return;
            } 
        } else if (monst2 == 3) {
            if (enemy3.died) {
                alerts('This monster already dead, choose another.');
                mass2(monst1, max);
                return;
            } 
        } 
        massHit(monst1, monst2);
    })}
function massHit(monst1, monst2) {
    if (monst1 == 1) {
        if (!enemy1.died) {

            enemy1.baseHp = enemy1.baseHp - hero.damage;   
                  
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1); 
            }
        } 
    } else if (monst1 == 2) {
        if (!enemy2.died) {
            
            enemy2.baseHp = enemy2.baseHp - hero.damage;         
            
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2); 
            }
        } 
    } else {
        if (!enemy3.died) {
            
            enemy3.baseHp = enemy3.baseHp - hero.damage;            
            
            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }    
    }
    if (monst2 == 1) {
        if (!enemy1.died) {
            
            enemy1.baseHp = enemy1.baseHp - hero.damage;            
            
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }    
    } else if (monst2 == 2) {
        if (!enemy2.died) {
            
            enemy2.baseHp = enemy2.baseHp - hero.damage;            
            
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            } 
        }
    } else {
        if (!enemy3.died) {
            
            enemy3.baseHp = enemy3.baseHp - hero.damage;            
            
            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        } 
    }
    hit = true;
    battlefield.moves ++;
    checkField();
}    
//fin
function coil(monst, weapon) {
    var coil = weapon.damage + 1.5 * hero.level;
    monst.baseHp = monst.baseHp - coil;
    console.log(monst.baseHp);
    if (monst.baseHp <= 0) {
        monst.died = true;
        killMonst(monst);
    }
    hit = true;
    battlefield.moves ++;
    checkField();

}
//fin
function vampSplash (weap) {
    var dmg = weap.damage;
    console.log(dmg);
    var heal = 0;

    if (number === 1){
        if (!enemy1.died) {
            enemy1.baseHp = enemy1.baseHp - weap.damage;     
            heal += dmg;       
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
    } 
    else if (number === 2) {
        if (!enemy1.died) {
            enemy1.baseHp = enemy1.baseHp - weap.damage;
            heal += dmg;
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
        
        if (!enemy2.died) {
            enemy2.baseHp = enemy2.baseHp - weap.damage;
            heal += dmg;
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }
    } else {
        if (!enemy1.died) {
            enemy1.baseHp = enemy1.baseHp - weap.damage;
            heal += dmg;
            if (enemy1.baseHp <= 0) {
                enemy1.died = true;
                killMonst(enemy1);
            }
        }
        
        if (!enemy2.died) {
            enemy2.baseHp = enemy2.baseHp - weap.damage;
            heal += dmg;
            if (enemy2.baseHp <= 0) {
                enemy2.died = true;
                killMonst(enemy2);
            }
        }

        if (!enemy3.died) {
            enemy3.baseHp = enemy3.baseHp - weap.damage;
            heal += dmg;
            if (enemy3.baseHp <= 0) {
                enemy3.died = true;
                killMonst(enemy3);
            }
        }
    }
    
    hero.hp += Math.floor(heal*0.1);
    if (hero.hp > hero.maxHp) {
        hero.hp = hero.maxHp;
    } 
    console.log(hero.hp);
    hit = true;  
    battlefield.moves ++; 
    checkField();
}

//check weapon
function checkHit (monst) {
    if (full && !twohanded) {
        checkAbil(hero.equipment1, monst, true);
    } else if (!empty1 && empty2) {;
        checkAbil(hero.equipment1, monst, false);
    } else if (!empty2 && empty1) {
        checkAbil(hero.equipment2, monst, false);
    } else if (twohanded) {
        checkAbil(hero.equipment2, monst, false);
    }
}
function checkAbil(weapon, monst, nw) {

    if (weapon.specialAbility === 'splash/2') {

        confirms ('You wanted use ' + weapon.specialAbility + ' of your ' + weapon.name + '?', 'Yes', 'No',
        () => {
            splash2(weapon);
        }, 
        () => {

            if(!nw) {
        
                monst.baseHp -= hero.damage;
            
                if (monst.baseHp <= 0) {
                    monst.died = true;
                    killMonst(monst);
                }
                
                hit = true;
                battlefield.moves ++;
                checkField();    
    
            } else {
                checkAbil(hero.equipment2, monst, false);
            }  
        });    
    } else if (weapon.specialAbility === 'splash(30)') {
        confirms ('You wanted use ' + weapon.specialAbility + ' of your ' + weapon.name + '?', 'Yes', 'No',
        () => {
            splashFix(30);
        }, 
        () => {

            if(!nw) {
        
                monst.baseHp -= hero.damage;
            
                if (monst.baseHp <= 0) {
                    monst.died = true;
                    killMonst(monst);
                }
                
                hit = true;
                battlefield.moves ++;
                checkField();    
    
            } else {
                checkAbil(hero.equipment2, monst, false);
            }     
        });
    } else if(weapon.specialAbility === 'mass(2)') {
        
        confirms ('You wanted use ' + weapon.specialAbility + ' of your ' + weapon.name + '?', 'Yes', 'No',
        () => {
            mass1(monst);
        }, 
        () => {

            if(!nw) {
        
                monst.baseHp -= hero.damage;
            
                if (monst.baseHp <= 0) {
                    monst.died = true;
                    killMonst(monst);
                }
                
                hit = true;
                battlefield.moves ++;
                checkField();    
    
            } else {
                checkAbil(hero.equipment2, monst, false);
            }   
        });

    } else if(weapon.specialAbility === 'coil') {
        coil(monst, weapon);

        if(!nw) {
        
            monst.baseHp -= hero.damage;
        
            if (monst.baseHp <= 0) {
                monst.died = true;
                killMonst(monst);
            }
            
            hit = true;
            battlefield.moves ++;
            checkField();    

        } else {
            checkAbil(hero.equipment2, monst, false);
        }  
    } else if (weapon.specialAbility === 'splash+vamp10%') {
        vampSplash(weapon);
        
        if(!nw) {
        
            monst.baseHp -= hero.damage;
        
            if (monst.baseHp <= 0) {
                monst.died = true;
                killMonst(monst);
            }
            
            hit = true;
            battlefield.moves ++;
            checkField();    

        } else {
            checkAbil(hero.equipment2, monst, false);
        }  
    } else if(weapon.specialAbility === 'splash') {
        confirms ('You wanted use ' + weapon.specialAbility + ' of your ' + weapon.name + '?', 'Yes', 'No',
        () => {
            splash(weapon);
        }, 
        () => {

            if(!nw) {
        
                monst.baseHp -= hero.damage;
            
                if (monst.baseHp <= 0) {
                    monst.died = true;
                    killMonst(monst);
                }
                
                hit = true;
                battlefield.moves ++;
                checkField();    
    
            } else {
                checkAbil(hero.equipment2, monst, false);
            }   
        });
    } else if(weapon.specialAbility === 'splash x2') {
        confirms ('You wanted use ' + weapon.specialAbility + ' of your ' + weapon.name + '?', 'Yes', 'No',
        () => {
            splashX2();
        }, 
        () => {
            
            if(!nw) {
        
                monst.baseHp -= hero.damage;
            
                if (monst.baseHp <= 0) {
                    monst.died = true;
                    killMonst(monst);
                }
                
                hit = true;
                battlefield.moves ++;
                checkField();    
    
            } else {
                checkAbil(hero.equipment2, monst, false);
            }    
        });
    }else {
        if(!nw) {
        
            monst.baseHp -= hero.damage;
        
            if (monst.baseHp <= 0) {
                monst.died = true;
                killMonst(monst);
            }
            
            hit = true;
            battlefield.moves ++;
            checkField();    

        } else {
            checkAbil(hero.equipment2, monst, false);
        }    
    }

}

//add level cards
function levelCards () {
    var lvl = Math.floor(Math.random() * 5 + 1);
    level.cardsAmount[level.cardsAmount.length] = lvl;
    level.card.style.border = "none";
    level.card.style.background = "url(source/levelCard.png) no-repeat";
    level.card.innerHTML = level.cardsAmount[level.cardsAmount.length - 1];
}

function damageCards () {
    var damage = Math.floor(Math.random() * 5 + 1);
    dmg.cardsAmount[dmg.cardsAmount.length] = damage;
    dmg.card.style.border = "none";
    dmg.card.style.background = "url(source/damageCard.png) no-repeat";
    dmg.card.innerHTML = dmg.cardsAmount[dmg.cardsAmount.length - 1];
}

function operants() {
    minus.slot.style.background = "url(source/minus.png) no-repeat";
    minus.amount[minus.amount.length] = 0;
    plus.slot.style.background = "url(source/plus.png) no-repeat";
    plus.amount[plus.amount.length] = 1;
}

function newCards () {
    levelCards();
    damageCards();
    operants();
}

//add level or damage 
function selectOperant() {
    minus.slot.onclick = function() {
        if (plus.choosen) {
            return false;
        } else {
            if (minus.amount.length > 0) {
                minus.choosen = true;
                minus.amount.splice(this.length - 1, 1);
                if (minus.amount.length === 0) {
                    minus.slot.style.background = "none";
                };
                level.card.onclick = newLvl;
                dmg.card.onclick = newDmg;
            } else {
                alerts("You don't have enough operants!");
                return false;
            };
        }
    };
    plus.slot.onclick = function() {
        if (minus.choosen) {
            return false;
        } else {
            if (plus.amount.length > 0) {
                plus.choosen = true;
                plus.amount.splice(this.length, 1);
                if (plus.amount.length === 0) {
                    plus.slot.style.background = "none";
                };
                dmg.card.onclick = newDmg;
                level.card.onclick = newLvl;
            } else {
                alerts("You don't have enough operants!");
                return false;
            };
        }
    };
}

function newLvl () { 
    if (minus.choosen) {
        hero.level = hero.level - level.cardsAmount[level.cardsAmount.length - 1]; 
        if (hero.level <= 0) {
            hero.level = 1;
        };
        minus.choosen = false;
    }     
    else if (plus.choosen) {
        hero.level = hero.level + level.cardsAmount[level.cardsAmount.length - 1];
        plus.choosen = false;
    } else {
        return false;
    };
    level.cardsAmount.splice(level.cardsAmount.length - 1, 1);
    if (level.cardsAmount.length - 1 < 0) {
        level.card.innerHTML = " ";
    } else {
        level.card.innerHTML = level.cardsAmount[level.cardsAmount.length - 1];
    };
    heroStat() 
}

function newDmg() {
    if (minus.choosen) {
        hero.damage = hero.damage - dmg.cardsAmount[dmg.cardsAmount.length - 1]; 
        if (hero.damage < 0) {
            hero.damage = 0;
        }
        minus.choosen = false;
    }     
    else if (plus.choosen) {
        hero.damage = hero.damage + dmg.cardsAmount[dmg.cardsAmount.length - 1];
        plus.choosen = false;
    } else {
        return false;
    };
    dmg.cardsAmount.splice(dmg.cardsAmount.length - 1, 1, );
    if (dmg.cardsAmount.length - 1 < 0) {
        dmg.card.innerHTML = " ";
    } else {
        dmg.card.innerHTML = dmg.cardsAmount[dmg.cardsAmount.length - 1];
    };
    heroStat();     
}

//take weapon
function take (eventObj) {
    
    if(taken) {
        alerts("You already take weapon in this turn!");
        return true;    
    } 
    confirms ('Select hand', 'Right', 'Left',
    () => {
        hand = 0;
        checking(weap);
    }, () => {
        hand = 1;
        checking(weap);
    });

    var weap = eventObj.target;

    equip.onmouseover = equipmentInfo;
    equip2.onmouseover = equipmentInfo;
    equip.onmouseout = removeEquipInfo;
    equip2.onmouseout = removeEquipInfo;
}
function takeWeapon(weap, twohand) {
    
    if (!firstWeapon && !twohand) {
        if (hand === 1 && !empty2) {
            hero.damage = hero.damage - hero.equipment2.damage;
        } 
        else if (hand === 1 && empty2 || hand === 0 && empty1) {
                hero.damage = hero.damage;
        } else {
            hero.damage = hero.damage - hero.equipment1.damage;
        }
    } else if (!firstWeapon && twohand) {
        if (hand === 1) {
            hero.damage = hero.damage - hero.equipment1.damage;
        } else {
            hero.damage = hero.damage - hero.equipment2.damage;
        }
    };
    //right hand choosen
    if (hand === 0) {
        if (weap.id === "weap_lvl1") {
            hero.equipment1 = slot1;
            if (hero.equipment1.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty2 = true;
                } else {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                };
                weap.classList
                equip.className += " " + slot1.id;
                empty1 = false;
            } else {
                hero.equipment2 = hero.equipment1;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot1.id;
                equip2.className += " " + slot1.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon1.innerHTML = random_weap(weapon1, 1);
        } else if (weap.id === "weap_lvl2") {
            hero.equipment1 = slot2;
            if (hero.equipment1.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty2 = true;
                } else {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                };
                equip.className += " " + slot2.id;
                empty1 = false;
            } else {
                hero.equipment2 = hero.equipment1;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot2.id;
                equip2.className += " " + slot2.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon2.innerHTML = random_weap(weapon2, 2);
        } else {
            hero.equipment1 = slot3;
            if (hero.equipment1.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty2 = true;
                } else {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                };
                equip.className += " " + slot3.id;
                empty1 = false;
            } else {
                hero.equipment2 = hero.equipment1;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot3.id;
                equip2.className += " " + slot3.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon3.innerHTML = random_weap(weapon3, 3);
        };
        hero.damage = hero.damage + hero.equipment1.damage; 
    //left hand choosen    
    } else {
        if (weap.id === "weap_lvl1") {
            hero.equipment2 = slot1;
            if (hero.equipment2.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty1 = true;
                } else {
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                };
                equip2.className += " " + slot1.id;
                empty2 = false;
            } else {
                hero.equipment1 = hero.equipment2;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot1.id;
                equip2.className += " " + slot1.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon1.innerHTML = random_weap(weapon1, 1);
        } else if (weap.id === "weap_lvl2") {
            hero.equipment2 = slot2;
            if (hero.equipment2.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty1 = true;
                } else {
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                };
                equip2.className += " " + slot2.id;
                empty2 = false;
            } else {
                hero.equipment1 = hero.equipment2;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot2.id;
                equip2.className += " " + slot2.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon2.innerHTML = random_weap(weapon2, 2);
        } else {
            hero.equipment2 = slot3;
            if (hero.equipment2.type === "onehanded") {
                if (twohanded) {
                    equip.className -= " ";
                    if (equip.classList.contains(NaN)) {
                        equip.classList.toggle(NaN);
                        equip.className += "weapon_fr";
                    };
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                    twohanded = false;
                    empty1 = true;
                } else {
                    equip2.className -= " ";
                    if (equip2.classList.contains(NaN)) {
                        equip2.classList.toggle(NaN);
                        equip2.className += "weapon_fr";
                    };
                };
                equip2.className += " " + slot3.id;
                empty2 = false;
            } else {
                hero.equipment1 = hero.equipment2;
                equip.className -= " ";
                if (equip.classList.contains(NaN)) {
                    equip.classList.toggle(NaN);
                    equip.className += "weapon_fr";
                };
                equip2.className -= " ";
                if (equip2.classList.contains(NaN)) {
                    equip2.classList.toggle(NaN);
                    equip2.className += "weapon_fr";
                };
                equip.className += " " + slot3.id;
                equip2.className += " " + slot3.id;
                empty1 = false;
                empty2 = false;
                twohanded = true;
            };
            weapon3.innerHTML = random_weap(weapon3, 3);
        };
        hero.damage = hero.damage + hero.equipment2.damage; 
    };
    if (!empty1 && !empty2 || twohanded) {
        full = true;
    } else {
        full = false;
    };
    taken = true;
    firstWeapon = false;
    heroStat();
}
function checking (weap) {
    var locweapon = weap;
    
    if (locweapon.id === 'weap_lvl1') {
        locweapon = slot1;
    } else if (locweapon.id === 'weap_lvl2') {
        locweapon = slot2;
    } else {
        locweapon = slot3;
    }

    if (!empty1 && hand === 0 || !empty2 && hand === 1 || full) {
        confirms('You wanted to change weapon?', 'Yes', 'No',
        () => {takeWeapon(weap, false)}, () => {alerts("You dont have enough space")}); 
    
    } else if (locweapon.type === 'twohanded') {
      
        if (!empty2 && hand === 0 || !empty1 && hand === 1) {
            confirms('You wanted to change weapon?', 'Yes', 'No',
            () => {takeWeapon(weap, false)}, () => {alerts("You dont have enough space")}); 
        } else {
            takeWeapon(weap, false);
        }

    } else {
        takeWeapon (weap, false);
    }    
}

//hit monster 
function monstHit() {

    if (number === 1) {
        
        if (enemy1.died) {

            hero.hp = hero.hp;

        } else {
            hero.hp = hero.hp - enemy1.obj.dmg;

            if (hero.hp <= 0) {
                
                if (hero.hp < 0) {
                    hero.hp = 0;
                }

                alerts('You lose! Restarting...');
                return false;
            }
        
        }

    } else if (number === 2) {
        
        if (enemy1.died) {
            hero.hp = hero.hp;
        } else {
            hero.hp = hero.hp - enemy1.obj.dmg;
        
            if (hero.hp < 0) {
                alerts('You lose! Restarting...');
                return false;
            }
        
        }

        if (enemy2.died) {
            hero.hp = hero.hp;
        } else {
            hero.hp = hero.hp - enemy2.obj.dmg;
        
            if (hero.hp < 0) {
                alerts('You lose! Restarting...');
                return false;        
            }
        
        }

    } else {
        
        if (enemy1.died) {
            hero.hp = hero.hp;
        } else {
            hero.hp = hero.hp - enemy1.obj.dmg;
        
            if (hero.hp <= 0) {
                
                if (hero.hp < 0) {
                    hero.hp = 0;
                }

                alerts('You lose! Restarting...');
                location.reload();
                return false;
            }
        }
        
        if (enemy2.died) {
            hero.hp = hero.hp;
        } else {
            hero.hp = hero.hp - enemy2.obj.dmg;
            
            if (hero.hp <= 0) {
                
                if (hero.hp < 0) {
                    hero.hp = 0;
                }

                alerts('You lose! Restarting...');
                location.reload();
                return false;
            }
        
        }

        if (enemy3.died) {
            hero.hp = hero.hp;
        } else {
            hero.hp = hero.hp - enemy3.obj.dmg;
        
            if (hero.hp <= 0) {
                
                if (hero.hp < 0) {
                    hero.hp = 0;
                }

                alerts('You lose! Restarting...');
                location.reload();
                return false;
            }
        
        }

    }
    
    heroStat();
}

creating();

function init() {

    for (var i = 0; i < 100; i++) {
        chances[i] = i;
    }

    heroStat();
    selectOperant();

    weapon1.onmouseover = t;
    weapon2.onmouseover = t;
    weapon3.onmouseover = t;
    weapon1.onmouseout = removeInfo;
    weapon2.onmouseout = removeInfo;
    weapon3.onmouseout = removeInfo;
    
    var endTurnBtn = document.getElementById("endBtn");
    endTurnBtn.onclick = endTurn;
    
    weapon1.onclick = take;
    weapon2.onclick = take;
    weapon3.onclick = take;
}

function heroStat () {
    var hp = document.getElementById("hp");
    hp.innerHTML = "HP: " + hero.hp;
    var dmg = document.getElementById("dmg");
    dmg.innerHTML = "Damage: " + hero.damage;
}
window.onload = init;

