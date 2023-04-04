import React from "react";
import "../styles/PatientDisease.css";

const PatientDisease = () => {
    return (
        <div  className="chronic-disease">
            <h3>Diagnóstico presuntivo</h3>
            <div  className="disease-info">
            <ul>
                <li>Hipertención</li>
            </ul>
            </div> 
            <h3>Diagnóstico definitivo</h3>
            <div  className="disease-info">
            <ul>
                <li>No hay información</li>
            </ul>
            </div> 
        </div>    
    );
}

export default PatientDisease;

