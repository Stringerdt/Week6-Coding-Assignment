const expect = chai.expect;

describe('getSuitImageFunc', function() {
    describe('#getSuitImage', function() {
        it('should return the corresponding image for the suit entered', function() {
            let image = getSuitImage('Club')
            expect(image).to.equal("/images/club.png")
        }) 
        
        it('should return the name of the suit if one of the 4 cases are not entered', function() {
            expect(getSuitImage('Cllub')).to.equal('Cllub');
        })
    })
})