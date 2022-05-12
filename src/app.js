// this class works with Squiz REST resource to filter search results
class FilterComponent {
    constructor() {
        // %globals_ is a Squiz Matrix keyword
        this.scopeParameter = '%globals_get_scope%';
        this.profileParameter = '%globals_get_profile%';
        this.labelParameter = '%globals_get_label%';
        this.filterParameter = '%globals_get_filter%';

        this.setSessionStorage();
        this.filterResultsTemplate();
        this.trackRadioButtonChanges();
        this.applyFilterBtnClick();
    }

    /**
     * setSessionStorage function set profile, scope and label from the URL parameters
     * @return {undefined}
     * */
    setSessionStorage() {
        if(this.profileParameter !== 'qld' || this.scopeParameter){
            sessionStorage.setItem('fcProfile', this.profileParameter);
            sessionStorage.setItem('fcScope', this.scopeParameter);
        }
        sessionStorage.setItem('fcLabel', this.labelParameter);
    }

    /**
     * capitalizeFirstLetter to modify URL parameters value
     * @return {undefined}
     * */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * filterResultsTemplate display a template to filter search results
     * @return {undefined}
     * */
    filterResultsTemplate(){
        var label;
        var labelFromSession = sessionStorage.getItem('fcLabel');
        var profileFromSession = sessionStorage.getItem('fcProfile');
        var scopeFromSession = sessionStorage.getItem('fcScope');

        if(labelFromSession){
            label = this.capitalizeFirstLetter(labelFromSession);
        } else if(scopeFromSession) {
            label = "Results from <strong>" + scopeFromSession + "</strong>";
        } else if (profileFromSession) {
            label = this.capitalizeFirstLetter(profileFromSession);
        }

        var filterResultsTemplate = `
               <div class="qg-filter-by-results">
                  <p class="qg-filter-by-results__title">Filter results by</p>
                  <form class="form qg-forms-v2 qg-filter-by-results__form">
                  <ol class="questions pt-2">
                    <li>
                      <fieldset>
                        <legend>
                          <span class="label">Content type</span>
                        </legend>
                        <ol class="choices qg-forms-v2__radio">
                          <li>
                            <input checked name="filterBy" id="customOption" type="radio" value="custom"
                                   data-scope="${scopeFromSession}" 
                                   data-profile="${profileFromSession}"
                                   data-label="${labelFromSession}" />
                            <label for="customOption">${label}</label>
                          </li>
                          <li>
                            <input name="filterBy" id="qld" type="radio" value="qld" data-profile='qld' data-scope=''/>
                            <label for="qld">all Queensland Government</label>
                          </li>
                        </ol>
                      </fieldset>
                    </li>
                  </ol>
                </form>
                <button type="button" class="qg-btn qg-btn__filter btn-primary mb-2" id="applyFilter">Apply filters</button>
               </div>
            `;

        if(this.filterParameter || this.profileParameter !== 'qld' || this.scopeParameter){
            $('.qg-aside').append(filterResultsTemplate);
        }
    }

    /**
     * trackRadioButtonChanges function track radio button changes when a user interacts with the form to set a session
     * @return {undefined}
     * */
    trackRadioButtonChanges() {
        var  selectedRadioBtnFromSession = sessionStorage.getItem('selectedRadiobutton');
        $('input[type=radio][name=filterBy]').on('change', function() {
            var selectedVal = $(this).val();
            switch (selectedVal) {
                case 'qld':
                    sessionStorage.setItem(`selectedRadiobutton`, selectedVal);
                    break;
                case 'custom':
                    sessionStorage.setItem(`selectedRadiobutton`, selectedVal);
                    break;
            }
        });
        // Check if the profile value is present then set the hidden profile input field
        if(selectedRadioBtnFromSession === 'qld'){
            $("input[name=filterBy][value='qld']").prop("checked",true);
        }

    }

    /**
     * applyFilterBtnClick function register a click event on 'apply filter' button
     * @return {undefined}
     * */
    applyFilterBtnClick(){
        $('#applyFilter').on("click" , function() {
            var params = new URLSearchParams(location.search);
            var $selected = $("input[type='radio'][name='filterBy']:checked");
            var selectedProfile = $selected.data('profile');
            var selectedScope = $selected.data('scope');
            params.set('scope', selectedScope);
            params.set('profile', selectedProfile);
            params.set('filter', true);
            window.location.search = params.toString();
        })
    }
}

const filterComponent = new FilterComponent();
