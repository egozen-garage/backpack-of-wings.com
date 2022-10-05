import React from 'react';
import { useParams } from 'react-router-dom';

export function StoryPage() {
    const { id } = useParams()
    return (
    <>
        <h1>Story { id } </h1>
    </>
    )
}