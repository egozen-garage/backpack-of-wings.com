import React from 'react';
import { UploadStoriesIntro } from './UploadStoriesIntro.js';

export function Workshop() {
    return (
        <>
            <div class="uploadstoriespage">
                <UploadStoriesIntro trigger={true}></UploadStoriesIntro>
                <div class="px-9">
                    <h1>Workshop</h1>
                </div>
            </div>
            
        </>
    )
}