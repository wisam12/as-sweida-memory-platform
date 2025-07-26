import React, { useState } from 'react';
import './UploadHeroModal.css';
import { useLanguage } from '../LanguageContext';

const translations = {
    ar: {
        uploadTitle: "أضف قصة بطل",
        nameLabel: ":اسم البطل",
        storyLabel: ":القصة",
        imagesLabel: ":صور",
        videosLabel: ":فيديوهات",
        submit: "إرسال",
        sent: "تم إرسال النموذج (وهمي - لم يتم بعد تفعيل السيرفر)"
    },
    en: {
        uploadTitle: "Upload Hero Story",
        nameLabel: "Hero Name:",
        storyLabel: "Story:",
        imagesLabel: "Images:",
        videosLabel: "Videos:",
        submit: "Submit",
        sent: "Form submitted (mock - backend not implemented yet)"
    }
};

const UploadHeroModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        story: '',
        images: [],
        videos: []
    });

    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t.sent);
        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>
                📤 Upload
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div
                        className="modal-content"
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                    >
                        <button
                            className="close-button"
                            style={{ left: lang === 'ar' ? '15px' : 'unset', right: lang === 'ar' ? 'unset' : '15px' }}
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>

                        <h2>{t.uploadTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>{t.nameLabel}</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                            <label>{t.storyLabel}</label>
                            <textarea name="story" value={formData.story} onChange={handleChange} required />

                            <label>{t.imagesLabel}</label>
                            <input type="file" name="images" onChange={handleChange} accept="image/*" multiple />

                            <label>{t.videosLabel}</label>
                            <input type="file" name="videos" onChange={handleChange} accept="video/*" multiple />

                            <button type="submit">{t.submit}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadHeroModal;
