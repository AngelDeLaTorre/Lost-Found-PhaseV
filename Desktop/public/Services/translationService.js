angular.module('formApp')
.service('translationService', function($resource){  

        this.getTranslation = function($scope, language) {
            var languageFilePath = 'translation_' + language + '.json';
           // console.log(languageFilePath);
           return $resource(languageFilePath)
             //  alert($scope.translation.HELLO_WORLD);


        };
    })

;
