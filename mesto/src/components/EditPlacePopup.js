import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup ({isOpen, onClose, onPostCard}) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation(false)

    function handleSubmit(e) {
        e.preventDefault();

        onPostCard({
            name: values.name,
            link: values.link,
        });
        onClose()
        resetForm({name:'', link:''},{},false)
    }
    function handleChangeInput(e) {
        handleChange(e)
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }
    
    function handleOnClose() {
        onClose()
        resetForm({name:'', link:''},{},false)
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={handleOnClose}
            title={'Новое место'}
            name={'place'}
            label={'Добавить место'}
            isActive={isValid}
        >
            <fieldset name='place' className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.name || ''}
                        onChange={handleChangeInput}
                        className="popup__edit"
                        name="name"
                        placeholder="Название"
                        id="input-place"
                        type="text"
                        required
                        minLength={2}
                        maxLength={30}
                    />
                    <span className="popup__input-error input-place-error">
                            {!isValid && errors.name}
                        </span>
                </label>
            </fieldset>
            <fieldset name='place' className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.link || ''}
                        onChange={handleChangeInput}
                        type="url"
                        className="popup__edit"
                        name="link"
                        id="input-link"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error input-link-error">
                            {!isValid && errors.link}
                        </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup