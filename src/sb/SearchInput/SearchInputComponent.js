import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import { defaultType, trendingSearch, showAutoSuggest, suggestSmartFAQs, topQuery } from '../Common/Defaults';
import * as parser from '../Common/SbCore';
import VoiceContext from '../../VoiceContext';

import VoiceSearch from '../SearchInput/VoiceSearchInput';
import TrendingComponent from '../AutoSuggest/TrendingComponent';
import AutoSuggestComponent from '../AutoSuggest/AutoSuggestComponent';
import SuggestedSmartFAQs from './../SmartFAQs/SuggestedSmartFAQs';
import TopQuerySuggestions from '../topQuery/TopQuerySuggestions';

import '../css/search_component.css';

// ------------------------------

const SearchInputComponent = ({ response, resetSuggestSearchQueries, query: queryProp, selectedSmartFAQ, saveSelectedSmartFAQ }) => {
   const parameters = Object.assign({}, qs.parse(window.location.search));
   const regex = /^[a-z\d\-_&\s]+$/gi;

   const [query, setQuery] = useState('');
   const [dropdownShown, setDropdownVisibility] = useState(false);
   const [recording, setRecording] = useState(false);
   
   const dropdownRef = useRef(null);

   // ------------------------------

   useEffect(() => {
      const urlParameters = Object.assign({}, qs.parse(window.location.search));
      
      if(urlParameters.query)
         setQuery(urlParameters.query);

      document.addEventListener('mousedown', handleClickOutsideDropdown);

      return () => {
         document.removeEventListener('mousedown', handleClickOutsideDropdown);
      };
   }, []);


   useEffect(() => {
      setQuery((queryProp)
         .replace(/&quot;/g, '"')
         .replace(/&amp;/g, "&")
         .replace(/\\/g, ''));
   }, [queryProp]);

   // ------------------------------

   const triggerSearch = (query, searchType = defaultType) => {
      resetSuggestSearchQueries();
      setQuery(query);
      setDropdownVisibility(false);
      
      let params = parser.getInitialUrlParameters(query);

      params.page = 1;

      if(params.default !== searchType)
         params.default = searchType;

      delete params.mlt_id;
      delete params.mlt_col;
      delete params.XPC;

      if(response && response.resultInfo && response.resultInfo.hits <= 0) {
         params = parser.clearAllFilters(params);
      }

      parser.getResults(params);
   };

   const clearSearchInput = e => {
      e.preventDefault();
      const urlParameters = Object.assign({}, qs.parse(window.location.search),urlParameters);
      const locationHref = document.location.href.split("?")[0];

      document.location.href = locationHref;
   };

  const handleInputFocus = () => {
    if(trendingSearch.enabled && !query.length && !dropdownShown) {
      setDropdownVisibility(true);
    }
  };

   const handleInputKeyDown = e => {
      const keyCode = e.keyCode;

      if(keyCode === 40 && dropdownShown) {
         e.preventDefault();
         document.querySelectorAll('.input-dropdown li button')[0].focus();
      } else if(keyCode === 13) {
         resetSelectedSmartFAQ();
         triggerSearch(e.target.value);
      }
   };

   const handleInputChange = e => {
      const currentInput = e.target.value;

      setQuery(currentInput);
  
      if(!currentInput.length || currentInput.length >= 3) {
         if(!dropdownShown)
            setDropdownVisibility(true);  
      } else if(dropdownShown) {
         setDropdownVisibility(false);
      }
   };

   const triggerVoiceSearch = () => {
      setQuery('');
      setRecording(true);
   };

   const voiceSearch = data => {
      if(data.length) {
         const newQuery = data[data.length - 1];
         
         setQuery(newQuery);
         triggerSearch(newQuery);
      }
   };

   const handleClickOutsideDropdown = e => {
      if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target) && e.target.id !== 'searchInput') {
        setDropdownVisibility(false);
      }
   };
  
   const handleDropdownKeyDown = e => {
      const keyCode = e.keyCode;
      const dropdownItems = document.querySelectorAll('.input-dropdown li button');
      const currentIndex = Array.from(dropdownItems).indexOf(e.target);
      
      if(keyCode === 40 || keyCode === 38) {
        // Down and up arrow keys
         e.preventDefault();
         let newIndex = currentIndex;

         if(keyCode === 40)
            newIndex = currentIndex + 1 >= dropdownItems.length ? 0 : currentIndex + 1;
         else
            newIndex = currentIndex - 1 < 0 ? dropdownItems.length - 1 : currentIndex - 1;
         
         dropdownItems[newIndex].focus();
  
      } else if(keyCode === 27) { 
         // Escape key
         setDropdownVisibility(false);
      }
   };

   const resetSelectedSmartFAQ = () => {
      if(Object.keys(selectedSmartFAQ).length) {
         saveSelectedSmartFAQ({});
      }
   };

   // ------------------------------

   return (
      <> 
         <VoiceContext.Consumer>
            {  
               value => {
                  const voiceSearchEnabled = ((value && value['voice-enabled']) || (Object.keys(value).length === 0 && voiceSearch));
                  const voiceSearchEnabledPlaceholder = recording ? 'Listening...' : 'Type or use your voice to search';
               
                  return (
                     <>
                        <div className="input-wrapper">
                           <button className="search-btn" aria-label="Search button" onClick={() => triggerSearch(query)}>
                              <i className="fa fa-search opacity-1" />
                           </button>

                           <input id="searchInput"
                              aria-label="Search input"
                              autoComplete="off"
                              className={`form-control justify-content-between ${voiceSearchEnabled ? 'voice-search-enabled' : ''}`} 
                              placeholder={voiceSearchEnabled ? voiceSearchEnabledPlaceholder : 'Search'}
                              value={query}
                              onFocus={handleInputFocus}
                              onKeyDown={handleInputKeyDown}
                              onChange={handleInputChange}
                           />

                           <div className="input-buttons">
                              {
                                query.length > 0 &&
                                  <button title="Clear Search" 
                                      aria-label="Clear search" 
                                      onClick={clearSearchInput} 
                                      className="clear-search-btn fa fa-times-circle hide" 
                                  />
                              }
                              {
                                voiceSearchEnabled &&
                                  <div onClick={triggerVoiceSearch}>
                                      <VoiceSearch voiceSearch={voiceSearch} isRecording={setRecording}/>
                                  </div>
                              }
                           </div>

                           {
                              dropdownShown &&
                                 <div className="input-dropdown" ref={dropdownRef} onKeyDown={handleDropdownKeyDown}>
                                    {
                                      trendingSearch.enabled && !query.length &&
                                        <div className="input-dropdown__item">
                                          <TrendingComponent triggerSearch={triggerSearch} resetSelectedSmartFAQ={resetSelectedSmartFAQ} />
                                        </div>
                                    }

                                    {
                                      query.length >= 3 &&
                                        <>
                                          {
                                            (showAutoSuggest || parameters.autoSuggestDisplay) && regex.test(query) && 
                                                <div className="input-dropdown__item">
                                                  <AutoSuggestComponent query={query}  
                                                      triggerSearch={triggerSearch}
                                                      resetSelectedSmartFAQ={resetSelectedSmartFAQ}
                                                  />
                                                </div>
                                          }

                                          {
                                            suggestSmartFAQs.enabled && 
                                              <div className="input-dropdown__item">
                                                <SuggestedSmartFAQs query={query}
                                                  saveSelectedSmartFAQ={saveSelectedSmartFAQ}
                                                  triggerSearch={triggerSearch}
                                                />
                                              </div>
                                          }

                                          {
                                            topQuery &&
                                              <div className="input-dropdown__item">
                                                <TopQuerySuggestions triggerSearch={triggerSearch} resetSelectedSmartFAQ={resetSelectedSmartFAQ} />
                                              </div>
                                          }
                                        </>
                                    }
                                 </div>
                           }
                        </div>
                     </>
                  );
               }
            }
         </VoiceContext.Consumer>
      </>
   );
};

export default SearchInputComponent;

SearchInputComponent.propTypes = {
   query: PropTypes.string,
   resetSuggestSearchQueries: PropTypes.func,
   response: PropTypes.object,
   securityResponse: PropTypes.func,
   saveSelectedSmartFAQ: PropTypes.func,
   selectedSmartFAQ: PropTypes.object
};
