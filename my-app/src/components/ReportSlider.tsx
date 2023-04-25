import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CadenceReport from './CadenceReport';
import RestReport from './RestReport';


const ReportSlider = () => {
  const navigate = useNavigate();
  const [reportsIndex, setReportsIndex] = useState(0);
  const reportsArray = ['/strava-explora-client/rest', '/strava-explora-client/cadence'];

  const [reportsIndexNoNav, setReportsIndexNoNav] = useState(0);
  const reportsArrayNoNav = ['rest', 'cadence'];

  const handleBack = () => {
    const newReportsIndex = reportsIndex - 1;
    // setReportsIndex(newReportsIndex < 0 ? reportsArray.length - 1 : newReportsIndex);
  };

  const handleNext = () => {
    const newReportsIndex = (reportsIndex + 1) % reportsArray.length;
    setReportsIndex(newReportsIndex);
  };

  const handleBackNoNav = () => {
    // set the index to the last element in the array if the index is the last element in the array, otherwise decrement the index
    const newReportsIndex = reportsIndexNoNav - 1 < 0 ? reportsArray.length - 1 : reportsIndexNoNav - 1;
    setReportsIndexNoNav(newReportsIndex)
    // setReportsIndex(newReportsIndex < 0 ? reportsArray.length - 1 : newReportsIndex);
  };

  const handleNextNoNav = () => {
    // set the index to 0 if the index is the last element in the array
    const newReportsIndex = (reportsIndexNoNav + 1) % reportsArray.length;
    setReportsIndexNoNav(newReportsIndex);
  };

  // useEffect(() => {
  //   navigate(reportsArray[reportsIndex]);
  // }, [reportsIndex]);



  return (
    <div>
      {<h2>{reportsArrayNoNav.length > 1 ? <span className="back-button" onClick={handleBackNoNav}>
        <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
         
         {/* {'<'} */}
        <span className="sr-only">Back</span>
      </span> : ''}
      {/* show the value as a string with the first letter capitalized */}
      {reportsArrayNoNav[reportsIndexNoNav][0].toUpperCase() + reportsArrayNoNav[reportsIndexNoNav].slice(1)}
       {' '}Analysis{reportsArrayNoNav.length > 1 ? <span className="next-button" onClick={handleNextNoNav}> 
        <FontAwesomeIcon icon={faAngleRight} className="next-icon" />
        {/* <span className="sr-only">Next</span> */}
      </span>: ''}</h2>}
      
        <div className="report-slider">
      {/* <Routes>
        <Route path="/strava-explora-client/cadence" element={<CadenceReport />} />
        <Route index path="/strava-explora-client/rest" element={<RestReport />} />
      </Routes> */}
      {reportsArrayNoNav[reportsIndexNoNav] === 'rest' ? <RestReport /> : <div></div>}
      {reportsArrayNoNav[reportsIndexNoNav] === 'cadence' ? <CadenceReport /> : <div></div>}
      
      
    </div>
      </div>
  );
};

export default ReportSlider;
