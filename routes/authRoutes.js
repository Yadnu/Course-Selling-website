const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();
// Initialize passport
router.use(passport.initialize());
router.use(passport.session());
router.use(passport.initialize());
router.use(passport.session());

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    // Find user by ID
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Register logic
authController.register = (req, res, next) => {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).json({ message: 'Registration successful' });
        });
    });
};

// Login logic
authController.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

// Logout logic
authController.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};
// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

module.exports = router