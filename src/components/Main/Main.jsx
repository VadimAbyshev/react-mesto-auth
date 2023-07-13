import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Spinner from "../Spinner/Spinner.jsx";


export default function Main({onEditProfile, onEditAvatarProfile, onAddPlace, onCardClick, onBucketClick, cards, isLoadingCard, onCardLike}) {
    
    const currentUser = useContext(CurrentUserContext)

   


    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar-content">
                        <button className="profile__button-avatar" type="button"  onClick={onEditAvatarProfile}/>
                        <img className="profile__avatar" alt="Фотография профиля" src={currentUser.avatar ? currentUser.avatar : '#'} />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name" > {currentUser.name ? currentUser.name : 'Пользователь'} </h1>
                        <button className="profile__button-edit decoration" type="button" onClick = {onEditProfile} />
                        <p className="profile__description" >{currentUser.about ? currentUser.about : 'О себе'}</p>
                    </div>
                </div>
                <button className="profile__button-add decoration" type="button" onClick={onAddPlace}/>
            </section>
            <section className="elements">

                {isLoadingCard ? <Spinner/> : cards.map(data => 
                {
                    return (
                        <div className="element" key={data._id}> <Card card={data} onCardClick={onCardClick} onBucketClick={onBucketClick} onCardLike={onCardLike}/> </div>
                    )
                }
                )}
    {/* <Spinner/> */}
                </section>
        </main>
    );
}