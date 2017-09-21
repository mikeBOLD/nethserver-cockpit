/*
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
*/


mocha.setup('bdd');

describe('nethserver namespace', function () {
    it('is defined', function() {
        should(typeof nethserver === 'object').be.ok();
    });
    describe('.Syntax namespace', function () {
        it('is defined', function () {
            should(typeof nethserver.Syntax === 'object').be.ok();
        });
    });
});


describe('nethserver.Syntax.trimWhitespace', function() {
    it('is a cockpit.file API syntax object', function(){
        nethserver.Syntax.trimWhitespace.should.have.properties(['parse', 'stringify']);
    });
    describe('#parse()', function() {
        it('returns a trimmed string', function() {
            nethserver.Syntax.trimWhitespace.parse(' abc ').should.be.eql('abc');
        });
    });
    describe('#stringify()', function() {
        it('is not implemented', function() {
            (function(){nethserver.Syntax.trimWhitespace.stringify(0);}).should.throw('Not implemented');
        });
    });
});


describe('nethserver.Syntax.grepToObject', function() {
    it('is a cockpit.file API syntax object', function(){
        nethserver.Syntax.grepToObject.should.have.properties(['parse', 'stringify']);
    });
    describe('#parse()', function() {
        it('returns an object with expected properies', function() {
            nethserver.Syntax.grepToObject.parse("p1:v1\np2:v2").should.have.properties({p1:'v1',p2:'v2'});
        });
    });
    describe('#stringify()', function() {
        it('is not implemented', function() {
            (function(){nethserver.Syntax.grepToObject.stringify(0);}).should.throw('Not implemented');
        });
    });
});



describe('nethserver.signalEvent()...', function() {
    it('succeedes', function(done){
        nethserver.signalEvent('test-success').then(done, done);
    });
    it('fails', function(done){
        nethserver.signalEvent('test-failure').then(
            function(){
                done('must fail');
            },
            function(){
                done();
            });
    });
    it('catches non-existing event', function(done){
        nethserver.signalEvent('test-nonexisting-event').then(
            function(){
                done('must fail');
            },
            function(){
                done();
            });
    });
});

describe('nethserver.getDatabase()', function() {
    it('is defined', function () {
        should(typeof nethserver.getDatabase === 'function').be.ok();
    });
});

describe('The object returned by getDatabase()', function() {
    it('has a getProp() method', function () {
        var cdb = nethserver.getDatabase('configuration');
        should(typeof cdb.getProp === 'function').be.ok();
    });
    it('reads prop with getProp()', function(done) {
        var cdb = nethserver.getDatabase('configuration');
        cdb.open(function(){
            cdb.getProp('dnsmasq', 'status').should.be.equal('enabled');
        }).done(done, done);
    });
    it('returns record type with getType()', function(done) {
        var cdb = nethserver.getDatabase('configuration');
        cdb.open(function(){
            cdb.get('MinUid').should.be.equal('5000');
            cdb.getType('MinUid').should.be.equal('5000');
        }).done(done, done);
    });
});

describe('Also, the object returned by getDatabase()', function() {
    beforeEach(function(done) {
        cockpit.spawn(['/usr/bin/rm', '-f', '/tmp/testdb'], {err:'message', superuser:'required'}).
            done(done).fail(function(err) { done(new Error(err.message)); });
    });

    it('opens with non-existing file', function (done) {
        var tdb = nethserver.getDatabase('/tmp/testdb');
        tdb.open().done(done);
    });

    it('creates an empty db', function (done) {
        var tdb = nethserver.getDatabase('/tmp/testdb');
        tdb.open().
            then(function(){
                tdb.save();
            }).
            done(done);
    });

    it('writes changes to a new file', function (done) {
        var tdb = nethserver.getDatabase('/tmp/testdb');
        tdb.open().
            then(function(){
                tdb.delete('keytest');
                tdb.set('keytest', 'typeofkey', {'p1':'v1', 'p2': 'v2'});
                tdb.setProp('keytest', 'p1', 'v1mod');
                tdb.delProp('keytest', 'p2');
                tdb.delProp('keytest', 'p2');
                tdb.setType('kdel', 'deleteme'); tdb.setType('kdel', 'deleteme');
                tdb.delete('kdel'); tdb.delete('kdel');
            }).
            then(function(){
                tdb.save();
            }).
            then(function(){
                tdb.getProp('keytest', 'p1').should.be.equal('v1mod');
                tdb.getType('keytest').should.be.equal('typeofkey');
                tdb.getType('kdel').should.be.equal('');
                tdb.getProp('keytest', 'p2').should.be.equal('');
            }).
            done(done);
    });


});

describe('nethserver.validate()', function() {
    it('succeedes', function(done) {
        nethserver.validate('myhostname', 'test').then(done, done);
    });
});

mocha.checkLeaks();
mocha.globals(['jQuery', 'cockpit']);
mocha.run();
