import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation(false)

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            link: values.link,
        });

        onClose()
        resetForm({link:''},{}, false)
    }

    function handleChangeInput(e) {
        handleChange(e)

        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    function handleOnClose() {
        onClose()
        resetForm({link:''},{}, false)
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onClose={handleOnClose}
            onSubmit={handleSubmit}
            title={'Обновить аватар'}
            name={'avatar'}
            label={'Сохранить'}
            isActive={isValid}
        >
            <fieldset className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.link || ''}
                        onChange={handleChangeInput}
                        type="url"
                        className="popup__edit"
                        name="link"
                        id="input-avatar"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error input-avatar-error">
                        {!isValid && errors.link}
                    </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup