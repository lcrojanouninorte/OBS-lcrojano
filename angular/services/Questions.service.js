export class QuestionsService{
    constructor(){
        'ngInject';

        //
        this.QMindex = {}
        this.API = API
    }

     get(question_type){
    	var Project = this.API.all('questions', question_type)
    	return Project;
    }
}

