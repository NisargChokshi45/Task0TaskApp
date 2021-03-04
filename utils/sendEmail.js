const nodemailer = require("nodemailer");
require("dotenv").config();

const hostEmail = process.env.EMAIL;
const hostPassword = process.env.PASSWORD;

const hostAccount = {
    user: hostEmail,
    pass: hostPassword,
};

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: hostAccount.user,
        pass: hostAccount.pass,
    },
});

const sendWelcomeEmail = async (destEmail, name) => {
    try {
        const info = await transpoter.sendMail({
            from: hostEmail,
            to: destEmail,
            subject: "Thanks for Joining Bacancy Task App 😃",
            html: `<h4>Dear ${name}, greetings from <b> Bacancy Technologies </b> </h4> <p> Thanks for Joining Bacancy Task App. </p> <p> Use the Task Application to utilize and manage your workflow efficiently and effectively.</p> <br> Thanks and Regards, <br><a href="https://www.bacancytechnology.com/" style="color:orange">Bacancy Technologies </a>`,
        });
        //    console.log(info.messageId);
        //    console.log("Preview URL : ", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log("Error Sending Mail", error);
    }
};

const sendDeletionEmail = async (destEmail, name) => {
    try {
        const info = await transpoter.sendMail({
            from: hostEmail,
            to: destEmail,
            subject: "Hope you have completed All your Tasks ✅",
            html: `<h4> <b> Dear ${name}, Thanks for using our applicaiton ! </b> </h4> <p> If you found our application interesting and useful, please do share it with your friends. </p> <p> Please feel free to share us the reason for deleting the account ! <p> <br> Thanks and Regards, <br><a href="https://www.bacancytechnology.com/" style="color:orange">Bacancy Technologies </a>`,
        });
    } catch (error) {
        console.log("Error sending Mail :", error);
    }
};

module.exports = { sendWelcomeEmail, sendDeletionEmail };
