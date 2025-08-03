import React, { useEffect, useState } from 'react';
import AdminHeroCard from '../components/AdminHeroCard'; // נתיב לפי המבנה שלך
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchHeroes = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/pending-heroes');
        const data = await res.json();
        setHeroes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleApprove = async (id) => {
        await fetch("http://localhost:5000/api/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ folderName: id })
        });
        fetchHeroes();
    };

    const handleReject = async (id) => {
        await fetch(`http://localhost:5000/api/reject/${id}`, { method: 'DELETE' });
        fetchHeroes();
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: '30px', color: 'white' }}>
            <h2>Admin Panel - Pending Heroes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {heroes.length === 0 ? <p>No pending heroes.</p> : (
                    heroes.map(hero => (
                        <AdminHeroCard
                            key={hero.id}
                            hero={hero}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onClick={() => navigate('/hero', { state: { hero } })}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
