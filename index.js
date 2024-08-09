var board;
var score = 0;
var rows = 4;
var columns = 4;
var scoreText = document.getElementById('score');
window.onload = function(){
  setGame();
}

function setGame(){
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
      let tile = document.createElement('div');
      tile.id = i.toString() + '-' + j.toString();
      let num = board[i][j];
      updateTile(tile, num);
      document.getElementById('board').append(tile);
    }
  }

  setTwo();
  setTwo();
}

function hasEmptyTile(){
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
      if(board[i][j] === 0) return true;
    }
  }
  return false;
}

function setTwo(){
  if(!hasEmptyTile()){
    return;
  }
  let found = false;
  while(!found){
    let row = Math.floor(Math.random() * rows);
    let column = Math.floor(Math.random() * rows);

    if(board[row][column] === 0){
      board[row][column] = 2;
      let tile = document.getElementById(row.toString() + '-' + column.toString());
      tile.innerText = '2';
      tile.classList.add('x2');
      found = true;
    }

  }
}

function updateTile(tile, num){
  tile.innerText = '';
  tile.className = '';
  tile.classList.add('tile');
  if(num > 0){
    tile.innerText = num.toString();
    if(num <= 4096){
      tile.classList.add('x'+ num.toString());
    }else {
      tile.classList.add('x8192');
    }
  }
}

document.addEventListener('keydown', (event)=>{
  if(!gameOver()){
    switch(event.key){
      case 'ArrowLeft':
        slideLeft();
        break;
      case 'ArrowRight':
        slideRight();
        break;
      case 'ArrowUp':
        slideUp();
        break;
      case 'ArrowDown':
        slideDown();
        break;
    }
    setTwo();
  }
})

function filterZero(row){
  return row.filter(num=> num!=0);
}

function slide(row){
  row = filterZero(row);

  for(let i = 0; i < row.length-1; i++){
    if(row[i] === row[i+1]){
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i];
    }
  }
  scoreText.innerText = score.toString();
  row = filterZero(row); // [4, 2];

  while(row.length < columns){
    row.push(0);
  }
  return row;
}

function slideLeft(){
  for(let i = 0; i < rows; i++){
    let row = board[i];
    row = slide(row);
    board[i] = row;
    for(let j = 0; j < columns; j++){
      let tile = document.getElementById(i.toString() + '-' + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideRight(){
  for(let i = 0; i < rows; i++){
    let row = board[i];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[i] = row;
    for(let j = 0; j < columns; j++){
      let tile = document.getElementById(i.toString() + '-' + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideUp(){
  for(let j = 0; j < columns; j++){
    let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
    row = slide(row);
    board[0][j] = row[0];
    board[1][j] = row[1];
    board[2][j] = row[2];
    board[3][j] = row[3];
    for(let i = 0; i < columns; i++){
      let tile = document.getElementById(i.toString() + '-' + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideDown(){
  for(let j = 0; j < columns; j++){
    let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[0][j] = row[0];
    board[1][j] = row[1];
    board[2][j] = row[2];
    board[3][j] = row[3];
    for(let i = 0; i < columns; i++){
      let tile = document.getElementById(i.toString() + '-' + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function gameOver(){
  if(!hasEmptyTile()){
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < columns-1; j++){
        if(board[i][j] === board[i][j+1]) return false
      }
    }
    for(let j = 0; j < columns; j++){
      for(let i = 0; i < rows-1; i++){
        if(board[i][j] === board[i+1][j]) return false
      }
    }
    setTimeout(()=>{
      document.querySelector('.message').classList.add('gameOver');
      document.querySelector('.message').classList.remove('message');
    }, 1000);
    return true;
  }
  return false;
}
