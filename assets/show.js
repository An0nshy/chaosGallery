class Image {
    src = ''
}

let allFiles = [],
    newFiles = [],
    shownFiles = [],
    src = "http://localhost:8080/all",
    imgSrc = "http://localhost:8080/picture/",
    maxBottomToDelete = 1200,
    maxSpawnHeight = -2000;


let getFiles = async () => {
    let request = await fetch(src);
    return await request.json();
}


function init() {
    getFiles()
        .then(response => {
            allFiles = response;
        })
        .then(() => {
            allFiles = shuffle(allFiles)
            for (let file of allFiles) {
                let image = new Image();
                image.src = imgSrc + file;
                newFiles.push(image)
            }
        })
        .then(() => {
            shownFiles = [];
            for (let image of newFiles) {
                if (!shownFiles.includes(image.src)) {
                    let imageElement = buildElement(image);

                    if (document.getElementById('app').children.length > 50)
                        continue;

                    document.getElementById('app').appendChild(imageElement);
                    shownFiles.push(image.src)
                    image.displayed = true;
                    animateImage(imageElement)
                }

            }
        })
    newFiles = [];
    allFiles = [];
}

function buildElement(image) {
    let item = document.createElement('img')
    item.src = image.src
    item.style.top = getRandomInRange(-800, maxSpawnHeight) + 'px'
    item.style.left = getRandomInRange(-200, (window.innerWidth - 200)) + 'px'
    item.style.zIndex = getRandomInRange(0, 3)
    item.style.position = 'absolute'
    return item;
}

function animateImage(item) {
    let top = item.style.top.slice(0, -2),
        timerId = 0

    timerId = setInterval(function () {
        if (top >= maxBottomToDelete) {
            removeItem(item)
        }
        if (top++ > maxBottomToDelete) {
            clearInterval(timerId);
        }
        item.style.top = top + 'px';
    }, getRandomInRange(8, 16));
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function removeItem(item) {
    let index = allFiles.indexOf(item);
    allFiles = allFiles.splice(index, 1);
    let elements = document.getElementsByTagName('img');
    for (let el of elements) {
        if (el === item) {
            el.remove()
        }
    }
}

function shuffle(array) {
    let randomNumber, x, counter;
    for (counter = array.length - 1; counter > 0; counter--) {
        randomNumber = Math.floor(Math.random() * (counter + 1));
        x = array[counter];
        array[counter] = array[randomNumber];
        array[randomNumber] = x;
    }
    return array;
}

init();
setInterval(init, 5000)