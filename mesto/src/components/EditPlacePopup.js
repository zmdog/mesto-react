import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose, onPostCard}) {
    const linkRef = React.useRef()
    const nameRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onPostCard({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}
            title={'Новое место'}
            name={'place'}
            label={'Добавить место'}
            isActive={'inactive'}
        >
            <>
                <fieldset name='place' className="popup__set">
                    <label className="popup__field">
                        <input
                            ref={nameRef}
                            className="popup__edit"
                            name="name"
                            placeholder="Название"
                            id="input-place"
                            type="text"
                            required=""
                            minLength={2}
                            maxLength={30}
                        />
                        <span className="popup__input-error input-place-error"/>
                    </label>
                </fieldset>
                <fieldset name='place' className="popup__set">
                    <label className="popup__field">
                        <input
                            ref={linkRef}
                            type="url"
                            className="popup__edit"
                            name="link"
                            id="input-link"
                            placeholder="Ссылка на картинку"
                            required=""
                        />
                        <span className="popup__input-error input-link-error"/>
                    </label>
                </fieldset>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup