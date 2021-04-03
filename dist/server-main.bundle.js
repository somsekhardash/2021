(()=>{"use strict";var e={268:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.userLogout=t.userLogin=void 0;const a=s(364),n=s(756),o=r(s(674)),i=r(s(722)),{sign:u}=i.default;let d=[];t.userLogin=[n.body("mobileNumber").isLength({min:1}).trim().withMessage("userName must be specified."),n.body("password").isLength({min:1}).trim().withMessage("Password must be specified."),n.sanitizeBody("email").escape(),n.sanitizeBody("password").escape(),(e,t)=>{try{const s=n.validationResult(e),{mobileNumber:r,password:i}=e.body;if(!s.isEmpty())return a.validationErrorWithData(t,"Validation Error.",s.array());o.default.findOne({mobileNumber:r}).then((e=>{if(!e)return a.unauthorizedResponse(t,"MobileNumber or Password wrong.");if(e.password==i){const s={_id:e._id,userName:e.userName,mobileNumber:e.mobileNumber},r=s,n={expiresIn:86400};return s.token=u(r,"7032300186",n),a.successResponseWithData(t,"Login Success.",s)}})).catch((e=>a.ErrorResponse(t,e)))}catch(e){return a.ErrorResponse(t,e)}}],t.userLogout=async function(e,t){try{const s=n.validationResult(e),{accessToken:r}=e.body;if(!s.isEmpty())return a.validationErrorWithData(t,"Validation Error.",s.array());d=[...d.filter((e=>r!==e))],a.successResponse(t,"User Logged Out")}catch(e){return a.ErrorResponse(t,e)}}},929:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.deleteMatch=t.getTournaments=t.updateTournamentUser=t.updateMatch=t.createMatch=t.tournamentDelete=t.tournamentRegister=t.test=void 0;const a=r(s(997)),n=r(s(674)),o=s(756),i=s(364);t.test=[(e,t)=>i.successResponseWithData(t,"Ho Ho Ho !!",null)],t.tournamentRegister=[o.body("title").isLength({min:1}).trim().withMessage("Tournament name must be specified.").custom((e=>a.default.findOne({title:e}).then((e=>{if(e)return Promise.reject("Tournament already in use")})))),o.sanitizeBody("title").escape(),(e,t)=>{try{const s=o.validationResult(e);if(!s.isEmpty())return i.validationErrorWithData(t,"Validation Error.",s.array());new a.default({title:e.body.title}).save().then((e=>(console.log("=====>> Success",e),i.successResponseWithData(t,"Tournament Created",e)))).catch((e=>(console.log(e),i.ErrorResponse(t,e))))}catch(e){return i.ErrorResponse(t,e)}}],t.tournamentDelete=[o.body("tournamentId").isLength({min:1}).trim().withMessage("tournament Id name must be specified."),o.sanitizeBody("tournamentId").escape(),async(e,t)=>{try{const s=o.validationResult(e);if(s.isEmpty()){const s=await a.default.findByIdAndDelete(e.body.tournamentId);return s?i.successResponse(t,"Match Deleted"):i.ErrorResponse(t,s)}return i.validationErrorWithData(t,"Validation Error.",s.array())}catch(e){return i.ErrorResponse(t,e)}}],t.createMatch=[o.body("team1").isLength({min:1}).trim().withMessage("team1 must be specified."),o.body("team2").isLength({min:1}).trim().withMessage("team1 must be specified."),o.body("time").isLength({min:1}).trim().withMessage("time must be specified."),o.sanitizeBody("title").escape(),async(e,t)=>{try{const s=o.validationResult(e);if(s.isEmpty()){let s={tournamentId:e.body.tournamentId,team1:e.body.team1,team2:e.body.team2,time:e.body.time,venue:e.body.venue,winner:e.body.winner,isStarted:e.body.isStarted,team1Squard:e.body.team1Squard,team2Squard:e.body.team2Squard};const r=await a.default.findOneAndUpdate({_id:e.body.tournamentId},{$push:{matches:s}},{upsert:!0,new:!0}).catch((e=>i.ErrorResponse(t,e)));return i.successResponseWithData(t,"Operation success",r)}return i.validationErrorWithData(t,"Validation Error.",s.array())}catch(e){return i.ErrorResponse(t,e)}}],t.updateMatch=[o.body("team1").isLength({min:1}).trim().withMessage("team1 must be specified."),o.body("team2").isLength({min:1}).trim().withMessage("team1 must be specified."),o.body("time").isLength({min:1}).trim().withMessage("time must be specified."),o.sanitizeBody("title").escape(),async(e,t)=>{try{a.default.findOneAndUpdate({_id:e.body.tournamentId,"matches._id":e.body._id},{$set:{"matches.$.team2":e.body.team2,"matches.$.team1":e.body.team1,"matches.$.time":e.body.time,"matches.$.venue":e.body.venue,"matches.$.winner":e.body.winner,"matches.$.isStarted":e.body.isStarted,"matches.$.team1Squard":e.body.team1Squard,"matches.$.team2Squard":e.body.team2Squard}},null,((e,s)=>{if(!e)return i.successResponseWithData(t,"Match Updated successfuly",s);console.log("Error:",e),process.exit(0)}))}catch(e){return i.ErrorResponse(t,e)}}],t.updateTournamentUser=[async(e,t)=>{try{const s=o.validationResult(e);if(s.isEmpty()){const s=await n.default.find({_id:{$in:e.body.users}},(function(e,t){console.log(t)}));return a.default.findOneAndUpdate({_id:e.body.tournamentId},{users:s}).then((e=>i.successResponse(e,"User Updated"))).catch((e=>i.ErrorResponse(t,e))),i.successResponse(t,"User Updated")}return i.validationErrorWithData(t,"Validation Error.",s.array())}catch(e){return i.ErrorResponse(t,e)}}],t.getTournaments=[async(e,t)=>{try{const s=o.validationResult(e),{mobileNumber:r}=e.query;if(!s.isEmpty())return i.validationErrorWithData(t,"Validation Error.",s.array());if(r){const e={mobileNumber:r},s=await n.default.findOne(e);if(!s)return i.ErrorResponse(t,"User not found !!");const o=await a.default.find({users:s._id}).populate("users","userName").populate("matches.team1Squard","userName").populate("matches.team2Squard","userName").catch((e=>i.ErrorResponse(t,e)));return o?i.successResponseWithData(t,"Operation success",o):i.successResponseWithData(t,"Operation success",[])}await a.default.find({}).populate("users","userName").populate("matches.team1Squard").populate("matches.team2Squard").then((e=>i.successResponseWithData(t,"Tournament Get Success",e))).catch((e=>i.ErrorResponse(t,e)))}catch(e){return i.ErrorResponse(t,e)}}],t.deleteMatch=[async(e,t)=>{try{const s=o.validationResult(e);if(!s.isEmpty())return i.validationErrorWithData(t,"Validation Error.",s.array());console.log(e.body.tournamentId),a.default.findById(e.body.tournamentId,(async(s,r)=>{if(null===r)return i.notFoundResponse(t,"Tournament not exists with this id");{const s={matches:{_id:e.body._id}};a.default.findByIdAndUpdate(e.body.tournamentId,{$pull:s},(function(e,s){return e?i.notFoundResponse(t,"Errorrr"):i.successResponseWithData(t,"ho ho ho ",s)}))}}))}catch(e){return i.ErrorResponse(t,e)}}]},201:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createUser=t.getUsers=t.updateUser=t.UserDelete=void 0;const a=r(s(674)),n=r(s(997)),o=s(756),i=s(364);t.UserDelete=[o.body("userId").isLength({min:1}).trim().withMessage("User Id name must be specified."),o.sanitizeBody("userId").escape(),(e,t)=>{try{const s=o.validationResult(e);return s.isEmpty()?(a.default.findByIdAndDelete(e.body.userId).then((e=>i.successResponse(e,"User Deleted"))).catch((e=>i.ErrorResponse(t,e))),i.successResponse(t,"User Deleted")):i.validationErrorWithData(t,"Validation Error.",s.array())}catch(e){return i.ErrorResponse(t,e)}}],t.updateUser=[o.body("mobileNumber").isLength({min:1}).trim().withMessage("mobileNumber name must be specified."),o.sanitizeBody("mobileNumber").escape(),o.body("userName").isLength({min:1}).trim().withMessage("userName name must be specified."),o.sanitizeBody("userName").escape(),o.body("password").isLength({min:1}).trim().withMessage("password name must be specified."),o.sanitizeBody("password").escape(),(e,t)=>{try{const r=o.validationResult(e);if(!r.isEmpty())return i.validationErrorWithData(t,"Validation Error.",r.array());var s=new a.default({mobileNumber:e.body.mobileNumber,userName:e.body.userName,password:e.body.password,_id:e.body.userId});a.default.findByIdAndUpdate(e.body.userId,s).then((e=>i.successResponseWithData(t,"User updated",e))).catch((e=>i.ErrorResponse(t,e)))}catch(e){return i.ErrorResponse(t,e)}}],t.getUsers=[(e,t)=>{try{const s=o.validationResult(e),{tournamentId:r}=e.query;if(!s.isEmpty())return i.validationErrorWithData(t,"Validation Error.",s.array());{const e=r?{_id:r}:{};r?n.default.find(e).populate("users").then((e=>e.length?i.successResponseWithData(t,"Operation success",e):i.successResponseWithData(t,"Operation success",[]))).catch((e=>i.ErrorResponse(t,e))):a.default.find(e).then((e=>e.length?i.successResponseWithData(t,"Operation success",e):i.successResponseWithData(t,"Operation success",[]))).catch((e=>i.ErrorResponse(t,e)))}}catch(e){return i.ErrorResponse(t,e)}}],t.createUser=[o.body("userName").isLength({min:1}).trim().withMessage("User Name must be specified.").isAlphanumeric().withMessage("User Name has non-alphanumeric characters."),o.body("mobileNumber").isLength({min:1}).trim().withMessage("Mobile Number must be specified.").isMobilePhone("en-IN").withMessage("Mobile Number must be a valid mobile number").custom((e=>a.default.findOne({mobileNumber:e}).then((e=>{if(e)return Promise.reject("Mobile Number already in use")})))),o.body("password").isLength({min:6}).trim().withMessage("Password must be 6 characters or greater."),o.sanitizeBody("userName").escape(),o.sanitizeBody("mobileNumber").escape(),o.sanitizeBody("password").escape(),(e,t)=>{try{const s=o.validationResult(e);if(!s.isEmpty())return i.validationErrorWithData(t,"Validation Error.",s.array());new a.default({mobileNumber:e.body.mobileNumber,userName:e.body.userName,password:e.body.password}).save().then((e=>i.successResponseWithData(t,"User Created",e))).catch((e=>i.ErrorResponse(t,e)))}catch(e){return i.ErrorResponse(t,e)}}]},364:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.unauthorizedResponse=t.validationErrorWithData=t.notFoundResponse=t.ErrorResponse=t.successResponseWithData=t.successResponse=void 0,t.successResponse=(e,t)=>{const s={status:1,message:t};return e.status(200).json(s)},t.successResponseWithData=(e,t,s)=>{const r={status:1,message:t,data:s};return e.status(200).json(r)},t.ErrorResponse=(e,t)=>{const s={status:0,message:t};return e.status(500).json(s)},t.notFoundResponse=(e,t)=>{const s={status:0,message:t};return e.status(404).json(s)},t.validationErrorWithData=(e,t,s)=>{const r={status:0,message:t,data:s};return e.status(400).json(r)},t.unauthorizedResponse=(e,t)=>{const s={status:0,message:t};return e.status(200).json(s)}},997:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(619),a=new r.Schema({tournamentId:{type:String,required:!0},team1:{type:String,required:!0},team2:{type:String,required:!0},time:{type:String,required:!0},venue:{type:String},winner:{type:String},isStarted:{type:Boolean},team1Squard:[{type:r.Schema.Types.ObjectId,ref:"User"}],team2Squard:[{type:r.Schema.Types.ObjectId,ref:"User"}]}),n=new r.Schema({title:{type:String,required:!0},matches:[a],users:[{type:r.Schema.Types.ObjectId,ref:"User"}]},{timestamps:!0});t.default=r.model("Tournament",n)},674:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(619),a=new r.Schema({userName:{type:String,required:!0},mobileNumber:{type:Number,required:!0},password:{type:String,required:!0}});t.default=r.model("User",a)},97:function(e,t,s){var r=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&r(t,e,s);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=n(s(127)),i=n(s(622)),{Router:u}=o,d=s(929),c=s(268),m=s(201);console.log("===============================>"),console.log(i.join(__dirname,"./"));const l=i.join(__dirname,"./"),p=(i.join(l,"index.html"),u());p.get("/",((e,t)=>{t.send("Hello")})),p.get("/get-tournaments",d.getTournaments),p.post("/tournament-register",d.tournamentRegister),p.delete("/delete-tournament",d.tournamentDelete),p.post("/update-tournament-user",d.updateTournamentUser),p.post("/create-match",d.createMatch),p.post("/update-match",d.updateMatch),p.delete("/delete-match",d.deleteMatch),p.post("/create-user",m.createUser),p.post("/update-user",m.updateUser),p.get("/get-users",m.getUsers),p.delete("/delete-user",m.UserDelete),p.post("/login-user",c.userLogin),p.post("/logout-user",c.userLogout),t.default=p},725:function(e,t,s){var r=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&r(t,e,s);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(s(127)),u=o(s(97)),d=s(364),c=o(s(479)),m=s(619),l=n(s(622)),{connect:p}=m,{json:h,urlencoded:y}=i.default;var b="mongodb+srv://boss:boss123@cluster0.ho84f.mongodb.net/cricket?retryWrites=true&w=majority";console.log(b),p(b,{useNewUrlParser:!0,useUnifiedTopology:!0}).then((()=>{console.log("Connected to %s",b),console.log("App is running ... \n")})).catch((e=>{console.error("App starting error:",e.message)}));const f=i.default();f.use(h()),f.use(y({extended:!1})),f.use(c.default()),f.use("/api",u.default),f.use(i.default.static(__dirname+"/")),f.get("/*",((e,t)=>{t.sendFile(l.join(__dirname+"/index.html"))})),f.use(((e,t,s)=>{if("UnauthorizedError"==e.name)return d.unauthorizedResponse(s,e.message)})),f.listen(3e3,(()=>{console.log("Example app listening at http://localhost:3000")}))},479:e=>{e.exports=require("cors")},127:e=>{e.exports=require("express")},756:e=>{e.exports=require("express-validator")},722:e=>{e.exports=require("jsonwebtoken")},619:e=>{e.exports=require("mongoose")},622:e=>{e.exports=require("path")}},t={};!function s(r){if(t[r])return t[r].exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,s),a.exports}(725)})();