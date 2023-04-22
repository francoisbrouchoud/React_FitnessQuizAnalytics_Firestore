import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import {GetMarcherSansAidesPourcentage, GetVitesseMarchePourcentage,GetPasPeurVidePourcentage, GetEquilibrePourcentage, GetInsecuriteMarchePourcentage, GetCapaciteMonterPourcentage, GetMarcheTempsPourcentage, GetMobilitePourcentage, GetSansDouleursPourcentage} from './GetResults';

export default function DisplayResults() {



    //TODO - Gérer pour afficher les scores en pourcentage (à faire probablement dans GetResults)


    const [data, setData] = useState([
        {
            category: 'Activité physique',
            score1: 2/6*100,
            score2: 1/6*100
        },
        {
            category: 'Marcher sans aides',
            score1: GetMarcherSansAidesPourcentage().valueOf(),
            score2: 3/5*100
        },
        {
            category: 'Vitesse marche',
            score1: GetVitesseMarchePourcentage().valueOf(),
            score2: 3/5*100
        },
        {
            category: 'Marche temps',
            score1: GetMarcheTempsPourcentage().valueOf(),
            score2: 9/60*100
        },
        {
            category: 'Capacité monter',
            score1: GetCapaciteMonterPourcentage().valueOf(),
            score2: 6/27*100
        },
        {
            category: 'Insécurité marche',
            score1: GetInsecuriteMarchePourcentage().valueOf(),
            score2: 3/5*100
        },
        {
            category: 'Pas peur du vide',
            score1: GetPasPeurVidePourcentage().valueOf(),
            score2: 100-(1/1*100)
        },
        {
            category: 'équilibre',
            score1: GetEquilibrePourcentage().valueOf(),
            score2: 2/2*100
        },
        {
            category: 'Sans douleurs',
            score1: GetSansDouleursPourcentage().valueOf(),
            score2: 100-3/5*100
        },
        {
            category: 'mobilité',
            score1: GetMobilitePourcentage().valueOf(),
            score2: 100-(3/5*100)
        },
    ]);

    //TODO - A rajouter le lien <GetResults/> à la fin de la DIV
    return (
        <div style={{ height: '400px' }}>
            <ResponsiveRadar
                data={data}
                keys={['score1','score2']}
                indexBy="category"
                maxValue={100}
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: 'color', modifiers: [] }}
                gridLabelOffset={20}
                dotSize={9}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                fillOpacity={0.9}
                blendMode="multiply"
                motionConfig="wobbly"
            />

            <p>Test : </p>
        </div>
    );
}
