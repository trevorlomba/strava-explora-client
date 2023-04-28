import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CadenceReport from './CadenceReport';
import RestReport from './RestReport';
import { useSwipeable } from 'react-swipeable'; // Import the Swipeable component

const ReportSlider = () => {
  const [reportsIndex, setReportsIndex] = useState(0);
  const reportsArray = ['Rest', 'Cadence'];

  const handleBack = () => {
    const newReportsIndex = reportsIndex - 1;
    setReportsIndex(newReportsIndex < 0 ? reportsArray.length - 1 : newReportsIndex);
  };

  const handleNext = () => {
    const newReportsIndex = (reportsIndex + 1) % reportsArray.length;
    setReportsIndex(newReportsIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handleBack(),
  });

  return (
    <div {...swipeHandlers}>
      <h2>
        {reportsArray.length > 1 && (
          <span className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
            <span className="sr-only">Back</span>
          </span>
        )}
        {reportsArray[reportsIndex]} Analysis
        {reportsArray.length > 1 && (
          <span className="next-button" onClick={handleNext}>
            <FontAwesomeIcon icon={faAngleRight} className="next-icon" />
            <span className="sr-only">Next</span>
          </span>
        )}
      </h2>

      <div {...swipeHandlers}>
        <div className="report-slider">
          {reportsArray[reportsIndex] === 'Rest' ? <RestReport /> : <div></div>}
          {reportsArray[reportsIndex] === 'Cadence' ? <CadenceReport /> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default ReportSlider;