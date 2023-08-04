(function() {
    console.log('load bucket-data.js');

    const logger = new window.RideWrap.ServiceLogging.SimplerLogger();

    document.body.addEventListener('click', function (evt) {

        let targetEl = evt.target; // get clicked el.

        // Log FAQ item selected by user.
        if (targetEl.classList.contains('accordion-button')) {
            let faqTitle = targetEl.innerText;
            logger.log( 'user-open-faq', { 'faq_item': faqTitle });
        }

        // Log filter tag item selected by user.
        if (targetEl.classList.contains('c-tag-item')) {
            let tagTitle = targetEl.innerText;
            logger.log( 'user-filter-tag', { 'filter': tagTitle });
        }

    }, false);

    console.log('finished logging');
})();