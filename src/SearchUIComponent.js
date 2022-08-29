import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import * as moment from 'moment';
import * as $ from 'jquery';
import JSONPretty from 'react-json-pretty';
import dateFormat from 'dateformat';

import 'bootstrap/dist/js/bootstrap.js';

import * as defaults from './sb/Common/Defaults';
import * as parser from './sb/Common/SbCore';
import { history } from './sb/low_level_components/custom_history';

import SearchInputComponent from './sb/SearchInput/SearchInputComponent';
import FacetFiltersComponent from './sb/FacetFilters/FacetFiltersComponent';
import SmartFAQsComponent from './sb/SmartFAQs/SmartFAQsComponent';
import SelectedFilters from './sb/FacetFilters/SelectedFilters';
import SuggestAutoSearch from './sb/low_level_components/suggest_auto_search';
import SortComponent from './sb/Sort/SortComponent';
import RelatedQueryComponent from './sb/RelatedQuery/relatedquery.js';
import TopQueryComponent from './sb/topQuery/topquery.js';
import NormalViewComponent from './sb/normal_view_component';
import FeaturedResultsComponent from './sb/FeaturedResults/FeaturedResultsComponent';//---
import PaginationWithPageNumbers from './sb/Pagination/PaginationWithNumbers';

import './App.css';

const uparrow = require("./images/up-arrow.png");

class SearchUIComponent extends Component {
  constructor(){
    super();
    this.urlParams = Object.assign({}, qs.parse(window.location.search));
    this.state = {
      response: {},
      allFacetsResponse:[],
      isLoading: false,
      suggestSearch: {
        actualQuery: '',
        suggestedQuery: ''
      },
      selectedSmartFAQ: {},
      debugResponse:{},
      facetsResponse:[],
      noPublicCol:false,
      parameters: Object.assign({}, qs.parse(window.location.search)),
      dropdowntemp: false,
      name: "",
      nameTwo:""
    };


    this.child=React.createRef();
    this.doSearch = this.doSearch.bind(this);
    this.resetSuggestSearchQueries = this.resetSuggestSearchQueries.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
    this.topScroll = this.topScroll.bind(this);
    this.dropdownFunc = this.dropdownFunc.bind(this);
    this.dropdownBlur = this.dropdownBlur.bind(this);
    this.skipnavigation = this.skipnavigation.bind(this);
    this.skipFocus = this.skipFocus.bind(this);
    this.skipBlur = this.skipBlur.bind(this);
    this.saveSelectedSmartFAQ = this.saveSelectedSmartFAQ.bind(this);
  }


  componentWillMount(){
    if(window.location.search !== ""){
      // this.doSearch();
      this.doSearch(this.state.parameters);
        // this.doSearch({
        //   ...this.state.parameters,
        //   facetonly:true,
        // });
    }
  }

  componentDidMount(){
    $(window).scroll(function () {
       if ($(this).scrollTop() > 50) {
          $('.back-to-top').css('display', 'block');
       }
       else {
          $('.back-to-top').css('display', 'none');
       }
    });
    if((this.urlParams.debug || defaults.debug) && Object.keys(this.state.debugResponse).length > 0) {
      document.getElementById("root").classList.add("debugMode");
    }
    // window.addEventListener('resize', this.updateSize);
    document.body.addEventListener('click', this.myHandler);
    if(defaults.autologout){
      setInterval(function(){
        let temp = moment(new Date());
        let inactiveTime = localStorage.getItem("inactiveTime");
        document.addEventListener("click",function(){
            localStorage.setItem("inactiveTime", temp);
        });
        if(temp.diff(inactiveTime,'minutes') >= 30){
          localStorage.removeItem("inactiveTime");
          localStorage.removeItem("securityMethod");
          localStorage.removeItem("searchToken");
          localStorage.removeItem("loginTime");
          window.location = window.location.href.split("?")[0];
        }
      },5000);
    }
    setInterval(function(){
      let nowTime = moment(new Date());
      let loginTime = moment(localStorage.getItem("loginTime"));
        if(nowTime.diff(loginTime, 'days') > 0){
            localStorage.removeItem("inactiveTime");
            localStorage.removeItem("securityMethod");
            localStorage.removeItem("searchToken");
            localStorage.removeItem("loginTime");
            localStorage.removeItem("loginUserName");
            window.location = window.location.href.split("?")[0];
        }
    }, 5000);
    history.listen((route, action)=>{
      if(window.location.search !== ""){
        this.setState({
          parameters: Object.assign({}, qs.parse(route.search))
        }, () => {
          this.doSearch(this.state.parameters);
            // this.doSearch({
            //   ...this.state.parameters,
            //   facetonly:true
            // });
        });
      }
      else{
        document.location.reload();
     }
    });
  }

  componentDidUpdate() {
    if((this.urlParams.debug || defaults.debug) && Object.keys(this.state.debugResponse).length > 0) {
      document.getElementById("root").classList.add("debugMode");
    }
    // this.updateSize();
    window.onpopstate = e => {
      this.saveSelectedSmartFAQ({});
    };
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.updateSize);
    document.body.removeEventListener('click', this.myHandler);
  }

  topScroll = (e) => {
     e.preventDefault();
     let currentPos = $(window).scrollTop();
     let scroll = (i) => {
        setTimeout(function () {
           window.scrollTo(0, i);
        }, currentPos - i);
     };
     for (let i = currentPos; i > 0; i--) {
        scroll(i);
     }
  }

  dropdownFunc(){
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("caret").classList.toggle("open");
  }

  dropdownBlur(){
    document.getElementById("myDropdown").classList.remove("show");
    document.getElementById("caret").classList.remove("open");
  }

  myHandler(e) {
    let myDropdown = document.getElementById("myDropdown");
    if (!($(e.target).parents('.navbarSort').length > 0) && myDropdown !== null) {
      document.getElementById("myDropdown").classList.remove("show");
      document.getElementById("caret").classList.remove("open");
    }
  }

  // updateSize(event){
    // let noResults = document.getElementById("noResultsContainer");
    // if(noResults !== null && window.innerWidth > 767) {
      // let leftSpacing = document.getElementById("logoDiv").clientWidth;
      // document.getElementById("noResultsContainer").style.marginLeft = leftSpacing;
      // if(this.state.response.error) {
      // }else {
      //   document.getElementById("noResultsContainer").style.marginLeft = leftSpacing + 50;
      // }
    // }
  // }

  dropdownToggle(){
    this.setState({
      dropdowntemp: !this.state.dropdowntemp
    });
  }

  dropdownClose(){
    this.setState({
      dropdowntemp: false
    });
  }

  doSearch(params){
    this.props.isLoadingFunc();
    this.setState({
      isLoading:true
    });
    let questionRegex = /[?]+$/g;
    let parameters = Object.assign({}, qs.parse(window.location.search));
    parser.getSBResponse(params)
      .then((response)=>{
      if(!params.facetonly && response != undefined){
        this.setState({
          isLoading:false
        });
      }

      if(response.message && response.message.toLowerCase().includes("no collection found") && response.message.toLowerCase().indexOf("something") === -1) {
        localStorage.removeItem("inactiveTime");
        localStorage.removeItem("securityMethod");
        localStorage.removeItem("searchToken");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("loginUserName");
        window.location = window.location.href.split("?")[0];
      }
      else if(response.message && response.message.toLowerCase().includes("no public collection found to search")) {
        this.setState({
          noPublicCol: true
        });
      }
      else {
        let parsedResponse = parser.parseSBResponse(response);
        let alternateQuery = decodeURIComponent(response.data['query'].replace(/&quot;/g, '"'));
        if(alternateQuery.indexOf('"') >= 0 && parseInt(response.data['hits'], 10) === 0){
          // this.state.parameters.query = alternateQuery.replace(/['"]+/g, '');
          // this.state.parameters.default = "AND";
          this.setState({
            parameters : {
              ...this.state.parameters,
              query : alternateQuery.replace(/['"]+/g, ''),
              default: "AND"
            }
          });
          this.doSearch();
        }
        else if(parseInt(response.data.hits, 10) === 0 && response.data.suggest && response.data.suggest !== "" && defaults.suggestSearch && this.state.suggestSearch.actualQuery === "") {
          this.setState({
              suggestSearch: {
                actualQuery: response.data.query,
                suggestedQuery: response.data.suggest
              }
            });
          // this.state.parameters.query = response.data['suggest'];
          // this.doSearch();
          this.setState({
            parameters : {
              ...this.state.parameters,
              query : response.data.suggest
            }
          });
          parser.getResults(this.state.parameters);
        }
          else if(response.constructor !== Error){
            if(response.constructor !== Object || response.data.constructor !== Object){
              this.setState({
                response: {
                  error: true
                }
              });
              document.title = `Search Results: ${unescape(this.state.response.resultInfo.query).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\\/g, '')}`;
            }else{
              if(params.facetonly){
                // this.setState({
                //   facetsResponse:parsedResponse,
                // });
              }else{
                this.setState({
                  response: parsedResponse,
                  debugResponse:response.data
                  // actualQuery: Object.assign({}, qs.parse(window.location.search)).query
                });
              }

              document.title = `Search Results: ${unescape(this.state.response.resultInfo.query).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\\/g, '')}`;
              window.scrollTo(0, 0);
            }
          }else{
            this.setState({
              response: {
                error: true
              }
            });
            document.title = `Search Results: ${unescape(this.state.parameters.query).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\\/g, '')}`;
          }
        }
      })
      .catch((error)=>{
        this.setState({
          isLoading: false,
          response: {
            error: true
          }
        });
        document.title = `Search Results: ${unescape(this.state.parameters.query).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\\/g, '')}`;
      });
  }

  resetSuggestSearchQueries(){
    this.setState({
      suggestSearch: {
        actualQuery: '',
        suggestedQuery: ''
      }
    });
  }

  logoutUser(e) {
    e.preventDefault();
    localStorage.removeItem("inactiveTime");
    localStorage.removeItem("securityMethod");
    localStorage.removeItem("searchToken");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("loginUserName");
    window.location = window.location.href.split("?")[0];
  }

  handleCallback = (childData,childDataTwo) =>{
    this.setState({name: childData,nameTwo:childDataTwo});
  }
  
  skipnavigation(e){
    document.getElementById("searchInput").focus();
  }

  skipFocus(e){
    $("#result-facet-container").css("margin-top","110px");
  }

  skipBlur(e){
    $("#result-facet-container").css("margin-top","85px");
  }

  saveSelectedSmartFAQ(faqObj) {
    this.setState({ selectedSmartFAQ: { ...faqObj } });
  }

  render() {
    let { response, selectedSmartFAQ, noPublicCol} = this.state;
    let {securityResponse} = this.props;
    let parameters = Object.assign({}, qs.parse(window.location.search));
    let queryTemp = "";
    let date = "";

    for(let i in defaults.facets){
      if(defaults.facets[i].dateRange !== undefined){
        date = defaults.facets[i].field;
      }
    }

    let datefilter = parameters['f.'+date+'.filter'];
    let datefilterTwo =parameters['f.'+date+'.filter'];
    let dataString = String(datefilter);
    let dataStringTwo = String(datefilterTwo);
    let dateconvert = dataString.substr(1,19);
    let dateconvertTwo = dataStringTwo.substr(22,19);
    
    if(parameters['f.'+date+'.filter'] && !parameters['f.'+date+'.filter'].includes("*"))
    parameters['f.'+date+'.filter']=dateFormat(dateconvert,"dd mmmm yyyy") + " - " +dateFormat(dateconvertTwo,"dd mmmm yyyy") ;

    if(response.resultInfo) {
      if(response.resultInfo.query.length > 100){
        queryTemp = response.resultInfo.query.substring(0, 100).split(/[ ,+_-]+/);
        queryTemp.splice(queryTemp.length - 1, 1);
        response.resultInfo.query = queryTemp.join(" ") + " ...";
      }
    }

    const noResults = response.results === undefined || parseInt(response.resultInfo.hits, 10) === 0 || Math.ceil(parseInt(response.resultInfo.hits, 10)/parameters.pagesize) < parseInt(parameters.page, 10);
    // let todayTime = parameters['f.'+date+'.filter'];
    // let month = Intl.DateTimeFormat({year:"numeric"}).format(todayTime)

    return (
      <>
        <div className="searchGrid">
          <div className="row m-0 login-firstbar" id="loginDiv">

            <div id="skip" role="navigation">
              <button onClick={(e)=>this.skipnavigation(e)} onFocus={()=>this.skipFocus()} onBlur={()=>this.skipBlur()}>
                Skip to main content
              </button>
            </div>

            <div className="col-sm-12 px-4">
              <div className={`row height-50 ${response.results && response.resultInfo && response.resultInfo.hits >= 0 ?"spacingcss":""}`}>
                
                <div role="banner" className="topbar_logo col-lg-2 col-sm-3" id="logoDiv">
                  <a href="https://www.searchblox.com" title="SearchBlox Home" target="_blank">
                    <img width="162px" height="34px" style={{margin:"8px 0"}} alt="SearchBlox Home" src={require('./images/sb-logomain-rgb-1@2x.png')}/>
                  </a>
                </div>

                <div role="search" className={`topbar_search col-lg-8 col-sm-6 ${!parameters.query && !this.state.isLoading?"searchNoParams":""}`}>
                  <SearchInputComponent
                    response={this.state.response} 
                    resetSuggestSearchQueries={this.resetSuggestSearchQueries} 
                    query={((parameters.query !== undefined)?parameters.query:"")}
                    selectedSmartFAQ={selectedSmartFAQ}
                    saveSelectedSmartFAQ={this.saveSelectedSmartFAQ}
                  />
                </div>

                <div className="topbar_icons col-lg-2 col-sm-3" role="complementary">
                  {
                    (response.results && response.resultInfo && response.resultInfo.hits >= 0) &&
                      <ul style={{margin:"11px 0 0",paddingLeft:"0px"}}>
                        <li className="navbarSort">
                          <button onClick={this.dropdownFunc} className="dropbtn" title={(parameters.sort1)?(parameters.sort1.toUpperCase()):parameters.sort?(parameters.sort.toUpperCase()):""}>
                            <img width="16" height="16" src={require('./images/sorter.png')} alt="sort dropdown"/>
                            <span className="header-tabs-text">{(parameters.sort1)?parameters.sort1:parameters.sort}</span>
                            <i id="caret"/>
                          </button>
                          <div id="myDropdown" className="dropdown-content">
                            <SortComponent sort={(response.resultInfo.sort1!==undefined)?response.resultInfo.sort1:response.resultInfo.sort} sortdir={(response.resultInfo.sortDirection1!==undefined)?response.resultInfo.sortDirection1:response.resultInfo.sortDirection}/>
                          </div>
                        </li>
                      </ul>
                  }
                  {
                    (securityResponse !== undefined && securityResponse.type !== "none") &&
                    <div className="header" style={{margin:"5px 0"}}>
                      <div className="dropdown log-in header__top-item" id="logIn">
                        <a href="" className="dropdown-toggle nav-link" onFocus={this.dropdownBlur}
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="admin-dropdown"
                          id="navbarDropdownMenuLink"
                        >
                          <i className="fas fa-user" />
                        </a>

                        <div aria-labelledby="navbarDropdownMenuLink" className="dropdown-menu navbarDropdownMenuLink">
                          <div className="dropdown-item">
                            <p className="dd-heading">Account</p>
                            <p className="dd-content">{localStorage.getItem("loginUserName")}</p>
                          </div>
                          <div id="logoutBtn" className="dropdown-item dropdown-content" onClick={e => this.logoutUser(e)}>
                            <a href="" className="dd-heading-logout">Log Out</a>
                          </div>
                        </div>

                      </div>
                    </div>
                  }

                </div>

              </div>
            </div>
          </div>

          <div id="result-facet-container" role="main">
            {
              this.state.isLoading ?
                <div className="search-spinner text-center py-5">
                  <i className="fa fa-3x fa-spinner fa-spin"/>
                </div>
                :
                <>
                  {
                    (defaults.facetsFiltersDisplay) &&
                    <div className={(response.facets === undefined || response.facets.length <= 0 || response.results === undefined || parseInt(response.resultInfo.hits, 10) === 0)?'noFacets':'hasFacets'}>
                      <div id="facets-container">
                        <FacetFiltersComponent parentCallback = {this.handleCallback} ref={this.child} allFacetsResponse={response.facets} facets={response.facets?response.facets:[]}/>
                      </div>
                    </div>
                  }

                  <div  id="results-container-main" className={(!defaults.facetsFiltersDisplay || response.facets === undefined || response.facets.length <= 0 || response.results === undefined || parseInt(response.resultInfo.hits, 10) === 0)?'resultNoFaacets':'resultWithFacet'}>
                    {
                      (defaults.suggestSmartFAQs.enabled || defaults.smartFAQSettings.enabled) && response.results &&
                        <SmartFAQsComponent query={((parameters.query !== undefined) ? parameters.query: "")}
                          selectedSmartFAQ={selectedSmartFAQ}
                          noResults={noResults || noPublicCol || response.error} 
                        />
                    }

                    {
                      response.results && (
                        noResults ?
                          null
                          :
                          <>
                            <SelectedFilters facets={response.facets?response.facets:[]}/>

                            {
                              (defaults.suggestSearch && !parameters.XPC && this.state.suggestSearch.actualQuery !== "" && response.resultInfo.query === this.state.suggestSearch.suggestedQuery) &&
                                <SuggestAutoSearch resetSuggestSearchQueries={this.resetSuggestSearchQueries} 
                                  resultquery={response.resultInfo.query.replace(/\\/g, '')} 
                                  actualquery={this.state.suggestSearch.actualQuery.replace(/\\/g, '')}
                                />
                            }

                            <div className="display-count-data">
                              <div className={['resultsText padding-0',(parameters.XPC?"resultsForMore":"")].join(" ")}>
                                Results <b>{response.resultInfo.start}</b> - <b>{response.resultInfo.end}</b> of <b>{response.resultInfo.hits}</b>
                                {
                                  (response.resultInfo.query) && <span> for <b dangerouslySetInnerHTML={{__html: (response.resultInfo.query.replace(/\\/g, ''))}}>{}</b>.</span>
                                }
                                {
                                  (response.resultInfo.query && !parameters.mlt_id) && <span> Search took <b>{(parseInt(response.resultInfo.time, 10)/1000).toFixed(3)} </b> Seconds.</span>
                                }
                              </div>
                            </div>

                            {
                              ((parameters.adsDisplay && parameters.adsDisplay === "true" && parameters.page === "1" && parameters.query !== "*") || (!parameters.adsDisplay && defaults.adsDisplay && parameters.query !== "*")) &&
                                <FeaturedResultsComponent featuredResults={response.featuredResults}/>
                            }

                            {
                              ((parameters.relatedQuery && parameters.relatedQuery === 'true' && parameters.page === "1") || (defaults.relatedQuery && parameters.page === "1")) &&
                                <RelatedQueryComponent results={parameters['query']} />
                            }

                            {/*
                              ((parameters.topQuery && parameters.topQuery === 'true' && parameters.page === "1") || (defaults.topQuery && parameters.page === "1")) &&
                                <TopQueryComponent/>
                            */}

                          </>
                      )
                    }

                    {
                      noPublicCol &&
                        <div className="no-results-div" id="noResultsContainer">
                          <p>There is no public collection available to search.</p>
                          <p><b>Suggestions:</b></p>
                          <ul className="suggestions-list">
                            <li>Make sure you have at least one public collection.</li>
                            <li>Enable security to search on private collections.</li>
                          </ul>
                        </div>
                    }
                    {
                      response.error &&
                        <div className="no-results-div" id="noResultsContainer">
                          <p>Your search - <b>{parameters['query']}</b> - did not match any documents.</p>
                          {
                            ((parameters.topQuery && parameters.topQuery === 'true' && parameters.page === "1") || (defaults.topQuery && parameters.page === "1")) &&
                              <TopQueryComponent/>
                          }
                          <p><b>Suggestions:</b></p>
                          <ul className="suggestions-list">
                            <li>Make sure all words are spelled correctly.</li>
                            <li>Make sure you have access to private collections.</li>
                            <li>Use similar words or synonyms.</li>
                            <li>Try more general keywords.</li>
                          </ul>
                        </div>
                    }
                    {
                      response.results && (
                        noResults ?
                          <div className="no-results-div" id="noResultsContainer">
                              <p>Your search for - <b dangerouslySetInnerHTML={{__html: (response.resultInfo.query.replace(/\\/g, ''))}}>{}</b> - did not match any documents.</p>
                              {
                              ((parameters.topQuery && parameters.topQuery === 'true' && parameters.page === "1") || (defaults.topQuery && parameters.page === "1")) &&
                              <TopQueryComponent/>
                              }
                              <p><b>Suggestions:</b></p>
                              <ul className="suggestions-list">
                                <li>Make sure all words are spelled correctly.</li>
                                <li>Make sure you have access to private collections.</li>
                                <li>Use similar words or synonyms.</li>
                                <li>Try more general keywords.</li>
                              </ul>
                          </div>
                          :
                          <NormalViewComponent facets={response.facets} 
                            resultInfo={response.resultInfo} 
                            results={response.results} 
                            featuredResults={response.featuredResults}
                          />
                      )
                    }
                  </div>
                </>
            }

            <a className="back-to-top"  href="" title="Back to Top" onClick={(e) => this.topScroll(e)} tabIndex="0">
              <img src={uparrow} alt="back-to-top"/>
              <span className="sr-only">Back to <em>T</em>op</span>
            </a>

          </div>
          
          {
            (!this.state.isLoading && response.results && response.resultInfo && response.resultInfo.hits && parseInt(response.resultInfo.hits, 10) > 0) ?
              <>
                {
                  response.resultInfo.lastPage ?
                    <PaginationWithPageNumbers
                      currentpage={parseInt(response.resultInfo.currentPage, 10)}
                      lastpage={parseInt(response.resultInfo.lastPage, 10)} 
                    />
                    :
                    <PaginationWithPageNumbers
                      currentpage={parseInt(response.resultInfo.currentPage, 10)}
                      lastpage={Math.ceil(parseInt(response.resultInfo.hits, 10)/10)} 
                    />
                }
              </>
              :
              null
          }

          <div role="contentinfo" className="footer text-center">
            <p className="poweredBy">
              <span>Powered By&nbsp;</span>
            </p>
            <p> 
              <a href="https://www.searchblox.com" title="SearchBlox Software" target="_blank">
                <img width="162px" height="34px" alt="SearchBlox Software" src={require('./images/sb-logomain-rgb-1@2x.png')}/>
              </a>
            </p>
            <p className="font-class-4 font-size-12 copyright">&copy; {new Date().getFullYear()}. All Rights Reserved. SearchBlox Software, Inc.</p>
          </div>

        </div>

        {
          ((parameters.debug || defaults.debug) && Object.keys(this.state.debugResponse).length > 0) &&
            <div className="debugResponse">
              <JSONPretty id="json-pretty" data={this.state.debugResponse}/>
            </div>
        }

      </>
    );
  }
}

export default SearchUIComponent;


SearchUIComponent.propTypes = {
  isLoadingFunc: PropTypes.func,
  securityResponse: PropTypes.object,
};