import React, { useState } from 'react';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiClass, setBmiClass] = useState(null);
  const [bmiComment, setBmiComment] = useState('');

  function calculateBMI() {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiClass('underweight');
      setBmiComment('Votre IMC indique que vous êtes maigre. Vous pourriez avoir besoin de prendre du poids pour atteindre un poids santé.');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setBmiClass('normal');
      setBmiComment('Félicitations ! Votre IMC indique que vous avez un poids santé. C\'est un excellent résultat !');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setBmiClass('overweight');
      setBmiComment('Votre IMC indique que vous êtes en surpoids. Vous pourriez avoir besoin de perdre du poids pour atteindre un poids santé.');
    } else if (bmiValue >= 30) {
      setBmiClass('obese');
      setBmiComment('Votre IMC indique que vous êtes en surpoids. Vous pourriez avoir besoin de perdre du poids pour atteindre un poids santé.');
    }
  }

  return (
    <div>
      <h1>Calculateur d'IMC</h1>
      <label>
        Taille (en cm):
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </label>
      <br />
      <label>
        Poids (en kg):
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateBMI}>Calculer l'IMC</button>
      {bmi && (
        <div className={`bmi-result ${bmiClass}`}>
          <p>Votre IMC est : {bmi}</p>
          <p>{bmiComment}</p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
