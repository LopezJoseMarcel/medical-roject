import React from "react";
import '../styles/InfoPatient.css'
import PatientInfoTreatment from "../components/PatientInfoTreatment";
import PatientInfoDisease from "../components/PatientInfoDisease";
import PatientInfoComponent from "../components/PatientInfoComponent";

const PatientInfoContainer = ({user}) => {
    return (
      <div className="super-container" >
        <PatientInfoComponent user={user} />
        <PatientInfoDisease user={user} />
        <PatientInfoTreatment user={user} />
      </div>
    );
};

export default PatientInfoContainer;