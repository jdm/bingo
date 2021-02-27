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

const rows = 3;
const cols = 3;

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
