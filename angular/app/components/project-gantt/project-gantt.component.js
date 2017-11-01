class ProjectGanttController{
    constructor(API, $scope, $stateParams,$timeout, $uibModal, $state, AclService, $log){
        'ngInject';

        //
        this.API = API
        this.$scope = $scope
        this.$uibModal = $uibModal
        this.$log = $log
        this.$state = $state
        this.isAsesor = AclService.hasRole("asesor");
        this.isEmpresario = AclService.hasRole("empresario");
        this.$scope.data=[]
        this.project
        this.id = $stateParams.projectId
        this.$timeout =$timeout
        this.today = moment().format("YYYY-MM-DD")
        //this.endDate =  moment(this.today, "YYYY-MM-DD").add(5, 'months')
        this.ready = false

        this.options = {
             scale: "week",
             currentDate: "column",
             daily: true,
             readOnly: false,
             sideMode: "TreeTable",
             autoExpand: 'both',
             maxHeight: false,
             width: true,
             zoom: 1,
             fromDate: this.today,
             //toDate:  this.endDate,
             treeColumn:{
                "model.name": "Resultados",
             },
             treeTableColumns:{
                0: "from",
                1: "to"
             },
             columnsHeaders:{
                "model.name": "Resultados",
                from: "Desde",
                to: "Hasta"
            },
            formatters:{
              'from': function(value, column, row) {
                if (value) {
                  return value.format('DD MMM YY');
                }
                return value;
              },
              'to': function(value, column, row) {
                if (value) {
                  return value.format('DD MMM YY');
                }
                return value;
              }
            },
            columnsHeaderContents:{
                "model.name": "<i class='fa fa-align-justify'></i> {{getHeader()}}",
                from: "<i class='fa fa-calendar'></i> {{getHeader()}}",
                to: "<i class='fa fa-calendar'></i> {{getHeader()}}"
            },
            classes:{'model.name': 'gantt-column-name'},
            treeHeaderContent: "<i class='fa fa-align-justify'></i> {{getHeader()}}",
            taskContent:"<span md-truncate ng-click='scope.handleTaskclick(task)'><i class='fa fa-clock-o'></i> {{task.model.name}}</span>",
            rowContent:"<span md-truncate ng-click='scope.handleRowClick(row.model)'><i class='fa fa-tasks'></i> {{row.model.name}}</span>"


        }

        this.timeFrames = {
                    day: {
                        start: moment('8:00', 'HH:mm'),
                        end: moment('20:00', 'HH:mm'),
                        working: true, // This is a working period
                        default: true // It will be used for each day
                    },
                    plazo: {
                        working:false,
                        magnet: true,
                        color:"red",
                        classes: ['gantt-important-date'] // Give one or many class names to customize using CSS.
                    },
                    noon: {
                        start: moment('12:00', 'HH:mm'),
                        end: moment('14:00', 'HH:mm'),
                        magnet: false, // This will disable magnet snapping
                        working: false, // This is a resting period
                        default: true // It will be used for each day
                    },
                    closed: {
                        magnet: false, // This will disable magnet snapping
                        working: false // We don't work when it's closed
                    }
        };

         this.dateFrames = {
                    
                    weekend: {
                         evaluator: function(date) { // A custom function evaluated for each day in the gantt
                             return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                         },
                         targets: ['closed'] // Use timeFrame named closed for saturday and sunday.
                    },
        };

        

    }

    $onInit(){
     
                        //get project and his results.
        let Project = this.API.one('project/gantt', this.id)
        Project.get()
          .then((response) => {
            if(!response.error){   
                this.project = response.data
                this.$scope.data = this.project.results
                let DateFrames = this.dateFrames;
                angular.forEach(this.project.milestones, function(milestone, key) {
                    var newMilestone = {
                        date: moment(milestone.fecha,'YYYY-MM-DD'),
                        targets: ['plazo']
                    }

                    DateFrames[milestone.titulo] = newMilestone;
                });
                //this.dateFrames.push(DateFrames);
                this.ready = true
            }
        })

        let API = this.API
        let $scope = this.$scope;
        let $state = this.$state
        let IsEmpresario = this.isEmpresario

        this.$scope.handleTaskclick = function(task){
          console.log(task);
          if(IsEmpresario){
            task = task.model
            //Change status

            if(task.checkEmpresario < 3){
              task.checkEmpresario = task.checkEmpresario + 1
            }else{
              task.checkEmpresario  = 1 
            }
            API.all('products/check').post(task).then((response) => {
                    if(response.error){
                        console.log(response);
                    }else{
                        //TODO update progress not reload
                        $state.reload()
                        console.log(response);


                    }
                })
          }
      }

      this.$scope.handleRowclick = function(task){
        console.log(task);
      }
    }

     

    milestones_open(mode) {
        mode = mode || '';
        let $uibModal = this.$uibModal
        let Mode = mode
        
        let Milestones = this.project.milestones

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "MilestonesModal.html",
            controller: this.milestonesModalController ,
            controllerAs: 'mvm',
            size: 'lg',
            resolve: {
               milestones: function() {
                   return Milestones;
               },
               mode: function() {
                   return Mode;
               }
            }
        })
    }


    milestonesModalController($uibModalInstance, milestones, mode) {
        'ngInject'
        this.milestones = milestones
        this.mode = mode
       
        this.ok = () => {

          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }

    getColumnWidth(width, scale, zoom){
        if(width){
            return scale.match(/.*?year.*?/)?400*zoom : scale.match(/.*?month.*?/)?150*zoom : scale.match(/.*?week.*?/)? 50*zoom : scale.match(/.*?day.*?/)? 30*zoom : 40;
        }
    }
 

}

export const ProjectGanttComponent = {
    templateUrl: './views/app/components/project-gantt/project-gantt.component.html',
    controller: ProjectGanttController,
    controllerAs: 'vm',
    bindings: {}
};
