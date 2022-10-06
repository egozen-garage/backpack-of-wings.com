import React from 'react';
import { useParams } from 'react-router-dom';

export function StoryPage() {
    const { id } = useParams()
    return (
        <>
            <div class="px-9">
                <h1>Story { id } </h1>
            </div>
        </>
    )
}