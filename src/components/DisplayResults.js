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
    GetActivitePhysique, GetResults
} from './GetResults';
import {ManagesResults,GetResultsFromQuestionnaire} from "./GetResults";

export default function DisplayResults() {

    const [data, setData] = useState([]);
    const [questionnaires,setQuestionnaires] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const [results,setResults] = useState([]);
    const [email, setEmail] = useState('');

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

    useEffect(() => {
        if (results.length > 0) {
            const newScores = [
                {
                    category: 'Activité physique',
                    score: GetActivitePhysique(results).valueOf(),
                },
                {
                    category: 'Marcher sans aides',
                    score: GetMarcherSansAidesPourcentage(results).valueOf(),
                },
                {
                    category: 'Vitesse marche',
                    score: GetVitesseMarchePourcentage(results).valueOf(),
                },
                {
                    category: 'Marche temps',
                    score: GetMarcheTempsPourcentage(results).valueOf(),
                },
                {
                    category: 'Capacité monter',
                    score: GetCapaciteMonterPourcentage(results).valueOf(),
                },
                {
                    category: 'Insécurité marche',
                    score: GetInsecuriteMarchePourcentage(results).valueOf(),
                },
                {
                    category: 'Pas peur du vide',
                    score: GetPasPeurVidePourcentage(results).valueOf(),
                },
                {
                    category: 'Equilibre',
                    score: GetEquilibrePourcentage(results).valueOf(),
                },
                {
                    category: 'Sans douleurs',
                    score: GetSansDouleursPourcentage(results).valueOf(),
                },
                {
                    category: 'Mobilité',
                    score: GetMobilitePourcentage(results).valueOf(),
                },
            ];
            setData(newScores);
        }
    }, [results]);

    const sendEmail = () => {
        const body = "Bonjour, \n\n"+"Voici vos résultats du questionnaire :\n\n" + "Activité physique: " + GetActivitePhysique(results) + "%"+ "\n"
            + "Marcher sans aides: " + GetMarcherSansAidesPourcentage(results) + "%"+ "\n"
            + "Vitesse marche: " + GetVitesseMarchePourcentage(results) + "%"+ "\n"
            + "Marche temps: " + GetMarcheTempsPourcentage(results) + "%"+ "\n"
            + "Capacité monter: " + GetCapaciteMonterPourcentage(results) + "%"+ "\n"
            + "Insécurité marche: " + GetInsecuriteMarchePourcentage(results) + "%"+ "\n"
            + "Pas peur du vide: " + GetPasPeurVidePourcentage(results) + "%"+ "\n"
            + "Equilibre: " + GetEquilibrePourcentage(results) + "%"+ "\n"
            + "Sans douleurs: " + GetSansDouleursPourcentage(results) + "%"+ "\n"
            + "Mobilité: " + GetMobilitePourcentage(results) + "%"+ "\n\n"
            + "Merci de nous avoir fait confiance.\n\n"
            + "Votre team FitnessCheck"
        ;
        const subject = "Résultats du questionnaire";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }


    return (
        <div>
            {questionnaires.length > 0 ? (
                <div>
                    <select value={selectedQuestionnaire} onChange={(e) => setSelectedQuestionnaire(e.target.value)}>
                        <option disabled={selectedQuestionnaire !== null} value={null}>
                            Sélectionner un questionnaire
                        </option>
                        {questionnaires.map((questionnaire, index) => (
                            <option key={index}>{questionnaire.date}</option>
                        ))}
                    </select>
                    {selectedQuestionnaire !== null && (
                        <>
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
                            <GetResults />
                            <div>
                                <label htmlFor="email">Entrez votre adresse mail :</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <button onClick={sendEmail}>Envoyer par email</button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <p>Aucun questionnaire disponible.</p>
            )}
        </div>
    );
}


