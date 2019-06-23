const tictactoe = {
	board: ["#", "@", "$", "%", "^", "&", "*", "(", ")", "_"],
	clearboard: function() {
		this.board = ["#", "@", "$", "%", "^", "&", "*", "(", ")", "_"];
	},
	checkForWin: function() {
		if (
			// horizontal check
			[...new Set([this.board[1], this.board[2], this.board[3]])].length ===
				1 ||
			[...new Set([this.board[4], this.board[5], this.board[6]])].length ===
				1 ||
			[...new Set([this.board[7], this.board[8], this.board[9]])].length === 1
		) {
			return true;
		}
		if (
			// vertical check
			[...new Set([this.board[1], this.board[4], this.board[7]])].length ===
				1 ||
			[...new Set([this.board[2], this.board[5], this.board[8]])].length ===
				1 ||
			[...new Set([this.board[3], this.board[6], this.board[9]])].length === 1
		) {
			return true;
		}
		if (
			//check for diagonal win
			[...new Set([this.board[1], this.board[5], this.board[9]])].length ===
				1 ||
			[...new Set([this.board[3], this.board[5], this.board[7]])].length === 1
		) {
			return true;
		}
		return false;
	},
	checkForDraw: function() {
		return (
			[...new Set(this.board.slice(1))].length === 2 &&
			this.checkForWin() === false
		);
	},
	winningCombination: function() {
		if (
			[...new Set([this.board[1], this.board[2], this.board[3]])].length === 1
		) {
			return "side-top";
		} else if (
			[...new Set([this.board[4], this.board[5], this.board[6]])].length === 1
		) {
			return "side-middle";
		} else if (
			[...new Set([this.board[7], this.board[8], this.board[9]])].length === 1
		) {
			return "side-bottom";
		} else if (
			[...new Set([this.board[1], this.board[4], this.board[7]])].length === 1
		) {
			return "down-left";
		} else if (
			[...new Set([this.board[2], this.board[5], this.board[8]])].length === 1
		) {
			return "down-middle";
		} else if (
			[...new Set([this.board[3], this.board[6], this.board[9]])].length === 1
		) {
			return "down-right";
		} else if (
			[...new Set([this.board[1], this.board[5], this.board[9]])].length === 1
		) {
			return "diagonal-right";
		} else if (
			[...new Set([this.board[3], this.board[5], this.board[7]])].length === 1
		) {
			return "diagonal-left";
		}
	},
};
