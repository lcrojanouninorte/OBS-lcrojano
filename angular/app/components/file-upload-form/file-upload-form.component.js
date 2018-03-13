class FileUploadFormController{
    constructor($scope, Upload, API,AclService){
        'ngInject';

        //

        this.$scope = $scope
        this.Upload =Upload
        this.API =API
        this.hasRole = AclService.hasRole
        this.filePath = ""

    }

    $onInit(){
        this.filePath = this.result.fuente_file;
    }

    uploadFiles(file, errFiles) {


    //CAMBIAR EN PRODUCCION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var url = 'http://gestorffi.lcrojano.com/api/result/upload/'+this.result.id
        this.$scope.f = file;
        this.$scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = this.Upload.upload({
                url: url,
                data: {
                    fuenteverificacion: file,
                    result_id:this.result.id
                }
            });

            let vm = this
            file.upload.then(function (response) {
                    vm.result.fuente_file = response.data.data;
                    console.log(vm.result.fuente_file);
                    //alert(filePath);
                $timeout( function () {
                    file.result = response.data;
                    
                    
                });

            }, function (response) {
                if (response.status > 0){
                    this.$scope.errorMsg = response.status + ': ' + response.data;
                }else{
                  //  this.result.fuente_file = response.data;
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }

    download_fuente(){  
        this.API.one('projects/file_download')
            .withHttpConfig({responseType: 'blob', })
            .customPOST({"filePath":this.result.fuente_file})
            .then(function(response) {
                //TODO recueprar nombre
                if(response.errors){
                    $log.debug(response);
                }else{
                    var url = (window.URL || window.webkitURL).createObjectURL(response);

                    window.open(url,"_self");
                }
            });
    }
}

export const FileUploadFormComponent = {
    templateUrl: './views/app/components/file-upload-form/file-upload-form.component.html',
    controller: FileUploadFormController,
    controllerAs: 'vm',
    bindings: {
        cancel :"&",
        result:"="
    }
};
