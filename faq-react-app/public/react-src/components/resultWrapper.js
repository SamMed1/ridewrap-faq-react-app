import { h, render, createElement } from "preact";
import {useEffect, useState} from 'react';
// import {allFaqsData} from './faqTestData'; // import test data.

const ResultWrapper = ( { unpinned, cat, all, sendAssociatedTags, sendResUnpinned, sendOrderedTags } ) => {

    // Set teams site connection details here.

    // Local
    // const teamsBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTk3NDk5Yy0wMDQzLTRjZTAtOTAxNi0wMTIxMWQyZDE0NDQiLCJqdGkiOiJkYjBlODBhZWJjZjFhNTA4ZGJkYWM1ZWZhNmJjM2M0YjU4ZWU3NmZiZDE5MzA2Y2IyOTQ1OGQ0YmQwZTBlNDNkOTBmNjA5MmVkZTE3ZmJkNSIsImlhdCI6MTY4ODc1MDkxNS42MjM0NDAwMjcyMzY5Mzg0NzY1NjI1LCJuYmYiOjE2ODg3NTA5MTUuNjIzNDQyODg4MjU5ODg3Njk1MzEyNSwiZXhwIjoxNzIwMzczMzE1LjYxNTY5NTk1MzM2OTE0MDYyNSwic3ViIjoiIiwic2NvcGVzIjpbInN5cy1jbGllbnQiXX0.FUDA4kbU0CrKn3emBUuwzD7E4pSB2fvJ0nQy_4LmiW2TEPbQPHHDcQI5taYHd8MX2nA5qU5D52SRKypkXC2N4GFC6CsbFgqFISSn613CamAWDPkjF1X9dcYbakSC0sBqwn7yAcIeLs59ig59_q298sY-55Vl09JOxK3ouPUeTfa4BDluh9Xg1biSGWf8aLIs8SY9Z8QWLKAwWYjiEDhuZWR2YrGfg_eOp30O4hF81Y9aNV0pzm4r5QqGZxsG9HQ0y_2oYAMKi2oG_9eBShkz-pIbY5UugnGxTm7EOK0vGrqIp_PWVyPRFsPTeuGII7iZauWFm-y_NAwESq_QKOTjRsNeobWzafRvI0ZvH0ztiFMacAA12j45EnbUPJY2V6R3iwfVPo08SIBpFpCl3g7AvHWQv47QHWHioMkl51ZBR-Hyi_ysB0PcEYvr3XtfyqHtYE-CSlbkh0qh7-Pjt60V3dplJGwI0mHXYAFLYjE23PPn_TDIkrxoBHA4EfP2SQZqhg_UajSvzt503ona9hz1TNDRcYe7WI9dcNgU5NTShiJXKqZK4Fh5iSRMsfkjI2nIkjvl5KlV_-lof7pWUUQCAc3GrsahGf_zwJZUC9Y1zURYCZVGg5YG-o12TIe-WdQtJjVbg_FinhGmmEv9SUe6DBlZ5Ab5vY2J0-BlHQwQrM4";
    // const teamsCookieToken = "XSRF-TOKEN=eyJpdiI6IkdWNDZJemIxU056ZjN3TlJjMEVpL0E9PSIsInZhbHVlIjoibkNOa1dFbnViWEM1VVR4eDNEejJ6aGh6MG1ucGhndlpEYksxN2M5aDNhSWhENzlDSU5RR2FUNi9JMmxlLzhWeXpQUFJFZkIwOERLdTJ3akNOdVhZcDcwek5CNW50Si92cVpYOU1NY0Y2MjJsT0RMK1hHMEZFb0dhYmpVRnNtbHMiLCJtYWMiOiI4OGNmYjdlMmM5ODkzNDE4NWMwZmRlZTU0MDM1OTc0ODdjNGI1MGFiMThmNGMzOGU3MmQ0ODdhNGVmOTg2MzVhIn0%3D; laravel_session=eyJpdiI6InNuWk4zNUMwWTd4K2o4NVhFbjMyZmc9PSIsInZhbHVlIjoiTVBnY1NiYXJaNXJlbVFtSmZSWFA2aDlqZy9JbnpPb0Q5d0thRG5IQUE5eThRWEwvZVF0WExwTlNtbkZqbS80TWNrVllHelZIUnM1M3l4MVR0VnUxVW9ranBxZnRScGJuYmtxZ2dlZy9TM05vYmJDQ0g5MzFPZVBEV1ZzZ3NLckMiLCJtYWMiOiI1YzFmNDFkODE4MDk4M2M0OGE5ZjU5YjdlMDVhZDBiNjExNGVmZDhkNjVhOWJkZjNhY2YwZjUxZGE4MDk1YWNmIn0%3D";
    // const teamsFaqEndpoint = "http://localhost:8888/team.ridewrap.com/public/api/v1/faq/get-records";
    // const teamsUploadsStorage = "http://localhost:8888/team.ridewrap.com/public/storage";

    // Staging
    // const teamsBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzQ2NDNhOS1mMTkyLTQ3MzgtYTQ0MS01OGJmZTVlZmVkZTgiLCJqdGkiOiI5ODgwMDRlN2JmNzM5ZTRlMjczMTYyOTJjNTVkYzNhZjgyYjE2Mjg2MTBjZDMxYmY1ZTExNTFmMTJmMTBkMjJlNTU4YWY5YjRhZjZkMDgxNCIsImlhdCI6MTY2MzI4MDQ4OC43NDM2NTMwNTkwMDU3MzczMDQ2ODc1LCJuYmYiOjE2NjMyODA0ODguNzQzNjU3MTEyMTIxNTgyMDMxMjUsImV4cCI6MTY5NDgxNjQ4OC43Mjc0OTMwNDc3MTQyMzMzOTg0Mzc1LCJzdWIiOiIiLCJzY29wZXMiOlsic3lzLWNsaWVudCJdfQ.RjUIT931AYsQ2k3UC8xd9CBMI3gTDD5apXHrBCAR6EInZNZ2azJwsENPyxVluL13-bn5RZWN_j8TMjgqWeyW1p1O_a6FguwNZdqoh3yD-R_ALN_SUkjKaV4MMbj7T2g1Q-bfoW5DDkz0VQjYl086K8O6IJoEZ0posOXrXiONs5ZzPGA3qn8ptq-8Wj2ubs3ZKafdv4u-uvz35Yv4PGVawZKugayrqqoxZtN2QEFZfM1ixCMn_lGLBg4z-pFDPZDsN-rkPEfxtNKNJaqkM1yGp2jH7uF2V5V1lvfPwikuopX3rGNfy5gIc6C1H_jhDNAMK0vx6Mv6t4rJFEQ4KCpQKz0V4B94bU9h0S0acJyznzMqWnD2HhwIpDrezTrmbV9MbpNcvPmyY3CvwNRkfonNZsCfVsIWdAaW2cZd03IsmEn6v20M1nAIQ0Ik-dCb2KByVQ1_5xqOv62CxLcFx-P-FV6W1kmgHn1XwttdVP5L2NMyCi9DsUweNOgyrU-1v4Kzqfni8cciao_yqG5POZ_pP9NMObFbx3YxLmvhCsrDMlJ3WCXaHkdsXvNvL4hIvLND8YvBSFOWOqB_yh0ZXyZNjfVgUVjO6lKEf0ktyFVilmJ4oPvM5cnsi8-7eUcir5QtHuLTokqmxN8X_CIT7ZI91gU5FTwqwv2y58l8aTKXwXo";
    // const teamsCookieToken = "XSRF-TOKEN=eyJpdiI6IkdWNDZJemIxU056ZjN3TlJjMEVpL0E9PSIsInZhbHVlIjoibkNOa1dFbnViWEM1VVR4eDNEejJ6aGh6MG1ucGhndlpEYksxN2M5aDNhSWhENzlDSU5RR2FUNi9JMmxlLzhWeXpQUFJFZkIwOERLdTJ3akNOdVhZcDcwek5CNW50Si92cVpYOU1NY0Y2MjJsT0RMK1hHMEZFb0dhYmpVRnNtbHMiLCJtYWMiOiI4OGNmYjdlMmM5ODkzNDE4NWMwZmRlZTU0MDM1OTc0ODdjNGI1MGFiMThmNGMzOGU3MmQ0ODdhNGVmOTg2MzVhIn0%3D; laravel_session=eyJpdiI6InNuWk4zNUMwWTd4K2o4NVhFbjMyZmc9PSIsInZhbHVlIjoiTVBnY1NiYXJaNXJlbVFtSmZSWFA2aDlqZy9JbnpPb0Q5d0thRG5IQUE5eThRWEwvZVF0WExwTlNtbkZqbS80TWNrVllHelZIUnM1M3l4MVR0VnUxVW9ranBxZnRScGJuYmtxZ2dlZy9TM05vYmJDQ0g5MzFPZVBEV1ZzZ3NLckMiLCJtYWMiOiI1YzFmNDFkODE4MDk4M2M0OGE5ZjU5YjdlMDVhZDBiNjExNGVmZDhkNjVhOWJkZjNhY2YwZjUxZGE4MDk1YWNmIn0%3D";
    // const teamsFaqEndpoint = "https://staging18.team.ridewrap.com/api/v1/faq/get-records";
    // const teamsUploadsStorage = "https://staging18.team.ridewrap.com/storage";

    // Prod
    const teamsBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTNlZjI5NS0xN2IwLTQ2MjQtYWMzZi0yNWU0NmQ0NTQzNTQiLCJqdGkiOiJmNzc0NGQ0ZTdlZjA0ZjA1YzQ0MjFkOGQwMWMzMGYyNjQwYmVmNzQ4ODNjMjg2Nzg5NzA4NDZiMTg5Yzg4ZTJlMjdlMjNkMTFmOTQ0MWY0YSIsImlhdCI6MTY3OTEyOTIwNi4wOTA0NzYwMzYwNzE3NzczNDM3NSwibmJmIjoxNjc5MTI5MjA2LjA5MDQ4MTk5NjUzNjI1NDg4MjgxMjUsImV4cCI6MTcxMDc1MTYwNi4wNjkzNTgxMTA0Mjc4NTY0NDUzMTI1LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.PnQmJkV2-MGIIaLg0n4dZAY23D8YVSD0se0e-XOFNObSSPh-rHTg3_ezs_7FQUxrEzipEsXoIPofU7B5jw5i2r9C-4yQTkhpNH9gIUaxod7_zUIqE1N-d9uA42-HPrGldg-a-Cm943nwnvZjxLFDduKM6C20upxahZS5vG55zLHeVTAJhw0bO71WQaz934y0oi_rtW5IVjZYDS5kM0zyNSYbZfZCI6zz-zbEWSSnaS1ScqDnmKDmTYjLz2KkBDtgAZx5Z00yXFSV-O0p4_HgK8KlVn7wVLI4nXXzBC4cB7sYcs77OKs81Y72Zzd6w0cPuOv3g97XkaVn4z8cpXVESpnO0fDjf5VLIKfOM7sKMQQ2FBUCgnPWzmhvSaPt-jJNZW-IVSTVhDu4EbKuMpShQoLMddcF2PNLG7Q6zTUBHBopObA-JJBF-vINBI55aIJOFiaPrAzptaITNukpmik5kMvyBHbKWz64seHP7vJKo0SZwcbzStXWxhp-Bde86RjuiTLifHpNHy7DmTHAU4mG_YpdjURsMm3JQrrlEJ8AfaDctTSEhxQHGS4YbCMJIxmTFEmEfaZv66RrO0JmTaKilmG5oo31zqYi5Ea8jz3RSm-AkV63YEfoEegdsIl2-HM7dd3gmijvRbtt_s1PoM2mikbggLy-gQkSnTKH3VTaYio";
    const teamsCookieToken = "XSRF-TOKEN=eyJpdiI6IkdWNDZJemIxU056ZjN3TlJjMEVpL0E9PSIsInZhbHVlIjoibkNOa1dFbnViWEM1VVR4eDNEejJ6aGh6MG1ucGhndlpEYksxN2M5aDNhSWhENzlDSU5RR2FUNi9JMmxlLzhWeXpQUFJFZkIwOERLdTJ3akNOdVhZcDcwek5CNW50Si92cVpYOU1NY0Y2MjJsT0RMK1hHMEZFb0dhYmpVRnNtbHMiLCJtYWMiOiI4OGNmYjdlMmM5ODkzNDE4NWMwZmRlZTU0MDM1OTc0ODdjNGI1MGFiMThmNGMzOGU3MmQ0ODdhNGVmOTg2MzVhIn0%3D; laravel_session=eyJpdiI6InNuWk4zNUMwWTd4K2o4NVhFbjMyZmc9PSIsInZhbHVlIjoiTVBnY1NiYXJaNXJlbVFtSmZSWFA2aDlqZy9JbnpPb0Q5d0thRG5IQUE5eThRWEwvZVF0WExwTlNtbkZqbS80TWNrVllHelZIUnM1M3l4MVR0VnUxVW9ranBxZnRScGJuYmtxZ2dlZy9TM05vYmJDQ0g5MzFPZVBEV1ZzZ3NLckMiLCJtYWMiOiI1YzFmNDFkODE4MDk4M2M0OGE5ZjU5YjdlMDVhZDBiNjExNGVmZDhkNjVhOWJkZjNhY2YwZjUxZGE4MDk1YWNmIn0%3D";
    const teamsFaqEndpoint = "https://team.ridewrap.com/api/v1/faq/get-records";
    const teamsUploadsStorage = "https://team.ridewrap.com/faq-images";

    const [apiData, setAPIData] = useState( [] );

    /**
     * First we need to retreive data from the teams site, and save to a variable ( apiData );
     */
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + teamsBearerToken);
        myHeaders.append("Cookie", teamsCookieToken );
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(teamsFaqEndpoint, requestOptions)
            .then(data => data.json())
            .then(success => apiSave(success));

        function apiSave(success) {  
            setAPIData(success);
        }
    },[]);

    /**
     * Now format our data before using.
     */
    var apiDataFormatted = [];

    apiData.forEach(element => {
        element.tags = String(element.tags).split(',');
        apiDataFormatted.push ( element )
    });

    const root = document.getElementById('root');

    const [resultUnpinned, setUnp] = useState( [] );
    setUnp( unpinned );
    sendResUnpinned(resultUnpinned);

    // Send tag count object as stringified.
    const [orderedTags, setOrderedTags] = useState( );
    sendOrderedTags( orderedTags );

    // Retrieve all selected filters.
    const allTagsCleaned = all.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').replaceAll('', '').split(',');
    // console.log('all cleaned array', allTagsCleaned);

    // Retrieve all faqs data.
    const allFaqs = apiDataFormatted;
    // console.log(2222, allFaqs);

    // Create array to store filtered list of faqs.
    const filteredFaqs = [];

    // Create array for associated tags.
    const associatedTags = [];

    /**
     * Function to check to see if all array items exist in target array.
     *
     * @param {object} arr    Array of items that we want to match to target array.
     * @param {object} target Array of items that we want to target.
     */
    function check( arr, target ) {
        if ( target.every(v => arr.includes(v)) ) {
            return true;
        } else {
            return false;
        }
    }

    // For each faq item..
    allFaqs.forEach(element => {
        // console.log('          ');
        // console.log('==================');
        // console.log('item tag array', element.tags);
        
        // If there hasn't been a selection made, IE - if it's the first view..
        if ( ! cat ) {
            associatedTags.push ( ...element.tags ); // .. push all element tags to associated tags array, as a concatenation, NOT a sub-array.
        }

        // If all FAQ item tags exist 
        if ( check(element.tags, allTagsCleaned) ){
            filteredFaqs.push( element ); // .. push this faq to the filtered faqs array ..
            associatedTags.push( ...element.tags ); // .. and push element tags to associated tags array, as a concatenation, NOT a sub-array.           
        }

        // console.log('==================');
        // console.log('          ');
    });

    // Set cleaned all cats var.
    let associatedTagsCleaned = [...new Set(associatedTags)]; // filter to unique values.
    // console.log('tagsNOTcleaned', associatedTags);
    // console.log('tagscleaned', associatedTagsCleaned);

    /**
     * Create array of objects, sorted heirachly based on count number ( high to low ).
     * Then we send this to app.js, then to filterSection.js, to be used to build the tag components html.
     */
    let associatedTagsWithCountArray = associatedTags.reduce( (acc, curr, _, arr) => {
        if (acc.length == 0) acc.push({item: curr, count: 1})
        else if (acc.findIndex(f => f.item === curr ) === -1) acc.push({item: curr, count: 1})
        else ++acc[acc.findIndex(f => f.item === curr)].count
        return acc
    }, []);
    
    var orderedTagsArray = associatedTagsWithCountArray.sort((a,b) => b.count - a.count );
    setOrderedTags( JSON.stringify( orderedTagsArray ) );

    // Remove current pinned items from associatedTagsCleaned.
    let tagsForDeletion = all; // current pinned tags.
    let currentAssociatedTags = associatedTagsCleaned // associated tags.

    currentAssociatedTags = currentAssociatedTags.filter(item => !tagsForDeletion.includes(item))

    // Create associated tags var, to be sent to app.js to be passed back to filters.
    const [associated, setCat] = useState( '' );
    setCat( JSON.stringify(currentAssociatedTags) );
    sendAssociatedTags(associated);

    // Return number of item results.
    const ResultCount = () => {
        let [rcclass, setclass] = useState( '' );

        if ( cat !== '') {
            setclass('c-result-count in');
        } else {
            setclass('c-result-count');
        }

        return (
            <div className={rcclass}>
                <h4>Results ({filteredFaqs.length})</h4>
            </div>
        )
    }

    let [selectedID, setid] = useState( '' );
    
    /**
     * Render HTML for FAQ's, based on the filteredFAQS array.
     * Also return all FAQS if there is no filter selected.
     */
    const FilteredFAQHTML = () => {

        useEffect(() => {
            const faqItem = document.querySelectorAll('.accordion-button');
            
            faqItem.forEach(function (faqBtn) {
                faqBtn.addEventListener('click', function () {
                    faqBtn.classList.toggle('in');
                    // document.querySelector('.c-faq-body-' + faqBtn.dataset.attr).classList.toggle('in');
                    let faqPanel = document.querySelector('.c-faq-body-' + faqBtn.dataset.attr);
                    if (faqPanel.style.maxHeight) {
                        faqPanel.style.maxHeight = null;
                    } else {
                        // faqPanel.style.maxHeight = faqPanel.scrollHeight * 2 + "px";
                    }
                });
            });
        });
        
        const listItems = filteredFaqs.map((link) =>
            
            <div class="c-faq" data-tags={link.tag}>
                <h4>
                    <button className="accordion-button faq-page-item" id={'faq-title-' + link.title.toLowerCase().replaceAll(' ', '-').replaceAll('?', '')} data-attr={link.id} type="button">{link.title}</button>
                </h4>
                <div className={"c-faq-body c-faq-body-" + link.id}></div>
            </div>
        );

        const allItems = allFaqs.map((link) =>
            <div class="c-faq" data-tags={link.tag}>
                <h4>
                    <button className="accordion-button faq-page-item" id={'faq-title-' + link.title.toLowerCase().replaceAll(' ', '-').replaceAll('?', '')} data-attr={link.id} type="button">{link.title}</button>
                </h4>
                <div className={"c-faq-body c-faq-body-" + link.id}></div>
            </div>       
        );

        if ( cat == '') {
            return ( 
                <div class="c-faq-result-wrapper">
                    {allItems}
                </div>
            );
        } else {
            return (
                <div class="c-faq-result-wrapper">
                    {listItems}
                </div>
            );
        }
    }
   
    /**
     * Handle the FAQ overlay, triggered when an FAQ is selected on the UI.
     */
    function Overlay() {
        const resultWrapper = document.querySelector('.c-faq-result-wrapper');
        const resultCount = document.querySelector('.c-result-count');

        if ( filteredFaqs.length == 0 ) {
            var selectedFAQ = allFaqs.find(x => x.id === parseInt(selectedID) );
        } else {
            selectedFAQ = filteredFaqs.find(x => x.id === parseInt(selectedID) );
        }

        const faqItem = document.querySelectorAll('.accordion-button');
        
        faqItem.forEach(function (faqBtn) {
            faqBtn.addEventListener('click', function () {
                setid(faqBtn.dataset.attr);
            });
        });

        if ( selectedFAQ ) {
            root.classList.add('no-scroll');
            resultWrapper.classList.add('hide');
            resultCount.classList.remove('in');

            let result = selectedFAQ.content.replaceAll("../../faq-images", teamsUploadsStorage);

            const Tools = () => {
                if ( selectedFAQ.tool_link ) {
                    return (
                        <div class="c-faq-tool-link fade-opacity">
                            <h5>Recommended Link</h5>
                            <a href={selectedFAQ.tool_link}>{selectedFAQ.tool_link}</a>
                        </div>   
                    )
                }
            }

            return (
                <div class="c-faq-selected-result">
                    <div onClick={closeOverlay} class="c-faq-close-selected-result"></div>
                    <h4 class="fade-opacity">{selectedFAQ.title}</h4>
                    <div class="fade-opacity" dangerouslySetInnerHTML={{__html: result}}></div>
                    <Tools/>
                </div>
            );
        }
    }

    /**
     * Handle the FAQ overlay close. And reset the filters.
     */
    function closeOverlay() {
        root.classList.remove('no-scroll');
        setid('');
    }

    return (
        <div class="c-result-wrapper">
            <ResultCount/>
            <FilteredFAQHTML/>
            <Overlay/>
            {/* <code style="display: block; margin-top:120px;">DEV DEBUG: SELECTED CAT IS '{ all}'</code> */}
        </div>
    )
}

export default ResultWrapper;