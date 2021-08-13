var initialTips = [5, 10, 15, 25, 50];
var basicInfo = {
    bill: "",
    numPeople: "",
    tip: "",
    custom: ""
}

var basicResult = {
    tipAmount: "$0.00",
    total: "$0.00"

}

/* Patrones REGEX */
const decimalRGEX = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;
const numberRGEX = /^[0-9]*$/;
const customRGEX = /^([0-9]+\.?[0-9]*|\.[0-9]+)[%]?$/;

var information = function(data){
    this.bill = ko.observable(data.bill);
    this.tipsOptions = ko.observableArray(initialTips); 
    this.tip = ko.observable(data.tip);
    this.numPeople = ko.observable(data.numPeople);
    this.custom = ko.observable(data.custom);
}

var result = function(currentInfo){
    this.total = ko.observable(currentInfo.total);
    this.tipAmount = ko.observable(currentInfo.tipAmount);
}

var ViewModel = function(){
    var self = this;

    this.info = ko.observable(new information(basicInfo));
    this.result = ko.observable(new result(basicResult));

    this.updateBill = function(event){
        self.info().bill(event.target.value);
    };

    this.checkBill = function(){
        return decimalRGEX.test(self.info().bill()) && self.info().bill() !== "";
    };

    this.updatePeople = function(item, event){
        self.info().numPeople(event.target.value);
    };

    this.checkPeople = function(){
        return numberRGEX.test(self.info().numPeople()) && self.info().numPeople() !== "";
    };

    this.updateTip = function(item, event){
        let target = event.target;
        $("#options").children().toArray().forEach(function(element){
            if(target.id === element.id && target.id !== "custom"){
                self.info().tip(element.value);
                element.disabled = true;
                $("#" + element.id).toggleClass("active");
                self.info().custom("");
            } else if(element.classList.contains("active")){
                element.disabled = false;
                $("#" + element.id).toggleClass("active");
            }
        });
        self.calculateResults();
    };

    this.updateCustom = function(item, event){
        let target = event.target
        var customButton = $("#" + target.id);

        if(!target.classList.contains("active")){
            customButton.toggleClass("active");
        }
        var tipPercentageValue = "0%";
        if(customRGEX.test(target.value)){
            tipPercentageValue = target.value.includes("%") ? target.value : target.value + "%";
        }
        self.info().tip(tipPercentageValue);
        self.calculateResults();
    };

    this.checkTip = function(){
        return (customRGEX.test(self.info().tip())) || (self.info().tip() === "");
    }

    this.calculateResults = function(){
        var tipPercentageValue = 0, billValue = 0, numPeopleValue = 0;
        if (self.checkBill() && self.checkPeople() && self.checkTip()){
            var currentInfo = self.info();
            if(self.info().tip() !== ""){
                tipPercentageValue = parseFloat(currentInfo.tip().substring(0, currentInfo.tip().length - 1)).toFixed(2);
            }
            billValue = parseFloat(self.info().bill());
            numPeopleValue = parseInt(self.info().numPeople());
        }
        self.calculateTotal(billValue, numPeopleValue, tipPercentageValue);
        self.calculateTipAmount(billValue, numPeopleValue, tipPercentageValue);
    }

    this.calculateTipAmount = function(billValue=0, numPeopleValue=0, tipPercentageValue=0){
        var tipAmount = 0;
        if(numPeopleValue > 0 && billValue > 0){
            tipAmount = (billValue * (tipPercentageValue/100))/numPeopleValue
        }
        self.result().tipAmount("$" + tipAmount.toFixed(2).toString());
    };

    this.calculateTotal = function(billValue=0, numPeopleValue=0, tipPercentageValue=0){
        var totalAmount = 0;
        if(billValue !== 0 && numPeopleValue !== 0){
            totalAmount = (billValue + (billValue * (tipPercentageValue/100)))/numPeopleValue;
        }
        self.result().total("$" + totalAmount.toFixed(2).toString());
    };

    this.basicValues = function(){
        self.info(new information(basicInfo));
        self.result(new result(basicResult));
    };
}

ko.applyBindings(new ViewModel());
