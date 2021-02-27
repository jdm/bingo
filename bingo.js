const choices = [
    "some smutty thing",
    "licking and stuff idk",
    "so hot, so wet",
    "tongues battling for dominance",
    "pressing into the mattress",
    "teeth teeth teeth teeth",
    "predicament bondage (for chuck)",
    "a surfeit of semen",
    "draco's pointy features",
    "pink tips of the ears",
    "scars interrupt the proceedings",
    "dragon???",
    "wandless magic lube",
    "to the hilt",
    "using spit as lube",
    "inappropriate lube liquid",
    "swallowing him whole",
    "almost blacking out while orgasming",
    "the gentlest of carresses",
    "scared, potter?",
    "whale sounds",
    "draco's childhood bedroom",
    "it will only happen once",
    "pounding into the mattress",
    "fluttering asshole",
    "bodies sliding wetly against each other",
    "ropes of semen",
    "very chaste kisses",

    // real data starts here
    "Someone adds a third finger",
    "Someone’s cock gets stripped",
    "A spent cock",
    "A back arches",
    "Cock searching for friction",
    "Insults as foreplay",
    "Sobbing",
    "Switching to first names",
    "Wet slapping",
    "Scared, potter?",
];

function chooseAndRemove(list) {
    if (list.length == 0) {
        return null;
    }
    let choice = Math.floor(Math.random() * list.length);
    let item = list[choice];
    list.splice(choice, 1);
    return item;
}

const url = new URL(location.href);
const rows = url.searchParams.get('size') || 5;
const cols = rows;
document.documentElement.style.setProperty('--num', rows);

let table = document.getElementById('bingo');
for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
        const col = document.createElement('td');
        if (i == Math.floor(rows / 2) && j == Math.floor(cols / 2)) {
            col.textContent = "FREE SPACE";
            col.classList.add("checked")
            col.id = "free-space";
        } else {
            col.textContent = chooseAndRemove(choices);
            col.onclick = () => {
                col.classList.toggle("checked");
                checkBingo();
            }
        }
        row.appendChild(col);
    }
    table.appendChild(row);
}

function checkBingo() {
    let repr = [];
    for (const row of table.getElementsByTagName('tr')) {
        let curRow = [];
        for (const col of row.getElementsByTagName('td')) {
            curRow.push(col.classList.contains("checked"));
        }
        repr.push(curRow);
    }
    let found = false;
    for (const row of repr) {
        found |= row.every((c) => c === true);
    }
    for (let j = 0; j < cols; j++) {
        let isBingo = true;
        for (let i = 0; i < rows; i++) {
            if (!repr[i][j]) {
                isBingo = false;
                break;
            }
        }
        found |= isBingo;
    }
    let leftDiagBingo = true;
    let rightDiagBingo = true;
    for (let i = 0; i < rows; i++) {
        if (!repr[i][i]) {
            leftDiagBingo = false;
        }
        if (!repr[i][cols - i - 1]) {
            rightDiagBingo = false;
        }
    }
    found |= leftDiagBingo | rightDiagBingo;
    const victory = document.getElementById('victory');
    if (found) {
        victory.classList.remove('hidden');
    } else {
        victory.classList.add('hidden');
    }
}
