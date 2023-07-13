import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx"
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() { 
//state Popup

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [isDeletePlacePopup, setDeletePlacePopup] = useState(false)
  const [isLoadingSend, setLoadingSend] = useState(false)
 
 //state Context
  const [currentUser, setCurrentUser] = useState({})

 
 //state Card
 const [cards, setCards] = useState([])
  const[isLoadingCard, setLoadingCard] = useState(true)
  const[deleteCardId, setDeleteCardId] = useState('')





 useEffect(() =>{
  setLoadingCard(true)
  Promise.all([api.getInfo(), api.getCards()])

  .then(([dataUser, dataCard])  =>{
    
     setCurrentUser(dataUser) 
      dataCard.forEach(
          data => data.myid = dataUser._id
     
      );
      setCards(dataCard)
      setLoadingCard(false)
  })
  .catch((error => console.error(`Ошибка ответа от сервера ${error}`)))
},[])


const handleLike = useCallback((cards) => {
  const isLike = cards.likes.some(item => currentUser._id === item._id)

  if(isLike){
  
    api.delLike(cards._id)
    .then(res => {
        setCards(state => state.map((c) => c._id === cards._id ? res : c)) 

    })

    .catch((err) => console.error(`Ошибка снятия лайка ${err}`))
} 
  else {
    api.addLike(cards._id)
      .then(res => {
        setCards(state => state.map((c) => c._id === cards._id ? res : c)) 
      })
      .catch((err) => console.error(`Ошибка установки лайка ${err}`))


  }
}, [currentUser._id])


  


function DeleteCardSubmit(evt){
  evt.preventDefault()
  setLoadingSend(true)
  api.delCard(deleteCardId)
    .then(res =>{
      setCards(cards.filter(item => {
        return item._id !== deleteCardId
      }))
      closeAllPropus()
      setLoadingSend(false)
    })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
}


  const closeAllPropus = useCallback (() =>{
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImagePopup(false)
    setDeletePlacePopup(false)
  }, [])

  // const closePopupByEsc = useCallback ((evt)=> {
  // if(evt.key === 'Escape'){
  //   closeAllPropus()
  //   document.removeEventListener('keydown' , closePopupByEsc)
  // }}, [closeAllPropus] )


const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopup || isDeletePlacePopup

useEffect(() => {
    if (!isOpen) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        closeAllPropus()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen]);


  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }

  function handleDeletePlaceClick(cardId){
    setDeleteCardId(cardId)
    setDeletePlacePopup(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
    setImagePopup(true)
  }

  function handleUpdateUser(dataUser, reset){
    setLoadingSend(true)
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPropus()
      reset()
      setLoadingSend(false)
    })
    .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
  }

  function handleUpdateAvatar(dataUser, reset){
    setLoadingSend(true)
    api.setNewAvatar(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPropus()
      reset()
      setLoadingSend(false)
    })
    .catch((error => console.error(`Ошибка редактирования аватара ${error}`)))
  }


  function handleAddPlaceSubmit(dataCard, reset){
    setLoadingSend(true)
    api.addCard(dataCard)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPropus()
      reset()
      setLoadingSend(false)
    })
    .catch((error => console.error(`Ошибка добавления карточки ${error}`)))
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className="page">

      <Header/>

      <Main
        onEditProfile = {handleEditProfileClick}
        onEditAvatarProfile = {handleEditAvatarClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        onBucketClick = {handleDeletePlaceClick}
        cards = {cards}
        isLoadingCard = {isLoadingCard}
        onCardLike = {handleLike}
      />

      <Footer/>

      <EditProfilePopup
            onUpdateUser = {handleUpdateUser}
            isOpen = {isEditProfilePopupOpen}
            onClose ={closeAllPropus}
            isLoadingSend = {isLoadingSend}
      />

      {/* <PopupWithForm 
      name = 'edit-profile'
      title ='Редактировать профиль'
      titleButton = 'Сохранить'
      isOpen = {isEditProfilePopupOpen}
      onClose ={closeAllPopups}
      
      >
        <div className="popup__input-form">
          <input
            type="text"
            name="name"
            className="form__text-input form__text-input_type_name popup__input"
            id="name"
            placeholder="Имя"
            maxLength={40}
            minLength={2}
            required=""
          />
          <span className="popup__invlid-name popup__error-span" />
        </div>
        <div className="popup__input-form">
          <input
            type="text"
            name="description"
            className="form__text-input form__text-input_type_discription popup__input"
            id="description"
            placeholder="О себе"
            maxLength={200}
            minLength={2}
            required=""
          />
          <span className="popup__error-span popup__invlid-description" />
        </div>
      </PopupWithForm> */}



         <AddPlacePopup
              onAddPlace = {handleAddPlaceSubmit}
              isOpen = {isAddPlacePopupOpen}
              onClose ={closeAllPropus}
              isLoadingSend = {isLoadingSend}
         />

         <EditAvatarPopup 
      onUpdateAvatar = {handleUpdateAvatar}
      isOpen={isEditAvatarPopupOpen}
      onClose ={closeAllPropus}
      isLoadingSend = {isLoadingSend}
      />




         <PopupWithForm 
      name =  'delete'
      title ='Вы уверены?'
      titleButton = 'Да'
      isOpen={isDeletePlacePopup}
      onClose={closeAllPropus}
      onSubmit = {DeleteCardSubmit}
      isLoadingSend = {isLoadingSend}
      
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose ={closeAllPropus}/>

      {/* <div className="popup popup_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button decoration" type="button" />
          <h2 className="popup__title">Редактировать профиль</h2>
          <form
            action="#"
            className="form popup__form form_edit-profile"
            name="edit-info"
            noValidate=""
          >
            <button
              type="submit"
              className="form__save-button decoration popup__save-button"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_add-card">
        <div className="popup__container">
          <button className="popup__close-button decoration" type="button" />
          <h2 className="popup__title">Новое место</h2>
          <form
          action="#" className="form form_add-card popup__form" name="place-add" noValidate=""
          >
            
            <button
              type="submit"
              className="form__save-button decoration popup__save-button "
            >
              Добавить
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_edit-avatar">
        <div className="popup__container popup__container_avatar">
          <button className="popup__close-button decoration" type="button" />
          <h2 className="popup__title">Обновить аватар</h2>
          <form
            action="#"
            className="form form_edti-avatar popup__form"
            name="edit-avatar"
            noValidate=""
          >

            <button
              type="submit"
              className="form__save-button decoration popup__save-button "
            >
              Добавить
            </button>
          </form>
        </div>
      </div> */}


      {/* <div className="popup popup_open-card">
        <figure className="popup__figure-card">
          <button className="popup__close-button decoration" type="button" />
          <img className="popup__figure-image" src="#" alt="#" />
          <figcaption className="popup__figure-caption" />
        </figure>
      </div> */}


      {/* <div className="popup popup_delete-card">
        <div className="popup__container popup__container_delete-card">
          <button className="popup__close-button decoration" type="button" />
          <h2 className="popup__title popup__title_delete-card">Вы уверены?</h2>
          <form
            action="#"
            className="form form_delete-card popup__form"
            name="delete-card"
            noValidate=""
          >
            <button
              type="submit"
              className="form__save-button decoration popup__save-button popup__delete-save "
            >
              Да
            </button>
          </form>
        </div> */}
    </div>
</CurrentUserContext.Provider>
  );
}

export default App;
