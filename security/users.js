const user_repo = require('./users_repo');
const crypto = require('crypto');
const jwt = require('./jwt');
const secret = '3b96be03-199f-4e6b-aadf-0e83e389a69a'

function hashPwd(user) {
    const hashedUser = Object.assign({}, user);
    hashedUser.pwd_hash = crypto.createHash('sha256').update(user.email + user.pwd + secret).digest('hex');
    delete hashedUser.pwd
    return hashedUser
}


async function sign_up(user){
    const hashed = hashPwd(user)
    const saved = await user_repo.save_user(hashed);
    return saved
}

async function login_pwd(user){
    const result = {
        success: false
    }
    const storedUser = await user_repo.get_user(user)
    const hashed = hashPwd(user)
    result.success =  storedUser.pwd_hash === hashed.pwd_hash
    if (result.success) {
        result.jwt = jwt.generate_token({
            email: user.email
        })
    }
    return result
}

async function login_jwt(token){
    const decoded = await jwt.decode(token)
    const user = await user_repo.get_user({
        email: decoded.payload.email
    })
    const result = {
        success: typeof user === 'object'
    }
    if (result.success) result.user = { email: user.email}
    return result
}

function getResetToken(email){
    return jwt.generate_token({email})
}

async function reset_pwd(token, user){
    const decoded = await jwt.decode(token)
    if (decoded.success && decoded.payload.email === user.email) {
        const storedUser = await user_repo.get_user(user)
        storedUser.pwd = user.pwd
       return await sign_up(storedUser)
    }
    return false
}

module.exports = {
    sign_up,
    login_jwt,
    login_pwd,
    getResetToken,
    reset_pwd
}



