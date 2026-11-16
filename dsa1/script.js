// ================= STACK =================

let stack = [];

function push() {
    let value = document.getElementById("stackValue").value;
    let max = Number(document.getElementById("stackMax").value);

    if (value === "" || !Number.isInteger(max) || max < 1) {
        stackOutput("Enter a number and valid maximum size.");
        return;
    }

    if (stack.length >= max) {
        stackOutput("Stack Overflow!");
        return;
    }

    stack.push(Number(value));
    document.getElementById("stackValue").value = "";
    stackOutput("Element inserted.");
    displayStack();
}

function pop() {
    if (stack.length === 0) {
        stackOutput("Stack Underflow!");
        return;
    }

    let removed = stack.pop();
    stackOutput("Deleted: " + removed);
    displayStack();
}

function peek() {
    stackOutput(stack.length ?
        "Top element: " + stack[stack.length - 1] :
        "Stack is empty.");
}

function clearStack() {
    stack = [];
    stackOutput("Stack cleared.");
    displayStack();
}

function stackOutput(message) {
    document.getElementById("stackOutput").innerText = message;
}

function displayStack() {
    let output = document.getElementById("stackDisplay");
    output.innerHTML = "";

    stack.forEach(value => {
        output.innerHTML +=
            `<div class="item">${value}</div>`;
    });
}


// ================= QUEUE =================

let queue = [];

function enqueue() {
    let value = document.getElementById("queueValue").value;
    let max = Number(document.getElementById("queueMax").value);

    if (value === "" || !Number.isInteger(max) || max < 1) {
        queueOutput("Enter a number and valid maximum size.");
        return;
    }

    if (queue.length >= max) {
        queueOutput("Queue Overflow!");
        return;
    }

    queue.push(Number(value));
    document.getElementById("queueValue").value = "";
    queueOutput("Element enqueued.");
    displayQueue();
}

function dequeue() {
    if (queue.length === 0) {
        queueOutput("Queue Underflow!");
        return;
    }

    let removed = queue.shift();
    queueOutput("Deleted: " + removed);
    displayQueue();
}

function front() {
    queueOutput(queue.length ?
        "Front: " + queue[0] :
        "Queue is empty.");
}

function rear() {
    queueOutput(queue.length ?
        "Rear: " + queue[queue.length - 1] :
        "Queue is empty.");
}

function clearQueue() {
    queue = [];
    queueOutput("Queue cleared.");
    displayQueue();
}

function queueOutput(message) {
    document.getElementById("queueOutput").innerText = message;
}

function displayQueue() {
    let output = document.getElementById("queueDisplay");
    output.innerHTML = "";

    queue.forEach(value => {
        output.innerHTML +=
            `<div class="item">${value}</div>`;
    });
}


// ================= TOWER OF HANOI =================

let towers = [[], [], []];
let hanoiMoves = [];
let moveIndex = 0;
let hanoiTimer = null;

function generateMoves(n, from, to, aux) {
    if (n === 0) return;

    generateMoves(n - 1, from, aux, to);

    hanoiMoves.push([from, to]);

    generateMoves(n - 1, aux, to, from);
}

function startHanoi() {
    clearInterval(hanoiTimer);

    let n = Number(document.getElementById("disks").value);

    if (!Number.isInteger(n) || n < 1 || n > 8) {
        document.getElementById("hanoiOutput").innerText =
            "Enter a number of disks from 1 to 8.";
        return;
    }

    towers = [[], [], []];

    for (let i = n; i >= 1; i--) {
        towers[0].push(i);
    }

    hanoiMoves = [];
    moveIndex = 0;

    generateMoves(n, 0, 2, 1);

    document.getElementById("hanoiOutput").innerText =
        "Minimum moves: " + hanoiMoves.length;

    displayHanoi();
}

function nextHanoi() {
    clearInterval(hanoiTimer);

    if (hanoiMoves.length === 0) {
        startHanoi();
    }

    if (moveIndex >= hanoiMoves.length) return;

    let [from, to] = hanoiMoves[moveIndex];

    let disk = towers[from].pop();
    towers[to].push(disk);

    moveIndex++;

    document.getElementById("hanoiOutput").innerText =
        "Moves completed: " + moveIndex +
        " / " + hanoiMoves.length;

    displayHanoi();
}

function autoHanoi() {
    if (hanoiMoves.length === 0) {
        startHanoi();
    }

    if (moveIndex >= hanoiMoves.length) return;

    clearInterval(hanoiTimer);

    hanoiTimer = setInterval(() => {
        nextHanoiStep();
    }, 700);
}

function nextHanoiStep() {
    if (moveIndex >= hanoiMoves.length) {
        clearInterval(hanoiTimer);
        return;
    }

    let [from, to] = hanoiMoves[moveIndex];
    let disk = towers[from].pop();

    towers[to].push(disk);
    moveIndex++;

    document.getElementById("hanoiOutput").innerText =
        "Moves completed: " + moveIndex +
        " / " + hanoiMoves.length;

    displayHanoi();

    if (moveIndex >= hanoiMoves.length) {
        clearInterval(hanoiTimer);
    }
}

function resetHanoi() {
    clearInterval(hanoiTimer);
    startHanoi();
}

function displayHanoi() {
    let output = document.getElementById("hanoiDisplay");
    output.innerHTML = "";

    const diskColors = [
        "#FF0000", // Red
        "#FF8C00", // Orange
        "#FFD700", // Yellow
        "#32CD32", // Green
        "#00BFFF", // Blue
        "#8A2BE2", // Purple
        "#FF1493", // Pink
        "#00CED1"  // Cyan
    ];

    towers.forEach((tower, index) => {
        let div = document.createElement("div");

        div.style.cssText =
            "border-bottom:5px solid #354caf;" +
            "min-width:120px;min-height:150px;" +
            "display:flex;flex-direction:column-reverse;" +
            "align-items:center;padding:5px;";

        tower.forEach(disk => {
            let item = document.createElement("div");

            item.className = "item";
            item.style.width = (30 + disk * 15) + "px";
            item.style.background = diskColors[(disk - 1) % diskColors.length];
            item.style.color = "white";
            item.style.border = "2px solid #333";
            item.style.margin = "2px";
            item.textContent = "Disk " + disk;

            div.appendChild(item);
        });

        let label = document.createElement("b");
        label.textContent = "Tower " + ["A", "B", "C"][index];

        div.appendChild(label);
        output.appendChild(div);
    });
}
// ================= SINGLY LINKED LIST =================

let head = null;

function insertBeginning() {
    let value = Number(document.getElementById("listValue").value);

    if (document.getElementById("listValue").value === "") {
        listOutput("Enter a number.");
        return;
    }

    let newNode = {
        data: value,
        next: head
    };

    head = newNode;

    document.getElementById("listValue").value = "";
    listOutput("Inserted at beginning.");
    displayList();
}

function insertEnd() {
    let input = document.getElementById("listValue");

    if (input.value === "") {
        listOutput("Enter a number.");
        return;
    }

    let newNode = {
        data: Number(input.value),
        next: null
    };

    if (head === null) {
        head = newNode;
    } else {
        let current = head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    input.value = "";
    listOutput("Inserted at end.");
    displayList();
}

function deleteBeginning() {
    if (head === null) {
        listOutput("List is empty.");
        return;
    }

    head = head.next;
    listOutput("Beginning node deleted.");
    displayList();
}

function deleteEnd() {
    if (head === null) {
        listOutput("List is empty.");
        return;
    }

    if (head.next === null) {
        head = null;
    } else {
        let current = head;

        while (current.next.next !== null) {
            current = current.next;
        }

        current.next = null;
    }

    listOutput("End node deleted.");
    displayList();
}

function searchNode() {
    let input = document.getElementById("listValue");

    if (input.value === "") {
        listOutput("Enter a number to search.");
        return;
    }

    let value = Number(input.value);
    let current = head;
    let position = 1;

    while (current !== null) {
        if (current.data === value) {
            listOutput("Element found at position " + position);
            return;
        }

        current = current.next;
        position++;
    }

    listOutput("Element not found.");
}

function clearList() {
    head = null;
    listOutput("List cleared.");
    displayList();
}

function listOutput(message) {
    document.getElementById("listOutput").innerText = message;
}

function displayList() {
    let output = document.getElementById("listDisplay");
    output.innerHTML = "";

    let current = head;

    while (current !== null) {
        output.innerHTML +=
            `<div class="node">${current.data}</div>
             <span class="arrow">→</span>`;

        current = current.next;
    }

    if (head === null) {
        output.innerText = "Linked List is empty.";
    } else {
        output.innerHTML += "<b>NULL</b>";
    }
}


// ================= SECTION NAVIGATION =================

function showSection(sectionName) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionName).style.display = "block";
}

showSection("stack");