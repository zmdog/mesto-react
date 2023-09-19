function ImagePopup(props) {

        return(
            <div onClick={props.onClose} className={`popup popup_type_image popup_${props.card.id? 'opened': 'closed'}`}>
                <div className="popup__wrapper popup__wrapper_image">
                    <button
                        title="Закрыть модальное окно"
                        aria-label="Закрыть модальное окно"
                        type="button"
                        className="button popup__close-button popup__close-button_image"
                    ></button>
                    <img className="popup__image" src={props.card.link} alt={`Фото: ${props.card.name}`} aria-label={`Фото: ${props.card.name}`} />
                    <p className="popup__title">{props.card.name}</p>
                </div>
            </div>
        )

}

export default ImagePopup;
