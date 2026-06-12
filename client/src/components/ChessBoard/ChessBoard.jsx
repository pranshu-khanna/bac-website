const PIECES = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

const BOARD = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, "P", null, null, null],
  [null, null, null, null, null, "N", null, null],
  ["P", "P", "P", "P", null, "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", null, "R"],
];

export default function ChessBoard() {
  return (
    <div className="hero-board">
      {BOARD.map((row, r) =>
        row.map((piece, c) => {
          const light = (r + c) % 2 === 0;
          const glyph = piece ? PIECES[piece] : "";
          return (
            <div key={`${r}-${c}`} className={`sq ${light ? "light" : "dark"}`}>
              {glyph}
            </div>
          );
        }),
      )}
    </div>
  );
}
