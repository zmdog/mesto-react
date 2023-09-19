function PopupWithForm(props) {


    return (
        <div onClick={props.onClose} className={`popup popup_type_${props.name} popup_${props.isOpen? 'opened':'closed'}`}>
            <div className="popup__wrapper popup__wrapper_default">
                <button
                    title="Закрыть модальное окно"
                    aria-label="Закрыть модальное окно"
                    type="button"
                    className="button popup__close-button"
                ></button>
                <h2 className="popup__purpose">{props.title}</h2>
                <form
                    noValidate=""
                    name={props.name}
                    className={`popup__container popup__container_type_${props.name}`}
                >
                    {props.children}
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
