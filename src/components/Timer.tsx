import { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'

interface TimerProps {
	currentPlayer: Player | null
	restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
	const [blackTimer, setblackTimer] = useState(300)
	const [whiteTimer, setwhiteTimer] = useState(300)
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)

	useEffect(() => {
		startTimer()
	}, [currentPlayer])

	function startTimer() {
		if(timer.current) {
			clearInterval(timer.current)
		}
		const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
		timer.current = setInterval(callback, 1000)
	}
	function decrementBlackTimer() {
		setblackTimer(prev => prev - 1)
	}
	function decrementWhiteTimer(){
		setwhiteTimer(prev => prev - 1)
	}

	const handleRestart = () => {
		setblackTimer(300)
		setwhiteTimer(300)
		restart()
	}

	return (
		<div>
			<div>
				<button onClick={handleRestart}>Restart</button>
			</div>
			<h2>Черные: {blackTimer}</h2>
			<h2>Белые: {whiteTimer}</h2>
		</div>
	);
};

export default Timer;