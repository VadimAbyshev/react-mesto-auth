export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isLoadingSend, isValid=true}){
    return (
        <div className={`popup popup_type_${name}  ${isOpen && 'popup_opened'}` } onClick={onClose}>
        <div className={`popup__container ${name === 'edit-avatar'  && 'popup__container_avatar'} ${name === 'delete'  && 'popup__container_delete-card'}`}
        onClick={(evt => evt.stopPropagation())}>
          <button className="popup__close-button decoration" type="button" onClick={onClose}/>
          <h2 className={`popup__title`}>{title}</h2>
          <form
            action="#"
            className="form popup__form"
            name={name}
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className={`form__save-button decoration popup__save-button ${isValid ? '':  'popup__button_disabled'} ` }
              
            > {isLoadingSend ? titleButton +'...' : titleButton}
              
            </button>
          </form>
        </div>
      </div>   
    )
}