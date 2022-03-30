10 CORE PLUGIN DOCUMENTATION

Overview:
This provides documentation for the 10 core plugin.


Folder Structure:
      Plugin
      |-git
      |-dist
      |    |-node_modules
      |-src
      |    |-fw
      |    |    |-css
      |    |    |-fonts
      |    |    |-less
      |    |    |-scss
      |    |-images
      |    |-sb
      |	 |	  |-AdvancedFilters
      |    |    |    |-AdvancedFiltersDefault.js
      |    |    |    |-SelectedAdvancedFilters.js
      |    |    |-AutoSuggest
      |    |    |    |-AutoSuggestComponent.js
      |    |    |-Common
      |    |    |    |-Defaults.js
      |    |    |    |-SbCore.js
      |    |    |-FacetFilters
      |    |    |    |-FacetFiltersMultipleSelection
      |    |    |    |    |-FacetFiltersMultipleSelectionComponent.js
      |    |    |    |    |-SelectedFiltersInMultipleSelection.js	      
      |    |    |    |-CustomDateFilters.js
      |    |    |    |-FacetFiltersComponent.js
      |    |    |-FeaturedResults
      |    |    |    |-FeaturedResultsComponent.js
      |    |    |-Hooks
      |    |    |     |-GoogleCloudRecognitionConfig.js
      |    |    |     |-index.js
      |    |    |     |-recorder.js                                 
      |    |    |     |-recorderHelpers.js                                        
      |    |    |-Login             		      		
      |    |    |     |-LoginComponent.js			      
      |    |    |-low_level_components	      			      
      |    |    |     |-db_overlay_component.js
      |    |    |     |-email_overlay_component.js	     
      |    |    |     |-FileViewer.js
      |    |    |     |-suggest_auto_search.js
      |    |    |-Pagination
      |    |    |     |-PaginationWithNumbers.js
      |    |    |     |-RandomPaginationNumbers.js
      |    |    |-RangeSelector
      |    |    |     |-TuningRangeSelector.js
      |    |    |-RelatedQuery
      |    |    |     |-relatedquery.js
      |    |    |-SearchInput
      |    |    |     |-SearchInputComponent.js
      |    |    |     |-VoiceSearchInput.js
      |    |    |-SearchResults
      |    |    |     |-DefaultResultsComponent.js
      |    |    |-Sort
      |    |    |     |-SortComponent.js
      |    |    |-topQuery		           
      |    |    |     |-topquery.js
      |    |    |-normal_view_component     
      |    |    |-css
      |    |    |     |-AdvancedFilters
      |    |    |     |    |-FacetFiltersMultipleSelection.css
      |    |    |     |-low_level_components
      |    |    |     |    |-advanced_filters
      |    |    |     |    |    |-display_selected_filters.css
      |    |    |     |    |-pagination
      |    |    |     |    |    |-pagination_with_page_numbers.css
      |    |    |     |    |-autosuggest_component.css
      |    |    |     |    |-display_count_component.css
      |    |    |     |    |-featured_results_component.css
      |    |    |     |    |-sort_component.css      
      |    |    |     |-advanced_filters.css	 
      |    |    |     |-db_overlay_component.css	    
      |    |    |     |-facet_filters_component.css
      |    |    |     |-login_component.css
      |    |    |     |-NormalViewComponent.css
      |    |    |     |-relatedquery_component.css
      |    |    |     |-result_component.css
      |    |    |     |-search_component.css
      |    |    |     |-topbar_search.css
      |    |    |     |-topquery_component.css
      |    |-App.css
      |    |-App.js
      |    |-facet.js
      |    |-favicon.ico
      |    |-favicon.png  
      |    |-index.css
      |    |-index.html
      |    |-index.js
      |    |-SearchUIComponentI.js
      |    |-template.js
      |-tools
      |    |-build.js    
      |    |-buildHtml.js
      |    |-buildServer.js
      |    |-devServer.js
      |-.babelrc
      |-.eslintignore      
      |-.eslintrc              
      |-.gitignore
      |-Dockerfile
      |-httpd.conf
      |-package-lock.json
      |-package.json
      |-webpack.config.dev
      |-webpack.config.prod
      |-yarn.lock


.git
Created in the repository when we push code to bitbucket.

node_modules
Created when npm install runs in the command prompt.

dist
Has all minified files after performing build.

src
fw
Font Awesome folder with fonts and icon toolkit based on CSS and LESS.

Images
Images used in the plugin are added here.
Multiple folders related to images can be added here.


sb
AdvancedFilters
SelectedAdvancedFilters.js
removeAdvancedFilter()- removes the advanced filters by deleting the current state field by checking whether field is a string, array, or object

AdvancedFiltersDefault.js
Component which displays the advanced filters given in facet.js.


AutoSuggest
AutoSuggestComponent.js
Component has autosuggestions
For example, Response data of getAutoSuggest() .

Common
Defaults.js
Facet.json is imported, read and all the data in facet.json is stored into different variables.

SbCore.js
getSBResponse() - getSBResponse function, checks the url parameters, and uses the same parameters to send a request to the searchblox server and returns the response.
urlCheck()- to function to check response URL includes any navigation domains mentione din facet.js
getAutoSuggest() - sends a request to SearchBloxServer for auto- suggestion list and returns the response.
getSuggestClickCount()- function to track which  suggestions are clicked in to analytics
getFeaturedResultClickCount() - function to track which  suggestions are clicked in to analytics
getInitialUrlParameters() - function to parse the facets in facet.json and initial url parameters page, pagesize, sortdir, sort, col on page load.
clearAllFilters()- function to clear applied filters whenever search term is changed.
getDocumentClickCount()- function to track page click into analytics.
getResults() - formats the url parameters and loads the page each time search is done.
parseAppliedFiltersFromUrl() - reads the URL and brings all the applied filters into a single format, so that we can display the selected filters.
parseSBResponse() - function to format response into required way.

css
Has style files for respective jsx files.

FacetFilters
FacetFiltersMultipleSelectionComponent.js
Used to apply multiple filters at a time.

SelectedFiltersInMultipleSelection.js
Displays multiple selected filters at once with close icon to right.
We can delete the applied filters.

CustomDateFilters.js
Will display a custom date facet.
Useful in performing searches using custom dates.

FacetFiltersComponent.js
Renders the facets and has <Facet /> component for each facet in facets.
toggleFilter() - toggles filters.
Checks if filter already exists. Checks are based on current URL.
If filter exists then checks are done if array/string/existing filters are removed. If filter doesn't exist, then it is added as a string.
If an already different filter exists in the same type then added to the array.
facetToggle() - slideToggle facets
clearAllFilters() - clears all applied filters


FeaturedResults
FeaturedResultsComponent.js
Has featured results displaying title, description, url

Hooks
Has code regarding voice recognition and converting it into text.

Login
LogInComponent.js
Login part with username , password and input validations.

Low_level_components
db_overlay_component.js
DB overlay component which shows the data specified in dataToBeDisplayed in facet.json

email_overlay_component.js
To show email related content results.



FileViewer.js

To show pdf content type results in an overlay using react package "react-file-viewer"

suggest_auto_search.js
Has Suggested query instead of actual query given in input field.

custom_history.js
Used for modern web browser that supports HTML history API.


pagination
CustomPagination.js
Pagination component. After clicking a particular page, that page number is set into  local storage and triggered  corresponding tab’s doSearch().

RangeSelector
TuningRangeSelector.js
Has range sliders with tuning values minimum “0” and maximum “100”.


RelatedQuery
relatedquery.js
related queries are shown in all other tabs except “ALL” tab  based on the query we search.

SearchInput
SearchInputComponent.js
Has a search input field and autosuggestion component.

In changeSearchInput(), input field value is set state as query and in searchEnter() function enterupdate is set as true if keycode 13(I.e., enter) and that query is passed into getInitialUrlParameters() which parses the facets in facet.json
On load, url params and using the function getResults will get a response for the query in the input field.

VoiceSearchComponent.js
  Renders an mic in UI on click of which  calls speech startSpeechToText  of hooks component is is used and converted into text and after conversion stopSpeechToText of hooks is used to stop recording of voice

SearchResults
DefaultResultsComponent.js
Component which has all results in response and uses <Result /> to display each result.

sortComponent.js
This component is rendered under resources tab as facet .doSort() - sort values selected by the user are read, search is initiated.

topQuery
topquery.js
popular searches are shown in this component

normal_view_component.js
featured_results_component, results_component, pagination_component
Imported and aligned to the right above the search results.


App.css
Styles for App.js component

App.js
App.js has login and searchUIComponents.
If security is enabled first it shows login page and after authentication is successful it redirects to
SearchUIComponent.js
If there's no security enabled it directly shows SearchUIComponent page where we have search and other components required.


facet.js
Configuration file that provides options to provide search results as required

Facet.js Properties- Brief Explanation

Facet.js is the configuration file that provides options which can be configured to provide search results as required. This document will let you know about each parameter that has been used with the related front end.

Few parameters for facet.js can be passed from index.html (eg:sb_autosuggest,sb_facet_settings,sb_plugin_domain) and these parameters are considered as priority to values added in facet,js file
Eg:  let facetSettings = document.getElementById("sb_facet_settings");
window.autoSuggestObject = {};
let autoSuggestSettings = document.getElementById("sb_autosuggest");
if(autoSuggestSettings){
  window.autoSuggestObject.showAutoSuggest = autoSuggestSettings.value;
}
 These values are read in facet.js file .

"facets":[], - Facets or search filters will be shown in the UI so that user can filter search results to make search easier.

customDateSettings: {} - Custom date settings can be configured to display any custom date facet filters.
You can define ‘customDateField’ with your custom date filter as well as enable this setting to be shown in the plugin page using setting ‘customDateEnable:true’. You can also set the custom date display name as per your requirement using property ‘customDateDisplayText’..

"sortBtns":[
  {"field":"<metaDateField>","display":"Date ",checkedvalue:””},
  {"field":"relevance","display":"Relevance",checkedvalue:””}
 {"field":"relevance","display":"Relevance with MRank",checkedvalue:”mrank”}

],
SortBtns parameter is used to display a list of sorting filters that are being used for the UI. Here we are using ‘Date’ , ‘Relevance’ and “Relevance with MRank '' as per  requirement.

By default metaDateField is lastmodified. You can customize it as per your requirement.

<metaDateField> - date display will be considered from metaDateField value.By default it was mentioned “lastmodified” as value.

For plugin added custom date fields below are the list of custom date formats considered by SearchBlox:

metaDateField
Mapping.json Node Date Format
article:modified_time
yyyy-MM-dd HH:mm:ss
YYYY-MM-DD hh:mm:ss
DC.date.reviewed
yyyy-MM-dd HH:mm:ss.SSS
YYYY-MM-DD hh:mm:ss.ss
dateModified
yyyy-MM-dd HH:mm:ss
YYYY-MM-DD hh:mm:ss
DCTERMS.dateModified
yyyy-MM-dd
YYYY-MM-DD
dc:date
yyyy-MM-dd'T'HH:mm:ssZZ
YYYY-MM-DD hh:mm:ssZ

NOTE:
Each custom date field should have the same date format for all documents at collection level.

"facetFiltersOrder":[
  "Facetfield1”,”facetfield2”,”facetfield3”
],
- We can define the order of the facet filters.

“facetsFiltersDisplay”: To show the facet filters on the plugin page, this setting has to be enabled.

facetsFiltersDisplay: You can set facets to be enabled/disabled.

"facetFiltersType": "AND", - facet filters from facets property will be considered with AND logic

"sortDir":"desc",- Sort by date is the default sorting technique and sort direction is descending order.

"showAutoSuggest": "true", - With this auto suggestion feature, plugin UI will be shown with a list of related search query suggestions when user types search query (characters) in the search box.

“autoSuggestLimit” - to limit the number of auto suggestion to display in UI

suggestSearch: -  if a particular query has no results and has a suggestion term , that term is taken as a query and  search is triggered in every tab except “ALL”  tab.

“smartAutoSuggestSettings”:{...} - smart auto suggestion needs a smart suggest link to use the feature. You will need to set up basic configuration info with this section.

“showTrendingData” - making this to true will render a trending component which is a combination of smart suggestions and top suggestion on keydown of search box.

"adsDisplay":"true" - This is related to Featured Results (Key Matches) Displa except in “All”  tab.

"featuredResultsCount":- This parameter value controls the number of featured results  to be displayed in the front-end search page.

"relatedQuery":{"field":"true"}, - If field value is true, related queries will appear in the UI except in ALL tab .

"relatedQueryFields":

relatedQueryFields: {...} - If you use related queries, you will need to provide all the required configuration here.
      {"apikey":"","field":"content","operator":"and","limit":"5","terms":"10","type":"phrase","col":"12"}
	  You will need to configure relatedQueryFields properties such as:

apikey - You will need to add index server’s api key.
field - related queries will be considered from search result title based on given search term. You can configure it to any SearchBlox field such as content etc.
operator- If search term has multiple words or operator will be considered. You can switch it to AND for accurate results.
limit - Its the limit for Number of related queries display.
terms - Narrow search results can be shown up to 10 terms(words) you can alter it based on your requirement.
type - related search response display type is phrase.
col- This is nothing but a collection ID to consider related queries from..


"topQuery":{"field":"true"}, - If field value is true, popular queries will appear in the UI.

"topQueryFields": If you use popular queries, you will need to provide all the required configuration here.
	{"apikey":"","col":"12","limit":"5"}	apikey - You will need to add index server’s api key.
	col- This is nothing but a collection ID to consider popular queries from. By default it will be the collection ID that we use for that particular UI cname or defaultCname value.
	limit - Its the limit for Number of popular queries display.



    "tuneTemplate":     “WEB”
            By default tuning template is set to WEB.tuning values of web template
 We  can create custom templates in admin console and providing that template name in
 “voiceSearch”: “false”
       Voice search can be enabled in plugin by making  it to true.

"debug":false,
       Making this to true will display the response in JSON format in UI.

"autologout":true
     By making autologout to true  ,if the user is inactive on the page more than certain period of time , page will automatically logout and displays login page in UI


   "voiceSearchAPI":"https://demo.searchblox.com:8443/searchblox/rest/v2/api/speech/text",




 "defaultType":"OR",- To meet  search requirements efficiently, we added this feature ‘defaultType’ and value is given as OR so when multiple words are given in a search query, all words will be considered from a document and served in the search page.

  "pluginDomain": ""-  search results can be domain specific. So whenever you assign a domain, search results will be displayed from that particular domain… If you don’t mention any value it will take search results from where the plugin has been deployed.


Favicon
favicon.ico
Logo of URL.
favicon.png
Logo of URL to support icons in all browsers.

index.css
Common styles for plugins.

index.html
Root file for the plugin view where the app is initiated using ID.
Root and all scripts are included.

index.js
Binds the App.js component with root id using in index.html      


SearchUIComponent.js
Search and other Components will be rendered on page load.
FacetFiltersComponent,SortComponent, etc is displayed once the search results come up.
Based on the response different ui’s are shown using conditions.



tools
These files will be helpful for the build purpose and also to run the plugin in a local environment.
The port can be mentioned in these files.

.babelrc
This will be used to maintain browser compatibility.

.gitignore,.eslintignore
.gitignore file is used to configure files that shouldn't be uploaded to bit-bucket.

eslintrc
This will help in identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

Dockerfile, httpd.conf
These will be used for deployment purposes.

package-json
Has all node dependencies that are used in the plugin.

webpack.config.prod
Webpack will be used to bundle all the assets to minified files. We can mention what are the files we need to get after performing build in this file.




STEPS TO RUN REACT PLUGIN LOCALLY

Installation
Install node.js using the link below.
https://nodejs.org/en/download/


Import node modules into project:
I.  Open the command prompt with plugin path (Eg:  C:\plugin)

II. Use the command “npm install” to get all the dependencies into the project with folder name node_modules.

III. Use the command “npm start” to run the plugin.

IV. Plugin will be opened in default browser with port number 9010 as mentioned in the file tools/devserver.js
