from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from config import Config
from email_service import mail

from routes.tasks import task_bp
from routes.users import user_bp

app = Flask(__name__)

app.config.from_object(Config)

mail.init_app(app)

CORS(app)

app.register_blueprint(task_bp)
app.register_blueprint(user_bp)

@app.route("/")
def home():
    return {
        "message": "Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)