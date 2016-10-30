(function(){
'use strict';
 angular.module('diveLog').controller('AltaController', AltaController);
        function AltaController($scope) {

            $scope.person= {
                status : {}
            };

        console.log('Entrando AltaController...'); 
        $scope.products=[
            {name:"Apples", category:"Fruit"},
            {name:"Bananas", category:"Fruit"}
            ]

         $scope.statusList = [ {
            statusName : 'Activo' , id: 1 
         }, {
            statusName : 'Inactivo' , id: 0
         }
         ];   
}
})();