import React, {useEffect, useState} from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import {
    GetMarcherSansAidesPourcentage,
    GetVitesseMarchePourcentage,
    GetPasPeurVidePourcentage,
    GetEquilibrePourcentage,
    GetInsecuriteMarchePourcentage,
    GetCapaciteMonterPourcentage,
    GetMarcheTempsPourcentage,
    GetMobilitePourcentage,
    GetSansDouleursPourcentage,
    GetActivitePhysique
} from './GetResults';
import {ManagesResults,GetResultsFromQuestionnaire} from "./GetResults";

export default function DisplayResults() {

    const [data, setData] = useState([
        {
            category: 'Activité physique',
            score: GetActivitePhysique().valueOf(),
        },
        {
            category: 'Marcher sans aides',
            score: GetMarcherSansAidesPourcentage().valueOf(),
        },
        {
            category: 'Vitesse marche',
            score: GetVitesseMarchePourcentage().valueOf(),
        },
        {
            category: 'Marche temps',
            score: GetMarcheTempsPourcentage().valueOf(),
        },
        {
            category: 'Capacité monter',
            score: GetCapaciteMonterPourcentage().valueOf(),
        },
        {
            category: 'Insécurité marche',
            score: GetInsecuriteMarchePourcentage().valueOf(),
        },
        {
            category: 'Pas peur du vide',
            score: GetPasPeurVidePourcentage().valueOf(),
        },
        {
            category: 'Equilibre',
            score: GetEquilibrePourcentage().valueOf(),
        },
        {
            category: 'Sans douleurs',
            score: GetSansDouleursPourcentage().valueOf(),
        },
        {
            category: 'Mobilité',
            score: GetMobilitePourcentage().valueOf(),
        },
    ]);
    const [questionnaires,setQuestionnaires] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const [results,setResults] = useState([]);

    const test = [
        { id: "AQst", points : "0"},
        { id: "BQst01", points: "0" },
        { id: "BQst02", points: "0" },
        { id: "BQst03", points: "0" },
        { id: "BQst04", points: "0" },
        { id: "BQst05", points: "0" },
        { id: "BQst06", points: "0" },
        { id: "BQst07", points: "0" },
        { id: "BQst08", points: "0" },
        { id: "BQst09", points: "0" },
        { id: "BQst10", points: "0" },
        { id: "BQst11", points: "0" },
        { id: "BQst12", points: "0" },
        { id: "BQst13", points: "0" },
        { id: "BQst14", points: "0" },
        { id: "BQst15", points: "0" },
    ];

    useEffect(() => {
        async function fetchQuestionnaires(){
            const listeQuestionnaires = await ManagesResults();
            setQuestionnaires(listeQuestionnaires);
        }
        fetchQuestionnaires();
    },[]);

    useEffect(() =>{
        async function fetchResults(){
            if(selectedQuestionnaire){
                const myResults = await GetResultsFromQuestionnaire(selectedQuestionnaire);
                setResults(myResults);
            }
        }
        fetchResults();
    },[selectedQuestionnaire]);

    const getText = () => {
    if(selectedQuestionnaire === null || selectedQuestionnaire === "Sélectionner un questionnaire"){
    } else {
        return `Le questionnaire sélectionné est ${selectedQuestionnaire}`;
    }
    };

    return (
        <div>
            <div>
                <select value={selectedQuestionnaire} onChange={(e) => setSelectedQuestionnaire(e.target.value)}>
                    <option value={null}>Sélectionner un questionnaire</option>
                    {questionnaires.map((questionnaire, index) => (
                        <option key={index}>{questionnaire.date}</option>
                    ))}
                </select>
                <p>{getText()}</p>
            </div>
            <div style={{ height: '400px' }}>
                <ResponsiveRadar
                    data={data}
                    keys={['score']}
                    indexBy="category"
                    maxValue={100}
                    valueFormat=">-.2f"
                    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                    borderColor={{ from: 'color', modifiers: [] }}
                    gridLabelOffset={20}
                    dotSize={9}
                    dotColor={{ theme: 'background' }}
                    dotBorderWidth={2}
                    colors={{ scheme: 'paired' }}
                    fillOpacity={0.9}
                    blendMode="multiply"
                    motionConfig="wobbly"
                />
            </div>
        </div>
    );
}


