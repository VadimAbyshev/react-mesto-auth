import Header from "./Header/Header.jsx";
// import Main from "./Main/Main.jsx";
// import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx"
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import Register from "./Register/Register.jsx";
import InfoToolTip from "./InfoTooltip/InfoTooltip.jsx";
import Login from "./Login/Login.jsx";

import {regUser, loginUser, checkTokens} from "../utils/Auth.js"
import {  Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";


function App() { 

  const navigate = useNavigate()


//state Popup

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [isDeletePlacePopup, setDeletePlacePopup] = useState(false)
  const [isLoadingSend, setLoadingSend] = useState(false)

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false)
  const [isInfoTooltipSuccess, setInfoTooltipSuccess] = useState(false)
 
 //state Context
  const [currentUser, setCurrentUser] = useState({})

 
 //state Card
 const [cards, setCards] = useState([])
  const[isLoadingCard, setLoadingCard] = useState(true)
  const[deleteCardId, setDeleteCardId] = useState('')

const[dataUser, setDataUser] = useState('')



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
    setInfoTooltipPopupOpen(false)
  }, [])



const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopup || isDeletePlacePopup || isInfoTooltipPopupOpen

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


  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.jwt) {
      checkTokens(localStorage.jwt)
        .then(res => {
          setDataUser(res.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(error => console.log(`Ошибкак авторизации повторном входе ${error}`))
    }
  }, [navigate])


  function handleRegisterUser(password, email) {
    setLoadingSend(true)
    regUser(password, email)
      .then(res => {
        if (res) {
          setInfoTooltipPopupOpen(true);
          setInfoTooltipSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch(error => {
        setInfoTooltipPopupOpen(true);
        setInfoTooltipSuccess(false);
        console.error(`Ошибка регистрации ${error}`);
      })
      .finally(() => setLoadingSend(false));
  }


  function handleLoginUser(password, email) {
    setLoadingSend(true)
    loginUser(password, email)
      .then(res => {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true)
          navigate('/');
      })
      .catch(error => {
        console.error(`Ошибка авторизации ${error}`);
      })
      .finally(() => setLoadingSend(false));
  }


  function handleLogout(){

    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header
        dataUser = {dataUser}
        onLogout = {handleLogout}
      />
      
<Routes>

      <Route path='/' element={<ProtectedRoute
       
        onEditProfile = {handleEditProfileClick}
        onEditAvatarProfile = {handleEditAvatarClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        onBucketClick = {handleDeletePlaceClick}
        cards = {cards}
        isLoadingCard = {isLoadingCard}
        onCardLike = {handleLike}
        loggedIn={loggedIn}
        dataUser = {dataUser}
        
      />
    }
      />
      
          <Route path="/sign-up" element={
            <Register onRegister = {handleRegisterUser}
            isLoadingSend = {isLoadingSend}/>
          }/>


          <Route path="/sign-in" element={
            <Login onLogin = {handleLoginUser}
            isLoadingSend = {isLoadingSend}
        /> } 
          />

</Routes>




       
       <InfoToolTip 
       name ="tooltip"
        isOpen = {isInfoTooltipPopupOpen}
        onClose = {closeAllPropus}
        isSucess={isInfoTooltipSuccess}
       />


      <EditProfilePopup
            onUpdateUser = {handleUpdateUser}
            isOpen = {isEditProfilePopupOpen}
            onClose ={closeAllPropus}
            isLoadingSend = {isLoadingSend}
      />



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

    </div>
</CurrentUserContext.Provider>
  );
}

export default App;
