import { h, render, createElement } from "preact";
import {useEffect, useState} from 'react';

const allFilters = [];

const FilterSection = ({ sendMostRecentFilter, associated, sendAll, sendUnpin, resUP, orderedTags }) => {
    // Set cat var.
    const [cat, setCat] = useState( '' );
    // Set all cats var.
    const [all, setAll] = useState( '' );
    // Set unpin cat var.
    const [unpin, setUnpin] = useState( '' );


    useEffect(() => {
        /**
         * Functionality for dynamically setting the filters based on URL parameters.
         * Example URL: www.ridewrap.com/ca/en/faq/?filter=diy
         * Limited to one initial filter option. The user then needs to make their own selection after this.
         */
        const queryParams = new URLSearchParams(window.location.search)
        const term = queryParams.get("filter")

        if ( term ) {
            // setCat( term );
            // pushUp( term );

            setTimeout(function(){
                var a = document.getElementById(term);
                a.click();
            }, 1000);
        }

        /**
         * Functionality for dynamically setting the filters based on URL.
         * Example URL: www.ridewrap.com/ca/en/faq/?title=do-i-need-an-account
         */
        const title = getLastUrlSegment(window.location.href);

        function getLastUrlSegment(url) {
            return new URL(url).pathname.split('/').filter(Boolean).pop();
        }

        if ( title ) {
            setTimeout(function(){
                var b = document.getElementById("faq-title-" + title);
                if ( b ) {
                    b.click();
                } else {
                }
            }, 1000);
        }
    }, [])

    // Remove pinned item from all filters array.
    const index = allFilters.indexOf(unpin);
    if (index > -1) { // only splice array when item is found
        allFilters.splice(index, 1); // 2nd parameter means remove one item only
    }

    /**
     * On click, push up the non-pinned target element back to the all filters array.
     *
     * @param {string} el The data-tag of the element.
     */
    function pushUp( el ) {
        allFilters.push( el );
        console.log('push up el')
    }

    // When there is nothing in the filters, reset it to show all tags.
    if ( allFilters.length === 0 ) {
        // allFilters.length = 0;
        setCat( '' ); // reset our currently selected cat variable.
        setUnpin( '' );
    }

    // Set cleaned all cats var.
    let pinnedTags = [...new Set(allFilters)];

    // Pass our cleaned all cats to our 'all' var.
    setAll( JSON.stringify(pinnedTags) );
    
    // Debugs.
    // console.log('all filters ( unique )', pinnedTags)
    // console.log('all filters ( all )', allFilters);
    console.log(' ');
    console.log('pinned:', pinnedTags)
    console.log('unpin:', unpin)
    
    /**
     * On any filter item click.
     *
     * @param {object} e The targetted element.
     */
    function handleClick( e ) {
        // e.preventDefault();
        setAll( '' );
        setCat( e.target.id );

        if ( e.target.classList.contains('c-tag-item-pinned') ) {
            // console.log('is pinned');
            setUnpin( e.target.id );
        } else {
            pushUp(e.target.id);
            // console.log('refresh please')
            setUnpin('');
        }
    }
    
    /**
     * On clear filters click.
     */
    function clearFilters() {
        allFilters.length = 0; // reset our all filters variable.
        setCat( '' ); // reset our currently selected cat variable.
    }

    // Send all our selected filter data to app.js, for passing to results function.
    sendMostRecentFilter(cat);// most recent filter selected.
    sendAll(all);// all filters selected.
    sendUnpin(unpin);// filters to be unpinned.

    /**
     * Build pinned tags based off of allFilters var.
     * Only display if more than one filter option has been selected.
     */
    function PinnedTags() {
        const listItems = pinnedTags.map((link) =>
            <span className="c-tag-item c-tag-item-pinned" id={link} data-tag={link} onClick={handleClick}>
                <h5>{link}</h5>
            </span>
        );
        if ( cat != 0) {
            return (
                <div className="c-tag-group"> {listItems} </div>
            )
        }
    }

    /**
     * Clear all filters component.
     */
    function ClearAll() {
        let [caclass, setca] = useState( '' );

        if ( cat != 0) {
            setca('c-clear-filters');
            console.log('hide helper');
            const helper = document.querySelector('.c-filter-helper');
            helper.classList.add('hide');
        } else {
            setca('c-clear-filters no-border');
        }

        return (
            <span className={caclass} onClick={clearFilters} >Clear all <div></div></span>
        )
    }

    console.log('pinned stuff', pinnedTags);

    // Pull in our associated tags, convert from string to array.
    // deprecated: const associatedTagsCleaned = associated.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').replaceAll('', '').split(',');
    // console.log('associated array', associatedTagsCleaned);

    // This is where we are grabbing and cleaning up our tag count data.
    var associatedTagsWithCount = [];

    if ( orderedTags ) { // if ordered tags data has been sent from resultWrapper to filterSection ( this )..

        var orderedTagsParsed = JSON.parse(orderedTags);
        var associatedTagsWithCount = [];

        for ( var i in orderedTagsParsed ) { // for each item in ordered tags array.
            if ( pinnedTags.includes(orderedTagsParsed[i]['item']) == false ) { // .. if a tag is NOT found in the current list of pinned tags..
                associatedTagsWithCount.push( orderedTagsParsed[i] ); // .. push it to the count array, which will then be used to create the associated tags html.
            }
        }
        console.log('associated tags with counter', associatedTagsWithCount);
    }

    /**
     * Clear all filters component.
     */
    function AssociatedTagsHTML() {
        let associatedTagsHTML = associatedTagsWithCount.map((link) =>
            <span className={ 'c-tag-item' } id={link.item} data-tag={link.item} data-count={link.count} onClick={handleClick}>
                <h5>{link.item.replace("-", " ")}</h5>
            </span>
        );

        if ( associatedTagsWithCount != '' ) {
            return associatedTagsHTML;
        }
    }

    /**
     * Filter helper instructions.
     */
    function FilterHelper() {
        return (
            <div class="c-filter-helper">
                <p><i class="fas fa-info-circle"></i>Use our tag filter below to help find the FAQ that answers your question.</p>
            </div>
        )
    }

    return (
        <div class="c-tags-filter">
            <nav>
                <FilterHelper/>
                <ClearAll/>
                <PinnedTags/>
                <div class="c-tag-group c-tag-group-associated fade-opacity" key={Math.random()}>
                    <AssociatedTagsHTML/>
                </div>
            </nav>
            {/* <code>DEV DEBUG: SELECTED CAT IS '{ JSON.stringify(pinnedTags) }'</code> */}
        </div>
    )
}

export default FilterSection;