//? Connecting node module(s)
const nodemailer = require('nodemailer');

//? Connecting db models
const Subscribe = require('../models/Subscribe');
const Settings  = require('../models/Settings');

//? Connecting custom models
const { HTTP }              = require('../lib/constants');
const { HTTPException }     = require('../lib/HTTPexception');
const checkRights           = require('../lib/checkRights');
const emailValidate         = require('../lib/emailValidate');


//? Controller for get subscribers list
const getSubscriberList = async (req, res) => {
    try {
        if(!checkRights(req.userData.userID, 5)) {
            throw new HTTPException("No admin rights for add new article", HTTP.FORBIDDEN);
        }

        let page = req.params.page;

        if(page == 'all') {
            await Subscribe.find().then((result) => {
                if(result == null || result.length == 0) {
                    throw new HTTPException("No result", HTTP.NOT_FOUND)
                }
    
                return res.status(HTTP.OK).json(result)
            });
        }
        else {
            page = parseInt(page);
            const limit = 10;
            const subscribers = await Subscribe.find({}).skip((page * limit) - limit).limit(limit).then(result => {
                if(result == null || result.length == 0) {
                    throw new HTTPException("No result", HTTP.NOT_FOUND);
                }

                return result;
            });

            const count = await Subscribe.countDocuments();
            const pageCount = Math.ceil(count/limit);

            return res.status(HTTP.OK).json({'pageCount' : pageCount, subscribers});
        }

        
    }
    catch(exception) {
        if (!(exception instanceof HTTPException)) {
            exception.statusCode = HTTP.INTERNAL_SERVER_ERROR;
            exception.message = 'Something went wrong';
        }
        return res.status(exception.statusCode).json({ message: exception.message });
    }
}

//? controller for subscribe user email
const subscribe = async (req, res) => {
    try {
        const email = req.params.email;

        if(emailValidate(email) == false) {
            throw new HTTPException("Wrong email", HTTP.BAD_REQUEST);
        }

        await Subscribe.find({"email": email}).then((result) => {
            if(result.length != 0) {
                throw new HTTPException("Email already exist", HTTP.FORBIDDEN);
            }
        });

        const subscribe = new Subscribe({email});
        subscribe.save();

        return res.status(HTTP.OK).json({'message' : "Success"});
    }
    catch(exception) {
        if (!(exception instanceof HTTPException)) {
            exception.statusCode = HTTP.INTERNAL_SERVER_ERROR;
            exception.message = 'Something went wrong';
        }
        return res.status(exception.statusCode).json({ message: exception.message });
    }
}

//? Controller for send emails
const sendEmail = async (req, res) => {
    try{
        if(!checkRights(req.userData.userID, 5)) {
            throw new HTTPException("ARTICLE: No admin rights for add new article", HTTP.FORBIDDEN);
        }

        const getSettings = await Settings.find({});

        const settings = getSettings[0];

        const {subject, text} = req.body;

        const subscribers = await Subscribe.find({}).then(result => {return result})

        let emails = '';

        for(i of subscribers) {
            emails = emails + i.email + ', ';
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: settings.email_username,
                pass: settings.email_password
            }
        });
          
        const mailOptions = {
            from: `"SportByArt" <${settings.email_username}>`,
            to: emails,
            subject: subject,
            html: text
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.error(error);
                throw new HTTPException("Server error", HTTP.INTERNAL_SERVER_ERROR);
            }
        });

        return res.status(HTTP.OK).json({ message: "Success"});
          
    }
    catch(exception) {
        console.log(exception)
        if (!(exception instanceof HTTPException)) {
            exception.statusCode = HTTP.INTERNAL_SERVER_ERROR;
            exception.message = 'Something went wrong';
        }
        return res.status(exception.statusCode).json({ message: exception.message });
    }
}

//? Controller for delete user
const deleteSubscribe = async (req, res) => {
    try {
        if(!checkRights(req.userData.userID, 5)) {
            throw new HTTPException("No admin rights for add new article", HTTP.FORBIDDEN);
        }

        const subscribe = await Subscribe.findById({'email' : req.params.email})
        .then((result) => {
            if(result == null || result.length == 0) {
                throw new HTTPException("No result!", HTTP.NOT_FOUND);
            }

            return result;
        });
        

        await subscribe.deleteOne();
        return res.status(HTTP.OK).json({'message' : 'Success'})

    }
    catch(exception) {
        if(!(exception instanceof HTTPException)) {
            exception.statusCode = HTTP.INTERNAL_SERVER_ERROR;
            exception.message = "Somethind went wrong"
        }
        return res.status(exception.statusCode).json({ message: exception.message });
    }
}

module.exports = {
    getSubscriberList,
    subscribe,
    sendEmail,
    deleteSubscribe
}