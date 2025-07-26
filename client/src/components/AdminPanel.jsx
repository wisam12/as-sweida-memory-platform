import React, { useEffect, useState } from 'react';

export default function AdminPanel() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);

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
            headers: {
                "Content-Type": "application/json"
            },
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
        <div style={{ padding: '30px', color: 'white', maxWidth: '800px', margin: 'auto' }}>
            <h2>Admin Panel - Pending Heroes</h2>
            {heroes.length === 0 ? <p>No pending heroes.</p> : (
                heroes.map(hero => (
                    <div key={hero.id} style={{ border: '1px solid #555', padding: '15px', marginBottom: '20px', borderRadius: '10px' }}>
                        <h3>{hero.name}</h3>
                        <p><strong>Submitted at:</strong> {new Date(hero.submittedAt).toLocaleString()}</p>
                        <p>{hero.story}</p>
                        <button onClick={() => handleApprove(hero.id)} style={{ marginRight: '10px' }}>✅ Approve</button>
                        <button onClick={() => handleReject(hero.id)}>❌ Reject</button>
                    </div>
                ))
            )}
        </div>
    );
}
