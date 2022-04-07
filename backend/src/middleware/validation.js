function validation(schema) {
    return async (req, res, next) => {
        console.log(req.body)

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        return next()
    }
}

module.exports = validation