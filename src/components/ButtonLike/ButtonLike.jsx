import { useEffect, useState } from "react"

//чтобы не рендерить весь App
export default function ButtonLike({onCardLike, myId, card}) {

    const[isLike, setIsLike] = useState(false)


    useEffect(() => {
        setIsLike(card.likes.some(item => myId === item._id))

    },[card, myId])



    return(    
        <div className="element__info_like-container">
            <button className={`decoration element__like-button ${isLike ? 'element__like-button_active' : ''}`} type="button" onClick={()=> onCardLike(card)}/>
            <span className="element__like-counter">{card.likes.length}</span>
        </div>
  
  )

    
}