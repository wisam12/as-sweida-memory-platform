import React, { useState } from 'react';
import './UploadHeroModal.css';
import { useLanguage } from '../LanguageContext';

const translations = {
    ar: {
        uploadTitle: "أضف قصة بطل",
        nameLabel: ":اسم البطل",
        storyLabel: ":القصة",
        profileImageLabel: ":صورة الملف الشخصي",
        imagesLabel: ":صور إضافية",
        videosLabel: ":فيديوهات",
        submit: "إرسال",
        sent: "تم إرسال النموذج"
    },
    en: {
        uploadTitle: "Upload Hero Story",
        nameLabel: "Hero Name:",
        storyLabel: "Story:",
        profileImageLabel: "Profile Picture:",
        imagesLabel: "Additional Images:",
        videosLabel: "Videos:",
        submit: "Submit",
        sent: "Form submitted successfully"
    }
};

const UploadHeroModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        story: '',
        profileImage: null,
        images: [],
        videos: []
    });

    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            if (name === "profileImage") {
                setFormData((prev) => ({ ...prev, profileImage: files[0] }));
            } else {
                setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("story", formData.story);

        if (formData.profileImage) {
            form.append("profileImage", formData.profileImage);
        }

        formData.images.forEach((file) => form.append("images", file));
        formData.videos.forEach((file) => form.append("videos", file));

        try {
            const response = await fetch("http://localhost:5000/api/submit-hero", {
                method: "POST",
                body: form,
            });

            if (response.ok) {
                alert(t.sent);
                setShowModal(false);
            } else {
                const errText = await response.text();
                console.error("Server Error:", errText);
                alert("⚠️ Something went wrong:\n" + errText);
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("❌ Network error – check server is running");
        }
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

                            <label>{t.profileImageLabel}</label>
                            <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />

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
