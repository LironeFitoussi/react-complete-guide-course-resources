'use client';

export default function Error({ error }) {
    return (
        <main className="error">
            <h1>Something went wrong!</h1>
            <p>Failed to create meal, {error?.message || 'An unexpected error occurred.'}</p>
        </main>
    );
};