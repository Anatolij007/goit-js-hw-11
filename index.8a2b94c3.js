!function(){var e={searchForm:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".load-more")};console.log(e.searchForm),e.searchForm.addEventListener("sumbit",(function(e){e.preventDefault(),fetch("https://newsapi.org/v2/everything?q=tesla&pageSize=5&page=1",{headers:{"X-Api-Key":"2087ad7622f241ad8284941576a45d1b"}}).then((function(e){return e.json()})).catch(console.log())})),e.loadMore.addEventListener("click",(function(){}))}();
//# sourceMappingURL=index.8a2b94c3.js.map
