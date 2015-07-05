describe('waitFor',function() {

    var duration = 10000;

    function checkTrue(res) {
        expect(res).to.be.true;
    };

    function checkFalse(res) {
        expect(res).to.be.false;
    };

    describe('Enabled', function() {

        beforeEach(h.setup());

        it('should return w/o err after element was enabled', function() {
            return this.client.waitForEnabled('//html/body/section/input[8]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element was disabled', function() {
            return this.client.waitForEnabled('.waitForValueEnabledReverse', duration, true).then(checkTrue);
        });

    });

    describe('Exist', function() {

        beforeEach(h.setup());

        it('should return w/o err after element was appended to the DOM', function() {
            return this.client.waitForExist('//div[text()="Sorry, I\'m late!"]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element was removed from the DOM', function() {
            return this.client.waitForExist('.goAway', duration, true).then(checkTrue);
        });

    });

    describe('Selected', function() {

        beforeEach(h.setup());

        it('should return w/o err after element was selected', function() {
            return this.client.waitForSelected('//*[@id="selectbox"]/option[3]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element was unselected', function() {
            return this.client.waitForSelected('.option2', duration, true).then(checkTrue);
        });

    });

    describe('Text', function() {

        beforeEach(h.setup());

        it('should return w/o err after element got a text/content', function() {
            return this.client.waitForText('//*[contains(@class, "sometextlater")]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after text/content element was removed', function() {
            return this.client.waitForText('.sometext', duration, true).then(checkTrue);
        });

    });

    describe('Value', function() {

        beforeEach(h.setup());

        it('should return w/o err after element got a value', function() {
            return this.client.waitForValue('//*[contains(@class, "waitForValueEnabledReverse")]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element lost its value', function() {
            return this.client.waitForValue('.waitForValueEnabled', duration, true).then(checkTrue);
        });

    });

    describe('Visible', function() {

        beforeEach(h.setup());

        it('should return w/o err after element moved into document bounderies', function() {
            return this.client.waitForVisible('//*[contains(@class, "notVisible")]', duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element left document bounderies', function() {
            return this.client.waitForVisible('.onMyWay', duration, true).then(checkTrue);
        });

        // TODO replicate https://github.com/webdriverio/webdriverio/issues/434
        it('should return w/o err after element is created', function() {
            var e = '.lateElem';
            return this.client
                .isExisting(e).then(checkFalse)
                .waitForVisible(e, duration).then(checkTrue); // TODO fails under phantomjs but not chrome. `grunt test-functional --spec=test/spec/waitFor.js`
        });

        it('should return w/o err after element becomes visible', function() {
            var e = '.notVisible';
            return this.client
                .isVisible(e).then(checkFalse)
                .waitForVisible(e, duration).then(checkTrue);
        });

        it('should return w/o err after element becomes displayed', function() {
            var e = '.notDisplayable';
            return this.client
                .isVisible(e).then(checkFalse)
                .waitForVisible(e, duration).then(checkTrue);
        });

        it('(reverse) should return w/o err after element becomes invisible', function() {
            var e = '.onMyWay';
            return this.client
                .isVisible(e).then(checkTrue)
                .waitForVisible(e, duration, true).then(checkTrue);
        });

    });

    describe('timeout', function() {

        before(h.setup());

        it('should use specified timeout', function() {
            var startTime = Date.now();
            return this.client.waitForExist('#notExisting').catch(function() {
                var delta = Date.now() - startTime;
                delta.should.be.above(1000);
            });
        });

        it('should use parameter timeout and should overwrite default value', function() {
            var startTime = Date.now();
            return this.client.waitForExist('#notExisting', 2000).catch(function() {
                var delta = Date.now() - startTime;
                delta.should.be.above(2000);
            });
        });

    });

});