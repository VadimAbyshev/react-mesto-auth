import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ButtonLike from "../ButtonLike/ButtonLike.jsx";
export default function Card({card, onCardClick, onBucketClick,onCardLike }){

  const currentUser = useContext(CurrentUserContext)


    return(
        <div className="element">
          {currentUser._id === card.owner._id &&  <button className="decoration element__bucket-button" onClick={() => onBucketClick(card._id)} />}

        <img className="element__image" alt={card.name} src={card.link} onClick={() => onCardClick({link: card.link, name: card.name})} />
        <div className="element__info">
          <h2 className="element__title" >{card.name}</h2>
          <ButtonLike likes={card.likes} myId={currentUser._id} card={card} onCardLike={onCardLike}/>
        </div>
      </div>
      
    )
}