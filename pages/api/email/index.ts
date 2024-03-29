import type { NextApiRequest, NextApiResponse } from 'next'
import nodeMailer, { type SendMailOptions } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const NextAppEmailAccount = process.env.NEXT_NODEMAILER_USER
const NExtAppPassAccount = process.env.NEXT_NODEMAILER_PASS

const EmailTransporter = nodeMailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: NextAppEmailAccount, // sender authorized email
        pass: NExtAppPassAccount, // sender authorize pass (acutal or app specific)
    },
})

function sendMailContenGenerator(name: string, email: string, message: string) {
    const EmailOption: SendMailOptions = {
        from: `NodeMailer Demo App - Contact Form`, // The sender's Email Header
        to: NextAppEmailAccount, // The email of the receiver
        replyTo: NextAppEmailAccount, // The email to which all replies will be sent
        // MAIL CONTENT
        subject: '',
        text: '',
        html: '',
        // TO BE GENERATED BY HELPER (sendMailContentGenetator) FUNCTION...
    }
    return EmailOption
}

const EmailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body

    if (!(body.name && body.email && body.message)) {
        res.status(400).end()
    }

    const { name, email, message } = body

    try {
        await EmailTransporter.sendMail({
            ...sendMailContenGenerator(name, email, message),
        })
        res.status(200).end()
    } catch (error) {
        res.status(500).end()
    }
}

export default EmailHandler
