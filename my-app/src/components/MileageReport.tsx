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
	longest_run_last_2_weeks: number
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
		// 'longest_run_last_2_weeks': longest_run_last_2_weeks.round(2),
		// 'goal_long_run': goal_long_run.round(2),
		// 'longest_run_since_monday': longest_run_since_monday.round(2),
		// 'long_run_improved': long_run_improved,
		// 'miles_left_minus_long_run_goal': miles_left_minus_long_run_goal.round(2),
		// 'days_left_minus_long_run': days_left_minus_long_run
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_2_weeks: 0,
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
		longest_run_last_2_weeks: 0,
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
		// 'longest_run_last_2_weeks': longest_run_last_2_weeks.round(2),
		// 'goal_long_run': goal_long_run.round(2),
		// 'longest_run_since_monday': longest_run_since_monday.round(2),
		// 'long_run_improved': long_run_improved,
		// 'miles_left_minus_long_run_goal': miles_left_minus_long_run_goal.round(2),
		// 'days_left_minus_long_run': days_left_minus_long_run
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_2_weeks: 0,
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


	const [counter, setCounter] = React.useState(100);

	const intervalRef = React.useRef<NodeJS.Timer | null>(null);
		React.useEffect(() => {
			return () => stopCounter(); // when App is unmounted we should stop counter
		}, []);

  const startCounterMilesGoalIncrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setMilesGoal((prevMilesGoal) => prevMilesGoal + 1);
    }, 100);
  };
  const startCounterMilesGoalDecrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
		if(milesGoal > 0) { 
      setMilesGoal((prevMilesGoal) => Math.max(0, prevMilesGoal - 1));}
    }, 100);
  };

  const startCounterDaysOffIncrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
		if (daysOff < daysLeft - 1){
      setDaysOff((prevDaysOff) => Math.min(daysLeft, prevDaysOff + 1));}
    }, 100);
  };
  const startCounterDaysOffDecrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
		if(daysOff > 0) { 
      setDaysOff((prevDaysOff) => Math.max(0, prevDaysOff - 1));}
    }, 100);
  };

    const startCounterLongRunIncrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setLongRun((prevLongRun) => prevLongRun + 1);
    }, 100);
  };
  const startCounterLongRunDecrement = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
		if(longRun > 0) { 
      setLongRun((prevLongRun) => Math.max(0, prevLongRun - 1));}
    }, 100);
  };


  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
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
		setLongRun(data.longest_run_last_2_weeks * 1.1)
		setMostRecentRunToday(data.most_recent_run_today)
		const newDaysLeft = data.days_left - (mostRecentRunToday ? 1 : 0)
		setDaysLeft(newDaysLeft)
		console.log(fetchedData)
		console.log(data.most_recent_run_today)
		console.log(data)
		const newLongRun = data.long_run_improved ? 0 : data.longest_run_since_monday
		setLongRun(newLongRun)
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

	 const containerStyle = {
    height: '300px',
    width: '300px',
  };

  const elementStyle = {
    margin: '5px',
    height: `${counter}px`,
    width: `${counter}px`,
    background: 'radial-gradient(at 25% 25%, #2b86c5, #562b7c, #ff3cac)',
    border: '2px solid black',
    borderRadius: '50%',
    boxShadow: '10px 5px 5px #BEBEBE',
  };

	
	const restoreData = () => {
		setMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.long_run_improved ? 0 : data.longest_run_since_monday)
	}

	const [longRunBinary, setLongRunBinary] = useState(0)
	const [daysLeft, setDaysLeft] = useState(7)

	const [dragging, setDragging] = useState(false);
const [startX, setStartX] = useState(0);
const [draggedState, setDraggedState] = useState<"milesGoal" | "daysOff" | "longRun">("milesGoal");

const handleMouseDown = (
  e: React.MouseEvent<HTMLSpanElement>,
  state: "milesGoal" | "daysOff" | "longRun"
) => {
  e.preventDefault();
  setDragging(true);
  setStartX(e.clientX);
  setDraggedState(state);
};

const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
  if (dragging) {
    e.preventDefault();
    const deltaX = e.clientX - startX;
    const deltaValue = deltaX * 0.01;

    switch (draggedState) {
      case "milesGoal":
        setMilesGoal(milesGoal + deltaValue);
        break;
      case "daysOff":
		const newDaysOff = daysOff + Math.round(deltaValue * 30)
		if (newDaysOff >= 0 && newDaysOff < daysLeft) {
        setDaysOff(newDaysOff);}
        break;
      case "longRun":
		const newLongRun = longRun + deltaValue
		if (newLongRun >= 0) {

       	 setLongRun(longRun + deltaValue);}
        break;
      default:
        break;
    }

    setStartX(e.clientX);
  }
};

const handleMouseUp = () => {
  setDragging(false);
};


	useEffect(() => {
  if (milesGoal < longRun) {
	setMilesGoal(longRun)
  }
}, [longRun]);



	

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
		longest_run_last_2_weeks,
		goal_long_run,
		longest_run_since_monday,
		long_run_improved,
		miles_left_minus_long_run_goal,
		days_left_minus_long_run,
	} = data

	
	const formatMiles = (miles: number) => {
  const formattedMiles = Math.round(miles * 100) / 100;
  return Number(formattedMiles.toFixed(2));
};

const handleTouchStart = (
  e: React.TouchEvent<HTMLSpanElement>,
  state: "milesGoal" | "daysOff" | "longRun"
) => {
  e.preventDefault();
  setDragging(true);
  setStartX(e.touches[0].clientX);
  setDraggedState(state);
};

const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
  if (dragging) {
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    const deltaValue = deltaX * 0.01;

    switch (draggedState) {
      case "milesGoal":
        setMilesGoal(milesGoal + deltaValue);
        break;
      case "daysOff":
        const newDaysOff = daysOff + Math.round(deltaValue * 30);
        if (newDaysOff >= 0 && newDaysOff < daysLeft) {
          setDaysOff(newDaysOff);
        }
        break;
      case "longRun":
        setLongRun(longRun + deltaValue);
        break;
      default:
        break;
    }

    setStartX(e.touches[0].clientX);
  }
};

const handleTouchEnd = () => {
  setDragging(false);
};

const daysOffElement = () => (
  <>
    <span
	>
      <span className="highlight little-span white-span" 
	  >
        {Math.max(0, (milesGoal - week_prog)).toFixed(2)} miles in{" "}
        {daysLeft - daysOff} day(s)  </span>with{" "}
     
    </span>
    <span>
      <span className="highlight little-span">
        <span
          className="days-off-incr-button"
          onMouseDown={startCounterDaysOffDecrement}
          onMouseUp={stopCounter}
          onMouseLeave={stopCounter}
		  onTouchStart={startCounterDaysOffDecrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
        >
       {" "}
          {"<"}
		  {" "}
        </span>
        <span
    className="draggables"
	onDoubleClick={() => restoreData()}
    onMouseDown={(e) => handleMouseDown(e, "daysOff")}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
	onTouchStart={(e) => handleTouchStart(e, "daysOff")}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
  >
   {" "} {daysOff} day(s) off{" "}
  </span>
        <span
          className="days-off-incr-button"
          onMouseDown={startCounterDaysOffIncrement}
          onMouseUp={stopCounter}
          onMouseLeave={stopCounter}
		  onTouchStart={startCounterDaysOffIncrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
        >
          {" "}
          {">"}
          {" "}
        </span>
      </span>
    </span>
  </>
);

const milesGoalElement = () => (
  <span className="highlight little-span" 
  >
    <span className="highlight little-span">
      <span
        className="days-off-incr-button"
        onMouseDown={startCounterMilesGoalDecrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
		onTouchStart={startCounterMilesGoalDecrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
      >
        {"<"}
      </span>
      <span
    className="draggables"
	onDoubleClick={() => restoreData()}
    onMouseDown={(e) => handleMouseDown(e, "milesGoal")}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
	onTouchStart={(e) => handleTouchStart(e, "milesGoal")}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
  >
    {" "}
    {milesGoal.toFixed(2)} miles{" "}
  </span>{" "}
      <span
        className="days-off-incr-button"
        onMouseDown={startCounterMilesGoalIncrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
		 onTouchStart={startCounterMilesGoalIncrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
      >
        {">"}
      </span>
    </span>{" "}
  </span>
);

const longRunElement = () => (
  <span className="highlight little-span"
  >
    <span className="highlight little-span">
      <span
        className="days-off-incr-button"
        onMouseDown={startCounterLongRunDecrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
		onTouchStart={startCounterLongRunDecrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
      >
        {"<"}
      </span>
     <span
    className="draggables"
	onDoubleClick={() => restoreData()}
    onMouseDown={(e) => handleMouseDown(e, "longRun")}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
	onTouchStart={(e) => handleTouchStart(e, "longRun")}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
  >
    {" "}
    {longRun.toFixed(2)} miles{" "}
  </span>{" "}
      <span
        className="days-off-incr-button"
        onMouseDown={startCounterLongRunIncrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
		onTouchStart={startCounterLongRunIncrement}
    onTouchEnd={stopCounter}
    onTouchCancel={stopCounter}
      >
        {">"}
      </span>
    </span>{" "}
  </span>
);

	return (
	<div>
		{/* <div style={containerStyle}>
      <div
        onMouseDown={startCounterMilesGoalIncrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
      <div
        onMouseDown={startCounterMilesGoalDecrement}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
    </div> */}
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
					You ran{' '}
					<span className='highlight'>{week_prog.toFixed(1)} miles</span>{' '}
				so far! 
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
					week by 10%-15% for injury prevention and safe endurance
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
		<div>or <span className = "highlight little-span orange-span">{Math.max(0,((milesGoal - week_prog) / (daysLeft - daysOff))).toFixed(2)} miles per day</span>.</div>
		<div><p>{' '}</p></div>
		{!long_run_improved ? <div><div>Plan a long run of {longRunElement()} or so if you haven't yet.</div>
		{milesGoal - week_prog - longRun > 0 ? <><div>That'd bring you about{' '} 
			<span className="highlight little-span white-span">
				{Math.max(0, milesGoal - week_prog - longRun).toFixed(2)} miles from your goal{daysLeft - daysOff - 1 > 0 ? ',' : '.'}</span></div> {daysLeft - daysOff - 1 > 0 ? 
				<div>or <span className="highlight little-span orange-span">{(Math.max((milesGoal - week_prog - longRun), 0) / Math.max(1, (daysLeft - daysOff - 1))).toFixed(2)} miles per day</span>.</div> : <div></div>}</> : <div>That'd bring you to your goal of <span className = "highlight little-span white-span">{milesGoal.toFixed(2)} miles</span>.</div>}</div>: <><div>Great job on getting a long run of <span className="highlight little-span white-span">{longest_run_since_monday.toFixed(2)} miles</span> in this week! </div><div>If you hit {longRunElement()} on your next run,</div><div>you'll be left with <span className="highlight little-span orange-span">{(Math.max((milesGoal - week_prog - longRun), 0) / Math.max(1, (daysLeft - daysOff - 1))).toFixed(2)} miles per day</span> for the rest.</div></>}
		

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

	</div>
	)
}

export default MileageReport
