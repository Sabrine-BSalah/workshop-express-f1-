const auth = (req, res, next) => {

    if (false) {
        console.log('Auhtenticated !!')
        next()
    } else {
        res.send('You have to authenticate !!!')
    }
}

module.exports = auth