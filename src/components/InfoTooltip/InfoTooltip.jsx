import React from "react";
import isSuces from '../../images/isSucess.png'
import isFail from '../../images/isFail.png'


export default function InfoToolTip({isSucess, onClose, isOpen}) {
  return (
    <div className={`popup popup_type_tooltip  ${isOpen && 'popup_opened'}` } onClick={ onClose} >
      <div className="popup__container">
      <button className="popup__close-button decoration" type="button"   onClick={ onClose}/>
        {isSucess ? (
          <>
            <img
              src={`${isSuces}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />

            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
         ) : (
           <>
             <img 
             src={`${isFail}`}
               alt="Регистрация не была выполнена."
               className="popup__tooltip_image"
             />
             <p className="popup__tooltip_message">
               Что-то пошло не так. Попробуйте ещё раз!
             </p>
           </>
        ) }

      </div>
    </div>
  );
}

