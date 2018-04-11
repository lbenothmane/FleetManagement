

//install/import Shiny library -- I can't find any other way to do this





//do something with this when integrating so that we can use/store the data

//I can't find another way to do this without installing Shiny

var percentageIdle ;
Shiny.addCustomMessageHandler("percentageIdleHandler",     
    function(number) {
     percentageIdle = number;
    }
);

var idleTime ;
Shiny.addCustomMessageHandler("idleTimeHandler",     
    function(number) {
     idleTime = number;
    }
);
