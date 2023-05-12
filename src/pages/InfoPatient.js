import React from "react";
import '../styles/InfoPatient.css'
import PatientGeneralInfo  from "../components/PatientGeneralInfo";
import PatientDisease from "../components/PatientDisease";
import DiseaseTreatment from "../components/DiseaseTreatment";

const InfoPatient = () => {
    return (
      <div className="super-container" >
        <PatientGeneralInfo></PatientGeneralInfo>
        <PatientDisease></PatientDisease>
        <DiseaseTreatment></DiseaseTreatment>
      </div>
    );
};

export default InfoPatient;