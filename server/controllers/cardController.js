const {Card} = require('../models/Card');

class CardsController { 
    async create(req, res) {
        const {
                id,
                name,
                username,
                email,
                address: {
                  street,
                  suite,
                  city,
                  zipcode,
                  geo: {
                    lat,
                    lng
                  }
                },
                phone,
                website,
                company: {
                
                  catchPhrase,
                  bs
                }
              
} = req.body;
        const cards = await Card.create({ 
            id,
            name,
            username,
            email,
            address: {
              street,
              suite,
              city,
              zipcode,
              geo: {
                lat,
                lng
              }
            },
            phone,
            website,
            company: {
              name,
              catchPhrase,
              bs
            }});
        
        return res.json(cards);
    }

}

 module.exports = new CardsController();