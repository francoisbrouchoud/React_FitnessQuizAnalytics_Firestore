import React, {useEffect, useState} from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import {
    GetWalkingWithoutAidsPercentage,
    GetSpeedWalkingPercentage,
    GetNotFearHeightsPercentage,
    GetBalancePercentage,
    GetWalkingInsecurityPercentage,
    GetAbilityClimbPercentage,
    GetWalkingTimePercentage,
    GetMobilityPourcentage,
    GetPainlessPercentage,
    GetPhysicalActivity,
    GetResults
} from './GetResults';
import {Link} from "react-router-dom";


/**
 * Function that determines the items to be displayed as results
 * @param query1 - function to call to define the questionnaires to be displayed
 * @param query2 - function to call to define the results to be displayed
 * @param sourceElem - element that defines the place (the page) where the results are displayed.
 * @returns {JSX.Element} - items to display
 * @constructor
 */
export default function DisplayResults({query1,query2, sourceElem}) {

    const [data, setData] = useState([]);
    const [questionnaires,setQuestionnaires] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const [results,setResults] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchQuestionnaires(){
            const listQuestionnaires = await query1(); //ManagesResults();
            setQuestionnaires(listQuestionnaires);
        }
        fetchQuestionnaires();
    },[selectedQuestionnaire]);

    useEffect(() =>{
        //Reset Results
        setResults([]);
        async function fetchResults(){
            if(selectedQuestionnaire){

                const [email, resultDate] = selectedQuestionnaire.split(' : ');
                let myResults = null;

                //Call different methods depending on where you want to display the result (Resultats or GroupLeader)
                if (sourceElem === "RESULTATS")
                {
                    myResults = await query2(selectedQuestionnaire); //GetResultsFromQuestionnaire(selectedQuestionnaire);
                }
                else if(sourceElem === "GROUPLEADER")
                {
                    myResults = await query2(email,resultDate); //GetResultsFromUserAndDate(email,resultDate);
                }
                else
                {
                    console.error("ERROR SOURCE")
                }
                setResults(myResults);
            }
        }
        fetchResults();
    },[selectedQuestionnaire]);

    useEffect(() => {
        if (results.length > 0) {
            //data for the radarplot
            const newScores = [
                {
                    category: 'Activité physique',
                    score: GetPhysicalActivity().valueOf(),
                },
                {
                    category: 'Marcher sans aides',
                    score: GetWalkingWithoutAidsPercentage().valueOf(),
                },
                {
                    category: 'Vitesse marche',
                    score: GetSpeedWalkingPercentage().valueOf(),
                },
                {
                    category: 'Marche temps',
                    score: GetWalkingTimePercentage().valueOf(),
                },
                {
                    category: 'Capacité monter',
                    score: GetAbilityClimbPercentage().valueOf(),
                },
                {
                    category: 'Insécurité marche',
                    score: GetWalkingInsecurityPercentage().valueOf(),
                },
                {
                    category: 'Pas peur du vide',
                    score: GetNotFearHeightsPercentage().valueOf(),
                },
                {
                    category: 'Equilibre',
                    score: GetBalancePercentage().valueOf(),
                },
                {
                    category: 'Sans douleurs',
                    score: GetPainlessPercentage().valueOf(),
                },
                {
                    category: 'Mobilité',
                    score: GetMobilityPourcentage().valueOf(),
                },
            ];
            setData(newScores);
        }
    }, [results]);

    //constant to allow part of the results to sent by mail
    const sendEmail = () => {
        const body = "Bonjour, \n\n"+"Voici vos résultats du questionnaire :\n\n" + "Activité physique: " + GetPhysicalActivity() + "%"+ "\n"
            + "Marcher sans aides: " + GetWalkingWithoutAidsPercentage() + "%"+ "\n"
            + "Vitesse marche: " + GetSpeedWalkingPercentage() + "%"+ "\n"
            + "Marche temps: " + GetWalkingTimePercentage() + "%"+ "\n"
            + "Capacité monter: " + GetAbilityClimbPercentage() + "%"+ "\n"
            + "Insécurité marche: " + GetWalkingInsecurityPercentage() + "%"+ "\n"
            + "Pas peur du vide: " + GetNotFearHeightsPercentage() + "%"+ "\n"
            + "Equilibre: " + GetBalancePercentage() + "%"+ "\n"
            + "Sans douleurs: " + GetPainlessPercentage() + "%"+ "\n"
            + "Mobilité: " + GetMobilityPourcentage() + "%"+ "\n\n"
            + "Merci de nous avoir fait confiance.\n\n"
            + "Votre team FitnessCheck"
        ;
        const subject = "Résultats du questionnaire";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }

    //constant to allow downloading of raw results
    const downloadResults = () => {
        const data = JSON.stringify(results, null, 2);
        const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        //downloaded text name
        link.download = selectedQuestionnaire+".txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="results">
            <div className="card card-title">
                <h1>Résultats et recommandations</h1>
            </div>
            {/*Control to display the following when there is at least one completed questionnaire */}
            {questionnaires.length > 0 ? (
              <div className="card card-advice info-card">
                  <div className="selectResult">
                      <span>Sélectionner un questionnaire : </span>
                      {/*Control of the element to determine what to display in the desired location */}
                      {sourceElem === "RESULTATS" ?
                          (
                              <select value={selectedQuestionnaire} onChange={(e) => setSelectedQuestionnaire(e.target.value)}>
                                  <option disabled={selectedQuestionnaire !== null} value={null}>
                                      Sélectionner un questionnaire
                                  </option>
                                  {questionnaires.map((questionnaire, index) => (
                                      <option key={index}>{questionnaire.date}</option>
                                  ))}
                              </select>
                          )
                          :
                          (
                              <select value={selectedQuestionnaire} onChange={(e) => setSelectedQuestionnaire(e.target.value)}>
                                  <option disabled={selectedQuestionnaire !== null} value={null}>
                                      Sélectionner un questionnaire
                                  </option>
                                  {questionnaires.map((questionnaire, index) => (
                                      <option key={index}> {questionnaire.userEmail} : {questionnaire.date}</option>
                                  ))}
                              </select>
                          )}

                  </div>
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
                            <div className="buttons card card-result">
                                <h2>Partager mes résultats</h2>
                                <label htmlFor="email">Entrez votre adresse mail : </label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <button className="primary-button" onClick={sendEmail}>Envoyer par email</button>
                                <button className="primary-button" onClick={downloadResults}>
                                    Télécharger les résultats
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                //items to be displayed when there is no completed questionnaire
                <div className="card info-card">
                    <p>Aucun résultat n'est disponible pour le moment.</p>
                    <Link to="/questionnaire">
                        <button className="primary-button">Faire le quiz</button>
                    </Link>
                </div>
            )}
        </div>
    );
}


