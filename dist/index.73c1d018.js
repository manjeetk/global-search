new class{constructor(){this.scopeParameter="%globals_get_scope%",this.profileParameter="%globals_get_profile%",this.labelParameter="%globals_get_label%",this.filterParameter="%globals_get_filter%",this.setSessionStorage(),this.filterResultsTemplate(),this.trackRadioButtonChanges(),this.applyFilterBtnClick()}setSessionStorage(){("qld"!==this.profileParameter||this.scopeParameter)&&(sessionStorage.setItem("fcProfile",this.profileParameter),sessionStorage.setItem("fcScope",this.scopeParameter)),sessionStorage.setItem("fcLabel",this.labelParameter)}capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}filterResultsTemplate(){var e,t=sessionStorage.getItem("fcLabel"),s=sessionStorage.getItem("fcProfile"),a=sessionStorage.getItem("fcScope");t?e=this.capitalizeFirstLetter(t):a?e="Results from <strong>"+a+"</strong>":s&&(e=this.capitalizeFirstLetter(s));var l=`\n   <div class="qg-filter-by-results">\n      <p class="qg-filter-by-results__title">Filter results by</p>\n      <form class="form qg-forms-v2 qg-filter-by-results__form">\n      <ol class="questions pt-2">\n        <li>\n          <fieldset>\n            <legend>\n              <span class="label">Content type</span>\n            </legend>\n            <ol class="choices qg-forms-v2__radio">\n              <li>\n                <input checked name="filterBy" id="customOption" type="radio" value="custom"\n                       data-scope="${a}" \n                       data-profile="${s}"\n                       data-label="${t}" />\n                <label for="customOption">${e}</label>\n              </li>\n              <li>\n                <input name="filterBy" id="qld" type="radio" value="qld" data-profile='qld' data-scope=''/>\n                <label for="qld">all Queensland Government</label>\n              </li>\n            </ol>\n          </fieldset>\n        </li>\n      </ol>\n    </form>\n    <button type="button" class="qg-btn qg-btn__filter btn-primary mb-2" id="applyFilter">Apply filters</button>\n   </div>\n`;(this.filterParameter||"qld"!==this.profileParameter||this.scopeParameter)&&$(".qg-aside").append(l)}trackRadioButtonChanges(){var e=sessionStorage.getItem("selectedRadiobutton");$("input[type=radio][name=filterBy]").on("change",(function(){var e=$(this).val();switch(e){case"qld":case"custom":sessionStorage.setItem("selectedRadiobutton",e)}})),"qld"===e&&$("input[name=filterBy][value='qld']").prop("checked",!0)}applyFilterBtnClick(){$("#applyFilter").on("click",(function(){var e=new URLSearchParams(location.search),t=$("input[type='radio'][name='filterBy']:checked"),s=t.data("profile"),a=t.data("scope");e.set("scope",a),e.set("profile",s),e.set("filter",!0),window.location.search=e.toString()}))}};
//# sourceMappingURL=index.73c1d018.js.map
