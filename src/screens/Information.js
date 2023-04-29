import {Link} from "react-router-dom";

/**
 * Displays the information page of the application.
 * It contains information about the team and the application.
 * It also contains the main links to the developer's website.
 * @returns {JSX.Element} : the information page of the application
 * @constructor
 */
export default function Information() {
  return (
    <div className="infoContent">
      <div className="card card-title">
        <h1>Informations</h1>
      </div>
      <div className="card info-card">
        <p>Nous sommes une équipe de cinq passionnés de sport et de technologie qui ont créé cette application React pour aider les utilisateurs à prendre soin de leur santé et de leur bien-être.</p>
        <p>Notre équipe est composée de personnes pratiquant différents sports, tels que la course à pied, les parcours, le fitness et le football. Nous avons mis à profit notre expérience personnelle pour concevoir une application qui s'adresse à tous les types d'utilisateurs, qu'ils soient débutants ou expérimentés.</p>
        <p>Notre application Fitness Check est conçue pour poser des questions générales sur la forme physique des utilisateurs, ainsi que des questions plus spécifiques, pour mieux comprendre leur état de santé et leur niveau de forme physique. Nous utilisons ces informations pour fournir à nos utilisateurs des conseils personnalisés et une vue d'ensemble de leur forme physique sur un radar Plot.</p>
        <p>Notre application est facile à utiliser et dispose d'une interface utilisateur conviviale. Nous avons mis l'accent sur la simplicité pour que les utilisateurs puissent répondre aux questions en toute facilité, et ainsi obtenir des conseils clairs et pertinents.</p>
        <p>Chez Fitness Check, nous sommes engagés à aider nos utilisateurs à atteindre leurs objectifs de santé et de bien-être. Nous croyons que chaque petit pas compte, et que des habitudes de vie saines peuvent faire une grande différence à long terme.</p>
        <p>Si vous avez des questions ou des commentaires sur notre application, n'hésitez pas à nous contacter. Nous sommes toujours ravis d'entendre les retours de nos utilisateurs et de travailler à l'amélioration de notre application.</p>
        <h2>Contact</h2>
        <ul className="contact-list">
            <li><a href="mailto:julienne.betrisey@students.hevs.ch">Julienne Bétrisey</a></li>
            <li><a href="mailto:theo.clerc@students.hevs.ch">Théo Clerc</a></li>
            <li><a href="mailto:arthur.avez@students.hevs.ch">Arthur Avez</a></li>
            <li><a href="mailto:elias.borrajo@students.hevs.ch">Elias Borrajo</a></li>
            <li><a href="mailto:francois.brouchoud@hevs.ch">François Brouchoud</a></li>
        </ul>
        <Link to={"/"}>
          <button className="primary-button">Fermer</button>
        </Link>
      </div>
    </div>
  );
}
