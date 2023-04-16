import React, { useEffect, useState } from 'react'
import CachedImage from './CachedImage'

interface MileageData {
	week_prog: number
	next_week_goal: number
	miles_left: number
	days_zero_last_3: number
	days_zero_last_14: number
	total_distance_by_week_plot: string
	moving_time_by_day_plot: string
	days_left: number
	avg_miles_left: number
	longest_run_last_week: number
	goal_long_run: number
	longest_run_since_monday: number
	long_run_improved: boolean
	miles_left_minus_long_run_goal: number
	days_left_minus_long_run: number
	most_recent_run_today: boolean
}

function MileageReport() {
	const [data, setData] = useState<MileageData>({
		week_prog: 0,
		next_week_goal: 0,
		miles_left: 0,
		days_zero_last_3: 0,
		days_zero_last_14: 0,
		total_distance_by_week_plot: 'null',
		moving_time_by_day_plot: 'null',
		// 'days_left': days_left,
		// 'avg_miles_left': avg_miles_left.round(2),
		// 'longest_run_last_week': longest_run_last_week.round(2),
		// 'goal_long_run': goal_long_run.round(2),
		// 'longest_run_since_monday': longest_run_since_monday.round(2),
		// 'long_run_improved': long_run_improved,
		// 'miles_left_minus_long_run_goal': miles_left_minus_long_run_goal.round(2),
		// 'days_left_minus_long_run': days_left_minus_long_run
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_week: 0,
		goal_long_run: 0,
		longest_run_since_monday: 0,
		long_run_improved: false,
		miles_left_minus_long_run_goal: 0,
		days_left_minus_long_run: 0,
		most_recent_run_today: false
	})
	const [oldData, setOldData] = useState<MileageData>({
		week_prog: 0,
		next_week_goal: 0,
		miles_left: 0,
		days_zero_last_3: 0,
		days_zero_last_14: 0,
		total_distance_by_week_plot: 'null',
		moving_time_by_day_plot: 'null',
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_week: 0,
		goal_long_run: 0,
		longest_run_since_monday: 0,
		long_run_improved: false,
		miles_left_minus_long_run_goal: 0,
		days_left_minus_long_run: 0,
		most_recent_run_today: false,
	})
	const [fetchedData, setFetchedData] = useState<MileageData>({
		week_prog: 0,
		next_week_goal: 0,
		miles_left: 0,
		days_zero_last_3: 0,
		days_zero_last_14: 0,
		total_distance_by_week_plot: 'null',
		moving_time_by_day_plot: 'null',
		// 'days_left': days_left,
		// 'avg_miles_left': avg_miles_left.round(2),
		// 'longest_run_last_week': longest_run_last_week.round(2),
		// 'goal_long_run': goal_long_run.round(2),
		// 'longest_run_since_monday': longest_run_since_monday.round(2),
		// 'long_run_improved': long_run_improved,
		// 'miles_left_minus_long_run_goal': miles_left_minus_long_run_goal.round(2),
		// 'days_left_minus_long_run': days_left_minus_long_run
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_week: 0,
		goal_long_run: 0,
		longest_run_since_monday: 0,
		long_run_improved: false,
		miles_left_minus_long_run_goal: 0,
		days_left_minus_long_run: 0,
		most_recent_run_today: false
	})
	const [random, setRandom] = useState(false)
	const [daysOff, setDaysOff] = useState(0)
	const [milesGoal, setMilesGoal] = useState(0)
	const [longRun, setLongRun] = useState(0)
	const [fetchedMilesGoal, setFetchedMilesGoal] = useState(0)
	const [mostRecentRunToday, setMostRecentRunToday] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>('');


	useEffect(() => {
		// Fetch the data from the API endpoint
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mileage-report`)
		.then((response) => {
			if (response.ok) {
			return response.json()
			}
			throw new Error('Failed to fetch data')
		})
		.then((data) => {
			setData(data);
			setImageUrl(`${process.env.REACT_APP_BACKEND_URL}/images/${data.moving_time_by_day_plot}`);
		})
		.catch((error) => console.error('Error fetching data:', error))
	}, [])
 

	useEffect(() => {
		setMilesGoal(data.next_week_goal)
		setFetchedMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.goal_long_run)
		setMostRecentRunToday(data.most_recent_run_today)
		const newDaysLeft = data.days_left - (mostRecentRunToday ? 1 : 0)
		setDaysLeft(newDaysLeft)
		console.log(fetchedData)
		console.log(data.most_recent_run_today)
		console.log(data)
	}, [data])

	const handleDaysOff = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(daysLeft)


		const newDaysOff = Math.min(daysOff + incr)
		if (newDaysOff >= 0 && newDaysOff < daysLeft) {
			setDaysOff(newDaysOff)
		}
	}

	const handleMilesGoal = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(daysLeft)

		const newMilesGoal = Math.floor(milesGoal + incr)
		if (newMilesGoal >= 0) {
			setMilesGoal(newMilesGoal)
		}
	}

	const handleLongRun = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(daysLeft)

		const newLongRun = longRun + incr
		if (newLongRun >= 0) {
			setLongRun(newLongRun)
		}
	}

	
	const restoreData = () => {
		setMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.goal_long_run)
	}

	const [longRunBinary, setLongRunBinary] = useState(0)
	const [daysLeft, setDaysLeft] = useState(7)

	useEffect(() => {
  // This will run whenever the milesGoal state changes
}, [milesGoal]);



	

	if (!data) {
		return <p>Loading...</p>
	}

	const {
		week_prog,
		next_week_goal,
		miles_left,
		days_zero_last_3,
		days_zero_last_14,
		total_distance_by_week_plot,
		moving_time_by_day_plot,
		days_left,
		avg_miles_left,
		longest_run_last_week,
		goal_long_run,
		longest_run_since_monday,
		long_run_improved,
		miles_left_minus_long_run_goal,
		days_left_minus_long_run,
	} = data

	
	const daysOffElement = () => (
		<><span>
			<span className='highlight little-span grey-span'>

				{Math.max(0, Math.round((milesGoal - week_prog) * 10)) / 10} miles in {daysLeft - daysOff}{' '}
				day(s) with{' '}</span></span><span>
				<span className='highlight little-span'>
					<span
						className='days-off-incr-button'
						onClick={() => handleDaysOff(-1)}>
						{'<'}
					</span>{' '}<span className="draggables" 
					// onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "daysOff")} 
					onDoubleClick={() => restoreData()}>
						{daysOff} day(s) off{' '}</span>
					<span className='days-off-incr-button' onClick={() => handleDaysOff(1)}>
						{' '}
						{">"}
					</span>
				</span>
			</span></> 
	)
	const milesGoalElement = () => (
		<span className='highlight little-span'>
						<span
							className='highlight little-span'
							 
>	
							<span
								className='days-off-incr-button'
								onClick={() => handleMilesGoal(-1)}>
								{'<'}
							</span>
							<span className='draggables' 
							// onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "milesGoal")}
  							onDoubleClick={() => restoreData()}>
								{' '}{Math.round(milesGoal * 100) / 100} miles{' '}
							</span> <span className="days-off-incr-button" onClick={() => handleMilesGoal(1)}>
            {'>'}
          </span>
							</span>{' '}
						</span>
	)
	const longRunElement = () => (
		<span className='highlight little-span'>
						<span
							className='highlight little-span'
							 
>	
							<span
								className='days-off-incr-button'
								onClick={() => handleLongRun(-1)}>
								{'<'}
							</span>
							<span className='draggables' 
							// onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "longRun")}
  							onDoubleClick={() => restoreData()}>
								{' '}{Math.round(longRun * 10) / 10} miles{' '}
							</span> <span className="days-off-incr-button" onClick={() => handleLongRun(1)}>
            {'>'}
          </span>
							</span>{' '}
						</span>
	)
	

	return (
	<div>
		{
		<div>{milesGoal < week_prog ? <>
				<h2>
					You ran{' '}
					<span className='highlight'>{week_prog.toFixed(1)} miles</span>
				, well done! </h2>
			</> : milesGoal === 0 ? <h2>
				Off to a fresh start!
			</h2> : week_prog < milesGoal ? (
			<h2>
				Only <span className='highlight'>{(Math.round((milesGoal - week_prog) * 10) / 10)} miles </span>
				to go!
			</h2>
		) : (
			<>
				<h2>
					You ran{' '}
					<span className='highlight'>{week_prog.toFixed(1)} miles</span>
				, well done! </h2>
			</>
		)}</div> }
		{imageUrl ? <><img
				src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.total_distance_by_week_plot}`}
				alt='Total Distance by Week' /><p className='img-text'>
					It's crucial to gradually increase your mileage each
					week by no more than 10% for injury prevention and safe endurance
					building.
				</p></>
		: <div className='loader'></div>}

		{milesGoal === 0 ? <div></div> : week_prog <= milesGoal ? (
			<h3>
						You have <span className='highlight'>{daysLeft} days left </span>
						to reach your goal.

			</h3>
		) : (
			<h3>Woohoo! Its time to{' '} 
			 <span className='highlight'>celebrate!</span>
			</h3>
		)}

		<div className = "mileage-report-text">
			<div>Given your goal of {milesGoalElement()} this week,</div>
		<div>you'll have to cover {daysOffElement()}</div>
		<div>including a long run of about {longRunElement()}.</div>
		</div>
		{/* <div>
		
		{milesGoal <= week_prog ? <div>whoadh</div> : milesGoal === 0 ? <h3>
						Set a <span className='highlight'>goal</span> below!

			</h3> : week_prog <= milesGoal ? (
			<h3>
						You have <span className='highlight'>{daysLeft} days left </span>
						to reach your goal.

			</h3>
		) : (
			<h3>Time to{' '} 
			 <span className='highlight'>celebrate!</span>
			</h3>
		)}</div> 
		}
		
		{/* <div>
		{milesGoal === 0 ? 
		<p>
				Let's get moving! How do you feel about a a goal of{' '}
				{milesGoalElement()} for the week?
			</p> : week_prog === 0 ? (
			<p>
				It's a new week! Time to get started on your goal of{' '}
				{milesGoalElement()}!
			</p>
		) : week_prog <= milesGoal - 5 ? (
			<>
				<p>
					Well done logging{' '}
					<span className='highlight little-span grey-span'>
						{week_prog.toFixed(1)} miles
					</span>{' '}
					this week. You're making solid progress towards your goal of{' '}
					{milesGoalElement()}, keep going!
				</p>
			</>
		) : week_prog >= milesGoal - 5 && week_prog <= milesGoal ? (
			<>
				<p>
					Excellent effort on covering{' '}
					<span className='highlight little-span grey-span'>
						{week_prog.toFixed(1)} miles
					</span>{' '}
					so far this week, you're nearing your goal of{' '}
					{milesGoalElement()}
					!
				</p>
			</>
		) : (
			<p>
				Great job on covering{' '}
				<span className='highlight little-span grey-span'>{week_prog.toFixed(1)} miles</span> this
				week! You've exceeded your goal of{' '}
				{milesGoalElement()}
				, way to go!
</p>
)}</div> */}
<div>
		{longest_run_since_monday > longest_run_last_week ? (
			<p>
				Congratulations on improving your longest run to{' '}
				<span className='highlight little-span grey-span'>
					{longest_run_since_monday.toFixed(1)} miles
				</span>
				, which is longer than last week's longest run of{' '}
				<span className='highlight little-span grey-span'>
					{longest_run_last_week.toFixed(1)}
				</span>{' '}
				miles! You have{' '}
				<span className='highlight little-span grey-span'>
					{(milesGoal - week_prog).toFixed(1)}
				</span>{' '}
				miles left to go.
			</p>
		) : (
			<div>
				{longest_run_since_monday < 0.9 * longest_run_last_week ? (
<div>
{/* {
  week_prog > milesGoal
    ? ''
    : longRun === 0
    ? (
        <p>
          If you skip the long run {longRunElement()}, you'll have {daysLeft} day(s) to complete the remaining <span className="">{Math.max(0, milesGoal - week_prog).toFixed(1)} miles</span>: {daysOffElement()}.
        </p>
      )
    : longRun > milesGoal - week_prog
    ? (
        Math.abs(longRun - (milesGoal - week_prog)) <= 0.1 * longRun
        ? (
            <p>
              Your long run of {longRunElement()} will put you slightly over your goal, but it's within 10% of the target. {daysLeft > 1 ? <span>Go for it, and use the remaining <span className= "">{daysLeft - 1} day(s)</span> to recover.</span>: <span>Go for it, and make sure to recover after!</span>}
            </p>
          )
        : (
            <p>
              Skip the long run of {longRunElement()} to avoid exceeding your weekly mileage. Instead, plan to use the next {daysLeft} day(s) to cover your remaining <span className=""> {Math.max(0, milesGoal - week_prog).toFixed(1)} miles: </span>{daysOffElement()}.
            </p>
          )
      )
    : (
        <p>
          Add a long run of {longRunElement()} if you're up to it. Then you'll have {daysLeft - 1} more day(s) for the last {(milesGoal - week_prog - longRun).toFixed(1)} miles: {daysOffElement()}.
        </p>
      )
} */}
</div>
) : longest_run_since_monday >= 0.9 * longest_run_last_week && longest_run_since_monday <= 1.1 * longest_run_last_week ? (
<div>
<p>
	{longest_run_last_week}
	{longest_run_since_monday}
Great job on your long run! You have {(milesGoal - week_prog).toFixed(1)} miles left, or {daysOffElement()}.
</p>
</div>
) : (
<div>
<p>
Good job on your long run but avoid overtraining. Keep future runs within 10% of your recent long run. Finish the week with {daysOffElement()}.
</p>
</div>
)}
			</div>
		)}</div>
	</div>
	)
}

export default MileageReport
