from flask_mail import Mail, Message

mail = Mail()


def send_email(to, subject, body):

    msg = Message(
        subject,
        sender="sakshamjain3493@gmail.com",
        recipients=[to]
    )

    msg.body = body

    mail.send(msg)