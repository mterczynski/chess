# Board representation

This document discusses different approaches for storing information about board.

1. Two-dimensional array of squares, where empty squares are represented by nulls, squares with figures are represented by `{type, player}` objects 
    (rooks and kings will also have an additional property called `hasMoved`, which is used for castling mechanics purposes)

    Pros:
      + faster reading (if we want to check what is on A4, we would do `board[4][0]`, in the second approach we would potentially have to check 32 items in the array (if figures wouldn't be sorted))
      + (very minor) easier to implement algorithm for displaying board in CLI    

2. One-dimensional array of figures, where each figure has additional information about position in `{rank, file}` format

    Pros:
      + easier to understand by devs - each position is described in properties (rank and file) instead of indexes

### Note on the first appraoch
  The first approach can be modified a bit to be more human friendly by changing the board array to an object, where each key is a file name and each value assigned to that key is an array of squares in that file.

  With such format it would be possible to read items in a manner similar to chess notation, for example `board['A'][4]` could represent A5 square, `board['B'][0]` would represent B1 square. It would make reading files a lot clearer for devs and converting file keys (A, B, etc.) to indexes (and vice versa) would be relatively cheap. Example implementations of converting algorithms:

  ```typescript
  'H'.charCodeAt(0) - 65; // 7
  String.fromCharCode(7 + 65); // 'H'
  ```

  This approach can be modified a bit further by adding extra empty slots in the arrays, which would enable devs to get info about squares in chess notation-like manner, without having to substract/add `1` when converting rank index to array index (or vice versa).

  So for example `board['A'][4]` would represent A4 square and `board['A'][1]` would represent A1 square, `board['A'][0]` would be invalid and could be protected by `if` statements.


## Extra thoughts

It's entirely possible to write adapters for each of these 4 formats (first format with 2 of its modifiatction and second format - 4 in total) that convert board representations to different formats
