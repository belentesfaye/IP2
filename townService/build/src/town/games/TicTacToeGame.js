import InvalidParametersError, { GAME_FULL_MESSAGE, GAME_NOT_IN_PROGRESS_MESSAGE, BOARD_POSITION_NOT_EMPTY_MESSAGE, MOVE_NOT_YOUR_TURN_MESSAGE, PLAYER_ALREADY_IN_GAME_MESSAGE, PLAYER_NOT_IN_GAME_MESSAGE, } from '../../lib/InvalidParametersError';
import Game from './Game';
export default class TicTacToeGame extends Game {
    constructor() {
        super({
            moves: [],
            status: 'WAITING_TO_START',
        });
    }
    get _board() {
        const { moves } = this.state;
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        for (const move of moves) {
            board[move.row][move.col] = move.gamePiece;
        }
        return board;
    }
    _checkForGameEnding() {
        const board = this._board;
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                this.state = {
                    ...this.state,
                    status: 'OVER',
                    winner: board[i][0] === 'X' ? this.state.x : this.state.o,
                };
                return;
            }
            if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                this.state = {
                    ...this.state,
                    status: 'OVER',
                    winner: board[0][i] === 'X' ? this.state.x : this.state.o,
                };
                return;
            }
        }
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            this.state = {
                ...this.state,
                status: 'OVER',
                winner: board[0][0] === 'X' ? this.state.x : this.state.o,
            };
            return;
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            this.state = {
                ...this.state,
                status: 'OVER',
                winner: board[0][2] === 'X' ? this.state.x : this.state.o,
            };
            return;
        }
        if (this.state.moves.length === 9) {
            this.state = {
                ...this.state,
                status: 'OVER',
                winner: undefined,
            };
        }
    }
    _validateMove(move) {
        for (const m of this.state.moves) {
            if (m.col === move.col && m.row === move.row) {
                throw new InvalidParametersError(BOARD_POSITION_NOT_EMPTY_MESSAGE);
            }
        }
        if (move.gamePiece === 'X' && this.state.moves.length % 2 === 1) {
            throw new InvalidParametersError(MOVE_NOT_YOUR_TURN_MESSAGE);
        }
        else if (move.gamePiece === 'O' && this.state.moves.length % 2 === 0) {
            throw new InvalidParametersError(MOVE_NOT_YOUR_TURN_MESSAGE);
        }
        if (this.state.status !== 'IN_PROGRESS') {
            throw new InvalidParametersError(GAME_NOT_IN_PROGRESS_MESSAGE);
        }
    }
    _applyMove(move) {
        this.state = {
            ...this.state,
            moves: [...this.state.moves, move],
        };
        this._checkForGameEnding();
    }
    applyMove(move) {
        let gamePiece;
        if (move.playerID === this.state.x) {
            gamePiece = 'X';
        }
        else {
            gamePiece = 'O';
        }
        const cleanMove = {
            gamePiece,
            col: move.move.col,
            row: move.move.row,
        };
        this._validateMove(cleanMove);
        this._applyMove(cleanMove);
    }
    _join(player) {
        if (this.state.x === player.id || this.state.o === player.id) {
            throw new InvalidParametersError(PLAYER_ALREADY_IN_GAME_MESSAGE);
        }
        if (!this.state.x) {
            this.state = {
                ...this.state,
                x: player.id,
            };
        }
        else if (!this.state.o) {
            this.state = {
                ...this.state,
                o: player.id,
            };
        }
        else {
            throw new InvalidParametersError(GAME_FULL_MESSAGE);
        }
        if (this.state.x && this.state.o) {
            this.state = {
                ...this.state,
                status: 'IN_PROGRESS',
            };
        }
    }
    _leave(player) {
        if (this.state.x !== player.id && this.state.o !== player.id) {
            throw new InvalidParametersError(PLAYER_NOT_IN_GAME_MESSAGE);
        }
        if (this.state.o === undefined) {
            this.state = {
                moves: [],
                status: 'WAITING_TO_START',
            };
            return;
        }
        if (this.state.x === player.id) {
            this.state = {
                ...this.state,
                status: 'OVER',
                winner: this.state.o,
            };
        }
        else {
            this.state = {
                ...this.state,
                status: 'OVER',
                winner: this.state.x,
            };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGljVGFjVG9lR2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90b3duL2dhbWVzL1RpY1RhY1RvZUdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxzQkFBc0IsRUFBRSxFQUM3QixpQkFBaUIsRUFDakIsNEJBQTRCLEVBQzVCLGdDQUFnQyxFQUNoQywwQkFBMEIsRUFDMUIsOEJBQThCLEVBQzlCLDBCQUEwQixHQUMzQixNQUFNLGtDQUFrQyxDQUFDO0FBRzFDLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQU0xQixNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxJQUF1QztJQUNoRjtRQUNFLEtBQUssQ0FBQztZQUNKLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLGtCQUFrQjtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBWSxNQUFNO1FBQ2hCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdCLE1BQU0sS0FBSyxHQUFHO1lBQ1osQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDWixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQ2IsQ0FBQztRQUNGLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDNUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUcxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxF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