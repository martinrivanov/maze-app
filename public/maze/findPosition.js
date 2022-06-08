export default function indexOf2dArray(array2d, itemtofind) {
    let index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(itemtofind);
                
    // return "false" if the item is not found
    if (index === -1) { return null; }
    
    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    let numColumns = array2d[0].length;
    
    // row = the index in the 1d array divided by the row length (number of columns)
    let row = parseInt(index / numColumns);
    
    // col = index modulus the number of columns
    let col = index % numColumns;
    
    return {row, col}; 
}