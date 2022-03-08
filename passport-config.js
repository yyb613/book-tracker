const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require ('./config/connection')


function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const sql = 'SELECT password FROM users WHERE email = (?)'
        const values = email
        const user = db.query(sql, email, (err, res) => {
            if (err) throw (err);
          })
        const hashedPassword = await bcrypt.hash(password, 10)
        if (user === null) {
            return done(null, false, { message: 'No user with that email'})
        }
        
        try {
             if (await bcrypt.compare(password, hashedPassword)) {
                 return done(null, user)
             } else {
                 return done (null, false, { message: 'Password Incorrect'})
             }
        } catch (err) {
            return done(err)
        }
    }
    
    passport.use(new LocalStrategy ({ usernameField: 'email' }, 
    authenticateUser)
    )
    
    passport.serializeUser((user, done) => done(null, user))
    
    passport.deserializeUser(function(id, done) {
		db.query("SELECT * FROM users WHERE id = "+ id,function(err,rows){	
			done(err, rows);
		});
    });
}

module.exports = initialize