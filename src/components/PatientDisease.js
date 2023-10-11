import React, { useState, useEffect, useContext } from "react";
import "../styles/PatientDisease.css";
import Context from "../context/UserContext";
import diseasesService from "../services/diseasesService";

const PatientDisease = () => {
  const { userInfo } = useContext(Context);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisPresunt, setDiagnosisPresunt] = useState([]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const fetchPromises = userInfo.enfermedad.map((enfermedadId) =>
          diseasesService(enfermedadId)
        );
        const diagnoses = await Promise.all(fetchPromises);
        setDiagnosis(diagnoses);
      } catch (error) {
        console.error(error.message);
        const diagnoses = [];
        setDiagnosis(diagnoses);
      }
    };

    const fetchDiagnosisPresuntivo = async () => {
        try {
          const fetchPromises = userInfo.enfermedad_presuntiva.map((enfermedadId) =>
            diseasesService(enfermedadId)
          );
          const diagnoses = await Promise.all(fetchPromises);
          setDiagnosisPresunt(diagnoses);
        } catch (error) {
          console.error(error.message);
          const diagnoses = [];
          setDiagnosis(diagnoses);
        }
      };

    fetchDiagnosis();
    fetchDiagnosisPresuntivo();
  }, [userInfo.enfermedad, userInfo.enfermedad_presuntiva]);

  return (
    <div className="chronic-disease">
  <h3>Diagnóstico presuntivo</h3>
  <div className="disease-info">
    <ul>
      {diagnosisPresunt.length > 0 ? (
        diagnosisPresunt.map((item, index) => (
          <li key={index}>{item && item.nombre ? item.nombre : "No data"}</li>
        ))
      ) : (
        <li>No data</li>
      )}
    </ul>
  </div>
  <h3>Diagnóstico definitivo</h3>
  <div className="disease-info">
    <ul>
      {diagnosis.length > 0 ? (
        diagnosis.map((item, index) => (
          <li key={index}>{item && item.nombre ? item.nombre : "No data"}</li>
        ))
      ) : (
        <li>No data</li>
      )}
    </ul>
  </div>
</div>
  );
};

export default PatientDisease;
