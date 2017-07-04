import {SurveyService} from './services/Survey.service';
import {QuestionsService} from './services/Questions.service';
import {ProjectService} from './services/Project.service';
import { ContextService } from './services/context.service'
import { APIService } from './services/API.service'
 

angular.module('app.services')
	.service('SurveyService', SurveyService)
	.service('QuestionsService', QuestionsService)
	.service('ProjectService', ProjectService)
  .service('ContextService', ContextService)
  .service('API', APIService)
