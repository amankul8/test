
module.exports = {
    regValidatorMid(req, res, next) {
        let {email, password, confirm} = req.body;

        email = email?.trim();
        password = password?.trim();
        confirm = confirm?.trim();

        if (!email || !password || !confirm) {
            return res.status(400).json({ message: 'All fields required' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        if (password !== confirm) {
            return res.status(400).json({ message: 'The passwords do not match' });
        }

        next();
    },

    logValidatorMid(req, res, next) {
        let {email, password} = req.body;

        email = email?.trim();
        password = password?.trim();


        if (!email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        next();
    }
}