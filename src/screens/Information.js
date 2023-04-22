import {Link} from "react-router-dom";

export default function Information() {
  return (
    <div className="infoContent">
      <div className="card card-title">
        <h1>Informations</h1>
      </div>
      <div className="card info-card">
        <p>Lorem ipsum dolor sit amet. Sed consequatur consectetur id itaque autem aut officiis quaerat ad voluptas numquam sed excepturi animi qui minus tempore? Sit facere omnis est enim ipsum ut eveniet neque sit nulla quod! Ut illum quasi sit culpa dignissimos est dolor omnis et magnam magni in assumenda fugiat. </p>
        <p>Ut expedita omnis et voluptatem saepe et enim exercitationem. Vel tempora error aut beatae repellat et consequuntur unde qui explicabo omnis qui labore quia. Sed nisi quam ea aliquam aliquid et sint autem. Sed galisum consequuntur cum omnis explicabo non dolor autem in itaque ratione.</p>
        <Link to={"/"}>
          <button className="primary-button">Fermer</button>
        </Link>
      </div>
    </div>
  );
}
