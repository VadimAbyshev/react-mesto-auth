import CurrentUserContext from '../../contexts/CurrentUserContext'
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation";
import { useContext, useEffect } from "react";

export default function EditProfilePopup({isOpen,onClose, onUpdateUser, isLoadingSend}){

  const currentUser = useContext(CurrentUserContext)
    
    const {value, errors, isValid, isInputValue, handleChange, reset, setValues } = useFormValidation()

    useEffect(() => {
      setValues('name', currentUser.name)
      setValues('description', currentUser.about)
    },[currentUser, setValues])


    function resetForClose() {
      onClose()
      reset({name: currentUser.name, description: currentUser.about})
    }
  
    function handleSubmit(evt){
      evt.preventDefault()
      onUpdateUser({name: value.name, description: value.description}, reset)
    }


    return(
        
      <PopupWithForm
      name = 'edit-profile'
      title ='Редактировать профиль'
      titleButton = 'Сохранить'
      isOpen = {isOpen}
      onClose ={resetForClose}
      isValid = {isValid}
      isLoadingSend={isLoadingSend}
      onSubmit={handleSubmit}
      
      >
        <div className="popup__input-form">
          <input
            type="text"
            name="name"
            className={`form__text-input form__text-input_type_name popup__input  ${isInputValue.name === undefined|| isInputValue.name ? '' : 'popup__input_invalid'}` } 
            id="name"
            placeholder="Имя"
            maxLength={40}
            minLength={2}
            required
            value={value.name ? value.name : ''}
            onChange = {handleChange}
          />
          <span className="popup__invlid-name popup__error-span" >{errors.name}</span>
        </div>
        <div className="popup__input-form">
          <input
            type="text"
            name="description"
            className={`form__text-input form__text-input_type_discription popup__input ${isInputValue.description === undefined|| isInputValue.description ? '' : 'popup__input_invalid'}`}
            id="description"
            placeholder="О себе"
            maxLength={200}
            minLength={2}
            required
            value={value.description ? value.description : ''}
            onChange = {handleChange}

          />
          <span className="popup__error-span popup__invlid-description" >{errors.description}</span>
        </div>
      </PopupWithForm>
    )
}