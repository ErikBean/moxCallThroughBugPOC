describe("testing mox spies", function () {
    describe("when not using mox", function () {
        beforeEach(module('myApp.foo'));
        it("should call the real thing before being spied upon", inject(function (moxTestService) {
            var num = 1;
            num = moxTestService.addOne(num, "First test should print to the console and increment value, not using any spies or mocks");
            expect(num).toBe(2);
        }));
    });
    describe("when using mox", function () {
        var moxTestService;
        beforeEach(function () {
            mox.module('myApp.foo')
                .mockServices('moxTestService')
                .run();
            moxTestService = mox.get.moxTestService;
        });
        it("should not call the real function with a normal spy", function () {
            var num = 1;
            num = moxTestService.addOne(num, "This should not print, calling the spy and not the real function");
            expect(num).toBeUndefined();
        });
        describe("when extending the spy", function () {
            it("should be able to return a value", function () {
                moxTestService.addOne.and.returnValue('fakeReturn');
                var num = 1;
                num = moxTestService.addOne(num, "This should not print either, calling the spy and not the real function and returning a fake value");
                expect(num).toBe('fakeReturn');
            });
            it("should be able to call through from the spy", function () {
                //THIS TEST FAILS! (not anymore with mox 0.5.0)
                moxTestService.addOne.and.callThrough();
                var num = 1;
                num = moxTestService.addOne(num, "This should also print to the console and increment value, should call the spy AND the real function");
                expect(num).toBe(2);
            });
        });
    });
});
