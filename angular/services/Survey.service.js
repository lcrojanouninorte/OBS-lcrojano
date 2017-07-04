export class SurveyService{
    constructor(API){
        'ngInject';

        //
        this.QMindex = {}
        this.QPI = {}
        this.QEMP = {}
        this.API = API
    }

    get (survey_id) {
    	var survey = this.API.one('survey',survey_id)
    	return survey;
    }
    getAnswers (survey_id) {
        var survey = this.API.one('answers', survey_id)
        return survey;
    }
    

    put() {
    	var survey = this.API.all('answer');
    	return survey;
    }
}

