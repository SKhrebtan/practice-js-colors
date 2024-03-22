const text = document.querySelector('.text');
const list = document.querySelector('.list');
const body = document.querySelector('body');

body.addEventListener('click', handleBodyClick);
list.addEventListener('click', handleClick);

const randomHexDigit = () => {
  const characters = '0123456789ABCDEF';
  return characters[Math.floor(Math.random() * 16)];
};

const randomHex = () => {
  let hex = '';
  for (let i = 0; i < 6; i++) {
    hex += randomHexDigit();
  }
  return hex;
};
console.log(window.innerWidth)
let randomWinner
function createMarkup() {
  const array = [];
  const colorArray = [];
  for (let i = 0; i < (window.innerWidth > 480 ? 60 : 16);  i += 1){
    const li = document.createElement('li');
    li.classList.add('li');
    const color = `#${randomHex()}`

    li.dataset.color = color;
    li.style.backgroundColor = `${color}`
    colorArray.push(color)
array.push(li)
  }
  const randomElement = colorArray[Math.floor(Math.random() * colorArray.length)];
  randomWinner = randomElement
  array.forEach(el => {
    if (el.dataset.color === randomElement) {
      el.dataset.win = randomElement;
      return el
    }
    return el
  })
  list.append(...array)
  const gridItems = document.querySelectorAll('.li');
let selectedRow = 0;
let selectedColumn = 0;
  const numberOfColumns = window.innerWidth > 480 ? 12 : 4; // Замініть на кількість стовпців у вашій сітці

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        selectedRow = Math.max(selectedRow - 1, 0);
    } else if (event.key === 'ArrowDown') {
        selectedRow = Math.min(selectedRow + 1, Math.floor(gridItems.length / numberOfColumns) - 1);
    } else if (event.key === 'ArrowLeft') {
        selectedColumn = Math.max(selectedColumn - 1, 0);
    } else if (event.key === 'ArrowRight') {
        selectedColumn = Math.min(selectedColumn + 1, numberOfColumns - 1);
    }
    
  gridItems.forEach((item, index) => {
       item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', handleEnter)
        const row = Math.floor(index / numberOfColumns);
        const column = index % numberOfColumns;
        if (row === selectedRow && column === selectedColumn) {
          item.classList.add('selected');
          item.focus()
        } else {
            item.classList.remove('selected');
        }
    });
});

}
createMarkup()


function handleClick(e) {
  if (e.target.nodeName !== "LI") {
      return
  }  
  if (e.target.style.backgroundColor === 'transparent') {
     text.textContent = 'Choose color';
    text.style.color = '#000';
    return
  }
 
  text.textContent = `Choosen color: ${e.target.dataset.color}`;
  text.style.color = e.target.dataset.color

  if (!e.target.dataset.win) {
    e.target.style.backgroundColor = 'transparent'
  }
  if (e.target.dataset.win === randomWinner) {
    text.textContent = `Ти переміг`;
    // location.reload()
    list.innerHTML = '';
    createMarkup()
  }

     
 
}

function handleBodyClick (e) {
   if (e.target.nodeName === "LI") {
      return
  } 
text.textContent = `Choose color`;
  text.style.color= '#000'

}



// const gridItems = document.querySelectorAll('.li');
// let selectedRow = 0;
// let selectedColumn = 0;
// const numberOfColumns = 6; // Замініть на кількість стовпців у вашій сітці

// document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowUp') {
//         selectedRow = Math.max(selectedRow - 1, 0);
//     } else if (event.key === 'ArrowDown') {
//         selectedRow = Math.min(selectedRow + 1, Math.floor(gridItems.length / numberOfColumns) - 1);
//     } else if (event.key === 'ArrowLeft') {
//         selectedColumn = Math.max(selectedColumn - 1, 0);
//     } else if (event.key === 'ArrowRight') {
//         selectedColumn = Math.min(selectedColumn + 1, numberOfColumns - 1);
//     }
    
//   gridItems.forEach((item, index) => {
//        item.setAttribute('tabindex', '0');
//   item.addEventListener('keydown', handleEnter)
//         const row = Math.floor(index / numberOfColumns);
//         const column = index % numberOfColumns;
//         if (row === selectedRow && column === selectedColumn) {
//           item.classList.add('selected');
//           item.focus()
//         } else {
//             item.classList.remove('selected');
//         }
//     });
// });


// const lis = document.querySelectorAll('li');
// [...gridItems].forEach(t => {
//    t.setAttribute('tabindex', '0');
//   t.addEventListener('keydown', handleEnter)
// })

function handleEnter(e) {

  if (e.key !== 'Enter') return;
        text.textContent = `Choosen color: ${e.target.dataset.color}`;
  text.style.color = e.target.dataset.color
   if (!e.target.dataset.win) {
    e.target.style.backgroundColor = 'transparent'
  }
  if (e.target.dataset.win && e.target.dataset.win === randomWinner)
  {
      text.textContent = `Ти переміг`;


    // location.reload()
    list.innerHTML = '';
    createMarkup()
  }
}