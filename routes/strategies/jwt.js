import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import UserModel from '../../models/user.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; 

export default new JwtStrategy(opts, async function(jwt_payload, done) {
   const user = await UserModel.findOne({user_name: jwt_payload.user_name}).exec();
   if (user) {
    return done(null, user);
   }  
   return done(null, false)
});