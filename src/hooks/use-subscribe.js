'use client';

import { useState } from 'react';

export function useSubscribe() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error | already
    const [message, setMessage] = useState('');

    const reset = () => {
        setEmail('');
        setStatus('idle');
        setMessage('');
    };

    const subscribe = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!email) {
            setStatus('error');
            setMessage('Please enter an email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('https://spotyflex.com/api/subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            let data;
            try {
                data = await response.json();
            } catch (err) {
                data = { error: 'Invalid response from server' };
            }

            if (response.status === 409) {
                setStatus('already');
                setMessage("You're already subscribed!");
                return;
            }

            if (!response.ok) {
                setStatus('error');
                setMessage(data.error || 'Subscription failed. Try again later.');
                return;
            }

            setStatus('success');
            setMessage("You're in! Check your inbox.");
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Network error. Please try again.');
        }
    };

    return { email, setEmail, status, message, subscribe, reset };
}
