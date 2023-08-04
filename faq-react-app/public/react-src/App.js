import { h } from "preact";
import {useEffect, useState} from 'react';
import "./sass/styles.scss";

import Breadcrumbs from './components/breadcrumbs.js';
import ResultWrapper from './components/resultWrapper.js';
import FilterSection from './components/filterSection.js';

const App = () => {

  const [cat, setCat] = useState( '' );
  const [associated, setCats] = useState( '' );  
  const [all, setAllFilters] = useState( '' );
  const [unpinned, setUnpinned] = useState( '' );
  const [resUP, setResUP] = useState( '' );

  /**
   * Set unpinned tags.
   */
  const sendUnpin = (index) => {
    // console.log('app.js unpin: ', index);
    setUnpinned( index );
  };
  // console.log('APP.JS unpinned is ', unpinned);

  /**
   * Set currently selected filter var.
   * Grab from FilterSelection, send to ResultWrapper.
   */
  const sendFilterDataToParent = (index) => {
    // console.log('app.js ( cats ): ', index);
    setCat( index );
  };

  /**
   * Set all selected filter var.
   * Grab from FilterSelection, send to ResultWrapper.
   */
  const sendAll = (index) => {
    // console.log('app.js ( all filtaz ): ', index);
    setAllFilters( index );
  };

  /**
   * Set all associated tags var.
   * Grab from ResultWrapper, send to FilterSelection.
   */
  const sendAssociatedTagsToFilterSelection = (index) => {
    // console.log('app.js ( associated ): ', index);
    setCats( index );
  };

  /**
   * Set all associated tags var.
   * Grab from ResultWrapper, send to FilterSelection.
   */
  const sendResUnpinned = (index) => {
    // console.log('app.js ( associated ): ', index);
    setResUP( index );
  };

  /**
   * Set all associated tags var.
   * Grab from ResultWrapper, send to FilterSelection.
   */
  const [orderedTags, setTagCount] = useState( '' );
  const sendOrderedTags = (index) => {
    // console.log('app.js ( send no ): ', index);
    setTagCount( index );
  };

  return (
    <div>
      <div class="container">
        <Breadcrumbs cat={cat} all={all}/>
      </div>
      <div class="container align-center rw-app-faq-banner">
        <h2>Looking for help?</h2>
        <h3>We offer support for everything you need. Check out the sidebar to find answers.</h3>
      </div>
      <div class="container container-flex-int">
        <FilterSection orderedTags={orderedTags} resUP={resUP} sendUnpin={sendUnpin} sendAll={sendAll} sendMostRecentFilter={sendFilterDataToParent} associated={associated}></FilterSection>
        <ResultWrapper sendOrderedTags={sendOrderedTags} unpinned={unpinned} sendResUnpinned={sendResUnpinned} sendAssociatedTags={sendAssociatedTagsToFilterSelection} cat={cat} all={all}></ResultWrapper>
      </div>
    </div>
  )
};

export default App;
