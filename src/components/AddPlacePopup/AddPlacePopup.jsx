import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation"


export default function AddPlacePopup({isOpen,onClose, isLoadingSend, onAddPlace}){


    const {value, errors, isValid, isInputValue, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
      }

      function handleSubmit(evt){
        evt.preventDefault()
        onAddPlace({title: value.title, link: value.link}, reset)
      }

    return(
        
        <PopupWithForm
        name = 'add-card'
        title ='Новое место'
        titleButton = 'Добавить'
        isOpen={isOpen}
        isValid={isValid}
        onClose ={resetForClose}
        onSubmit={handleSubmit}
        isLoadingSend = {isLoadingSend}
        >
          <div className="popup__input-form">
        <input
          type="text"
          name="title"
          className={`form__text-input form__text-input_type_place-name popup__input ${isInputValue.title === undefined|| isInputValue.title ? '' : 'popup__input_invalid'}`}
          id="place-name"
          placeholder="Название"
          maxLength={30}
          minLength={2}
          required
          value={value.title ? value.title : ''}
          onChange = {handleChange}
        />
        <span className="popup__error-span popup__invlid-title" >{errors.title}</span>
      </div>
      <div className="popup__input-form">
        <input
          type="url"
          name="link"
          className={`form__text-input form__text-input_type_link popup__input ${isInputValue.link === undefined|| isInputValue.link ? '' : 'popup__input_invalid'}`}
          id="place-link"
          placeholder="Ссылка на картинку"
          required
          value={value.link ? value.link : ''}
          onChange = {handleChange}
        />
        <span className="popup__error-span popup__invlid-link">{errors.link}</span>
      </div></PopupWithForm>
    )
}