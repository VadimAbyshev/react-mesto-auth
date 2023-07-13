import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function EditAvatarPopup({isOpen,onClose, isLoadingSend, onUpdateAvatar}){
    const input = useRef()
    const {value, errors, isValid, isInputValue, handleChange, reset } = useFormValidation()
    
    
    function resetForClose() {
        onClose()
        reset()
      }

      function handleSubmit(evt){
        evt.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
      }
    
    
      return(
        <PopupWithForm 
        name = 'edit-avatar'
        title ='Обновить аватар'
        titleButton = 'Добавить'
        isOpen={isOpen}
        onClose ={resetForClose}
        isLoadingSend = {isLoadingSend}
        onUpdateAvatar = {onUpdateAvatar}
        isValid = {isValid}
        onSubmit={handleSubmit}

        >
          
          <div className="popup__input-form">
            <input
              ref={input}  
              type="url"
              name="avatar"
              className={`form__text-input form__text-input_type_edit-avatar popup__input ${isInputValue.avatar === undefined|| isInputValue.avatar ? '' : 'popup__input_invalid'}`}
              id="avatar"
              placeholder="Ссылка на аватар"
              required
              value={value.avatar ? value.avatar : ''}
              onChange = {handleChange}

            />
            <span className="popup__error-span popup__invlid-avatar" >{errors.avatar}</span>
          </div>
  
        </PopupWithForm>
    )
}