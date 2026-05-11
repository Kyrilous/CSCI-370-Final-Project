from flask import Flask
from flask_cors import CORS
from routes.rooms import rooms_bp
from routes.admin import admin_bp
from models import create_tables

app = Flask(__name__)
CORS(app)

app.register_blueprint(rooms_bp)
app.register_blueprint(admin_bp)

create_tables()

if __name__ == "__main__":
    app.run(debug=True)
