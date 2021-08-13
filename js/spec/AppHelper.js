/// <reference path="../app.js"/>

describe("App - Environment Requirements", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    it("should have Knockout working", function() {
        expect(window.ko).toBeDefined();
    })
});

describe("App - Bill Information", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    describe("Initial behaviour", function () {
        it("Should iniciate as empty", function () {
            expect(app.info().bill()).toBe("");
        });

        it("Shouldn't be a valide value", function () {
            expect(app.checkBill()).toBe(false);
        })
    })
});

describe("App - Number of People Information", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    describe("Initial behaviour", function () {
        it("Should iniciate as empty", function () {
            expect(app.info().numPeople()).toBe("");
        });
        it("Shouldn't be a valide value", function () {
            expect(app.checkPeople()).toBe(false);
        })
    })
});

describe("App - Tip Information", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    describe("Initial behaviour", function () {
        it("Should iniciate as empty", function () {
            expect(app.info().tip()).toBe("");
        }); 

        it("Should be a valide value", function () {
            expect(app.checkTip()).toBe(true);
        });
    })  
});

describe("App - Tip Amount / person Result", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    describe("Initial behaviour", function () {
        it("Should iniciate as $0.00", function () {
            expect(app.result().tipAmount()).toBe("$0.00");
        }); 

        it("Should stay as $0.00 when its calulated with initial values", function () {
            app.calculateTipAmount();
            expect(app.result().tipAmount()).toBe("$0.00");
        });
    });

    describe("Regular behaviour", function () {
        it("Should be $0.00 when tip is not set", function () {
            app.calculateTipAmount(10.00, 1, 0);
            expect(app.result().tipAmount()).toBe("$0.00");
        });
        it("Should be $0.00 when bill is not set", function () {
            app.calculateTipAmount(0, 1, 5);
            expect(app.result().tipAmount()).toBe("$0.00");
        });
        it("Should be $0.00 when number of people is not set", function () {
            app.calculateTipAmount(10, 0, 5);
            expect(app.result().tipAmount()).toBe("$0.00");
        });
        it("Should be different from $0.00 when all values are set", function () {
            app.calculateTipAmount(10, 1, 5);
            expect(app.result().tipAmount()).not.toBe("$0.00");
        });
        it("Should calculate correctly", function () {
            const bill = 10, people = 1, tip = 5;
            app.calculateTipAmount(bill, people, tip);
            var expected = "$" + ((bill * (tip/100))/people).toFixed(2).toString()
            expect(expected).toEqual(app.result().tipAmount());
        })
    });
});

describe("App - Total / person Result", function () {
    var app;

    beforeEach(function () {
        app = new ViewModel();
    });

    describe("Initial behaviour", function () {
        it("Should iniciate as $0.00", function () {
            expect(app.result().total()).toBe("$0.00");
        }); 

        it("Should stay as $0.00 when its calulated with initial values", function () {
            app.calculateTotal();
            expect(app.result().total()).toBe("$0.00");
        });
    })  
    describe("Regular behaviour", function () {
        it("Shouldn't be $0.00 when tip is not set", function () {
            app.calculateTotal(10.00, 1, 0);
            expect(app.result().total()).not.toBe("$0.00");
        });
        it("Should be $0.00 when bill is not set", function () {
            app.calculateTotal(0, 1, 5);
            expect(app.result().total()).toBe("$0.00");
        });
        it("Should be $0.00 when number of people is not set", function () {
            app.calculateTotal(10, 0, 5);
            expect(app.result().total()).toBe("$0.00");
        });
        it("Should be different from $0.00 when all values are set", function () {
            app.calculateTotal(10, 1, 5);
            expect(app.result().total()).not.toBe("$0.00");
        });
        it("Should calculate correctly", function(){
            const bill = 10, people = 1, tip = 5;
            app.calculateTotal(bill, people, tip);
            var expected = "$" + ((bill + (bill * (tip/100)))/people).toFixed(2).toString();
            expect(expected).toEqual(app.result().total());
        });
    });
});

