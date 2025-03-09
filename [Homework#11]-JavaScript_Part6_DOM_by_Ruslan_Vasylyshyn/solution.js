document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('grid-container');
  const columnNumbers = document.getElementById('column-numbers');
  const rowNumbers = document.getElementById('row-numbers');

  // Creating column numbering
  for (let x = 1; x <= 20; x++) {
      const columnNumber = document.createElement('div');
      columnNumber.className = 'number';
      columnNumber.textContent = x;
      columnNumbers.appendChild(columnNumber);
  }

  // Creating line numbering
  for (let y = 1; y <= 30; y++) {
      const rowNumber = document.createElement('div');
      rowNumber.className = 'number';
      rowNumber.textContent = y;
      rowNumbers.appendChild(rowNumber);
  }

  // Creating a basic grid
  for (let y = 1; y <= 30; y++) {
      for (let x = 1; x <= 20; x++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.x = x;
          cell.dataset.y = y;
          gridContainer.appendChild(cell);
      }
  }

  let selectedCells = [];

  // Cleaning the backlight
  const clearHighlights = () => {
      document.querySelectorAll('.cell.highlight').forEach(cell => cell.classList.remove('highlight'));
  };

  // Highlighting the active row and column
  const highlightActiveRowCol = (x, y) => {
      clearHighlights();
      document.querySelectorAll(`.cell[data-x="${x}"], .cell[data-y="${y}"]`).forEach(cell => {
          if (!cell.classList.contains('selected')) {
              cell.classList.add('highlight');
          }
      });
  };

  gridContainer.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (!cell) return;

      const x = cell.dataset.x;
      const y = cell.dataset.y;

      if (event.shiftKey) {
          // Toggle selection while holding Shift
          if (cell.classList.contains('selected')) {
              cell.classList.remove('selected');
              cell.textContent = '';
              selectedCells = selectedCells.filter(selected => selected !== cell);
          } else {
              cell.classList.add('selected');
              cell.textContent = `${x}/${y}`;
              selectedCells.push(cell);
          }
      } else {
          // Clearing the previous selection
          selectedCells.forEach(selected => {
              selected.classList.remove('selected');
              selected.textContent = '';
          });
          selectedCells = [cell];
          cell.classList.add('selected');
          cell.textContent = `${x}/${y}`;
      }

      highlightActiveRowCol(x, y);
  });
});
