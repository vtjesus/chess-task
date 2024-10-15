import blackLogo from "../../assets/black-pawn.png"
import whiteLogo from "../../assets/white-pawn.png"
import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'

export class Pawn extends Figure {

	isFirstSteep: boolean = true

	constructor(color: Colors, cell:Cell) {
		super(color, cell)
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
		this.name = FigureNames.PAWN
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)) 
			return false
		const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
		const firstSteepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
		if ((target.y === this.cell.y + direction || this.isFirstSteep && (target.y === this.cell.y + firstSteepDirection)) && target.x === this.cell.x && this.cell.board.getCell(target.x, target.y).isEmpty()) {
			return true
		}

		if(target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && this.cell.isEnemy(target)) {
			return true
		}
		return false
	}

	moveFigure(target: Cell) {
		super.moveFigure(target)
		this.isFirstSteep = false
	}
}