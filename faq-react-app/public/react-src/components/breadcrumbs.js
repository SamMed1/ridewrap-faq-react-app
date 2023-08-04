import { h, render, createElement } from "preact";
import {useEffect, useState} from 'react';

const Breadcrumbs = ({ all, cat }) => {

    const breadcrumbsArray = all.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').replaceAll('', '').split(',');

    let associatedTagsHTML = breadcrumbsArray.map((link) =>
        <li>{link}</li>
    );
 
    function itemView() {
        if ( cat.length == 0 ) {
            return (
                <ul>
                    <li>Support center home</li>
                    <li>All</li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li>Support center home</li>
                    {associatedTagsHTML}
                </ul>
            )
        }
    }

    return (
        <div class="rw-app-breadcrumbs">
            <nav>
                {itemView()}
            </nav>
        </div>
    )
}

export default Breadcrumbs;