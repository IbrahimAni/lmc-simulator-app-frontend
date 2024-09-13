// editorUtils.js
export const initialRows = [
    ['', '', ''],
  ];
  
  export const handleInputChange = (rows, rowIndex, colIndex, event, setRows) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = event.target.value;
    setRows(newRows);
  };
  
  export const handleKeyDown = (
    rows,
    rowIndex,
    colIndex,
    event,
    setRows,
    tableRef
  ) => {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      const nextColIndex = (colIndex + 1) % 3;
      const nextRowIndex = nextColIndex === 0 ? rowIndex + 1 : rowIndex;
  
      if (nextRowIndex < rows.length) {
        document.getElementById(`cell-${nextRowIndex}-${nextColIndex}`).focus();
      } else {
        // If next row doesn't exist, add a new row
        const newRows = [...rows, ['', '', '']];
        setRows(newRows);
        setTimeout(() => {
          document.getElementById(`cell-${nextRowIndex}-${nextColIndex}`).focus();
        }, 0);
      }
    } else if (event.shiftKey && event.key === 'Tab') {
      event.preventDefault();
      const prevColIndex = (colIndex - 1 + 3) % 3;
      const prevRowIndex = prevColIndex === 2 ? rowIndex - 1 : rowIndex;
  
      if (prevRowIndex >= 0) {
        document.getElementById(`cell-${prevRowIndex}-${prevColIndex}`).focus();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const newRows = [...rows, ['', '', '']];
      setRows(newRows);
      setTimeout(() => {
        document.getElementById(`cell-${rowIndex + 1}-0`).focus();
      }, 0);
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      // If the cell is empty, and Backspace/Delete is pressed
      if (rows[rowIndex][colIndex] === '') {
        if (colIndex > 0) {
          document.getElementById(`cell-${rowIndex}-${colIndex - 1}`).focus();
        } else if (rowIndex > 0) {
          document.getElementById(`cell-${rowIndex - 1}-2`).focus();
        }
      } else if (event.target.value.length === 0) {
        // Delete the row if it is empty
        if (rows[rowIndex].every((cell) => cell === '')) {
          event.preventDefault();
          if (rows.length > 1) {
            const newRows = rows.slice(0, rowIndex).concat(rows.slice(rowIndex + 1));
            setRows(newRows);
            setTimeout(() => {
              if (rowIndex === 0) {
                document.getElementById(`cell-0-0`).focus();
              } else {
                document.getElementById(`cell-${rowIndex - 1}-0`).focus();
              }
            }, 0);
          }
        }
      }
    }
  };
  
  export const handleGlobalKeyDown = (event, tableRef, setRows) => {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      const range = document.createRange();
      range.selectNodeContents(tableRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      window.getSelection().toString() === tableRef.current.innerText
    ) {
      event.preventDefault();
      setRows([['', '', '']]);
    }
  };
  