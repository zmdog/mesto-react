import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const linkRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            link: linkRef.current.value,
        });
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={'Обновить аватар'}
            name={'avatar'}
            label={'Сохранить'}
            isActive={'inactive'}
        >
            <fieldset className="popup__set">
                <label className="popup__field">
                    <input
                        ref={linkRef}
                        type="url"
                        className="popup__edit"
                        name="link"
                        id="input-avatar"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error input-avatar-error"/>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup